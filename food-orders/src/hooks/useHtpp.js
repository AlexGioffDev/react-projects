import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
  const res = await fetch(url, config);

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request"
    );
  }

  return resData;
};

export const useHttp = (url, config, initialData) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const clearData = () => {
    setData(initialData);
  };

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    error,
    loading,
    sendRequest,
    clearData,
  };
};
