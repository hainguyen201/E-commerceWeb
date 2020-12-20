var createElementByText = (textHTML) => {
    let template = document.createElement('template');
    textHTML = textHTML.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = textHTML;
    return template.content.firstChild;
};

let animationNotif = (notification) => {
    notification.style.top == '-40px';
    let a = 1;
    let id = setInterval(() => {
        a += 1;
        if (notification.style.top == '20px') {
            clearInterval(id);
            let timeOut = setTimeout(() => {
                let id1 = setInterval(() => {
                    if (notification.style.top == '-40px') {
                        clearInterval(id1);
                        clearTimeout(timeOut);
                    }
                    a -= 1;
                    notification.style.top = `${a}px`;
                }, 10);
            }, 3000);
        }
        notification.style.top = `${a}px`;
    }, 5);
};

var notifSuccess = (mes = ' Successfully ') => {
    const oldNotification = document.getElementById('notification');
    const notification = oldNotification.cloneNode();
    oldNotification.parentNode.replaceChild(notification, oldNotification);
    notification.innerHTML = `<div id="notif-content" class="notification-ok">
    <img src="/src/assets/img/icon-ok.png" class="icon20" style=" border-radius: 10px;" alt="icon-ok">
    <p style="white-space: nowrap; font-size: 14px;color: blue;">
        ${mes}
    </p>
</div>`;
    animationNotif(notification);
};

var notifFailure = (mes = ' Failure ') => {
    const oldNotification = document.getElementById('notification');
    const notification = oldNotification.cloneNode();
    oldNotification.parentNode.replaceChild(notification, oldNotification);
    notification.innerHTML = `<div id="notif-content" class="notification-ok">
    <img src="/src/assets/img/icon-failure.png" class="icon20" style="border-radius: 10px;" alt="icon-ok">
    <p style="white-space: nowrap; font-size: 14px;color: red;">
    ${mes}
    </p>
</div>`;
    animationNotif(notification);
};

var isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
// var filterObj = (obj) => {
//     for(property in obj){
//         if (obj[property] == null || obj[property] == '' || obj[property] == undefined || obj[property] == 'null' ||obj[property] == 'undefined') {
//             if (typeof obj[property] == '') {

//             }
//         }
//     }
// }

var isEmptyValue = (value) => {
    if (
        value == '' ||
        value == null ||
        value == undefined ||
        value == {} ||
        value == []
    ) {
        return true;
    }
    return false;
};
