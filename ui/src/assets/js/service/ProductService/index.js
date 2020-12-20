class ProductService {
    getAllProduct() {}

    async getProductById(id) {
        try {
            return await api.get(`/products/${id}`);
        } catch (error) {
            throw error;
        }
    }

    async getListProductByCatalogID(id) {
        try {
            return await api.get(`/products/catalogs/${id}`);
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart() {
        try {
        } catch (error) {}
    }
}
