import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { TableHead } from './TableHead';
import { DeleteIcon } from './DeleteIcon';
import { meterStore } from '@store/meterStore';
import { formatMeterType } from '@utils/formatMeterType';
import { formatDate } from '@utils/formatDate';
import { formatAutomatic } from '@utils/formatAutomatic';
import { formatInitialValues } from '@utils/formatInitialValues';
import { formatAddress } from '@utils/formatAddress';
import { getMeterTypeKey } from '@utils/getMeterTypeKey';
import { Pagination } from '../Pagination';
import { getTableColClass, getTableDataClass } from '@utils/tableColumns';
import { TABLE_COLUMNS } from '@constans';

import iconGvs from '@assets/Icon-gvs.svg?url';
import iconHvs from '@assets/Icon-hvs.svg?url';

import './Table.scss';

const Table = observer(() => {
  const [pressedDeleteId, setPressedDeleteId] = useState<string | null>(null);

  useEffect(() => {
    meterStore.init();
  }, []);

  if (meterStore.loading && !meterStore.meters.length) {
    return <p className="table-status">Загрузка...</p>;
  }

  if (meterStore.error && !meterStore.meters.length) {
    return (
      <p className="table-status table-status--error">{meterStore.error}</p>
    );
  }

  return (
    <div className="table-container">
      <div className="scroll-wrapper">
        <table className="table">
          <colgroup>
            {TABLE_COLUMNS.map(({ key }) => (
              <col key={key} className={getTableColClass(key)} />
            ))}
            <col className={getTableColClass('actions')} />
          </colgroup>
          <TableHead />
          <tbody className="table__body">
            {meterStore.meters.map((item, index) => {
              const typeKey = getMeterTypeKey(item._type);
              const area = meterStore.getArea(item.area.id);
              const rowNumber =
                meterStore.page * meterStore.pageSize + index + 1;

              return (
                <tr className="table__row" key={item.id}>
                  <td className={`table__data ${getTableDataClass('number')}`}>
                    {rowNumber}
                  </td>
                  <td className={`table__data ${getTableDataClass('type')}`}>
                    <span className="table__type">
                      {typeKey === 'hvs' && (
                        <img
                          src={iconHvs}
                          width={16}
                          height={16}
                          alt="иконка"
                          className="table__type-icon"
                        />
                      )}
                      {typeKey === 'gvs' && (
                        <img
                          src={iconGvs}
                          width={16}
                          height={16}
                          alt="иконка"
                          className="table__type-icon"
                        />
                      )}
                      {formatMeterType(item._type)}
                    </span>
                  </td>
                  <td className={`table__data ${getTableDataClass('date')}`}>
                    {formatDate(item.installation_date)}
                  </td>
                  <td
                    className={`table__data ${getTableDataClass('automatic')}`}
                  >
                    {formatAutomatic(item.is_automatic)}
                  </td>
                  <td
                    className={`table__data ${getTableDataClass('readings')}`}
                  >
                    {formatInitialValues(item.initial_values)}
                  </td>
                  <td className={`table__data ${getTableDataClass('address')}`}>
                    {formatAddress(area)}
                  </td>
                  <td className={`table__data ${getTableDataClass('note')}`}>
                    {item.description}
                  </td>
                  <td className={`table__data ${getTableDataClass('actions')}`}>
                    <button
                      type="button"
                      className={`table__delete${pressedDeleteId === item.id
                        ? ' table__delete--pressed'
                        : ''
                        }`}
                      aria-label="Удалить счётчик"
                      disabled={meterStore.deletingId === item.id}
                      onPointerDown={() => setPressedDeleteId(item.id)}
                      onPointerUp={() => setPressedDeleteId(null)}
                      onPointerLeave={() => setPressedDeleteId(null)}
                      onPointerCancel={() => setPressedDeleteId(null)}
                      onClick={() => meterStore.removeMeter(item.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
});

export { Table };
