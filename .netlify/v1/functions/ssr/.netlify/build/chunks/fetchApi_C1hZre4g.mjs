const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return { baseUrl: "https://revista.previser.com.co/api" };
  } else {
    return { baseUrl: "http://localhost:4321/api" };
  }
};
getApiBaseUrl();

const baseUrlApi = "https://api-revista.previser.com.co/api";

const fetchApi = async (endpoint, options) => {
  const url = `${baseUrlApi}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export { baseUrlApi as b, fetchApi as f };
