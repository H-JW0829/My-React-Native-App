import { useState, useEffect } from 'react';

import { post, get } from '../common/http';

export function useGetCategory() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const response = await get('/category/getAll');
      if (response.code === 0) {
        setCategory(response.data.categories);
      }
    };

    getCategory();
  }, []);

  return category;
}
