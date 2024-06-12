<script setup lang="ts">
import { useRoute } from "vue-router";

defineProps<{
  isExpand: boolean;
}>();

const route = useRoute();

const menuList = [
  {
    id: 1,
    icon: "https://assets.quillbot.com/images/theme/commonImages/paraphraser-new.svg",
    color: "#409eff",
    title: "Thiết bị y tế tại kho",
    path: "/",
    name:"index"
  },
  {
    id: 2,
    icon: "https://assets.quillbot.com/images/theme/commonImages/grammar-checker-new.svg",
    color: "#409eff",
    title: "Xử lý nhập",
    path: "/import",
    name:"import"
  },
  {
    id: 3,
    icon: "https://assets.quillbot.com/images/theme/commonImages/plag-checker-new.svg",
    color: "#409eff",
    title: "Plagiarism Checker",
    path: "/plagiarism-checker",
    name:"plagiarism-checker"
  },
  {
    id: 5,
    icon: "https://assets.quillbot.com/images/theme/commonImages/summarizer-new.svg",
    color: "#409eff",
    title: "Summerizer",
    path: "/summerizer",
    name:"summerizer"
  },
];
</script>

<template>
  <div :class="$style.sidebarContainer">
    <div :class="[$style.sidebarItemBorder, $style.sidebarItemBox]">
      <div v-for="item in menuList" :key="item.id">
        <RouterLink
          :to="item.path"
          :class="[$style.sidebarItem, isExpand && $style.sidebarItemExpand]"
        >
          <div
            :style="{ backgroundColor: item.color }"
            :class="[
              $style.sidebarBorderItem,
              route.path.includes(item.name) && $style.sidebarActiveItem,
            ]"
          />
          <div
            :class="$style.sidebarItemIconBox"
            :style="{ backgroundColor: route.path.includes(item.name) ? item.color : 'var(--color-gray-dark)' }"
          >
            <img :src="item.icon" alt="" width="20" height="20" />
          </div>

          <p
            v-show="isExpand"
            :class="[
              $style.sidebarItemTitle,
              route.path.includes(item.name) && $style.sidebarActiveItem,
            ]"
            :style="{
              color: route.path.includes(item.name) ? item.color : 'inherit',
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

  &.sidebarItemExpand {
    width: 250px;
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
  }
}

.sidebarItemBoxIcon {
  width: 16px;
  height: 16px;
}
</style>
