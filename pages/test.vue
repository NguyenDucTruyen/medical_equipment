<script setup lang="ts">
import viLocale from "element-plus/es/locale/lang/vi";
import {uploadFile} from "@/composables/devices";
const timeValue = ref("");
const hello = () => ElMessage.info("hello world");
const helloSuccess = () => ElMessage.success("hello world");

const color = useColorMode();
const colorMode = computed({
  get: () => color.value === 'dark',
  set: () => (color.preference = (color.value === 'dark' ? 'light' : 'dark')),
});
const file = ref<File>();
function getFile(e: any) {
  file.value = e.target.files[0]
  console.log(file.value)
}
function confirmUpload() {
  const formData = new FormData()
  if (file.value) {
    formData.append('image', file.value)
    uploadFile(formData).then((res: any) => {
      console.log(res.url)
    })
  }
}
</script>


<template>
<input type="file" @input="getFile" accept="image/png, image/gif, image/jpeg" >
<button @click=confirmUpload>upload</button>
</template>