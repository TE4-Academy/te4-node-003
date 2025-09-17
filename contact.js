//låt oss börja med att ta kontrollen över Skicka-knappens funktion
//vi gillar inte default submit

console.log("Hello from contact.js");

document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("btn clicked");

  const formData = new FormData(this);
  const data = {
    message: formData.get("msg"),
  };

  console.log(data);

  fetch("/submit-contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Server response: ", result);
    });
});
