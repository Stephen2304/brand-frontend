<template>
  <section class="brand-table-section">
    <header class="main-header">
      <div class="header-content">
        <h1>Classement des Meilleures Marques</h1>
        <button class="add-brand-btn" @click="showModal = true">+ Ajouter une marque</button>
      </div>
    </header>
    <table class="brand-table">
      <thead>
        <tr>
          <th>Rang</th>
          <th>Logo</th>
          <th>Nom</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <BrandRow
          v-for="(brand, index) in brands"
          :key="brand.id"
          :brand="brand"
          :rank="index + 1"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </tbody>
    </table>
    <BrandModal v-if="showModal" @close="showModal = false" @add-brand="addBrand" :country-configs="countryConfigs" />
    <BrandModal v-if="showEditModal" :brand="brandToEdit" @close="showEditModal = false" @edit-brand="updateBrand" :country-configs="countryConfigs" />
    <DeleteModal 
      v-if="showDeleteModal" 
      :brand-name="brandToDelete?.brand_name"
      :brand-id="brandToDelete?.id"
      @close="showDeleteModal = false"
      @delete-brand="deleteBrand"
    />
    <LoaderComponent :show="loading" :text="loadingText" />
    <AlertComponent 
      :show="showAlert" 
      :message="alertMessage" 
      :type="alertType"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BrandRow from './BrandRow.vue'
import BrandModal from './BrandModal.vue'
import DeleteModal from './DeleteModal.vue'
import LoaderComponent from './Loader-component.vue'
import AlertComponent from './Alert-component.vue'
import BrandService from '../services/BrandService'

const showModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const brandToEdit = ref(null)
const brandToDelete = ref(null)
const brands = ref([])
const countryConfigs = ref([])
const loading = ref(false)
const loadingText = ref('Chargement...')
const error = ref(null)


const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success')

// Pour afficher une notification de succès ou d'erreur
function showNotification(message, type = 'success') {
  alertMessage.value = message
  alertType.value = type
  showAlert.value = true
  setTimeout(() => {
    showAlert.value = false
  }, 3000)
}

// Pour charger les marques
async function loadBrands() {
  loading.value = true
  loadingText.value = 'Chargement des marques...'
  try {
    brands.value = await BrandService.getBrands()
    error.value = null
  } catch (e) {
    error.value = 'Erreur lors du chargement des marques'
    showNotification('Erreur lors du chargement des marques', 'error')
  } finally {
    loading.value = false
  }
}

// Pour charger les configurations pays
async function loadCountryConfigs() {
  try {
    countryConfigs.value = await BrandService.getCountryConfigs()
  } catch (e) {
    console.error('Erreur lors du chargement des configurations pays')
  }
}

// Pour ajouter une marque
async function addBrand(formData) {
  loading.value = true
  loadingText.value = 'Ajout de la marque...'
  try {
    const created = await BrandService.addBrand(formData)
    brands.value.push(created)
    showModal.value = false
    showNotification('Marque ajoutée avec succès')
  } catch (e) {
    showNotification('Erreur lors de l\'ajout de la marque', 'error')
  } finally {
    loading.value = false
  }
}

function openEditModal(brand) {
  brandToEdit.value = { ...brand }
  showEditModal.value = true
}

function openDeleteModal(brand) {
  brandToDelete.value = brand
  showDeleteModal.value = true
}

// Pour modifier une marque
async function updateBrand(formData) {
  loading.value = true
  loadingText.value = 'Mise à jour de la marque...'
  try {
    const res = await BrandService.updateBrand(brandToEdit.value.id, formData)
    const idx = brands.value.findIndex(b => b.id === brandToEdit.value.id)
    if (idx !== -1) brands.value[idx] = res
    showEditModal.value = false
    brandToEdit.value = null
    showNotification('Marque mise à jour avec succès')
  } catch (e) {
    showNotification('Erreur lors de la modification de la marque', 'error')
  } finally {
    loading.value = false
  }
}

// Pour supprimer une marque
async function deleteBrand() {
  loading.value = true
  loadingText.value = 'Suppression de la marque...'
  try {
    await BrandService.deleteBrand(brandToDelete.value.id)
    brands.value = brands.value.filter(b => b.id !== brandToDelete.value.id)
    showDeleteModal.value = false
    brandToDelete.value = null
    showNotification('Marque supprimée avec succès')
  } catch (e) {
    showNotification('Erreur lors de la suppression de la marque', 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBrands()
  loadCountryConfigs()
})
</script>

<style scoped>
body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #f7f7f7;
  margin: 0;
  padding: 0;
}

.main-header {
  background: #1a1a2e;
  color: #fff;
  padding: 2rem 1rem 1.5rem 1rem;
  text-align: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.header-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
}

.header-content h1 {
  margin: 0;
  font-size: 2rem;
  flex: 1;
  text-align: left;
}

.add-brand-btn {
  background: #0f3460;
  color: #fff;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 2rem;
  box-shadow: 0 2px 8px rgba(15,52,96,0.08);
  transition: background 0.2s;
  min-width: 90px;
}
.add-brand-btn:hover {
  background: #16213e;
}

.brand-table-section {
  max-width: 900px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 0 0 2rem 0;
  position: relative;
}

.brand-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 18px;
  margin-top: 2rem;
}

.brand-table th, .brand-table td {
  padding: 1.2rem 1rem;
  text-align: center;
  background: #fff;
}

.brand-table th {
  background: #16213e;
  color: #fff;
  border-radius: 0;
}

.brand-table tr {
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border-radius: 8px;
}

.brand-table img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  background: #f0f0f0;
}

/* Responsive Table */
@media (max-width: 800px) {
  .brand-table-section {
    padding: 0 0 1rem 0;
  }
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .header-content h1 {
    font-size: 1.2rem;
    text-align: left;
  }
  .add-brand-btn {
    width: 100%;
    margin-left: 0;
  }
  .brand-table th, .brand-table td {
    padding: 0.7rem 0.3rem;
    font-size: 0.95rem;
  }
  .brand-table img {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 600px) {
  .brand-table thead {
    display: none;
  }
  .brand-table, .brand-table tbody, .brand-table tr, .brand-table td {
    display: block;
    width: 100%;
  }
  .brand-table tr {
    margin-bottom: 1.2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    border-radius: 10px;
    background: #fff;
    padding: 1rem 0.7rem;
  }
  .brand-table td {
    position: relative;
    padding-left: 110px;
    min-height: 36px;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    border: none;
    background: none;
    display: flex;
    align-items: center;
  }
  .brand-table td[data-label]:before {
    content: attr(data-label) ' : ';
    position: absolute;
    left: 0;
    top: 0;
    font-weight: 600;
    color: #0f3460;
    font-size: 0.97rem;
    min-width: 90px;
    text-align: left;
    padding-right: 0.5rem;
  }
  .brand-table img {
    width: 36px;
    height: 36px;
  }
}
</style> 