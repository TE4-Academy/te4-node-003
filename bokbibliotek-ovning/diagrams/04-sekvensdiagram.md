# Sekvensdiagram - Komplett tidslinje för bokregistrering

Detta diagram visar den kronologiska ordningen av alla händelser från det att användaren klickar submit till att boken visas i listan.

```mermaid
sequenceDiagram
    participant U as 👤 Användare
    participant F as 📝 Formulär
    participant JS as ⚙️ JavaScript
    participant HTTP as 🌐 HTTP
    participant S as 🖥️ Server
    participant FS as 📁 Filsystem
    participant UI as 🖼️ UI

    Note over U,UI: Lägg till ny bok - Komplett flöde

    U->>F: Fyller i bokdata
    U->>F: Klickar "Lägg till bok"

    F->>JS: submit event
    JS->>JS: preventDefault()

    Note over JS: Samla och validera formulärdata
    JS->>JS: Skapa book objekt
    JS->>JS: JSON.stringify(book)

    JS->>HTTP: fetch('/add-book', {method: 'POST', ...})

    Note over HTTP,S: HTTP Kommunikation
    HTTP->>S: POST /add-book
    Note over S: Content-Type: application/json

    S->>S: Parsa JSON body
    S->>S: Lägg till ID och timestamp

    S->>FS: Läs books.json
    FS-->>S: Befintliga böcker (eller tom array)

    S->>S: Lägg till ny bok i array

    S->>FS: Skriv uppdaterad books.json
    FS-->>S: Skrivning klar

    S->>HTTP: HTTP 200 + JSON response
    HTTP-->>JS: Promise resolves med Response

    JS->>JS: response.json()
    JS->>JS: Visa success meddelande
    JS->>F: Rensa formulär

    Note over JS,UI: Uppdatera boklistan
    JS->>HTTP: fetch('/api/books')
    HTTP->>S: GET /api/books

    S->>FS: Läs books.json
    FS-->>S: Alla böcker

    S->>HTTP: HTTP 200 + JSON array
    HTTP-->>JS: Promise resolves med böcker

    JS->>UI: Rendera alla böcker
    UI->>U: Visar uppdaterad lista

    Note over U: Användaren ser sin nya bok!
```

## Alternativt flöde - När fel uppstår:

```mermaid
sequenceDiagram
    participant U as 👤 Användare
    participant JS as ⚙️ JavaScript
    participant HTTP as 🌐 HTTP
    participant S as 🖥️ Server
    participant UI as 🖼️ UI

    Note over U,UI: Felhantering scenarios

    U->>JS: Skickar felaktig data

    alt Nätverksfel
        JS->>HTTP: fetch() anrop
        HTTP--xJS: Network error
        JS->>UI: Visa "Nätverksfel" meddelande

    else Server error
        JS->>HTTP: fetch() med fel data
        HTTP->>S: POST med felaktig JSON
        S--xHTTP: 500 Server Error
        HTTP-->>JS: Error response
        JS->>UI: Visa "Serverfel" meddelande

    else Validation error
        JS->>JS: Validera formulärdata
        JS--xJS: Validering misslyckas
        JS->>UI: Visa "Fyll i alla fält" meddelande
    end

    Note over UI: Användaren ser felmeddelande
    UI->>U: Röd error-box
```

## Tidsaspekter att diskutera:

### 1. **Synkron vs Asynkron kod:**

- **Synkron**: Blockerar tråden, väntar på resultat
- **Asynkron**: Fortsätter medan operation pågår

### 2. **Event Loop:**

- JavaScript är single-threaded
- Asynkrona operationer hanteras av Web APIs
- Callbacks placeras i event queue

### 3. **Promise states:**

- **Pending**: Operation pågår
- **Fulfilled**: Operation lyckades
- **Rejected**: Operation misslyckades

### 4. **Race conditions:**

- Vad händer om användaren klickar submit flera gånger snabbt?
- Bör man disabla knappen under request?

## Diskussionsfrågor:

1. **Varför är fetch() asynkront?** (I/O operationer tar tid)
2. **Vad händer om servern är långsam?** (Loading states)
3. **Hur hantera flera samtidiga requests?** (Request queueing)
4. **Varför validera på både klient och server?** (Säkerhet vs UX)
