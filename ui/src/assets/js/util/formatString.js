﻿/*
    Hàm thực hiện định dạng kiểu tiền khi người dùng nhập ngoài màn hình (100.111.222)
*/
formatCurrency = function (number) {
    var n = number.split('').reverse().join('');
    var n2 = n.replace(/\d\d\d(?!$)/g, '$&.');
    return n2.split('').reverse().join('');
};

/*
Chuyển cộng chuỗi sang kiểu truyền parameter
*/
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}

/*
Thực hiện định dạng kiểu money format 100.111.222
*/
Number.prototype.formatMoney = function () {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

String.prototype.spaceTo_ = function(){
    return this.toString().replace(/ /g,'_');
}

/*
Thực hiện định dạng dữ liệu kiểu thời gian theo định dạng dd/MM/yyyy
*/
Date.prototype.formatddMMyyyy = function () {
    var day = this.getDate() + '';
    if (day.length == 1) {
        day = '0' + day;
    }
    var month = this.getMonth() + 1 + '';
    if (month.length == 1) {
        month = '0' + month;
    }
    var year = this.getFullYear();
    return day + '/' + month + '/' + year;
};


