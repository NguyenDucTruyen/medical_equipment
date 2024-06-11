<script setup lang="ts">
import type { User } from "@/utils/type";
import { ElNotification } from "element-plus";
import viLocale from "element-plus/es/locale/lang/vi";

const { $handleErrorApi, $timeConvert } = useNuxtApp();
const user = ref<User>();
const userCache = ref({
  diaChi: "",
  email: "",
  ngaySinh: "",
  CCCD: "",
  tenChucVu: "",
  tenNguoiDung: "",
  maKhoa: "",
  khoa: {
    tenKhoa: "",
  },
});
const editable = ref(false);
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
const ngay = ref("");
onMounted(() => {
  fetchUserInfo();
});
function fetchUserInfo() {
  const maNguoiDung = JSON.parse(localStorage.getItem("maNguoiDung") || "");
  getInfoUser(maNguoiDung)
    .then((res: any) => {
      user.value = res.data;
      userCache.value = res.data;
      userCache.value.ngaySinh = $timeConvert(userCache.value.ngaySinh);
    })
    .catch((err) => {
      const message = err.response?._data?.message ?? "Có lỗi xảy ra";
      ElNotification.error({
        title: "Thất bại",
        message: message,
        offset: 10,
      });
      localStorage.removeItem("maNguoiDung");
      navigateTo("/login");
    });
}
function UpdateInfo() {
  const data = {
    diaChi: userCache.value.diaChi,
    email: userCache.value.email,
    ngaySinh: userCache.value.ngaySinh,
    CCCD: userCache.value.CCCD,
  };
  const maNguoiDung = JSON.parse(localStorage.getItem("maNguoiDung") || "");
  updateInfoUser(maNguoiDung, data)
    .then((res: any) => {
      ElNotification.success({
        title: "Thành công",
        message: "Cập nhật thông tin thành công",
        offset: 10,
      });
      fetchUserInfo()
    })
    .catch((err) => {
      const message = err.response?._data?.message ?? "Có lỗi xảy ra";
      ElNotification.error({
        title: "Thất bại",
        message: message,
        offset: 10,
      });
    });
}
</script>
<template>
  <div class="bg-white overflow-hidiven shadow rounded-lg border">
    <div class="flex justify-between items-center px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-500">
        Thông tin tài khoản
      </h3>
      <el-button type="primary" plain @click="UpdateInfo"
        >Cập nhật thông tin</el-button
      >
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Họ và tên</dt>
          <div class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
            {{ userCache.tenNguoiDung }}
          </div>
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Chức vụ</dt>
          <div class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
            {{ userCache.tenChucVu }}
          </div>
        </div>
        <div
          v-if="userCache.maKhoa"
          class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">Khoa</dt>
          <div class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
            {{ userCache.khoa.tenKhoa }}
          </div>
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Căn cước công dân</dt>
          <input
            v-model="userCache.CCCD"
            class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 outline-none"
          />
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Ngày sinh</dt>
          <!-- <div class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
            {{ userCache.ngaySinh }}
          </div> -->
          <el-config-provider :locale="viLocale">
            <el-date-picker
              v-model="userCache.ngaySinh"
              type="date"
              placeholder="Chọn ngày sinh"
              format="DD/MM/YYYY"
              value-format="YYYY-MM-DD"
            />
          </el-config-provider>
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Email</dt>
          <input
            v-model="userCache.email"
            class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 outline-none"
          />
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Địa chỉ</dt>
          <input
            v-model="userCache.diaChi"
            class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 outline-none"
          />
        </div>
      </dl>
    </div>
  </div>
</template>
