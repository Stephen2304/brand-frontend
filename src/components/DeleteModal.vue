<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close-modal" @click="$emit('close')">&times;</span>
      <h2>Confirmer la suppression</h2>
      <p>Êtes-vous sûr de vouloir supprimer cette marque ?</p>
      <p class="brand-name">{{ props.brandName }}</p>
      <div class="form-actions">
        <button type="button" class="cancel-btn" @click="$emit('close')">Annuler</button>
        <button type="button" class="delete-btn" @click="Supprimer">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  brandName: {
    type: String,
    required: true
  },
  brandId: {
    type: [Number, String],
    required: true
  }
})

const emit = defineEmits(['close', 'delete-brand'])

function Supprimer() {
  emit('delete-brand', props.brandId)
  emit('close')
}
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 16px;
  width: 95%;
  max-width: 370px;
  position: relative;
  box-shadow: 0 8px 32px rgba(44,62,80,0.18);
  animation: modalIn 0.2s;
}

@keyframes modalIn {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.close-modal {
  position: absolute;
  right: 1.2rem;
  top: 1.2rem;
  font-size: 1.7rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
}

.close-modal:hover {
  color: #0f3460;
}

h2 {
  color: #16213e;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 0.5rem;
}

.brand-name {
  font-weight: 600;
  color: #0f3460;
  margin-bottom: 1.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  margin-top: 1.7rem;
}

.delete-btn {
  background: #dc3545;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  min-width: 90px;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #c82333;
}

.cancel-btn {
  background: #fff;
  color: #0f3460;
  border: 1.5px solid #0f3460;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  min-width: 90px;
  transition: background 0.2s, color 0.2s;
}

.cancel-btn:hover {
  background: #f0f0f0;
  color: #16213e;
}

@media (max-width: 500px) {
  .modal-content {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
    min-width: 0;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .delete-btn, .cancel-btn {
    width: 100%;
    min-width: 0;
    font-size: 0.98rem;
    padding: 0.55rem 0.7rem;
  }
  
  h2 {
    font-size: 1.1rem;
  }
}
</style> 