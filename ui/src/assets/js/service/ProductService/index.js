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
        try {} catch (error) {}
    }
    async getAllProduct() {
        try {
            return await api.get('/products');

        } catch (err) {
            throw (err)
        }
    }
    async addProduct(product) {
        try {
            product.Price = product.Price === "" ? 0 : parseInt(product.Price);
            product.CatalogID = product.CatalogID === "" ? 0 : parseInt(product.CatalogID);
            product.Discount = product.Discount === "" ? 0 : parseInt(product.Discount);
            product.Remain = product.Remain === "" ? 0 : parseInt(product.Remain);

            return await api.post('/products', product)
        } catch (err) {
            throw (err);
        }
    }
    async updateProduct(product, id) {
        try {
            product.Price = product.Price === "" ? 0 : parseInt(product.Price);
            product.CatalogID = product.CatalogID === "" ? 0 : parseInt(product.CatalogID);
            product.Discount = product.Discount === "" ? 0 : parseInt(product.Discount);
            product.Remain = product.Remain === "" ? 0 : parseInt(product.Remain);

            return await api.put('/products/' + id, product)
        } catch (err) {
            throw (err);
        }
    }
    async deleteProduct(id) {
        try {
            return await api.delete('/products/' + id)
        } catch (err) {
            throw (err);
        }
    }
}