import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { useAuth0 } from '@auth0/auth0-react';

const isProtectedUrl = (urlString: string) => {
  try {
    const url = new URL(urlString);
    return !url.pathname.startsWith("/public");
  } catch (error) {
    return false; // Invalid URL
  }
}

// We wrap Axios methods in a hook, so we can centrally handle adding auth tokens.
const useAxios = () => {
  const { getAccessTokenSilently } = useAuth0();

  axios.interceptors.request.use(async (config: any) => {
    if (config.url.indexOf('http') === -1) {
      config.url = `${import.meta.env.VITE_API_SERVER_URL}/${config.url}`;
    }

    if (isProtectedUrl(config.url) && config.headers.Authorization === undefined) {
      config.headers.Authorization = `Bearer ${await getAccessTokenSilently()}`;
    }
    return config;
  });

  return {
    get: async (url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse> => axios.get(url, config),
    del: async (url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse> => axios.delete(url, config),
    post: async (url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse> => axios.post(url, data, config),
    put: async (url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse> => axios.put(url, data, config),
    patch: async (url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse> => axios.patch(url, data, config),
  }
};

export default useAxios;