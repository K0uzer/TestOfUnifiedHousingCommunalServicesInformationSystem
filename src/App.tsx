import './App.css';
import { Table, Pagination } from './components';

function App() {

  return (
    <section>
      <h1>Список счетчиков</h1>

      <Table />
      <Pagination />
    </section>
  );
}

export default App;
