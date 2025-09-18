// Bokbibliotek JavaScript - INNEHÅLLER FEL SOM SKA FIXAS!

const bookForm = document.getElementById("book-form");
const messageDiv = document.getElementById("message");
const booksList = document.getElementById("books-list");

// FEL 6: Form submittar normalt istället för att använda fetch
bookForm.addEventListener("submit", function (event) {
  // Kommentera bort preventDefault för att skapa felet
  // event.preventDefault();

  const formData = new FormData(bookForm);

  // FEL 7: Skickar FormData istället för JSON
  fetch("/add-book", {
    method: "POST",
    body: formData,
    // FEL 8: Saknar Content-Type header för JSON
  })
    .then((response) => response.json())
    .then((data) => {
      // FEL 9: Ingen hantering av response
      console.log("Bok tillagd:", data);
    })
    .catch((error) => {
      console.error("Fel:", error);
    });
});

// FEL 10: Funktion för att ladda böcker finns inte
function loadBooks() {
  // Denna funktion ska implementeras senare
  console.log("loadBooks() är inte implementerad än");
}

// FEL 11: loadBooks() anropas aldrig
// loadBooks();
