export default defineNuxtPlugin(() => {
    const baseURL = useRuntimeConfig().public.baseUrl
    return {
        provide: {
            handleErrorApi: async (err: any, callback?: any) => {
                let message = ''
                let status = ''
                if (err.response) {
                    message = err.response?._data?.message ?? 'Lỗi gì rồi'
                    status = err.response?.status
                }
                if (typeof callback === 'function') {
                    callback({ message, status })
                }
            }
        }
    }
})