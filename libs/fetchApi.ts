const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url: string, option: RequestCache = "default") => {

  const res = await fetch(`${baseUrl}${url}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || "",
      'X-RapidAPI-Host': process.env.REALESTATE_RAPIDAPI_HOST || "",
    },
    cache: option
  });
  const data = await res.json();
  return data;
}