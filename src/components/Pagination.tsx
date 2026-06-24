import { observer } from 'mobx-react-lite';
import { meterStore } from '../store/meterStore';
import './Pagination.scss';

const Pagination = observer(() => {
  const canGoPrev = meterStore.page > 0;
  const canGoNext = meterStore.page < meterStore.totalPages - 1;

  return (
    <nav className="pagination" aria-label="Навигация по страницам">
      <button
        type="button"
        className="pagination__button"
        disabled={!canGoPrev || meterStore.loading}
        onClick={() => void meterStore.setPage(meterStore.page - 1)}
      >
        Назад
      </button>

      <span className="pagination__info">
        Страница {meterStore.page + 1} из {meterStore.totalPages}
      </span>

      <button
        type="button"
        className="pagination__button"
        disabled={!canGoNext || meterStore.loading}
        onClick={() => void meterStore.setPage(meterStore.page + 1)}
      >
        Вперёд
      </button>
    </nav>
  );
});

export { Pagination };
