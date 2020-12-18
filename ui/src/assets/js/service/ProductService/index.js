class ProductService {
    getAllProduct() {

    }

    async getProductById(id) {
        try {
            return await api.get(`/products/${id}`);
        } catch (error) {
            throw error;
        }
    }
}