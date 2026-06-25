import { observer } from 'mobx-react-lite';
import { meterStore } from '@store/meterStore';
import './Table.scss';
import { TableHead } from './TableHead';
import { useEffect } from 'react';
import { formatAddress, formatAutomatic, formatDate, formatInitialValues, formatMeterType, getMeterTypeKey } from '../../utils/format';
import iconGvs from '@assets/Icon-gvs.svg';
import iconHvs from '@assets/Icon-hvs.svg';
import trashIcon from '@assets/trash.svg';


const Table = observer(() => {
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
    <div className="table-container" >
      {
        meterStore.error && (
          <p className="table-status table-status--error">{meterStore.error}</p>
        )
      }

      <div className="scroll-wrapper" >
        <table className="table" >
          <TableHead />
          <tbody className="table__body">
            {meterStore.meters.map((item, index) => {
              const typeKey = getMeterTypeKey(item._type);
              const area = meterStore.getArea(item.area.id);
              const rowNumber =
                meterStore.page * meterStore.pageSize + index + 1;

              console.log(typeKey)

              return (
                <tr className="table__row" key={item.id}>
                  <td className="table__data">{rowNumber}</td>
                  <td className="table__data">
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
                  <td className="table__data">
                    {formatDate(item.installation_date)}
                  </td>
                  <td className="table__data">
                    {formatAutomatic(item.is_automatic)}
                  </td>
                  <td className="table__data">
                    {formatInitialValues(item.initial_values)}
                  </td>
                  <td className="table__data">{formatAddress(area)}</td>
                  <td className="table__data">1 подезд, подвал</td>
                  <td className="table__data table__data--actions">
                    <button
                      type="button"
                      className="table__delete"
                      aria-label="Удалить счётчик"
                      disabled={meterStore.deletingId === item.id}
                      onClick={() => meterStore.removeMeter(item.id)}
                    >
                      <img src={trashIcon} width={20} height={20} alt="иконка" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table >
      </div >
    </div >
  );
});

export { Table };
