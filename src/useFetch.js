import  { useState, useEffect } from "react";

// setting the api link
export const API_URL = `http://www.omdbapi.com/?&apikey=e09329d1`;

const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || data);
        setIsError({ show: "false", msg: "" });
      } else {
        setIsError({ show: "true", msg: data.Error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // debouncing in react js
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovie(`${API_URL}&s=${apiParams}`);
    }, 800);
    return () => {
      clearTimeout(timeOut);
    };
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;
