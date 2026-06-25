import { TABLE_COLUMNS } from '@constans';
import { getTableHeaderClass } from '../../utils/tableColumns';
import './TableHead.scss';

const TableHead = () => {
  return (
    <thead className="table__head">
      <tr className="table__row">
        {TABLE_COLUMNS.map(({ key, label }) => (
          <th key={key} className={`table__header ${getTableHeaderClass(key)}`}>
            {label}
          </th>
        ))}
        <th
          className={`table__header ${getTableHeaderClass('actions')}`}
          aria-label="Действия"
        />
      </tr>
    </thead>
  );
};

export { TableHead };
