import { useState } from 'react';
import './Pagination.scss';

const Pagination = () => {
  const [date, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  return (
    <div>
      <button>Лист номер 1</button>
    </div>
  );
};

export { Pagination };
