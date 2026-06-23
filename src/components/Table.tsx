import { useGetContent } from '../hooks';

const Table = () => {
  const counterList = useGetContent(20);

  console.log(counterList);

  return (
    <table>
      {/* <thead></thead>
      <tbody>{counterList.map((item) => {
        return <p>item.id</p>
      })}</tbody> </table> */}
      <tfoot></tfoot>
    </table>
  );
};

export { Table };
