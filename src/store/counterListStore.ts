import { makeAutoObservable } from 'mobx';


class CounterListStore {
  list: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getList(page: number): string[] {
    return this.list.slice(0 + page, 20);
  }

  lengthList() {
    return this.list.length;
  }

  loadList(counterlist: string[]) {
    this.list = [...counterlist];
  }
}

export const counterListStore = new CounterListStore();
