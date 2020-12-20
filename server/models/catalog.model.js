const sql = require('../db.js')
const AbstractModel = require('./abstract.model')
const helper = require('../utils/helper')
const Catalog = function(catalog) {
    this.CatalogName = catalog.CatalogName ? catalog.CatalogName : '';
    this.ParentID = catalog.ParentID ? catalog.ParentID : 0;
    this.CatalogModifiedDate = catalog.ModifiedDate ? catalog.ModifiedDate : helper.getDateNow();
}
Catalog.getAllCatalog = async(result) => {
    var sqlString = 'select * from catalogs';
    await AbstractModel.queryExc(result, sqlString);
}
Catalog.getCatalogById = async(catalogId, result) => {
    var sqlString = `select * from catalogs where CatalogID=?`;
    await AbstractModel.queryExc(result, sqlString, [catalogId]);
}
Catalog.addCatalog = async(catalog, result) => {
    var add_catalog = new Catalog(catalog);
    add_catalog.CatalogCreatedDate = helper.getDateNow();
    await AbstractModel.addDataQuery('catalogs', add_catalog, result);
}
Catalog.updateCatalog = async(catalogid, catalog, result) => {
    var add_catalog = new Catalog(catalog);
    await AbstractModel.updateDataQuery('catalogs', add_catalog, result, "CatalogID", catalogid);
}
Catalog.deleteCatalog = async(catalogid, result) => {
    var sqlString = `delete from catalogs where CatalogID=?`;
    await AbstractModel.queryExc(result, sqlString, [catalogid]);
}
module.exports = Catalog