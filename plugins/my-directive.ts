export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('clickOutSide', {
        mounted(el,binding) {
            el.__ClickOutsideHandler__ = (event: Event) => {
                if (el) {
                    if (!(el === event.target || el.contains(event.target))) {
                        binding.value()
                    }
                }
            }
            document.addEventListener('click', el.__ClickOutsideHandler__)
        },
        unmounted(el) {
            document.removeEventListener('click', el.__ClickOutsideHandler__)
        }
    })
})
