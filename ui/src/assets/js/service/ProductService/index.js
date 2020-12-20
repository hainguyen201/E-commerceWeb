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

    /**
     * Tìm kiếm sản phẩm theo tên
     * Lưu ý về tên: sử dụng dấu _ thay cho dấu cách
     * /products/names/iphone_12_64GB
     */
    static async searchProductByName(productName) {
        try {
            return await api.get(`/products/names/${productName}`);
        } catch (error) {
            throw error;
        }
    }
}
