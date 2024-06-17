<script setup lang="ts">
import { useRoute } from "vue-router";
const user = useUserStore();
defineProps<{
  isExpand: boolean;
}>();

const route = useRoute();

const menuList = [
  // {
  //   id: 1,
  //   icon: "https://static.vecteezy.com/system/resources/previews/020/911/731/non_2x/profile-icon-avatar-icon-user-icon-person-icon-free-png.png",
  //   title: "Người dùng",
  //   path: "/manage-user",
  //   name: "manage-user",
  //   hide: user.user?.maChucVu !== "CV00000",
  // },
  {
    id: 2,
    icon: "https://png.pngtree.com/png-clipart/20230504/original/pngtree-checklist-line-icon-png-image_9137991.png",
    title: "Thiết bị y tế tại kho",
    path: "/",
    name: "index",
  },
  {
    id: 4,
    icon: "https://png.pngtree.com/png-clipart/20230504/original/pngtree-workflow-line-icon-png-image_9139036.png",
    title: "Thiết bị y tế tại khoa",
    path: "/khoa",
    name: "khoa",
  },
  {
    id: 3,
    icon: "https://png.pngtree.com/png-clipart/20230314/original/pngtree-import-vector-icon-design-illustration-png-image_8987861.png",
    title: "Phiếu yêu cầu nhập",
    path: "/import",
    name: "import",
  },
  {
    id: 5,
    icon: "https://png.pngtree.com/png-clipart/20230314/original/pngtree-export-vector-icon-design-illustration-png-image_8987859.png",
    title: "Phiếu yêu cầu cung cấp",
    path: "/export",
    name: "export",
  },
];
function checkPath(path: string) {
  if (route.path === "/") return route.path === path;
  else {
    return route.path.split("/")[1] === path.split("/")[1];
  }
}
function checkPathAdmin(path: string) {
  if (route.path === "/") return route.path === path;
  else {
    return route.path.split("/")[2] === path.split("/")[1];
  }
}
const showSubMenu = ref(false);
function toggleShowSubMenu() {
  showSubMenu.value = !showSubMenu.value;
}
</script>

