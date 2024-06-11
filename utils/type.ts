export interface device {
    "maTB": string,
    "tenTB": string,
    "soLuong": number,
    "xuatXu": string,
    "hinhAnh": string,
    "nhaCungCap": string,
    "maDM": string,
    "danhmuc": {
        "maDM": string,
        "tenDM": string,
        "moTa": string,
    }
}

export interface category {
    "maDM": string,
    "tenDM": string,
    "moTa": string,
}
type statusUser = 1 | 0;
export interface User {
    "maNguoiDung": string | null,
    "tenNguoiDung": string,
    "email": string,
    "ngaySinh": string,
    "CCCD": string,
    "diaChi": string,
    "trangThai": statusUser,
    "maChucVu": string,
    "maKhoa": string | null,
    "tenChucVu": string | null
}