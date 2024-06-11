<script setup lang="ts">
function cancelExit() {}

function confirmExit() {}
</script>

<template>
  <div class="confirm-exit-popup">
    <div class="popup-content">
      <h2>Confirm Exit</h2>
      <p>Are you sure you want to exit?</p>
      <div class="button-container">
        <button @click="cancelExit">Cancel</button>
        <button @click="confirmExit">Exit</button>
      </div>
    </div>
  </div>
</template>
