<script setup lang="ts">
import { getDetailExportRequest } from "@/composables/devices";
import { ArrowRight } from "@element-plus/icons-vue";
import type { DetailRequestExport } from "@/utils/type";
const { $formatTime } = useNuxtApp();

const user = useUserStore();
const route = useRoute();
const { id } = route.params as { id: string };
const detail = ref<DetailRequestExport>({
  trangThai: "",
  chitiet: [],
  maPhieu: "",
  maNguoiTao: "",
  maNguoiDuyet: "",
  maNguoiXacNhan: "",
  ngayTao: "",
  ngayDuyet: "",
  ngayXacNhan: "",
  tenNguoiTao: "",
  tenNguoiDuyet: "",
  tenNguoiXacNhan: "",
  maKhoa: "",
  tenKhoa: ""
});
onMounted(async () => {
    getDetailExportRequest(id).then((res: any) => {
    detail.value = res.data;
  });
});
</script>

<template>
  <div class="bg-white p-[20px] rounded-[12px]">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/import' }"
        >Xử lý cung cấp</el-breadcrumb-item
      >
      <el-breadcrumb-item>Chi tiết phiếu cung cấp</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex justify-between p-5">
      <h3 class="text-xl text-center leading-6 font-semibold text-gray-600">
        Chi tiết phiếu cung cấp
      </h3>
      <div
        v-if="
          user.user?.maChucVu == 'CV00001' &&
          detail.trangThai == 'Chưa duyệt' &&
          !!detail.trangThai
        "
        class="flex items-center space-x-2"
      >
        <el-button
          type="primary"
          plain
          >Duyệt</el-button
        >
        <el-button
          type="danger"
          plain
          >Từ chối</el-button
        >
      </div>
      <div
        v-else-if="
          user.user?.maChucVu == 'CV00004' &&
          detail.trangThai == 'Đã duyệt' &&
          !!detail.trangThai
        "
        class="flex items-center space-x-2"
      >
        <el-button type="primary" plain
          >Xác nhận đã cung cấp</el-button
        >
      </div>
    </div>
    <dl class="sm:divide-y sm:divide-gray-200">
      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
        <dt class="text-base font-medium text-gray-900">Mã phiếu:</dt>
        <div class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
          {{ detail?.maPhieu }}
        </div>
        <dt class="text-base font-medium text-gray-900">Trạng thái:</dt>
        <div class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
          {{ detail?.trangThai }}
        </div>
      </div>
      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
        <dt class="text-base font-medium text-gray-900">Người tạo:</dt>
        <div class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
          {{ detail?.tenNguoiTao }}
        </div>
        <dt class="text-base font-medium text-gray-900">Thời gian tạo:</dt>
        <div class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
          {{ $formatTime(detail?.ngayTao) }}
        </div>
      </div>
      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
        <dt class="text-base font-medium text-gray-900">Khoa:</dt>
        <div class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
          {{ detail?.tenKhoa }}
        </div>
      </div>
      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
        <dt class="text-base font-medium text-gray-900">Người duyệt:</dt>
        <div class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
          {{ detail?.tenNguoiDuyet }}
        </div>
        <dt class="text-base font-medium text-gray-900">Thời gian duyệt:</dt>
        <div class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
          {{ $formatTime(detail?.ngayDuyet) }}
        </div>
      </div>
      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
        <dt class="text-base font-medium text-gray-900">Người xác nhận:</dt>
        <div class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
          {{ detail?.tenNguoiXacNhan }}
        </div>
        <dt class="text-base font-medium text-gray-900">Thời gian xác nhận:</dt>
        <div class="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
          {{ $formatTime(detail?.ngayXacNhan) }}
        </div>
      </div>
    </dl>
    <h3 class="text-xl py-8 text-center leading-6 font-semibold text-gray-600">
      Danh sách thiết bị
    </h3>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-2 py-2 text-center">STT</th>
            <th scope="col" class="px-2 py-2 text-center">Hình ảnh</th>
            <th scope="col" class="px-2 py-2 text-center">Tên thiết bị</th>
            <th scope="col" class="px-2 py-2 text-center">Danh mục</th>
            <th scope="col" class="px-2 py-2 text-center w-[100px]">
              Số lượng yêu cầu
            </th>
            <th scope="col" class="px-2 py-2 text-center w-[100px]">
              Số lượng duyệt
            </th>
            <th scope="col" class="px-2 py-2 text-center">Lý do</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in detail.chitiet"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td class="px-1 py-4 text-center text-gray-900">{{ index + 1 }}</td>
            <td class="px-1 py-4 flex justify-center text-gray-900">
              <img :src="item.hinhAnh" alt="" class="w-[100px] h-[100px]" />
            </td>

            <th
              scope="row"
              class="px-1 py-4 text-center text-gray-900 font-medium whitespace-nowrap dark:text-white"
            >
              {{ item.tenTB }}
            </th>
            <td class="px-1 py-4 text-center text-gray-900">
              {{ item.tenDM }}
            </td>
            <td class="px-1 py-4 text-center text-gray-900">
              {{ item.soLuongYeuCau }}
            </td>
            <td class="px-1 py-4 text-center text-gray-900">
              <input
                class="flex p-[4px] border-[1px] border-gray-200 w-[100px] outline-none"
                v-model="item.soLuongDuyet"
                type="number"
                min="0"
                :max="Number(item.soLuongYeuCau)"
                :readonly="
                  !(
                    user.user?.maChucVu === 'CV00001' &&
                    detail.trangThai == 'Chưa duyệt'
                  )
                "
              />
            </td>
            <td class="px-2 py-4 text-gray-900 text-center">{{ item.lyDo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
