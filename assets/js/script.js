function vote(faction){

// blocca doppio voto
if(localStorage.getItem("vote")) return;

localStorage.setItem("vote", faction);

// effetto click
document.body.style.transform = "scale(0.98)";

setTimeout(() => {
window.location.href = "grazie.html";
}, 600);

}
