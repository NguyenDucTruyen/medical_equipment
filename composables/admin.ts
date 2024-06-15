const adminGetKhoa = async ()=> {
    return await fetchAPI("GET", '/admin/khoa', null)
}
const adminGetChucvu = async ()=> {
    return await fetchAPI("GET", '/admin/chucvu', null)
}

export {adminGetKhoa, adminGetChucvu}