import {useState,useEffect} from 'react';

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [data,setData] = useState([]);
  const getDataFromAPi = async apiUrl => {
   try{
    setLoading(true);
    const api = await fetch(apiUrl);
    const data = await api.json();
    setData(data);
   }finally{
     setLoading(false);
   }
  }

  useEffect(() =>{
    getDataFromAPi(url);
  }, [url]);

  return {data,setData,loading};
}

export default useFetch;