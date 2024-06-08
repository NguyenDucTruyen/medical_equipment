<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

defineProps<{
  isExpand: boolean
}>()

defineEmits<{
  (e: 'toggleSidebar'): void
}>()

const route = useRoute()
const title = computed(() => {
  const name = (String(route.name) ?? '').split('-')
  return name
    .map((n: string) => n.charAt(0).toUpperCase() + n.slice(1))
    .join(' ')
})
</script>

<template>
  <div :class="$style.header">
    <div :class="$style.headerSection">
      <button
        :class="$style.headerIconCollapse"
        @click="$emit('toggleSidebar')"
      >
        <img src="@/assets/icons/Menu.svg" :class="$style.iconMenu" alt="logo">
        <img v-if="isExpand" src="@/assets/icons/arrow-double-left-color.svg" :class="$style.iconToggleSideBar" alt="logo">
        <img v-else src="@/assets/icons/arrow-double-right-color.svg" :class="$style.iconToggleSideBar" alt="logo">
      </button>
      <div :class="$style.headerLogo">
        <img src="@/assets/images/sgr_logo_square.png" alt="logo">
        
      </div>
    </div>
    <div :class="$style.headerSection">
      <div :class="$style.headerCenter">
        {{ title }}
      </div>
    </div>
    <div :class="$style.headerSection">
      <div :class="[$style.headerCenter, $style.headerCenterRight]">
        <button :class="$style.headerButtonPremium">
          <img
            src="@/assets/icons/Diamond.svg"
            :class="$style.headerButtonPremiumIcon"
            alt="notification"
          >
          <span :class="$style.headerButtonPremiumText">Upgrade to Premium</span>
        </button>
        <div :class="$style.headerCenterRightUser">
          <AtomsButtonIcon tooltip-text="Language">
            <img src="@/assets/icons/User.svg" alt="notification">
          </AtomsButtonIcon>
          <div :class="$style.headerRightPopup">
            <div :class="$style.headerRightPopupItem">
              <div :class="$style.headerRightPopupItemChild">
                <Icon
                  icon="material-symbols:logout"
                  :class="$style.headerRightPopupItemChildIcon"
                  style="color: #5f6368"
                />
                <span :class="$style.headerRightPopupItemText">Login in / Sign up</span>
              </div>
              <div :class="$style.headerRightPopupItemChild">
                <Icon icon="icon-park-outline:right" style="color: #5f6368" />
              </div>
            </div>
            <div :class="$style.headerRightPopupItem">
              <div :class="$style.headerRightPopupItemChild">
                <Icon
                  icon="solar:moon-linear"
                  :class="$style.headerRightPopupItemChildIcon"
                  style="color: #5f6368"
                />
                <span :class="$style.headerRightPopupItemText">Dark mode</span>
              </div>
              <div :class="$style.headerRightPopupItemChild">
                <Icon icon="icon-park-outline:right" style="color: #5f6368" />
              </div>
            </div>
            <div :class="$style.headerRightPopupItem">
              <div :class="$style.headerRightPopupItemChild">
                <Icon
                  icon="ph:question"
                  :class="$style.headerRightPopupItemChildIcon"
                  style="color: #5f6368"
                />
                <span :class="$style.headerRightPopupItemText">Help Center</span>
              </div>
            </div>
            <div :class="$style.headerRightPopupItem">
              <div :class="$style.headerRightPopupItemChild">
                <Icon
                  icon="ic:outline-email"
                  :class="$style.headerRightPopupItemChildIcon"
                  style="color: #5f6368"
                />
                <span :class="$style.headerRightPopupItemText">Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      background-color: var(--color-primary-opacity)
    }
  }
}

.headerCenter {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #252525;
  font-weight: 700;
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
  line-height: 44px;
  color: #444746;
  font-size: 22px;
  padding-left: 4px;
  line-height: 24px;
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
.headerCenterRightUser:hover .headerRightPopup {
  // display: flex;
}
.headerRightPopup {
  position: absolute;
  right: 0px;
  top: 45px;
  width: 230px;
  padding: 8px 12px;
  display: flex;
  display: none;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.17) 0px 2px 6px;
}

.headerRightPopupItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  height: 24px;
  cursor: pointer;
  padding: 12px 0;
}

.headerRightPopup .headerRightPopupItem:last-child,
.headerRightPopup .headerRightPopupItem:first-child {
  padding-top: 0;
}

.headerRightPopup .headerRightPopupItem:nth-child(1),
.headerRightPopup .headerRightPopupItem:nth-child(2) {
  border-bottom: 1px solid rgba(80, 80, 80, 0.5);
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
