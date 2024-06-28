type Method = "GET" | "POST" | "PUT" | "DELETE";
type options = {query?:any, body?:any, headers?:any, method?:Method, baseURL?:string}
export async function fetchAPI(method: Method, url: string, body: any | null) {
  try {
    const res = await fetch(url, fetchOptions(method, body || null));
    return res;
  } catch (error) {
    // Handle permission error Authorization

    // if (error.response._data.error.code == "ERR.TOK0102") {
    //   await refreshToken();
    //   return fetch(url, fetchOptions(method, body)).then((res_1) => res_1);
    // }
    // else if (error.response._data.error.code == "ERR.TOK0101")  {
    //   console.log("logout o fetch custom")
    //   auth_logout()
    // } 

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

// export async function fetchAPI(method,url, body) {
//   try {
//     const res = await fetch(url, fetchOptions(method, body));
//     return res;
//   } catch (error) {
//     console.log("error:", error)
//     if (error.response._data.error.code == "ERR.TOK0102") {
//       await refreshToken();
//       return fetch(url, fetchOptions(method, body)).then((res_1) => res_1);
//     }
//     else if (error.response._data.error.code == "ERR.TOK0101")  {
//       console.log("logout o fetch custom")
//       auth_logout()
//     }
//     throw error;
//   }
// }
// export function fetchOptions(method,body) {
//   const config = useRuntimeConfig();
//   let headers = ''
//   if(auth_store.value.access_token) {
//     headers = {Authorization: `Bearer ${auth_store.value.access_token}` }
//   }
//   return {
//     baseURL: config.public.baseUrl,
//     onRequest({ options }) {
//       options.query = options.query || {};
//     },
//     body,
//     headers,
//     method:method,
//   };
// }

