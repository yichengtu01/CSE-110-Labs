const SubformID = "subscribe_form";

function getSubForm(){
    var subform = document.getElementById(SubformID);
    console.log(subform.getAttributeNode("id").value);
    return subform;
}

function alertSubFunc(){
    alert("Hello! I am an alert box!!");
}

window.onload = function() {
    getSubForm().addEventListener("submit", alertSubFunc);
}
    