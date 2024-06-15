<script setup lang="ts">
import {
  getDevices,
  getCategories,
  createImportRequest,
} from "@/composables/devices";
import type { device, category } from "@/utils/type";
const { $handleErrorApi } = useNuxtApp();
const user = useUserStore();
const devices = ref([]);
const currentPage = ref(1);
const searchValue = ref("");
const category = ref("");
const categoryList = ref<category[]>([]);
const listDevices = ref<device[]>([]);
onMounted(async () => {
  getDevices().then((res: any) => {
    devices.value = res.data;
  });
  getCategories().then((res: any) => {
    categoryList.value = res.data;
  });
});
const filterDataSearch = computed(() => {
  if (searchValue.value || category.value) {
    return devices.value.filter(
      (device: device) =>
        device.tenTB
          .toLowerCase()
          .includes(searchValue.value.trim().toLowerCase()) &&
        (category.value ? device.danhmuc.maDM === category.value : true)
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
function addDevice(device: device) {
  const index = listDevices.value.findIndex(
    (item) => item.maTB === device.maTB
  );
  if (index === -1) {
    listDevices.value.push({
      ...device,
      soLuongYeuCau: 1,
      lyDo: "",
    });
  } else {
    listDevices.value[index].soLuongYeuCau++;
  }
  ElNotification.success({
    title: "Đã thêm thiết bị",
    position: "bottom-right",
    duration: 1000,
  });
}
function removeDevice(index: number) {
  listDevices.value.splice(index, 1);
  ElNotification.warning({
    title: "Đã xóa thiết bị",
    position: "bottom-right",
    duration: 1000,
  });
}
function create() {
  if (!listDevices.value.length) {
    ElNotification.error({
      title: "Lỗi",
      message: "Chưa chọn thiết bị",
      offset: 10,
    });
    return;
  }
  ElMessageBox.confirm(`Xác nhận tạo phiếu nhập?`, "Xác nhận", {
    confirmButtonText: "Đồng ý",
    cancelButtonText: "Hủy",
    type: "info",
  })
    .then(() => {
      const body = {
        maNguoiTao: JSON.parse(localStorage.getItem("maNguoiDung") || ""),
        phieu: listDevices.value,
      };
      createImportRequest(body).then((res: any) => {
        ElNotification.success({
          title: "Thành công",
          message: res.message,
          offset: 10,
        });
        listDevices.value = [];
      });
    })
    .catch((err) => {
      $handleErrorApi(err, ({ message }: any) => {
        ElNotification.error({
          title: "Lỗi",
          message: "Tạo phiếu thất bại",
          offset: 10,
          duration: 1000,
        });
      });
    });
}
</script>

<template>
  <div :class="$style.manageDevices">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/import' }"
        >Xử lý nhập</el-breadcrumb-item
      >
      <el-breadcrumb-item>Tạo phiếu nhập</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="relative">
      <h3
        class="text-xl pt-8 pb-4 text-center leading-6 font-semibold text-gray-600"
      >
        Thông tin phiếu nhập
      </h3>
      <el-button type="primary" @click="create" class="absolute top-8 right-8"
        >Tạo phiếu</el-button
      >
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
              <th scope="col" class="px-2 py-2 text-center w-[120px]">
                Danh mục
              </th>
              <th scope="col" class="px-2 py-2 text-center w-[100px]">
                Số lượng yêu cầu
              </th>
              <th scope="col" class="px-2 py-2 text-center">Lý do</th>
              <th scope="col" class="px-2 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody v-if="listDevices.length">
            <tr
              v-for="(item, index) in listDevices"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td class="px-1 py-4 text-center text-gray-900">
                {{ index + 1 }}
              </td>
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
                <span :class="$style.tableSpan">{{ item.danhmuc.tenDM }}</span>
              </td>
              <td class="px-1 py-4 text-center text-gray-900">
                <input
                  class="flex p-[4px] border-[1px] border-gray-200 w-[100px] outline-none"
                  v-model="item.soLuongYeuCau"
                  type="number"
                  min="1"
                  :readonly="!(user.user?.maChucVu === 'CV00003')"
                />
              </td>
              <td class="px-2 py-4 text-gray-900 text-center">
                <el-input v-model="item.lyDo" placeholder="Nhập lý do" />
              </td>
              <td class="px-2 py-4 text-gray-900 text-center">
                <el-button type="danger" plain @click="removeDevice(index)">
                  Xóa
                </el-button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td
                class="px-2 py-4 text-center text-gray-900 dark:text-gray-400"
                colspan="7"
              >
                Phiếu nhập chưa có thiết bị nào
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div :class="$style.manageDevicesHeader">
      <h3
        class="text-xl pt-8 pb-4 text-center leading-6 font-semibold text-gray-600"
      >
        Danh sách thiết bị
      </h3>
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
      </div>
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
      <el-table-column label="Hình ảnh">
        <template #default="scope">
          <img :src="scope.row.hinhAnh" alt="" :class="$style.imageTable" />
        </template>
      </el-table-column>
      <el-table-column prop="tenTB" label="Tên thiết bị" />
      <el-table-column prop="soLuong" label="Số lượng còn" />
      <el-table-column prop="danhmuc" label="Danh mục">
        <template #default="scope">
          <span :class="$style.cellSpan" @click="log(scope.row.danhmuc)">{{
            scope.row.danhmuc.tenDM
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Hành động">
        <template #default="scope">
          <el-button
            type="primary"
            plain
            :class="$style.cellSpan"
            @click="addDevice(scope.row)"
          >
            Thêm
          </el-button>
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
  flex-direction: column;
}
.searchBar {
  width: 100%;
  gap: 20px;
  display: flex;
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

.tableSpan {
  @include truncate(1);
}
</style>
