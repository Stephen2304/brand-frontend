<template>
  <tr>
    <td data-label="Rang">{{ rank }}</td>
    <td data-label="Logo">
      <img :src="brand.brand_image" :alt="brand.brand_name" class="brand-logo" />
    </td>
    <td data-label="Nom">{{ brand.brand_name }}</td>
    <td data-label="Note">{{ brand.rating }}</td>
    <td data-label="Actions">
      <button @click="$emit('edit', brand)" class="edit-btn">
        <i class="fas fa-edit"></i>
        <span>Modifier</span>
      </button>
      <button @click="$emit('delete', brand)" class="delete-btn">
        <i class="fas fa-trash"></i>
        <span>Supprimer</span>
      </button>
    </td>
  </tr>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  brand: Object,
  rank: Number
})
</script>

<style scoped>
.edit-btn, .delete-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0.25rem;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.edit-btn {
  background-color: #0f3460;
  color: white;
}

.edit-btn:hover {
  background-color: #16213e;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.brand-logo {
  width: 100px;
  object-fit: contain;
  border-radius: 8px;
  background: #f0f0f0;
  padding: 5px;
}

@media (max-width: 800px) {
  .brand-logo {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 600px) {
  .brand-logo {
    width: 60px;
    height: 60px;
  }
  
  .edit-btn, .delete-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .edit-btn span, .delete-btn span {
    display: none;
  }
  
  .edit-btn, .delete-btn {
    padding: 0.4rem;
  }
}
</style> 