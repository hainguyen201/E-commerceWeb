var createElementByText = (textHTML) => {
    let template = document.createElement('template');
    textHTML = textHTML.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = textHTML;
    return template.content.firstChild;
}

var notifSuccess = (mes = " Successfully ") => {
    const notification = document.getElementById("notification");
    notification.innerHTML = `<div id="notif-content" class="notification-ok">
    <img src="/src/assets/img/icon-ok.png" class="icon20" style=" border-radius: 10px;" alt="icon-ok">
    <p style="white-space: nowrap; font-size: 14px;color: blue;">
        ${mes}
    </p>
</div>`;
    setTimeout(() => {
        notification.innerHTML = '';
    }, 2500);
}

var notifFailure = (mes = " Failure ") => {
    const notification = document.getElementById("notification");
    notification.innerHTML = `<div id="notif-content" class="notification-ok">
    <img src="/src/assets/img/icon-failure.png" class="icon20" style="border-radius: 10px;" alt="icon-ok">
    <p style="white-space: nowrap; font-size: 14px;color: red;">
    ${mes}
    </p>
</div>`;
    setTimeout(() => {
        notification.innerHTML = '';
    }, 2500);
}

// var filterObj = (obj) => {
//     for(property in obj){
//         if (obj[property] == null || obj[property] == '' || obj[property] == undefined || obj[property] == 'null' ||obj[property] == 'undefined') {
//             if (typeof obj[property] == '') {
                
//             }
//         }
//     }
// }