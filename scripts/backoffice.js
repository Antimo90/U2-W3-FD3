const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const code =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwZDA0Zjc4Y2RkZjAwMTU1ZDY3ZjIiLCJpYXQiOjE3NTIyMjM4MjMsImV4cCI6MTc1MzQzMzQyM30.E4JM_v1MVQ8iK0v6E2dJ8anByWKEe4Q195PaI4RnZmU";

const parameters = new URLSearchParams(location.search);
const eventId = parameters.get("eventId");
if (eventId) {
  fetch(endpoint + "/" + eventId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: code,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nel recupero dati del singolo concerto");
      }
    })
    .then((details) => {
      document.getElementById("name").value = details.name;
      document.getElementById("description").value = details.description;
      document.getElementById("brand").value = details.brand;
      document.getElementById("imageUrl").value = details.imageUrl;
      document.getElementById("price").value = details.price;
    })
    .catch((err) => {
      console.log(err);
    });
}

class Videogame {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

// anno corrente nel footer
const yearInFooter = function () {
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear();
};

const videogameForm = document.getElementById("videogame-form");
videogameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("imageUrl");
  const priceInput = document.getElementById("price");

  const videogameToSave = new Videogame(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imageUrlInput.value,
    priceInput.value
  );
  console.log(videogameToSave);

  let endpointToUse;
  if (eventId) {
    endpointToUse = endpoint + "/" + eventId;
  } else {
    endpointToUse = endpoint;
  }
  let methodToUse;
  if (eventId) {
    methodToUse = "PUT";
  } else {
    methodToUse = "POST";
  }
  fetch(endpointToUse, {
    method: methodToUse,
    body: JSON.stringify(videogameToSave),
    headers: {
      "Content-Type": "application/json",
      Authorization: code,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("OPERAZIONE COMPLETATA!");
        videogameForm.reset();
      } else {
        throw new Error(`Errore HTTP! Status: ${response.status}`);
      }
    })
    .catch((err) => {
      alert("ERRORE");
      console.log("ERRORE", err);
    });
});

const resetVideogame = function () {
  videogameForm.reset();
};

yearInFooter();
