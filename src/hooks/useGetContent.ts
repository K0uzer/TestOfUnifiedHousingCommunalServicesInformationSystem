import { useEffect, useState } from 'react';
import { URI } from '../constans';

const useGetContent = (limit: number = 20) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const ELEMENT_LIMIT = `/?limit=${limit}&&offset`;

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(URI + ELEMENT_LIMIT, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`status: ${response.status}`);
        }

        const json = await response.json();

        console.log(json);

        if (isMounted) {
          setData(json);
        }
      } catch (error) {
        if (
          isMounted &&
          !(error instanceof DOMException && error.name === 'AbortError')
        ) {
          setError(error instanceof Error ? error.message : 'ошибка');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [ELEMENT_LIMIT, limit]);

  return { data, loading, error };
};

export { useGetContent };
