const apiLogin = async (username:string, password:string) => {
    return await fetchAPI("POST", "/auth/login", { username, password });
}

const getInfoUser = async (idUser: string) => {
    return await fetchAPI("GET", `/auth/user/${ idUser }`,null);
}

const updateInfoUser = async (idUser: string, data: any) => {
    return await fetchAPI("PUT", `/auth/user/${ idUser }`, data);
}

const getAllUser = async () => {
    return await fetchAPI("GET", `/auth/user`, null);
}   
export { apiLogin, getInfoUser, updateInfoUser, getAllUser};