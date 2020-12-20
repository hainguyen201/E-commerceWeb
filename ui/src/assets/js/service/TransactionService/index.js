class TransactionService {
    /**
     * Lấy giao dịch đã thực hiện của user đã đăng nhập
     * /transactions/:userid
     */

    static async getTransactionByUserID(userID) {
        try {
            return await api.get(`/transactions/${userID}`);
        } catch (error) {
            throw error;
        }
    }
    /**
     * Lấy giao dịch đã thực hiện của user chưa đăng nhập (sử dụng session)
     * /transactions
     */

    static async getTransactionBySession() {
        try {
            return await api.get(`/transactions`);
        } catch (error) {
            throw error;
        }
    }
    /**
     * Xác nhận giao dịch với user đã đăng nhập
     * /transactions/:userid
     */

    static async confirmTransactionByUserID(userID, data) {
        try {
            return await api.post(`/transactions/${userID}`, data);
        } catch (error) {
            throw error;
        }
    }
    /**
     * Xác nhận giao dịch với user chưa đăng nhập (sử dụng session)
     * /transactions
     */

    static async confirmTransactionBySession(data) {
        try {
            return await api.post(`/transactions`, data);
        } catch (error) {
            throw error;
        }
    }
    /**
     * Cập nhật giao dịch ( áp dụng cho cả khách hàng đăng nhập và chưa đăng nhập)
     * /transactions/:transactionID
     */
    static async updateTransactionByTransactionID(transactionID, data) {
        try {
            return await api.put(`/transactions/${transactionID}`, data);
        } catch (error) {}
    }
}
