export default defineNuxtPlugin(() => {
  return {
    provide: {
      timeConvert: (time: string) => {
        const date = new Date(time);
        const offset = 7 * 60; // Offset in minutes for GMT+7
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const convertedTime = new Date(utc + (offset * 60000));
        const formattedTime = convertedTime.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
        return formattedTime;
      },
      formatTime: (time: string) => {
        if (!time) return ""
        const date = new Date(time);
        const offset = 7 * 60; // Offset in minutes for GMT+7
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const convertedTime = new Date(utc + (offset * 60000));
        const formattedTime = convertedTime.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return formattedTime;
      }
    }
  }
})
