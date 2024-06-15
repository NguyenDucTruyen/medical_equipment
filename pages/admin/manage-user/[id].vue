<script setup lang="ts">
import type { User } from "@/utils/type";
import { ElNotification } from "element-plus";
import viLocale from "element-plus/es/locale/lang/vi";
import { ArrowRight } from "@element-plus/icons-vue";
const { $handleErrorApi, $timeConvert } = useNuxtApp();
const route = useRoute();
const user = ref<User>();
const userCache = ref({
  diaChi: "",
  email: "",
  ngaySinh: "",
  CCCD: "",
  tenChucVu: "",
  tenNguoiDung: "",
  maKhoa: "",
  maNguoiDung: "",
  khoa: {
    tenKhoa: "",
  },
});
const maNguoiDung = route.params.id;
const editable = ref(false);
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
const ngay = ref("");
onMounted(() => {
  fetchUserInfo();
});
function fetchUserInfo() {
  getInfoUser(maNguoiDung as string)
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
function resetPassword() {
  ElNotification.success({
    title: "Thành công",
    message: "Đặt lại mật khẩu thành công",
    offset: 10,
  });
}
const listChucVu = ref([
  {
    maChucVu: "CV00000",
    tenChucVu: "Quản trị viên",
  },
  {
    maChucVu: "CV00001",
    tenChucVu: "Giám đốc bệnh viện",
  },
  {
    maChucVu: "CV00002",
    tenChucVu: "Trưởng khoa",
  },
  {
    maChucVu: "CV00003",
    tenChucVu: "Trưởng kho",
  },
  {
    maChucVu: "CV00004",
    tenChucVu: "Nhân viên kho",
  },
]);
</script>
<template>
  <div class="bg-white overflow-hidiven shadow rounded-lg border">
    <el-breadcrumb :separator-icon="ArrowRight" class="pt-6 pl-6">
      <el-breadcrumb-item :to="{ path: '/admin/manage-user' }"
        >Người dùng</el-breadcrumb-item
      >
      <el-breadcrumb-item>Thông tin người dùng</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex justify-between items-center px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-500">
        Thông tin người dùng
      </h3>
      <el-button type="primary" plain @click="resetPassword"
        >Đặt lại mật khẩu</el-button
      >
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Mã người dùng</dt>
          <div class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
            {{ userCache.maNguoiDung }}
          </div>
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Họ và tên</dt>
          <div class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
            {{ userCache.tenNguoiDung }}
          </div>
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Chức vụ</dt>
          <el-select
            v-model="userCache.tenChucVu"
            clearable
            placeholder="Tất cả chức vụ"
            style="width: 240px; height: 40px"
          >
            <el-option
              v-for="item in listChucVu"
              :key="item.maChucVu"
              :label="item.tenChucVu"
              :value="item.maChucVu"
            />
          </el-select>
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
          <span
            class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2 outline-none"
            >{{ userCache.CCCD }}</span
          >
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
              readonly
            />
          </el-config-provider>
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Email</dt>
          <span
            class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2 outline-none"
            >{{ userCache.email }}</span
          >
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Địa chỉ</dt>
          <span
            class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2 outline-none"
            >{{ userCache.diaChi }}</span
          >
        </div>
      </dl>
    </div>
  </div>
</template>
