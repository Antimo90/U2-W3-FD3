const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const code =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwZDA0Zjc4Y2RkZjAwMTU1ZDY3ZjIiLCJpYXQiOjE3NTIyMjM4MjMsImV4cCI6MTc1MzQzMzQyM30.E4JM_v1MVQ8iK0v6E2dJ8anByWKEe4Q195PaI4RnZmU";
// Seleziona il bottone di eliminazione
const deleteTriggerButton = document.querySelector(".btn.btn-danger");
// Seleziona il bottone di conferma all'interno del modale
const confirmDeleteButton = document.getElementById("confirmDeleteButton");
// Inizializza il modale di Bootstrap
const deleteModal = new bootstrap.Modal(
  document.getElementById("confirmDeleteModal")
);
// anno corrente nel footer
const yearInFooter = function () {
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear();
};

const parameters = new URLSearchParams(location.search);
const eventId = parameters.get("eventId");

fetch(endpoint + "/" + eventId, {
  headers: {
    Authorization: code,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nel recupero dettaglio evento");
    }
  })
  .then((details) => {
    console.log("dettagli", details);
    document.getElementById("spinner-container").classList.add("d-none");
    document.querySelector(".card .card-img-top").src = details.imageUrl;
    document.querySelector(".card .card-title").innerText = details.name;
    document.querySelector(".card .card-text:nth-of-type(1)").innerText =
      details.brand;
    document.querySelector(".card .card-text:nth-of-type(2)").innerText =
      details.description;
    document.querySelector(".card .card-text:nth-of-type(3)").innerText =
      details.price;
  })
  .catch((err) => {
    console.log("ERRORE", err);
  });

const deleteVideogame = function () {
  fetch(endpoint + "/" + eventId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: code,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("ELIMINAZIONE AVVENUTA CON SUCCESSO");
        window.location.href = "./index.html";
      } else {
        throw new Error("Errore in fase di eliminazione");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

// Quando l'utente clicca sul bottone "ELIMINA" nella card, apri il modale
deleteTriggerButton.addEventListener("click", () => {
  deleteModal.show();
});
// Quando l'utente clicca sul bottone "Elimina" all'interno del modale, esegui deleteVideogame()
confirmDeleteButton.addEventListener("click", () => {
  // Prima di eliminare, nascondi il modale
  deleteModal.hide();
  // Esegui la funzione di eliminazione
  deleteVideogame();
});

const editVideogame = function () {
  location.assign("/backoffice.html?eventId=" + eventId);
};

const resetVideogame = function () {
  videogameForm.reset();
};

yearInFooter();
