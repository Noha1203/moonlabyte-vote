const API_URL = "https://script.google.com/macros/s/AKfycby5b1efVYOhOCnBgnUcsZDgM-bUjmtJ-5XFPc2fY7QMMjAxhHnhVcC_c38Zx13X8Yzm/exec";

// Se l'utente ha già votato, lo rimanda subito alla sua fazione
const savedFaction = localStorage.getItem("vote");

if (savedFaction && !window.location.pathname.includes("grazie.html")) {
    window.location.href = "grazie.html?faction=" + savedFaction;
}

// Genera un ID univoco per questo browser
function getDeviceId() {

    let id = localStorage.getItem("deviceId");

    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("deviceId", id);
    }

    return id;
}

async function vote(faction) {

    // Se ha già votato
    if (localStorage.getItem("vote")) {
        window.location.href = "grazie.html?faction=" + localStorage.getItem("vote");
        return;
    }

    navigator.vibrate?.([40, 60, 120]);

    const payload = {
        faction: faction,
        deviceId: getDeviceId()
    };

    try {

        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload)
        });

        localStorage.setItem("vote", faction);

        window.location.href = "grazie.html?faction=" + faction;

    } catch (err) {

        alert("Errore di connessione.");

        console.error(err);

    }

}
