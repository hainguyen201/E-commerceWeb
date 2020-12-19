class ProductOrderService {
    async getCartByUserID(id) {
        try {
            debugger
            return await api.get(`/productorders/users/${id}`);
        } catch (error) {
            throw error;
        }
    }

    async getCartBySessionID() {
        try {
            return await api.get(`/productorders`);
        } catch (error) {
            throw error;
        }
    }
}