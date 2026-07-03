function vote(faction){

// vibrazione (se supportata dal telefono)
navigator.vibrate(80);

// salva voto
localStorage.setItem("vote", faction);

// redirect con parametro
window.location.href = "grazie.html?faction=" + faction;

}
