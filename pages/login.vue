<script setup lang="ts">
const { $handleErrorApi } = useNuxtApp();
import { apiLogin } from "#imports";
import { ElNotification } from "element-plus";
const user = useUserStore();
definePageMeta({
  layout: "empty",
});
const username = ref("");
const password = ref("");
const router = useRouter();
function submitLogin() {
  try {
    apiLogin(username.value, password.value)
      .then((res: any) => {
        console.log(res);
        ElNotification.success({
          title: "Thành công",
          message: "Đăng nhập thành công",
          offset: 10,
          duration: 1000,
        });
        user.setUser(res.data);
        localStorage.setItem(
          "maNguoiDung",
          JSON.stringify(res.data.maNguoiDung)
        );
        router.push("/");
      })
      .catch((err) => {
        $handleErrorApi(err, ({ message }: any) => {
          // console.log(error);
          ElNotification.error({
            title: "Thất bại",
            message: message,
            offset: 10,
            duration: 1000,
          });
        });
      });
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        Bệnh viện Đà Nẵng
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-200 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center"
          >
            Đăng nhập
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="text"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tên người dùng</label
              >
              <input
                v-model="username"
                type="text"
                name="text"
                id="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-[#409eff]"
                placeholder="Nhập tên người dùng"
                @keydown.enter="submitLogin"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Mật khẩu</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="Nhập mật khẩu"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-[#409eff]"
                @keydown.enter="submitLogin"
              />
            </div>

            <button
              type="button"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-[#409eff]"
              @click="submitLogin"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
