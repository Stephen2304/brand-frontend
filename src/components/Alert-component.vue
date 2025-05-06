<template>
  <Transition name="slide">
    <div v-if="show" :class="['alert', type]">
      <div class="alert-content">
        <i :class="icon"></i>
        <span>{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    required: true
  },
  // tyoe d'erreur qu'on peut possiblement avoir
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value)
  }
})

const icon = computed(() => ({
  'success': 'fas fa-check-circle',
  'error': 'fas fa-exclamation-circle'
}[props.type]))
</script>

<style scoped>
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  min-width: 300px;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

@media (max-width: 500px) {
  .alert {
    min-width: auto;
    width: calc(100% - 40px);
  }
}
</style> 