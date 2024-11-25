import { baseUrlLocal } from "@/consts/baseLocal";
import { API_BASE_URL } from "./getBaseApi";
import { baseUrlApi } from "@/consts/baseApi";

export const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const url = `${baseUrlLocal}${endpoint}`;
  const response = await fetch(url, options);

  // if (!response.ok) {
  //   throw new Error(`Error ${response.status}: ${response.statusText}`);
  // }

  return response.json() as Promise<T>;
};
