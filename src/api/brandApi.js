const API_URL = '/api/brands'

export async function fetchBrands() {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Erreur lors du chargement des marques')
    return await res.json()
}

export async function addBrand(newBrand) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBrand)
    })
    if (!res.ok) throw new Error('Erreur lors de l\'ajout de la marque')
    return await res.json()
}

export async function updateBrand(id, updatedData) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    if (!res.ok) throw new Error('Erreur lors de la modification de la marque')
    return await res.json()
}

export async function deleteBrand(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    if (!res.ok) throw new Error('Erreur lors de la suppression de la marque')
    return true
} 