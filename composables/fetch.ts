type Method = "GET" | "POST" | "PUT" | "DELETE";
type options = {query?:any, body?:any, headers?:any, method?:Method, baseURL?:string}
export async function fetchAPI(method: Method, url: string, body: any | null) {
  try {
    const res = await $fetch(url, fetchOptions(method, body || null));
    return res;
  } catch (error) {
    // Handle permission error    
    throw error;
  }
}

export function fetchOptions(method:Method,body:any) {
  const config = useRuntimeConfig();
  // let headers = ''
  // if(auth_store.value.access_token) {
  //   headers = {Authorization: `Bearer ${auth_store.value.access_token}` }
  // }
  return {
    baseURL: config.public.baseURL,
    body,
    // headers,
    method:method,
  };
}

