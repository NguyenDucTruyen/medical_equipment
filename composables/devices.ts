
const getDevices = async () => {
    const response = await fetchAPI("GET", `/devices`, null);
    return response;
};

const getCategories = async () => {
    const res = await fetchAPI("GET", 'category', null)
    return res
}

export { getDevices, getCategories };
