const sql = require('../db.js')
const AbstractModel = require('./abstract.model')
const helper = require('../utils/helper')
    /**
     * Class sản phẩm
     * @param {*} product 
     */
const Product = function(product) {
        // this.ProductID = product.ProductID ? product.ProductID : " ";
        this.ProductName = product.ProductName ? product.ProductName : "";
        this.Price = product.Price ? product.Price : 0;
        this.Content = product.Content ? product.Content : "";
        this.Image = product.Image ? product.Image : "";
        this.ImageList = product.ImageList ? product.ImageList : "";
        this.CatalogID = product.CatalogID ? product.CatalogID : 0;
        this.Discount = product.Discount ? product.Discount : 0;
        this.Remain = product.Remain ? product.Remain : 0;
        this.ProductCreatedDate = product.ProductCreatedDate ? product.ProductCreatedDate : helper.getDateNow();
        this.ProductModifiedDate = product.ProductModifiedDate ? product.ProductModifiedDate : helper.getDateNow();
    }
    /**
     * Lấy danh sách sản phẩm
     * @param {*} result 
     */
Product.getAll = async(result) => {
        sqlString = 'select * from products';
        await AbstractModel.queryExc(result, sqlString);
    }
    /**
     * Lấy danh sách phẩm theo danh mục
     * @param {*} catalogId 
     * @param {*} result 
     */
Product.getProductByCatalogs = async(catalogId, result) => {

    sqlString = `select * from products as p, catalogs as c
    where p.CatalogID=c.CatalogID
    and c.CatalogID=?`;
    await AbstractModel.queryExc(result, sqlString, [catalogId]);

}
Product.getProductByID = async(productId, result) => {
    var sqlString = `select * from products where ProductID=?`;
    console.log(productId)
    await AbstractModel.queryExc(result, sqlString, [productId]);
}
Product.findProductByName = async(productname, result) => {
    var productname = "%" + productname + "%";
    var sqlString = `select * from products where ProductName like ?`
    await AbstractModel.queryExc(result, sqlString, [productname])
}
Product.getAllProducts = async(result) => {
        sqlString = 'select * from products';
        await AbstractModel.queryExc(result, sqlString);
    }
    /**
     * Thêm sản phẩm
     * @param {*} product 
     * @param {*} result 
     */
Product.addProduct = async(product, result) => {
    // Thêm sản phẩm nhưng chưa thêm hình ảnh
    var newProduct = new Product(product);
    await AbstractModel.addDataQuery('products', newProduct, result);
    //Thêm hình ảnh và cập nhật sản phẩm đã thêm
}
Product.updateProduct = async(productid, product, result) => {
    var newProduct = new Product(product);
    await AbstractModel.updateDataQuery('products', newProduct, result, 'ProductID', productid)
}
module.exports = Product;