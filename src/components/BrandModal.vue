<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close-modal" @click="$emit('close')">&times;</span>
      <h2>{{ props.brand ? 'Modifier la marque' : 'Ajouter une marque' }}</h2>
      <form @submit.prevent="submitForm" class="brand-form">
        <div class="form-group">
          <label for="brandName">Nom de la marque</label>
          <input v-model="brandName" type="text" id="brandName" required placeholder="Ex: Nike" />
        </div>
        <div class="form-group">
          <label for="brandImage">Logo de la marque</label>
          <input 
            type="file" 
            id="brandImage" 
            accept="image/*"
            @change="handleFileUpload" 
            :required="!props.brand"
          />
        </div>
        <div class="form-group">
          <label for="brandRating">Note</label>
          <input v-model.number="brandRating" type="number" id="brandRating" min="1" max="5" required placeholder="1 à 5" />
        </div>
        <div class="form-group">
          <label for="countryCode">Pays</label>
          <select v-model="countryCodes" id="countryCode" multiple required>
            <option v-for="config in countryConfigs" :key="config.id" :value="config.country_code">
              {{ config.country_code }}
            </option>
          </select>
        </div>
        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="$emit('close')">Annuler</button>
          <button type="submit" class="add-btn">{{ props.brand ? 'Modifier' : 'Ajouter' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  brand: Object,
  countryConfigs: {
    type: Array,
    default: () => []
  }
})

const brandName = ref('')
const brandImage = ref(null)
const brandRating = ref(1)
const countryCodes = ref([])

watch(() => props.brand, (val) => {
  if (val) {
    brandName.value = val.brand_name
    brandRating.value = val.rating
    countryCodes.value = Array.isArray(val.country_codes) ? [...val.country_codes] : []
  } else {
    brandName.value = ''
    brandImage.value = null
    brandRating.value = 1
    countryCodes.value = []
  }
}, { immediate: true })

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    brandImage.value = file
  }
}

function submitForm() {
  if (!brandName.value || !brandRating.value || countryCodes.value.length === 0) return
  
  if (!props.brand && !brandImage.value) {
    alert('Veuillez sélectionner une image pour la marque')
    return
  }
  
  const formData = new FormData()
  formData.append('brand_name', brandName.value)
  formData.append('rating', brandRating.value)
  
  countryCodes.value.forEach(code => {
    formData.append('country_codes[]', code)
  })
  formData.append('country_code', countryCodes.value[0])
  
  if (brandImage.value) {
    formData.append('brand_image', brandImage.value)
  }
  
  if (props.brand) {
    formData.append('_method', 'PUT')
  }

  if (props.brand) {
    emit('edit-brand', formData)
  } else {
    emit('add-brand', formData)
  }
  emit('close')
  brandName.value = ''
  brandImage.value = null
  brandRating.value = 1
  countryCodes.value = []
}

const emit = defineEmits(['close', 'add-brand', 'edit-brand'])
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  z-index: 1000;
  left: 0; top: 0; right: 0; bottom: 0;
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

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: #16213e;
}

.form-group input {
  width: 100%;
  padding: 0.65rem 1.3rem;
  border-radius: 7px;
  border: 1.5px solid #e0e0e0;
  font-size: 1rem;
  background: #f8fafd;
  transition: border 0.2s;
  box-sizing: border-box;
}
.form-group input:focus {
  border: 1.5px solid #0f3460;
  outline: none;
  background: #fff;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  margin-top: 1.7rem;
}

.add-btn {
  background: #0f3460;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  min-width: 90px;
  transition: background 0.2s;
}
.add-btn:hover {
  background: #16213e;
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

.preview-image {
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
  border-radius: 8px;
  object-fit: contain;
  background: #f0f0f0;
  padding: 5px;
}

select[multiple] {
  width: 100%;
  padding: 0.65rem 1.3rem;
  border-radius: 7px;
  border: 1.5px solid #e0e0e0;
  font-size: 1rem;
  background: #f8fafd;
  transition: border 0.2s;
  box-sizing: border-box;
  cursor: pointer;
  min-height: 120px;
}

select[multiple] option {
  padding: 8px;
  margin: 2px 0;
  border-radius: 4px;
}

select[multiple] option:checked {
  background-color: #0f3460;
  color: white;
}

select[multiple]:focus {
  border: 1.5px solid #0f3460;
  outline: none;
  background: #fff;
}

@media (max-width: 500px) {
  .modal-content {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
    min-width: 0;
  }
  .form-group input {
    font-size: 0.98rem;
    padding: 0.55rem 0.7rem;
  }
  .form-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  .add-btn, .cancel-btn {
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