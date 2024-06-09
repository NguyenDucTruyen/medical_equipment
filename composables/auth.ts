const apiLogin = async (username:string, password:string) => {
    return await fetchAPI("POST", "/auth/login", { username, password });
}

const getInfoUser = async (idUser: string) => {
    return await fetchAPI("GET", `/auth/user/${ idUser }`,null);
}
export { apiLogin, getInfoUser };