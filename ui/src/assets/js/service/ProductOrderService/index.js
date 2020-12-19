class ProductOrderService {
    async getListCatalog() {
        try {
            return await api.get('/catalogs');
        } catch (error) {
            throw error;
        }
    }
}