<template>
  <div :class="$style.sidebarContainer">
    <div :class="[$style.sidebarItemBorder, $style.sidebarItemBox]">
      <div
        v-if="user.user?.maChucVu == 'CV00000'"
        :class="[
          $style.sidebarItem,
          isExpand && $style.sidebarItemExpand,
          checkPath('/admin') && $style.sidebarActiveItem,
        ]"
      >
        <div
          :class="[
            $style.sidebarBorderItem,
            checkPath('/admin') && $style.sidebarActiveItem,
          ]"
        />
        <div
          :class="$style.sidebarItemIconBox"
          :style="{
            backgroundColor: checkPath('/admin')
              ? 'white'
              : 'var(--color-gray-light)',
          }"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/020/911/731/non_2x/profile-icon-avatar-icon-user-icon-person-icon-free-png.png"
            alt=""
            width="20"
            height="20"
          />
        </div>

        <p
          v-show="isExpand"
          :class="[
            $style.sidebarItemTitle,
            checkPath('/admin') && $style.sidebarActiveItem,
          ]"
          :style="{
            color: checkPath('/admin') ? '#fff' : 'inherit',
          }"
        >
          Quản trị viên
        </p>
        <Icon
          v-show="isExpand"
          icon="mingcute:down-fill"
          width="40px"
          height="40px"
          class="absolute right-4 top-6 p-2"
          style="color: #fff"
          :style="showSubMenu ? 'transform: rotate(180deg)' : ''"
          @click="toggleShowSubMenu"
        />
        <Icon
          v-show="!checkPath('/admin')"
          icon="mingcute:down-line"
          width="40px"
          height="40px"
          class="absolute right-4 top-6 p-2"
          style="color: #252525"
          :style="showSubMenu ? 'transform: rotate(180deg)' : ''"
          @click="toggleShowSubMenu"
        />
      </div>
      <div
        v-if="user.user?.maChucVu == 'CV00000'"
        v-show="showSubMenu"
        class="submenu flex flex-col"
      >
        <NuxtLink
          to="/admin/manage-user"
          v-show="isExpand"
          :class="[
            $style.adminItem,
            checkPathAdmin('/manage-user') && $style.adminItemActive,
          ]"
        >
          Quản lí tài khoản
        </NuxtLink>
        <NuxtLink
          to="/admin/manage-khoa"
          v-show="isExpand"
          :class="[
            $style.adminItem,
            checkPathAdmin('/manage-khoa') && $style.adminItemActive,
          ]"
        >
          Cập nhật khoa
        </NuxtLink>
        <NuxtLink
          to="/admin/manage-chucvu"
          v-show="isExpand"
          :class="[
            $style.adminItem,
            checkPathAdmin('/manage-chucvu') && $style.adminItemActive,
          ]"
        >
          Cập nhật chức vụ
        </NuxtLink>
      </div>

      <div v-for="item in menuList" :key="item.id">
        <RouterLink
          :to="item.path"
          :class="[
            $style.sidebarItem,
            isExpand && $style.sidebarItemExpand,
            checkPath(item.path) && $style.sidebarActiveItem,
          ]"
        >
          <div
            :class="[
              $style.sidebarBorderItem,
              checkPath(item.path) && $style.sidebarActiveItem,
            ]"
          />
          <div
            :class="$style.sidebarItemIconBox"
            :style="{
              backgroundColor: checkPath(item.path)
                ? 'white'
                : 'var(--color-gray-light)',
            }"
          >
            <img :src="item.icon" alt="" width="20" height="20" />
          </div>

          <p
            v-show="isExpand"
            :class="[
              $style.sidebarItemTitle,
              checkPath(item.path) && $style.sidebarActiveItem,
            ]"
            :style="{
              color: checkPath(item.path) ? '#fff' : 'inherit',
            }"
          >
            {{ item.title }}
          </p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.sidebarContainer {
  width: fit-content;
  border-right: 1px solid #dee1e3;
  // transition: all 0.3s ease;
  overflow: hidden;
}

.sidebarBorderItem {
  opacity: 0;
  position: absolute;
  height: 52px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  border-radius: 0px 4px 4px 0px;

  &.sidebarActiveItem {
    opacity: 1;
  }
}

.sidebarItemBox {
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  //   gap: 10px;
}

.sidebarItem {
  display: flex;
  align-items: center;
  padding: 12px 0 12px 12px;
  gap: 8px;
  width: 100%;
  height: 80px;
  text-decoration: none;
  cursor: pointer;
  position: relative;

  &.sidebarActiveItem {
    background-color: var(--color-primary);
    &:hover {
      background-color: var(--color-primary);
    }
  }
  &.sidebarItemExpand {
    width: 260px;
    user-select: none;
  }

  &:hover {
    background-color: #f5f5f5;
  }
}

.sidebarItemIconBox {
  border-radius: 50%;
  overflow: hidden;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-items: center;

  img {
    object-fit: contain;
    margin: auto;
    width: 14px;
    height: 14px;
  }
}

.sidebarItemIcon {
  object-fit: contain;
  margin: auto;
  width: 30px;
  height: 30px;
  margin: 0;
}

.sidebarItemTitle {
  font-size: 13px;
  width: 65%;
  letter-spacing: 0.3px;
  @include text-style(16px, 500, 24px, var(--color-gray-lighter));

  &.sidebarActiveItem {
    font-weight: 600;
    color: #fff;
  }
}

.sidebarItemBoxIcon {
  width: 16px;
  height: 16px;
}
.adminItem {
  cursor: pointer;
  padding: 12px 0 12px 32px;
  background-color: #f5f5f5;
  @include text-style(16px, 500, 24px, var(--color-gray-darker));
}

.adminItemActive {
  background-color: var(--color-primary-light);
  color: #fff;
}
</style>
