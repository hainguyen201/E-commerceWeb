class ProductOrderService {
    static async getCartByUserID(id) {
        try {
            return await api.get(`/productorders/users/${id}`);
        } catch (error) {
            throw error;
        }
    }

    static async getCartBySessionID() {
        try {
            return await api.get(`/productorders`);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Thêm sản phẩm vào giỏ hàng với khách hàng đã đăng ký
     * productorders/:userid   
    {
        "ProductID":4,
        "Amount": 3
     } 
     */
    static async addToCartByUserID(userID, data) {
        try {
            return await api.post(`/productorders/${userID}`, data);
        } catch (error) {
            throw error;
        }
    }

    /**
 * Sửa số lượng sản phẩm trong giỏ hàng với khách hàng đã đăng ký
 * productorders/:userid   
{
    "ProductID":4,
    "Amount": 3
 } 
 */
    static async editAmountProductByUserID(userID, data) {
        try {
            return api.put(`/productorders/${userID}`, data);
        } catch (error) {
            throw error;
        }
    }

    /**
 * Thêm sản phẩm vào giỏ hàng với khách hàng chưa đăng nhập (sử dụng session)
 * productorders/:userid    
 {
    "ProductID":4,
    "Amount": 3
 }
 */
    static async addToCartBySession(data) {
        try {
            return api.post(`/productorders`, data);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Sửa số lượng sản phẩm trong giỏ hàng với khách hàng chưa đăng nhập (sử dụng session)
     * productorders/:userid    
     {
        "ProductID":4,
        "Amount": 3
     }
     */
    static async editAmountProductBySession(data) {
        try {
            return api.put(`/productorders`, data);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Xóa sản phẩm khỏi giỏ hàng với khách hàng đã đăng nhập
     * /productorders/:userid/:productid
     */
    static async deteleProductInCartByUserID(userID, productID) {
        try {
            return await api.delete(`/productorders/${userID}/${productID}`);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Xóa sản phẩm khỏi giỏ hàng với khách hàng chưa đăng nhập (sử dụng session)
     * /productorders/:productid
     */
    static async deleteProductInCartBySession(productID) {
        try {
            return await api.delete(`/productorders/${productID}`);
        } catch (error) {
            throw error;
        }
    }
}
