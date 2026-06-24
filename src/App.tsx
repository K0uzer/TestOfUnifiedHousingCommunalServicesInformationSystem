import './App.css';
import { Table, Pagination } from './components';

function App() {
  return (
    <main className="app">
      <h1 className="app__title">Список счётчиков</h1>
      <Table />
      <Pagination />
    </main>
  );
}

export default App;
