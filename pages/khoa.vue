<script setup lang="ts">
import { getAllDevicesExported, getCategories } from "@/composables/devices";
import type { khoaDevices, category, khoa } from "@/utils/type";
import { ArrowRight } from "@element-plus/icons-vue";
// const user = useUserStore()
const devices = ref([]);
const currentPage = ref(1);
const searchValue = ref("");
const category = ref("");
const categoryList = ref<category[]>([]);
const khoaList = ref<khoa[]>([]);
const khoa = ref("");
onMounted(async () => {
  getAllDevicesExported().then((res: any) => {
    devices.value = res.data;
    khoaList.value = res.khoa;
  });
  getCategories().then((res: any) => {
    categoryList.value = res.data;
  });
});
const filterDataSearch = computed(() => {
  if (searchValue.value || category.value || khoa.value) {
    console.log(category.value);
    return devices.value.filter(
      (device: khoaDevices) =>
        device.tenTB
          .toLowerCase()
          .includes(searchValue.value.trim().toLowerCase()) &&
        (category.value ? device.maDM === category.value : true) &&
        (khoa.value ? device.maKhoa === khoa.value : true)
    );
  }
  return devices.value;
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
        >Thiết bị y tế tại các khoa</el-breadcrumb-item
      >
      <el-breadcrumb-item>Xem danh sách</el-breadcrumb-item>
    </el-breadcrumb>
    <div :class="$style.manageDevicesHeader">
      <div :class="$style.searchBar">
        <el-input
          v-model="searchValue"
          style="max-width: 400px; height: 40px"
          placeholder="Nhập tên thiết bị"
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
      <el-select
        v-model="category"
        clearable
        placeholder="Tất cả danh mục"
        style="width: 240px; height: 40px"
      >
        <el-option
          v-for="item in categoryList"
          :key="item.maDM"
          :label="item.tenDM"
          :value="item.maDM"
        />
      </el-select>
      <el-select
        v-model="khoa"
        clearable
        placeholder="Tất cả khoa"
        style="width: 240px; height: 40px"
      >
        <el-option
          v-for="item in khoaList"
          :key="item.maKhoa"
          :label="item.tenKhoa"
          :value="item.maKhoa"
        />
      </el-select>
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
      <el-table-column label="Hình ảnh">
        <template #default="scope">
          <img :src="scope.row.hinhAnh" alt="" :class="$style.imageTable" />
        </template>
      </el-table-column>
      <el-table-column prop="tenTB" label="Tên thiết bị" />
      <el-table-column prop="tenKhoa" label="Khoa" />
      <el-table-column prop="soLuong" label="Số Lượng" />
      <el-table-column prop="danhmuc" label="Danh mục">
        <template #default="scope">
          <span :class="$style.cellSpan">{{ scope.row.tenDM }}</span>
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
  gap: 20px;
}
.searchBar {
  width: 320px;
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
