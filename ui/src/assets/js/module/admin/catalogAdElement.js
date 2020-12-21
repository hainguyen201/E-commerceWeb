const template = `
<div class="menu">
    <div class="menu-title content">Quản lý</div>
    <div class="menu-content">
    <a href="/admin/catalog"><div class="menu-item content">Danh mục</div></a>
    <a href="/admin/product"><div class="menu-item content">Sản phẩm</div></a>
    <a href="/admin/transaction"><div class="menu-item content">Giao dịch</div></a>
    </div>
</div>
`;

class CatalogAdElement extends HTMLDivElement {
    static get route() {
        return '';
    }
    static get is() {
        return 'ad-catalog-element';
    }

    constructor() {
        super();
        this.classList.add('dashboard');
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template;
        // this.appendChild(templateEl.content.cloneNode(true));
    }

    connectedCallback() {
        const menuElement = createElementByText(template);
        this.appendChild(menuElement);
        const addCatalogTable = (catalogs) => {
            let catalog = `<div class="list-catalog"><br>
    <div class="add-catalog">   
        <button class="btn" onclick="openAddCatalogModal('post')">Thêm danh mục</button>
        <div id="add-catalog-modal" class="modal">

            <!-- Modal content -->
            <div class="modal-content catalog-modal-content">
                <!-- <span class="close">&times;</span> -->
                <div class="form-catalog">
                    <div class="catalog-input">
                        <input type="text" name="CatalogName" placeholder="Tên danh mục" class='catalog-value type-input'>
                    </div>
                    <br>
                    <div>
                        <button class="btn btn-cancel" onclick="closeAddCatalogModal()">Hủy</button>
                        <button class="btn" onclick="addCatalog(event)">Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <br>
    <div class="main-table">
        <table class="catalog-table-content">
            <thead>
                <tr>
                    <th>Mã danh mục</th>
                    <th>Tên danh mục</th>
                    <th>Ngày tạo</th>
                    <th>Ngày sửa</th>
                    <th>Hoạt động</th>
                </tr>
            </thead>
            <tbody>`;
            catalogs.forEach((element) => {
                var _catalog = element;
                catalog += `<tr id="catalog-${_catalog.CatalogID}">
<td name="CatalogID">${_catalog.CatalogID}</td>
<td name="CatalogName">${_catalog.CatalogName}</td>
<td name="CatalogCreatedDate">${_catalog.CatalogCreatedDate}</td>
<td name="CatalogModifiedDate">${_catalog.CatalogModifiedDate}</td>`;
                catalog += `<td style="text-align:center">
        <button id="delete-catalog" class="btn" onclick="openDeleteCatalogModal(${_catalog.CatalogID})">Xóa</button>
        <div class="delete-catalog-modal modal">

            <!-- Modal content -->
            <div class="modal-content catalog-modal-content">
                <!-- <span class="close">&times;</span> -->
                <div class="form-catalog">
                    <div class="confirm-info">Bạn có chắc muốn xóa ?</div>
                    <br>
                    <div>
                        <button class="btn btn-cancel" onclick="closeDeleteCatalogModal(${_catalog.CatalogID})">Hủy</button>
                        <button class="btn" onclick="deleteCatalog(${_catalog.CatalogID})">Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    <button id="edit-catalog" class="btn" onclick="openEditCatalogModal(event, ${_catalog.CatalogID})">Sửa</button>
    <div class="edit-catalog-modal modal">

        <!-- Modal content -->
        <div class="modal-content catalog-modal-content">
            <!-- <span class="close">&times;</span> -->
            <div class="form-catalog">
                <div class="catalog-input">
                    <input type="text" name="CatalogName" placeholder="Tên danh mục" class='catalog-value type-input'>

                </div>
                <br>
                <div>
                    <button class="btn btn-cancel" onclick="closeEditCatalogModal(${_catalog.CatalogID})">Hủy</button>
                    <button class="btn" onclick="editCatalog(event, ${_catalog.CatalogID})">Gửi</button>

                </div>
            </div>
        </div>
    </div>
</td>
</tr>`;
            });
            catalog += `</tbody>
    </table>
</div></div>`;
            this.appendChild(createElementByText(catalog));
        };

        catalogService.getListCatalog().then((result) => {
            console.log(result);
            addCatalogTable(result);
        });
    }

}

export default [CatalogAdElement];
