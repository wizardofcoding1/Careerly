import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export  function UseQueryParam(key) {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const initialValue = params.get(key) || '';

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(params.get(key) || '');
  }, [search, key]);

  const setQueryParam = (newValue) => {
    params.set(key, newValue);
    navigate({ pathname: window.location.pathname, search: params.toString() }, { replace: true });
  };

  return [value, setQueryParam];
}