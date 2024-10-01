
function getSubForm(){
    var subform = document.getElementById("subscribe_form");
    console.log(subform.getAttributeNode("id").value);
    return subform;
}

function alertSubFunc() {
    Event.preventDefault();
    let alrt = "Subscriber added: " + document.getElementById("emailtextbox").value;
    alert(alrt);
}

window.onload = function() {
    getSubForm().addEventListener("submit", alertSubFunc);
}
    