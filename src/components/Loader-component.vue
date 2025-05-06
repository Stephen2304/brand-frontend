<template>
  <div v-if="show" class="loader-overlay">
    <div class="loader-content">
      <div class="loader"></div>
      <p class="loader-text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineOptions } from 'vue'

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: 'Chargement...'
  }
})

defineOptions({
  name: 'LoaderComponent'
})
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader-content {
  text-align: center;
}

.loader {
  width: 48px;
  height: 48px;
  border: 4px solid #0f3460;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader-text {
  margin-top: 1rem;
  color: #0f3460;
  font-weight: 500;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 