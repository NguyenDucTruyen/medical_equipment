import { useUserStore } from '../stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    const maNguoiDung = localStorage.getItem('maNguoiDung');
    if (!maNguoiDung && to.path !== '/login') {
        return navigateTo('login')
    } else if (maNguoiDung && userStore.user === null && to.path === '/login') {
        userStore.getUserInfo(JSON.parse(maNguoiDung));
        return navigateTo('/')
        
        } else if (maNguoiDung && userStore.user === null) {
        userStore.getUserInfo(JSON.parse(maNguoiDung));
    } else if (userStore.user !== null && to.path === '/login') {
        return navigateTo('/')
    }
})