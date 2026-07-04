const API_URL = "https://script.google.com/macros/s/AKfycbxeyDxzyIrnbv8nNtEdBn1zrkMwSiP7GI-rvOOBwh-cKZ5ePnaqGCKXrZdkiEezXv55Zg/exec";

function getDeviceId() {
    let id = localStorage.getItem("deviceId");

    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("deviceId", id);
    }

    return id;
}

async function vote(faction) {

    const payload = {
        faction: faction,
        deviceId: getDeviceId()
    };

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success) {

            window.location.href = "grazie.html";

        } else {

            alert(result.message || result.error);

        }

    } catch (err) {

        console.error(err);
        alert("Errore di connessione.");

    }

}
