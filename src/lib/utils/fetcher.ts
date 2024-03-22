import { flattenAttributes } from "./flatten-attributes";

export const fetcher = async (url: string) => {
    const response = await fetch('/api/strapi', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'method': 'GET',
        'path': url
      },
      body: JSON.stringify({})
    });
  
    if (!response.ok) {
      throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
    }
    const res = await response.json();
    
    const flattenedData = await flattenAttributes(res.data.data);

    return flattenedData;
  };