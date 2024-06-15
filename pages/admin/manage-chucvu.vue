<script setup lang="ts">
import { adminGetChucvu } from "@/composables/admin";
import { ArrowRight } from "@element-plus/icons-vue";
const listChucVu = ref([]);
// const user = useUserStore()
const currentPage = ref(1);
const searchValue = ref("");
onMounted(async () => {
    adminGetChucvu().then((res: any) => {
    listChucVu.value = res.data;
  });
});
const filterDataSearch = computed(() => {
  if (searchValue.value ) {
    return listChucVu.value.filter(
      (item: any) =>
        item.tenChucVu
          .toLowerCase()
          .includes(searchValue.value.trim().toLowerCase())
    );
  }
  return listChucVu.value;
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
      <el-breadcrumb-item :to="{ path: '/admin/manage-user' }"
        >Quản trị hệ thống</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/admin/manage-user' }"
        >Chức vụ</el-breadcrumb-item
      >
      <el-breadcrumb-item>Xem danh sách</el-breadcrumb-item>
    </el-breadcrumb>
    <div :class="$style.manageDevicesHeader">
      <div :class="$style.searchBar">
        <el-input
          v-model="searchValue"
          style="max-width: 400px; height: 40px"
          placeholder="Nhập tên chức vụ"
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
        
      </div>
      <el-button type="primary" >Thêm chức vụ</el-button>
    </div>
    <el-table
      :data="filterData"
      style="width: 100%; height: calc(100% - 140px)"
      :class="$style.table"
    >
      <el-table-column label="STT" width="60px" align="center">
        <template #default="scope">
          <span>{{ (currentPage - 1) * 10 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="maChucVu" label="Mã chức vụ" />
      <el-table-column prop="tenChucVu" label="Tên chức vụ" />
      <el-table-column prop="danhmuc" label="Hành động">
        <template #default="scope">
          <span>Chỉnh sửa</span>
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
  padding: 10px 0;
  justify-content: center;
}
</style>
