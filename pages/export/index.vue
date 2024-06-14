<script setup lang="ts">
import {
  getExportRequest
} from "@/composables/devices";
const { $formatTime } = useNuxtApp();
import { ArrowRight } from "@element-plus/icons-vue";
type status = "Chưa duyệt" | "Từ chối" | "Đã duyệt" | "Đã xác nhận";
const user = useUserStore()
const request = ref([]);
const currentPage = ref(1);
const currentStatus = ref<status>("Chưa duyệt");
const statusList: status[] = [
  "Chưa duyệt",
  "Từ chối",
  "Đã duyệt",
  "Đã xác nhận",
];
onMounted(async () => {
  getExportRequest().then((res: any) => {
    request.value = res.data;
  });
});
const filterDataSearch = computed(() => {
  if (currentStatus.value) {
    return request.value.filter((request: any) =>
      request.trangThai.includes(currentStatus.value.trim())
    );
  }
  return request.value;
});

const filterData = computed(() => {
  const filteredData = filterDataSearch.value;
  return filteredData.slice(
    (currentPage.value - 1) * 10,
    currentPage.value * 10
  );
});
function handleCurrentChange(val: number) {
  currentPage.value = val;
}
function goToDetail(value: any) {
  console.log(value);
}
</script>

<template>
  <div :class="$style.manageDevices">
    <el-breadcrumb :separator-icon="ArrowRight" class="py-4">
      <el-breadcrumb-item :to="{ path: '/' }"
        >Xử lý cung cấp</el-breadcrumb-item
      >
      <el-breadcrumb-item>Xem danh sách</el-breadcrumb-item>
    </el-breadcrumb>
    <div :class="$style.manageDevicesHeader">
      <div :class="$style.filterBar">
        <div
          v-for="item in statusList"
          :class="[
            $style.itemStatus,
            currentStatus == item && $style.itemStatusActive,
          ]"
        >
          <span @click="currentStatus = item">{{ item }}</span>
        </div>
      </div>
      <div :class="$style.searchBar">
        <NuxtLink
          v-if="user.user?.maChucVu === 'CV00003'"
          to="/export/create"
        >
          <el-button type="primary">Tạo phiếu nhập</el-button>
        </NuxtLink>
      </div>
    </div>
    <el-table
      :data="filterData"
      style="width: 100%; height: calc(100% - 100px)"
      :class="$style.table"
    >
      <el-table-column label="STT" width="60px" align="center">
        <template #default="scope">
          <span>{{ (currentPage - 1) * 10 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Mã phiếu">
        <template #default="scope">
          <img :src="scope.row.hinhAnh" alt="" :class="$style.imageTable" />
        </template>
      </el-table-column> -->
      <el-table-column prop="maPhieu" label="Mã phiếu" />
      <el-table-column prop="tenNguoiTao" label="Người tạo" />
      <el-table-column prop="tenKhoa" label="Khoa" />
      <el-table-column prop="ngayTao" label="Ngày tạo">
        <template #default="scope">
          <span>
            {{ $formatTime(scope.row.ngayTao) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="trangThai" label="Trạng thái" />
      <el-table-column label="Hành động">
        <template #default="scope">
          <NuxtLink
            :class="$style.cellSpan"
            :to="`/export/${scope.row.maPhieu}`"
          >
            Xem chi tiết
          </NuxtLink>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="10"
      :total="filterDataSearch.length"
      :class="$style.pagination"
    />
  </div>
</template>

<style module lang="scss">
.manageDevices {
  height: 100%;
}
.manageDevicesHeader {
  display: flex;
  padding-bottom: 12px;
  gap: 20px;
  justify-content: space-between;
}
.searchBar {
  display: flex;
  // flex-direction:
  gap: 20px;
}
.titlePage {
  @include text-style(20px, 600, 30px, var(--color-gray-dark));
  padding: 12px 0;
  text-align: center;
}
.filterBar {
  display: flex;
  background-color: white;
  border-radius: 8px;
}
.itemStatus {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  @include text-style(14px, 400, 20px, var(--color-gray-dark));
  &.itemStatusActive {
    background-color: var(--color-primary);
    color: white;
    border-radius: 8px;
  }
}
.table {
  padding: 12px 0;
  border-radius: 12px;
}
.imageTable {
  width: 100px;
  height: 100px;
}
.cellSpan {
  @include truncate(1);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.pagination {
  padding-top: 10px;
  justify-content: center;
}
</style>
