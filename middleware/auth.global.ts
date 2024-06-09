import { useUserStore } from '../stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    const maNguoiDung = localStorage.getItem('maNguoiDung');
    if (!maNguoiDung && to.path !== '/login') {
        return navigateTo('login')
        console.log('chua dang nhap')
    } else if (userStore.user === null && maNguoiDung) {
        userStore.getUserInfo(JSON.parse(maNguoiDung));
    } else if (userStore.user !== null && to.path === '/login') {
        return navigateTo('/')
    }
})