// Contatore visite salvato in localStorage
if (!localStorage.getItem("visite")) localStorage.setItem("visite", "0");

function mostraAlert() {
    alert("CIAO A TUTTI, \nho creato questa pagina web per decidere insieme quando andare a vedere il mio film preferito. \nps: chissà come è venuta sta pagina");
}

// Validazione e salvataggio nome
function salvaNome() {
    const nomeInput = document.getElementById("nome").value.trim();
    const pattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!pattern.test(nomeInput)) {
        document.getElementById("error").innerText = "Il valore inserito non è corretto";
        return false;
    } else {
        localStorage.setItem("nome", nomeInput);
        // Incremento contatore visite
        let visite = parseInt(localStorage.getItem("visite"));
        localStorage.setItem("visite", (visite + 1).toString());
        window.location.href = "saluto.html";
        return false;
    }
}

// Visualizza saluto e info nella pagina saluto.html
window.addEventListener("load", () => {
    if (document.getElementById("salutoContainer")) {
        const nome = localStorage.getItem("nome") || "Amico";
        const visite = localStorage.getItem("visite") || "0";
        const oggi = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const dataFormattata = oggi.toLocaleDateString('it-IT', options);

        document.getElementById("salutoContainer").innerHTML = `
            <h1 class="display-4 text-light text-bg-primary p-4">Ciao, <span class="fw-bold">${nome}</span>!</h1>
            <p class="lead mt-4 text-primary bg-body-tertiary bg-opacity-75">Oggi è: <span class="fw-bold">${dataFormattata}</span></p>
            <p class="mt-3 fw-bold">Numero totale di visite a questa pagina: <span class="fw-bold text-success">${visite}</span></p>
            <a class="btn btn-secondary mt-4" href="index.html"><i class="bi bi-house m-1"></i>Torna alla pagina iniziale</a>
            <a class="btn btn-secondary mt-4" href="questionario.html">Rispondi al questionario<i class="bi bi-pen m-1"></i></a>
        `;
    }
});

// Scelta cinema
function scegliCinema() {
    const scelta = document.querySelector('input[name="scelta"]:checked').value;
    if (scelta === "si") {
        window.location.href = "giorni.html";
    } else {
        window.location.href = "peccato.html";
    }
    return false;
}

// Scelta giorno
function scegliGiorno() {
    const giorno = document.querySelector('input[name="giorno"]:checked').value;
    localStorage.setItem("giorno", giorno);
    window.location.href = "ottimo.html";
    return false;
}

// Google Form
function inviaGoogleForm() {
    const nome = document.getElementById("nomeForm").value;
    const scelta = document.querySelector('input[name="scelta"]:checked').value;

    // URL del Google Form (da sostituire con il tuo)
    const urlForm = "https://docs.google.com/forms/d/e/1FAIpQLSeAtSA5BO9or2JaX95sSy0DzbZhj1f6yeBfAzrmS_mAgcLtiA/viewform?embedded=true";

    // ID dei campi del form (ottenuti ispezionando il form)
    const data = new FormData();
    data.append("entry.830603820", nome);   // campo Nome
    data.append("entry.457465629", scelta); // campo Scelta cinema

    fetch(urlForm, {
        method: "POST",
        mode: "no-cors", // Google Form non permette CORS, ma POST funziona comunque
        body: data
    }).then(() => {
        // Reindirizza l’utente alla pagina successiva
        if (scelta === "si") {
            window.location.href = "giorni.html";
        } else {
            window.location.href = "peccato.html";
        }
    });

    return false; // previene refresh pagina
}

function inviaGiorno() {
    const giorno = document.querySelector('input[name="giorno"]:checked').value;

    const urlForm = "https://docs.google.com/forms/d/e/1FAIpQLSeAtSA5BO9or2JaX95sSy0DzbZhj1f6yeBfAzrmS_mAgcLtiA/viewform?embedded=true";

    const data = new FormData();
    data.append("entry.1656114507", giorno); // ID campo Giorno

    fetch(urlForm, { method: "POST", mode: "no-cors", body: data })
        .then(() => {
            // Salva anche localmente
            localStorage.setItem("giornoScelto", giorno);
            window.location.href = "ottimo.html";
        });

    return false;
}