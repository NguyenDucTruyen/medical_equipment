<script setup lang="ts">
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import { ElMessage, ElMessageBox } from "element-plus";

const userStore = useUserStore();
defineProps<{
  isExpand: boolean;
}>();

defineEmits<{
  (e: "toggleSidebar"): void;
}>();

const route = useRoute();
const router = useRouter();
const popUpVisibility = ref(false);
const showConfirm = ref(false);
const title = computed(() => {
  const name = (String(route.name) ?? "").split("-");
  const title = name
    .map((n: string) => n.charAt(0).toUpperCase() + n.slice(1))
    .join(" ");
  return title === "Index" ? "Trang chủ" : title;
});
const vClickOutside = (el: HTMLElement, binding: any) => {
  if (!!el) {
    console.log(el, binding.value);
    const handler = (e: MouseEvent) => {
      if (!el.contains(e.target as Node) && el !== e.target) {
        binding.value();
      }
    };
    document.addEventListener("click", handler);
    onBeforeUnmount(() => {
      document.removeEventListener("click", handler);
    });
  } else {
    console.log("el is null");
  }
};
function navigateToProfile() {
  popUpVisibility.value = false;
  router.push("/user");
}
function hiddenPopup() {
  popUpVisibility.value = false;
}
function logout() {
  ElMessageBox.confirm("Bạn có muốn đăng xuất?", "Đăng xuất", {
    confirmButtonText: "Đồng ý",
    cancelButtonText: "Hủy",
    type: "info",
  })
    .then(() => {
      userStore.clearUserStore();
    })
    .catch(() => {});

  // const promise = new Promise((resolve, reject) => {
  //   // const vl = confirm("Đăng xuất hay không");
  //   // resolve(vl);
  //   showConfirm.value = true;
  // });
  // promise.then((res) => {
  //   alert(res ? "Đăng xuất" : "Hủy");
  // });
}
</script>

<template>
  <div :class="$style.header">
    <div :class="$style.headerSection">
      <button
        :class="$style.headerIconCollapse"
        @click="$emit('toggleSidebar')"
      >
        <img
          src="@/assets/icons/Menu.svg"
          :class="$style.iconMenu"
          alt="logo"
        />
        <img
          v-if="isExpand"
          src="@/assets/icons/arrow-double-left-color.svg"
          :class="$style.iconToggleSideBar"
          alt="logo"
        />
        <img
          v-else
          src="@/assets/icons/arrow-double-right-color.svg"
          :class="$style.iconToggleSideBar"
          alt="logo"
        />
      </button>
      <NuxtLink to="/" :class="$style.headerLogo">
        <img src="@/assets/images/logo_dana_hospital.png" alt="logo" />
        <span :class="$style.headerLogoName">BỆNH VIỆN ĐÀ NẴNG</span>
      </NuxtLink>
    </div>
    <!-- <div :class="$style.headerSection">
      <div :class="$style.headerCenter">
        {{ title }}
      </div>
    </div> -->
    <div :class="$style.headerSection">
      <div :class="[$style.headerCenter, $style.headerCenterRight]">
        <div :class="$style.headerCenterRightUser">
          <div
            :class="$style.headerCenterRightUserInfo"
            @click="popUpVisibility = true"
          >
            <AtomsButtonIcon tooltip-text="Language">
              <img src="@/assets/icons/User.svg" alt="notification" />
            </AtomsButtonIcon>
            <span>{{ userStore?.user?.tenNguoiDung }}</span>
          </div>
          <div
            v-if="popUpVisibility"
            :class="$style.headerRightPopup"
            v-click-out-side="hiddenPopup"
          >
            <div
              :class="$style.headerRightPopupItem"
              @click="navigateToProfile"
            >
              <div :class="$style.headerRightPopupItemChild">
                <Icon
                  icon="ri:profile-line"
                  :class="$style.headerRightPopupItemChildIcon"
                  style="color: #5f6368"
                />
                <span :class="$style.headerRightPopupItemText"
                  >Hồ sơ cá nhân</span
                >
              </div>
              <div :class="$style.headerRightPopupItemChild">
                <Icon icon="icon-park-outline:right" style="color: #5f6368" />
              </div>
            </div>
            <div :class="$style.headerRightPopupItem" @click="logout">
              <div :class="$style.headerRightPopupItemChild">
                <Icon
                  icon="material-symbols:logout"
                  :class="$style.headerRightPopupItemChildIcon"
                  style="color: #5f6368"
                />
                <span :class="$style.headerRightPopupItemText">Đăng xuất</span>
              </div>
              <div :class="$style.headerRightPopupItemChild">
                <Icon icon="icon-park-outline:right" style="color: #5f6368" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CommonConfirm v-if="showConfirm" />
  </div>
