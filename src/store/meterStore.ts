import { makeAutoObservable, runInAction } from 'mobx';
import { deleteMeter, fetchAreasByIds, fetchMeters } from '../api';
import { PAGE_SIZE } from '@constans';
import type { Area, Meter } from '../types';

class MeterStore {
  meters: Meter[] = [];
  totalCount = 0;
  page = 0;
  readonly pageSize = PAGE_SIZE;
  loading = false;
  deletingId: string | null = null;
  error: string | null = null;
  private areasCache = new Map<string, Area>();
  private abortController: AbortController | null = null;
  private loadRequestId = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }

  getArea(areaId: string): Area | undefined {
    return this.areasCache.get(areaId);
  }

  async init(): Promise<void> {
    await this.loadMeters();
  }

  async setPage(page: number): Promise<void> {
    if (page < 0 || page >= this.totalPages || page === this.page) {
      return;
    }

    this.page = page;
    await this.loadMeters();
  }

  async loadMeters(): Promise<void> {
    this.abortController?.abort();
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    const requestId = ++this.loadRequestId;

    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const offset = this.page * this.pageSize;
      const response = await fetchMeters(this.pageSize, offset, signal);
      let meters = response.results;

      if (
        meters.length < this.pageSize &&
        offset + meters.length < response.count
      ) {
        const additional = await fetchMeters(
          this.pageSize - meters.length,
          offset + meters.length,
          signal,
        );
        meters = [...meters, ...additional.results];
      }

      if (requestId !== this.loadRequestId) {
        return;
      }

      runInAction(() => {
        this.meters = meters;
        this.totalCount = response.count;
      });

      await this.loadAreasForMeters(meters, signal, requestId);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      if (requestId !== this.loadRequestId) {
        return;
      }

      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : 'Не удалось загрузить данные';
      });
    } finally {
      if (requestId === this.loadRequestId) {
        runInAction(() => {
          this.loading = false;
        });
      }
    }
  }

  private async loadAreasForMeters(
    meters: Meter[],
    signal?: AbortSignal,
    requestId?: number,
  ): Promise<void> {
    const unknownIds = [
      ...new Set(
        meters
          .map((meter) => meter.area?.id)
          .filter((id): id is string => Boolean(id) && !this.areasCache.has(id)),
      ),
    ];

    if (!unknownIds.length) {
      return;
    }

    const areas = await fetchAreasByIds(unknownIds, signal);

    if (requestId !== undefined && requestId !== this.loadRequestId) {
      return;
    }

    runInAction(() => {
      for (const area of areas) {
        this.areasCache.set(area.id, area);
      }
    });
  }

  async removeMeter(meterId: string): Promise<void> {
    if (this.deletingId) {
      return;
    }

    this.deletingId = meterId;
    this.error = null;

    try {
      await deleteMeter(meterId);

      const isLastItemOnPage = this.meters.length === 1;
      const isLastPage = this.page === this.totalPages - 1;

      if (isLastItemOnPage && isLastPage && this.page > 0) {
        runInAction(() => {
          this.page -= 1;
        });
      }

      await this.loadMeters();
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : 'Не удалось удалить счётчик';
      });
    } finally {
      runInAction(() => {
        this.deletingId = null;
      });
    }
  }
}

export const meterStore = new MeterStore();
