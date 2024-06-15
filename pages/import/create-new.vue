<script setup lang="ts">
import {
  getDevices,
  getCategories,
  createImportRequest,
  uploadFile,
} from "@/composables/devices";
import type { deviceNew, category } from "@/utils/type";
import { ArrowRight } from "@element-plus/icons-vue";
const router = useRouter();
const { $handleErrorApi } = useNuxtApp();
const user = useUserStore();
const category = ref("");
const categoryList = ref<category[]>([]);
const listImage = ref<any>([]);
const listDevices = ref<deviceNew[]>([
  {
    maTB: "",
    tenTB: "",
    hinhAnh: "",
    soLuongYeuCau: 1,
    maDM: "",
    xuatXu: "",
    nhaCungCap: "",
    danhmuc: {
      maDM: "",
      tenDM: "",
      moTa: "",
    },
  },
]);

onMounted(async () => {
  getCategories().then((res: any) => {
    categoryList.value = res.data;
  });
});
function removeDevice(index: number) {
  listDevices.value.splice(index, 1);
  ElNotification.warning({
    title: "Đã xóa thiết bị",
    position: "bottom-right",
    duration: 1000,
  });
}
function create() {
  const listThietBi = listDevices.value.filter(
    (item, index) =>
      item.maDM &&
      item.soLuongYeuCau > 0 &&
      listShowImage.value[index] &&
      item.tenTB
  );

  if (!listThietBi.length) {
    ElNotification.error({
      title: "Lỗi",
      message: "Chưa thêm thiết bị",
      offset: 10,
    });
    return;
  }
  ElMessageBox.confirm(`Xác nhận tạo phiếu nhập?`, "Xác nhận", {
    confirmButtonText: "Đồng ý",
    cancelButtonText: "Hủy",
    type: "info",
  })
    .then(async () => {
      const bodyParse = listThietBi.map((item) => {
        return {
          tenTB: item.tenTB,
          hinhAnh: "",
          soLuongYeuCau: item.soLuongYeuCau,
          maDM: item.maDM,
          xuatXu: item.xuatXu,
          nhaCungCap: item.nhaCungCap,
        };
      });
      await Promise.all(
        listImage.value.map(async (element: any, index: number) => {
          const formData = new FormData();
          if (element) {
            formData.append("image", element);
            await uploadFile(formData).then((res: any) => {
              bodyParse[index].hinhAnh = res.data.url;
            });
          }
        })
      );
      const body = {
        maNguoiTao: JSON.parse(localStorage.getItem("maNguoiDung") || ""),
        phieu: bodyParse,
      };
      console.log("body:", body);
      await submitCreateRequest(body);
    })
    .catch((err) => {
      console.log(err);
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
function submitCreateRequest(raw: any) {
  createImportRequestNew(raw).then((res: any) => {
    ElNotification.success({
      title: "Thành công",
      message: res.message,
      offset: 10,
    });
  });
}
const listShowImage = ref<any>([]);
function getFile(event: any, index: number) {
  const file = event.target.files[0];
  listImage.value[index] = file;
  const reader = new FileReader();
  // console.log(files[0])
  reader.readAsDataURL(file);
  reader.addEventListener("load", (e) => {
    listShowImage.value[index] = e.target?.result;
  });
}
function addDevice() {
  listDevices.value.push({
    maTB: "",
    tenTB: "",
    hinhAnh: "",
    soLuongYeuCau: 1,
    maDM: "",
    xuatXu: "",
    nhaCungCap: "",
    danhmuc: {
      maDM: "",
      tenDM: "",
      moTa: "",
    },
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
        Thông tin phiếu nhập thiết bị mới
      </h3>
      <el-button type="primary" @click="create" class="absolute top-8 right-8"
        >Tạo phiếu</el-button
      >
      <el-button type="primary" @click="addDevice" class="absolute top-8 left-8"
        >Thêm thiết bị</el-button
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
              <th scope="col" class="px-2 py-2 text-center">Danh mục</th>
              <th scope="col" class="px-2 py-2 text-center">Xuất xứ</th>
              <th scope="col" class="px-2 py-2 text-center">Nhà cung cấp</th>
              <th scope="col" class="px-2 py-2 text-center">
                Số lượng yêu cầu
              </th>
              <th scope="col" class="px-2 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in listDevices"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td class="px-1 py-4 text-center text-gray-900">
                {{ index + 1 }}
              </td>
              <td class="px-1 py-4 min-w-[100px] flex flex-col justify-center text-gray-900">
                <img
                v-show="listShowImage[index]"
                  :src="listShowImage[index]"
                  alt=""
                  class="w-[100px] h-[100px] object-contain"
                />
                <label
                  :for="`file${index}`"
                  class="flex align-middle cursor-pointer p-2 rounded-[8px]"
                  style="
                    height: 28px;
                    background-color: var(--color-primary);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    color: #fff;
                    margin-top: 8px;
                  "
                >
                  Chọn ảnh
                </label>
                <input
                  :id="`file${index}`"
                  type="file"
                  @input="getFile($event, index)"
                  accept="image/png, image/gif, image/jpeg"
                  class="hidden"
                />
              </td>

              <th
                scope="row"
                class="px-1 py-4 text-center text-gray-900 font-medium whitespace-nowrap dark:text-white"
              >
                <el-input
                  v-model="item.tenTB"
                  placeholder="Nhập tên thiết bị"
                />
              </th>
              <td class="px-1 py-4 text-center text-gray-900">
                <el-select
                  v-model="item.maDM"
                  clearable
                  placeholder="Chọn 1 danh mục"
                  style="width: 240px; height: 40px"
                >
                  <el-option
                    v-for="item in categoryList"
                    :key="item.maDM"
                    :label="item.tenDM"
                    :value="item.maDM"
                  />
                </el-select>
              </td>

              <td class="px-1 py-4 text-center text-gray-900">
                <el-input v-model="item.xuatXu" placeholder="Xuất xứ" />
              </td>
              <td class="px-1 py-4 text-center text-gray-900">
                <el-input
                  v-model="item.nhaCungCap"
                  placeholder="Nhà cung cấp"
                />
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
                <el-button type="danger" plain @click="removeDevice(index)">
                  Xóa
                </el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
{ maTB: "", tenTB: "", hinhAnh: "", soLuongYeuCau: 1, maDM: "", xuatXu: "",
nhaCungCap: "", danhmuc: { maDM: "", tenDM: "", moTa: "", }, soLuong: 0 }{ maDM:
"", tenDM: "", moTa: "" }
