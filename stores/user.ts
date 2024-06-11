import { defineStore } from 'pinia'
import type { User } from '../utils/type'
import { ElNotification } from "element-plus";
export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: null as User | null,
    }),
    actions: {
        setUser(user: User) {
            this.user = user;
        },

        async getUserInfo(idUser: string) {
            getInfoUser(idUser).then((res: any) => {
                this.setUser(res.data);
            }).catch((err) => {
                const message = err.response?._data?.message ?? 'Có lỗi xảy ra'
                ElNotification.error({
                    title: "Thất bại",
                    message: message,
                    offset: 10,
                });
                localStorage.removeItem('maNguoiDung');
                navigateTo('/login')

            })
        },
        clearUserStore() {
            this.user = null;
            localStorage.removeItem('maNguoiDung');
            navigateTo('/login')
        }
    }
})