function vote(faction){

localStorage.setItem("vote", faction);

// redirect con parametro
window.location.href = "grazie.html?faction=" + faction;

}
