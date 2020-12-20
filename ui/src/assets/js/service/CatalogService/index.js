class CatalogService {
    async getListCatalog() {
        try {
            return await api.get('/catalogs');
        } catch (error) {
            throw error;
        }
    }
    async updateCatalog(id, catalog) {
        try {
            return await api.put(`/catalogs/${id}`, catalog)
        } catch (error) {
            throw (error)
        }
    }
    async addCatalog(catalog) {
        try {
            return await api.post(`/catalogs`, catalog)
        } catch (error) {
            throw (error)
        }
    }
    async deleteCatalog(catalogid) {
        try {
            return await api.delete(`/catalogs/${catalogid}`)
        } catch (error) {
            throw (error)
        }
    }
}