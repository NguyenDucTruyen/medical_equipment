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

export interface DetailRequest {
    maPhieu: string;
    maNguoiTao: string;
    maNguoiDuyet: string;
    maNguoiXacNhan: string;
    ngayTao: string;
    ngayDuyet: string;
    ngayXacNhan: string;
    trangThai: string;
    tenNguoiTao: string;
    tenNguoiDuyet: string;
    tenNguoiXacNhan: string;
    chitiet: {
        maPhieu: string;
        maTB: string;
        soLuongYeuCau: number;
        soLuongDuyet: number;
        lyDo: string;
        tenTB: string;
        hinhAnh: string;
        maDM: string;
        tenDM: string;
    }[];
}

export interface DetailRequestExport {
    maPhieu: string;
    maNguoiTao: string;
    maNguoiDuyet: string;
    maNguoiXacNhan: string;
    ngayTao: string;
    ngayDuyet: string;
    ngayXacNhan: string;
    trangThai: string;
    tenNguoiTao: string;
    tenNguoiDuyet: string;
    tenNguoiXacNhan: string;
    maKhoa: string;
    tenKhoa: string;
    chitiet: {
        maPhieu: string;
        maTB: string;
        soLuongYeuCau: number;
        soLuongDuyet: number;
        lyDo: string;
        tenTB: string;
        hinhAnh: string;
        maDM: string;
        tenDM: string;
    }[];
}
export interface khoaDevices {
    "maTB": string,
    "hinhAnh": string,
    "tenTB": string,
    "tenDM": string,
    "maDM": string,
    "tenKhoa": string,
    "soLuong": number,
    "maKhoa": string
}
export interface khoa {
    "maKhoa": string,
    "tenKhoa": string,
    "moTa": string,
}