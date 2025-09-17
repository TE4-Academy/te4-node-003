# Node.js Kontaktformulär - Uppgiftsguide

## Översikt

Bygg ett fungerande kontaktformulär med server-side datalagring med Node.js och ES6 JavaScript.

## Startfiler

Du har fått följande filer:

- `index.html`, `about.html`, `contact.html` - Grundläggande HTML-sidor
- `main.css` - Styling
- `contact.js` - Klient-side JavaScript (delvis komplett)
- `server.js` - Node.js server (delvis komplett)

## Uppgiftssteg

### Steg 1: Fixa server-svarsformat

**Problem:** Servern skickar vanlig text men klienten förväntar sig JSON.

**Fil:** `server.js`
**Hitta denna kod:**

```javascript
//POST hantering
if (method === "POST" && url === "/submit-contact") {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("POST mottaget");
  return;
}
```

**Ersätt med:**

```javascript
//POST hantering
if (method === "POST" && url === "/submit-contact") {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "success", message: "POST mottaget" }));
  return;
}
```

### Steg 2: Lägg till stöd för JavaScript-filer

**Problem:** Servern hanterar inte `.js`-filer korrekt.

**Fil:** `server.js`
**Hitta denna kod:**

```javascript
const data = fs.readFileSync(filePath);
if (filePath.endsWith(".css")) {
  res.writeHead(200, { "Content-Type": "text/css" });
} else if (filePath.endsWith(".html")) {
  res.writeHead(200, { "Content-Type": "text/html" });
}
res.end(data);
```

**Ersätt med:**

```javascript
const data = fs.readFileSync(filePath);
if (filePath.endsWith(".css")) {
  res.writeHead(200, { "Content-Type": "text/css" });
} else if (filePath.endsWith(".html")) {
  res.writeHead(200, { "Content-Type": "text/html" });
} else if (filePath.endsWith(".js")) {
  res.writeHead(200, { "Content-Type": "application/javascript" });
}
res.end(data);
```

### Steg 3: Lägg till resultat-visningselement

**Fil:** `contact.html`
**Hitta denna kod:**

```html
<form id="myForm">
  <textarea id="msg" name="msg" required></textarea>
  <button id="btnMessage" type="submit">Skicka</button>
</form>
<script src="contact.js"></script>
```

**Ersätt med:**

```html
<form id="myForm">
  <textarea id="msg" name="msg" required></textarea>
  <button id="btnMessage" type="submit">Skicka</button>
</form>
<div id="result"></div>
<script src="contact.js"></script>
```

### Steg 4: Visa server-svar

**Fil:** `contact.js`
**Hitta denna kod:**

```javascript
.then((response) => response.json())
.then((result) => {
  console.log("Server response: ", result);
});
```

**Ersätt med:**

```javascript
.then((response) => response.json())
.then((result) => {
  console.log("Server response: ", result);
  document.getElementById("result").innerHTML = result.message;
});
```

### Steg 5: Lägg till datalagring i JSON-fil

**Problem:** Kontaktdata sparas inte någonstans.

**Fil:** `server.js`
**Hitta denna kod:**

```javascript
//POST hantering
if (method === "POST" && url === "/submit-contact") {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "success", message: "POST mottaget" }));
  return;
}
```

**Ersätt med:**

```javascript
//POST hantering
if (method === "POST" && url === "/submit-contact") {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const contactData = JSON.parse(body);
    contactData.timestamp = new Date().toISOString();

    const filePath = path.join(__dirname, "contacts.json");
    let contacts = [];

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      contacts = JSON.parse(fileData);
    }

    contacts.push(contactData);
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "success", message: "POST mottaget" }));
  });
  return;
}
```

### Steg 6: Förbättra designen med CSS

**Fil:** `main.css`
**Lägg till följande styling för formuläret:**

```css
form {
  max-width: 500px;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

textarea {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
}

button {
  background: #007cba;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #005a87;
}

#result {
  margin-top: 15px;
  padding: 10px;
  background: #e8f5e8;
  border-radius: 4px;
  color: #2d5a2d;
  display: none;
}

#result:not(:empty) {
  display: block;
}
```

## Testa ditt arbete

1. Starta servern:

   ```
   node server.js
   ```

2. Öppna webbläsaren på: `http://localhost:3042/contact.html`

3. Fyll i formuläret och skicka

4. Kontrollera att:
   - Meddelandet "POST mottaget" visas på sidan
   - En `contacts.json`-fil skapas med din data
   - Konsolen visar server-svaret

## Förväntat resultat

- Fungerande kontaktformulär som sparar data till JSON-fil
- Klienten visar bekräftelsemeddelande
- Alla filer serveras korrekt av servern
- Snyggt utseende med CSS-styling

## Viktiga lärdomar

- HTTP Content-Type headers
- JSON parsing och stringify
- Filsystemoperationer i Node.js
- Asynkron request-hantering
- Klient-server kommunikation med fetch API
- CSS för formulärdesign
