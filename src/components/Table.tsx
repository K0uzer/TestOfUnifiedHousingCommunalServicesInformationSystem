import { useGetContent } from '../hooks';
import './Table.scss';

const Table = () => {
  const counterList = useGetContent(20);

  console.log(counterList);

  return (
    <div className="table-container">
      <div className="scroll-wrapper">
        <table className="table">
          <thead className="table__head">
            <tr className="table__row">
              <th className="table__header">ID</th>
              <th className="table__header">communication</th>
              <th className="table__header">brand_name</th>
              <th className="table__header">description</th>
              <th className="table__header">area_id</th>
              <th className="table__header">initial_values</th>
              <th className="table__header">installation_date</th>
              <th className="table__header">is_automatic</th>
              <th className="table__header">model_name</th>
              <th className="table__header">serial_number</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {counterList?.data?.results?.map((item) => (
              <tr className="table__row" key={item.id}>
                <td className="table__data">{item.id}</td>
                <td className="table__data">{item.communication}</td>
                <td className="table__data">{item.brand_name}</td>
                <td className="table__data">{item.description}</td>
                <td className="table__data">{item.area.id}</td>
                <td className="table__data">{item.initial_values}</td>
                <td className="table__data">{item.installation_date}</td>
                <td className="table__data">{item.is_automatic}</td>
                <td className="table__data">{item.model_name}</td>
                <td className="table__data">{item.serial_number}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table__foot"></tfoot>
        </table>
      </div>
    </div>
  );
};

export { Table };
