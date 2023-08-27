const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url: string, option: RequestCache = "default") => {
  
 const res = await fetch(`${baseUrl}${url}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'bacc45b5d9mshc9282045fb2395dp18e022jsn9d4ecc135e1c',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    },
    cache: option
  });
  const data = await res.json();
  return data;
}