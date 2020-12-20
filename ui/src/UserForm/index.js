function submitUser() {
    var userinputs = document.getElementsByClassName('user-input-value');
    var i = 0;
    var usersubmit = {}
    for (i = 0; i < userinputs.length; i++) {
        usersubmit[userinputs[i]['name']] = userinputs[i].value;
    }
    console.log(usersubmit)
}