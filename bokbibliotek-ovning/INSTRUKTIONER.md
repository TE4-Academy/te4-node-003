# Bokbibliotek Övning - Form, Fetch & Node.js Server

## Beskrivning

Denna övning fokuserar på att förstå kommunikation mellan klient och server med fokus på:

- HTML formulär
- JavaScript fetch API
- Node.js HTTP server
- JSON vs form-data hantering

## Uppgifter - Fixa felen steg för steg

### STEG 1: Form vs JSON Problem

**Problem**: Formuläret skickar form-data men servern förväntar sig JSON.

**Vad som händer**: Servern kraschar när den försöker använda `JSON.parse()` på form-data.

**Uppgift**:

1. Kör servern och testa att skicka in en bok
2. Se felet i konsolen
3. Fixa genom att ändra JavaScript så att den skickar JSON istället för form-data

**Tips**: Du behöver:

- Använda `event.preventDefault()` för att stoppa normal form submit
- Skapa ett objekt av form-datan
- Konvertera till JSON med `JSON.stringify()`
- Sätta rätt `Content-Type` header

### STEG 2: Lägg till rätt headers

**Problem**: Fetch skickar inte rätt Content-Type header för JSON.

**Uppgift**: Lägg till rätt headers i fetch-anropet:

```javascript
headers: {
    'Content-Type': 'application/json'
}
```

### STEG 3: Användarfeedback

**Problem**: Användaren får ingen feedback när en bok läggs till.

**Uppgift**:

1. Visa meddelande när bok läggs till framgångsrikt
2. Visa felmeddelande om något går fel
3. Rensa formuläret efter framgångsrik submit

**Tips**: Använd `#message` div:en och CSS-klasserna `.success` och `.error`

### STEG 4: Implementera GET endpoint för böcker

**Problem**: Det finns inget sätt att hämta sparade böcker.

**Uppgift**: Lägg till en GET endpoint `/api/books` i servern som:

1. Läser books.json filen
2. Returnerar alla böcker som JSON
3. Returnerar tom array om filen inte finns

### STEG 5: Visa böcker på sidan

**Problem**: `loadBooks()` funktionen är inte implementerad.

**Uppgift**: Implementera funktionen som:

1. Hämtar böcker från `/api/books` endpoint
2. Visar dem i `#books-list` div:en
3. Anropar funktionen när sidan laddas

**HTML struktur för varje bok**:

```html
<div class="book-item">
  <div class="book-title">Titel</div>
  <div class="book-author">av Författare</div>
  <span class="book-genre">Genre</span>
</div>
```

## Extrauppgifter (Feature Requests)

### A. Ta bort bok-funktion

- Lägg till en "Ta bort" knapp för varje bok
- Implementera DELETE endpoint på servern
- Uppdatera listan efter borttagning

### B. Enkel sökning/filtrering

- Lägg till sökruta som filtrerar böcker baserat på titel eller författare
- Filtrera i realtid medan användaren skriver

### C. Validering

- Kontrollera att alla fält är ifyllda
- Kontrollera att titeln är minst 2 tecken lång
- Visa tydliga felmeddelanden

## Viktiga koncept att förstå

1. **Form-data vs JSON**: Skillnaden mellan vad HTML formulär skickar naturligt och vad modern web utveckling använder
2. **Content-Type headers**: Vikten av att tala om för servern vad man skickar
3. **Fetch API**: Moderna sätt att kommunicera med servern
4. **HTTP metoder**: GET för att hämta data, POST för att skicka ny data
5. **Client-Server kommunikation**: Hur klient och server pratar med varandra

## Testning

1. Starta servern: `npm start` eller `node server.js`
2. Öppna webbläsaren på `http://localhost:3043`
3. Testa varje steg genom att lägga till böcker och se att de sparas/visas

## Felsökning

- Kontrollera konsolen i webbläsaren för JavaScript fel
- Kontrollera terminalen för server fel
- Använd Network tab i DevTools för att se HTTP requests
