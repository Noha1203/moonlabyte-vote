const API_URL = "https://script.google.com/macros/s/AKfycbykICEzgMnkIU5cwyJo-GAkSM3mZJ31dlJB7uM-GEG_DnCj3Y3TQZFcSLiwnHfoDGko/exec";

// Genera un ID univoco per questo browser
function getDeviceId() {
    let id = localStorage.getItem("deviceId");

    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("deviceId", id);
    }

    return id;
}

// Se l'utente ha già votato, lo rimanda direttamente alla sua fazione
const savedVote = localStorage.getItem("vote");

if (savedVote && !window.location.pathname.includes("grazie.html")) {
    window.location.href = "grazie.html?faction=" + savedVote;
}

async function vote(faction) {

    const payload = {
        faction: faction,
        deviceId: getDeviceId()
    };

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success) {

            // salva la fazione scelta
            localStorage.setItem("vote", faction);

            // vai alla pagina della fazione
            window.location.href = "grazie.html?faction=" + faction;

        } else {

            alert(result.message || "Hai già votato.");

            // Se aveva già votato, rimandalo comunque alla sua fazione
            const voto = localStorage.getItem("vote");

            if (voto) {
                window.location.href = "grazie.html?faction=" + voto;
            }

        }

    } catch (error) {

        console.error(error);
        alert("Errore di connessione con il server.");

    }

}
