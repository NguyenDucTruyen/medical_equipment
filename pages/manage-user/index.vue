<script setup lang="ts">
import { getDevices, getCategories } from "@/composables/devices";
import type { device, category } from "@/utils/type";
import { getAllUser } from "@/composables/auth";
import { ArrowRight } from "@element-plus/icons-vue";
const users = ref([]);
// const user = useUserStore()
const currentPage = ref(1);
const currentChucVu = ref("");
const listChucVu = ref<{
  maChucVu: string;
  tenChucVu: string;
}[]>();
const searchValue = ref("");
onMounted(async () => {
  getAllUser().then((res: any) => {
    users.value = res.data;
    listChucVu.value = res.chuc;
  });
});
const filterDataSearch = computed(() => {
  if (searchValue.value || currentChucVu.value) {
    return users.value.filter(
      (user: any) =>
        user.tenNguoiDung
          .toLowerCase()
          .includes(searchValue.value.trim().toLowerCase()) &&
        (currentChucVu.value ? user.maChucVu === currentChucVu.value : true)
    );
  }
  return users.value;
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
function log(value: any) {
  console.log(value);
}
</script>

<template>
  <div :class="$style.manageDevices">
    <el-breadcrumb :separator-icon="ArrowRight" class="pt-4 pb-2">
      <el-breadcrumb-item :to="{ path: '/' }"
        >Người dùng</el-breadcrumb-item
      >
      <el-breadcrumb-item>Xem danh sách</el-breadcrumb-item>
    </el-breadcrumb>
    <div :class="$style.manageDevicesHeader">
      <div :class="$style.searchBar">
        <el-input
          v-model="searchValue"
          style="max-width: 400px; height: 40px"
          placeholder="Nhập tên người dùng"
          class="input-with-select"
        >
          <template #prepend>
            <Icon
              icon="ic:sharp-search"
              width="20px"
              height="20px"
              style="color: #9b9da1"
            />
          </template>
          <template v-if="searchValue.trim()" #append>
            <Icon
              icon="material-symbols:close"
              width="20px"
              height="20px"
              style="color: #9b9da1"
              @click="searchValue = ''"
              :style="{ cursor: 'pointer' }"
            />
          </template>
        </el-input>
        <el-select
          v-model="currentChucVu"
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
      <el-button type="primary" >Thêm người dùng</el-button>
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
      <el-table-column prop="maNguoiDung" label="Mã người dùng" />
      <el-table-column prop="tenNguoiDung" label="Tên nguời dùng" />
      <el-table-column prop="tenChucVu" label="Tên chức vụ" />
      <el-table-column prop="tenKhoa" label="Khoa" />
      <el-table-column prop="danhmuc" label="Trạng thái">
        <template #default="scope">
          <el-switch v-model="scope.row.trangThai" />
        </template>
      </el-table-column>
      <el-table-column prop="danhmuc" label="Hành động">
        <template #default="scope">
          <NuxtLink :to="`/manage-user/${scope.row.maNguoiDung}`">Xem thông tin</NuxtLink>
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
  padding: 12px 0;
  justify-content: space-between;
}
.searchBar {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 600px;
}
.titlePage {
  @include text-style(20px, 600, 30px, var(--color-gray-dark));
  padding: 12px 0;
  text-align: center;
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
}
.pagination {
  padding-top: 10px;
  justify-content: center;
}
</style>
