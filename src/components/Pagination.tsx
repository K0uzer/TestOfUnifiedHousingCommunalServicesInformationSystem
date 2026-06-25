import { observer } from 'mobx-react-lite';
import { meterStore } from '@store/meterStore';
import { getPaginationItems } from '@utils/getPaginationItems';
import './Pagination.scss';

const Pagination = observer(() => {
  const items = getPaginationItems(meterStore.page, meterStore.totalPages);

  if (items.length <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Навигация по страницам">
      <ul className="pagination__list">
        {items.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <li key={`ellipsis-${index}`} className="pagination__item">
                <span className="pagination__ellipsis" aria-hidden="true">
                  ...
                </span>
              </li>
            );
          }

          const isActive = item - 1 === meterStore.page;

          return (
            <li key={item} className="pagination__item">
              <button
                type="button"
                className={`pagination__button${
                  isActive ? ' pagination__button--active' : ''
                }`}
                disabled={isActive || meterStore.loading}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => void meterStore.setPage(item - 1)}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export { Pagination };
