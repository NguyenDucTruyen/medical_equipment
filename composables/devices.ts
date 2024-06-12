
const getDevices = async () => {
    const response = await fetchAPI("GET", `/devices`, null);
    return response;
};

const getCategories = async () => {
    const res = await fetchAPI("GET", '/category', null)
    return res
}

const getImportRequest = async () => {
    const res = await fetchAPI("GET", '/devices/import', null)
    return res
}

const getDetailImportRequest = async (id: string) => {
    const res = await fetchAPI("GET", `/devices/import/${ id }`, null)
    return res
}

const createImportRequest = async (data: any) => {
    const res = await fetchAPI("POST", '/devices/import/create', data)
    return res
}

const approveImportRequest = async (data: any) => {
    const res = await fetchAPI("PUT", `/devices/import/approve`, data)
    return res
}
const confirmImported = async (data: any) => {
    const res = await fetchAPI("PUT", `/devices/import/confirm`, data)
    return res
}
export {
    getDevices,
    getCategories,
    getImportRequest,
    getDetailImportRequest,
    createImportRequest,
    approveImportRequest,
    confirmImported
};