</template>

<style lang="scss" module>
.header {
  padding: 0 15px 0 5px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe4;
}
.headerSection {
  height: 100%;
  flex: 1;
  display: flex;
}
.headerIconCollapse {
  display: flex;
  color: #444746;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: transparent;
  border: none;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    cursor: pointer;
    margin-right: 4px;
  }

  .iconMenu {
    display: flex;
  }
  .iconToggleSideBar {
    display: none;
  }
  &:hover {
    img {
      background-color: #f1f1f1;
      border-radius: 100px;
    }
    .iconMenu {
      display: none;
    }
    .iconToggleSideBar {
      display: flex;
    }
  }
  &:active {
    img {
      background-color: var(--color-primary-opacity);
    }
  }
}

.headerCenter {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  @include text-style(1rem, 700, normal, var(--color-gray-dark));
}
.headerButtonPremium {
  padding: 6px 13.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 100px;
  height: 36.5px;
  background-color: #499557;
  cursor: pointer;
}
.headerButtonPremiumIcon {
  width: 20px;
  height: 18px;
  font-size: 16px;
  object-fit: contain;
}
.headerButtonPremiumText {
  color: #fff;
  letter-spacing: 0.3px;
  font-size: 14px;
  font-weight: 600;
}
.headerLanguageIcon {
  width: 30px;
  height: 30px;
  border-radius: 1000px;
  object-fit: contain;
  cursor: pointer;
}
.headerLogo {
  display: flex;
  align-items: center;
  text-decoration: none;
  img {
    width: 30px;
    height: 30px;
  }
}

.headerLogoImage {
  width: 44px;
  height: 40px;
  object-fit: contain;
  padding-right: 4px;
  margin-bottom: 4px;
  cursor: pointer;
}

.headerLogoName {
  padding-left: 12px;
  @include text-style(16px, 600, 24px, var(--color-gray-dark));
  cursor: pointer;
}

.headerCenter {
  flex: 1;
}

.headerCenterRight {
  justify-content: flex-end;
}

.headerCenterRightUser {
  position: relative;
}
.headerCenterRightUserInfo {
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  span {
    @include text-style(16px, 500, 24px, var(--color-gray-dark));
  }
}

.headerRightPopup {
  position: absolute;
  right: 0px;
  top: 45px;
  width: 230px;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.17) 0px 2px 6px;
  z-index: 3;
}

.headerRightPopupItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  height: 24px;
  cursor: pointer;
  padding: 12px;
  &:hover {
    background-color: var(--color-gray-lighter);
  }
}

.headerRightPopupItemChild {
  display: flex;
  gap: 8px;
  align-items: center;
}

.headerRightPopupItemChildIcon {
  font-size: 24px;
}

.headerRightPopupItemText {
  font-size: 14px;
  font-weight: 400;
}

.headerRight {
  display: flex;
  align-items: center;
  gap: 2px;
}

.el-icon {
  width: 40px;
  height: 40px;
}

.headerRightIcon,
.headerRightAvatar {
  &:hover {
    background-color: rgba(60, 64, 67, 0.08);
    cursor: pointer;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 4px;
}
</style>
