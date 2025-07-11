const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const code =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwZDA0Zjc4Y2RkZjAwMTU1ZDY3ZjIiLCJpYXQiOjE3NTIyMjM4MjMsImV4cCI6MTc1MzQzMzQyM30.E4JM_v1MVQ8iK0v6E2dJ8anByWKEe4Q195PaI4RnZmU";

// anno corrente nel footer
const yearInFooter = function () {
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear();
};

// effettuiamo una chiamata per recuperare i giochi
const getEvents = function () {
  fetch(endpoint, {
    headers: {
      Authorization: code,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Errore HTTP! Status: ${response.status}`);
      }
    })
    .then((data) => {
      document.getElementById("spinner-container").classList.add("d-none");
      console.log(data);
      const row = document.getElementById("videogame-row");
      if (data.length === 0) {
        row.innerHTML = `
          <div class="col">
            <p class="text-center">Al momento non ci sono giochi disponibili</p>
          </div>
        `;
      } else {
        data.forEach((event) => {
          row.innerHTML += `
          <div class= "col">
            <div class="card h-100 d-flex flex-column">
                <img src="${event.imageUrl}" class="card-img-top" alt="immagine default videogame">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text ">${event.brand}</p>
                    <p class="card-text flex-grow-1">${event.description}</p>
                    <p class="card-text">Costo - ${event.price} $</p>
                    <a href="./detail.html?eventId=${event._id}" class="btn btn-primary">Vai ai dettagli</a>
                </div>
              </div>
            </div>
          `;
        });
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

yearInFooter();

getEvents();
