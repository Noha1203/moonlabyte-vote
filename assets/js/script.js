const API_URL = "https://script.google.com/macros/s/AKfycbwMcBN0KAm19vmPoJZ5fpgbHFhFzELgCuA8VldCe6aO1Un4t8SNQqkdHvIWDfeGi5-V-Q/exec";

// Se ha già votato → redirect diretto
const savedFaction = localStorage.getItem("vote");

if (savedFaction && !window.location.pathname.includes("grazie.html")) {
    window.location.href = "grazie.html?faction=" + savedFaction;
}

// ID univoco browser
function getDeviceId() {

    let id = localStorage.getItem("deviceId");

    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("deviceId", id);
    }

    return id;
}

// FUNZIONE VOTO
async function vote(faction) {

    // blocco doppio voto
    if (localStorage.getItem("vote")) {
        window.location.href = "grazie.html?faction=" + localStorage.getItem("vote");
        return;
    }

    navigator.vibrate?.([30, 60, 120]);

    const payload = {
        faction: faction,
        deviceId: getDeviceId()
    };

    try {

        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        const data = await res.json().catch(() => null);

        console.log("Risposta server:", data);

        if (!data || data.success === false) {
            alert(data?.message || "Errore nel voto");
            return;
        }

        localStorage.setItem("vote", faction);

        window.location.href = "grazie.html?faction=" + faction;

    } catch (err) {

        console.error(err);
        alert("Errore di connessione al server.");

    }
}
