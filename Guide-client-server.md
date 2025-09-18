# Client-Server Kommunikation med Node.js

Detta dokument förklarar steg-för-steg hur client-server kommunikation fungerar med vårt contact-formulär exempel.

## 1. Övergripande systemet - Vad vi har byggt

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#007bff'}}}%%
graph TD
    A["Webblasare Chrome Firefox"] --> B["HTML Sida contact.html"]
    B --> C["Formular med textarea"]
    C --> D["JavaScript contact.js"]
    D --> E["Node.js Server server.js"]
    E --> F["Fil contacts.json"]

    style A fill:#e6f3ff,color:#000
    style E fill:#e6ffe6,color:#000
    style F fill:#fff2e6,color:#000
```

**Förklaring:**

- **Webbläsaren** = Där användaren ser hemsidan
- **HTML** = Strukturen på sidan (formulär, knappar)
- **JavaScript** = Koden som gör sidan interaktiv
- **Node.js Server** = Programmet som tar emot data från formuläret
- **JSON-fil** = Där vi sparar meddelanden från användare

---

## 2. Vad händer när användaren skickar formuläret?

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#28a745'}}}%%
graph TD
    A["Anvandare skriver meddelande"] --> B["Klickar Skicka"]
    B --> C["preventDefault stoppar normal submit"]
    C --> D["JavaScript samlar formulardata"]
    D --> E["Konverterar till JSON"]
    E --> F["fetch skickar POST till server"]
    F --> G["Server tar emot och sparar"]
    G --> H["Server skickar svar tillbaka"]
    H --> I["JavaScript visar resultat pa sidan"]

    style A fill:#e6ffe6,color:#000
    style F fill:#fffacd,color:#000
    style G fill:#ffe6e6,color:#000
    style I fill:#e6f9ff,color:#000
```

**Varför preventDefault?**

- Utan den: Formuläret skickar data på "gammalt vis" och sidan laddas om
- Med den: JavaScript kan ta kontroll och skicka data med fetch

---

## 3. Teknisk fördjupning - GET vs POST

### GET Requests - Hämta filer

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#dc3545'}}}%%
graph TD
    A1["Webblasare ber om fil"] --> A2["server.js laser fil fran disk"]
    A2 --> A3["Skickar tillbaka HTML CSS JS"]

    style A1 fill:#e6f3ff,color:#000
    style A2 fill:#ffe6e6,color:#000
    style A3 fill:#e6ffe6,color:#000
```

### POST Requests - Skicka data

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#dc3545'}}}%%
graph TD
    B1["JavaScript skickar data till server"] --> B2["server.js tar emot JSON data"]
    B2 --> B3["Sparar i contacts.json"]
    B3 --> B4["Skickar bekraftelse tillbaka"]

    style B1 fill:#fffacd,color:#000
    style B2 fill:#ffe6e6,color:#000
    style B3 fill:#e6ffe6,color:#000
    style B4 fill:#e6f9ff,color:#000
```

**GET = Hämta saker:**

- När vi skriver `localhost:3042/contact.html` i webbläsaren
- Servern hittar filen och skickar den till oss
- Som att "låna en bok från biblioteket"

**POST = Skicka saker:**

- När vi skickar formulärdata till servern
- Servern gör något med datan (sparar den)
- Som att "lämna in en blankett på biblioteket"

---

## 4. Fetch API - Modernt sätt att kommunicera

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#28a745'}}}%%
sequenceDiagram
    participant U as "Anvandare"
    participant JS as "JavaScript"
    participant S as "Server"
    participant F as "contacts.json"

    U->>JS: Klickar Skicka
    JS->>JS: preventDefault()
    JS->>JS: Samla data fran formular
    JS->>JS: JSON.stringify(data)
    JS->>S: fetch POST /submit-contact
    S->>S: JSON.parse(body)
    S->>F: Spara meddelande
    F-->>S: OK, sparat
    S->>JS: JSON response success
    JS->>U: Visa "Meddelande skickat" pa sidan
```

**Fetch = Modernt sätt att prata med servern:**

- Istället för att hela sidan laddas om
- Kan skicka data "i bakgrunden"
- Användaren märker knappt att något händer
- Som att skicka SMS istället för brev

---

## 5. JSON - Språket mellan client och server

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#fd7e14'}}}%%
graph LR
    subgraph "JavaScript Object"
        A["data = {<br/>message: Hej<br/>}"]
    end

    subgraph "JSON String"
        B["JSON string med<br/>message-property"]
    end

    subgraph "Server JavaScript Object"
        C["contactData = {<br/>message: Hej<br/>timestamp: 2025-09-18<br/>}"]
    end

    A -->|"JSON.stringify"| B
    B -->|"fetch body"| C

    style A fill:#e6f3ff,color:#000
    style B fill:#fffacd,color:#000
    style C fill:#ffe6e6,color:#000
```

**Varför JSON?**

- JavaScript Object = Bara JavaScript förstår
- JSON String = Alla programmeringsspråk förstår
- Som att översätta mellan språk så alla kan prata med varandra

**I vårt exempel:**

1. JavaScript skapar objekt: `{message: "Hej"}`
2. Konverterar till JSON: `'{"message":"Hej"}'`
3. Skickar som text till servern
4. Servern konverterar tillbaka till objekt
5. Lägger till timestamp och sparar

---

## 6. Hela kedjan - Från klick till svar

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#20c997'}}}%%
graph TD
    A["contact.html laddas i webblasare"] --> B["Anvandare fyller i textarea"]
    B --> C["Klickar Skicka-knapp"]
    C --> D["contact.js addEventListener triggas"]
    D --> E["preventDefault stoppar normal submit"]
    E --> F["FormData samlar data fran formular"]
    F --> G["Skapar JavaScript object"]
    G --> H["JSON.stringify konverterar till string"]
    H --> I["fetch POST till /submit-contact"]
    I --> J["server.js tar emot request"]
    J --> K["JSON.parse konverterar tillbaka"]
    K --> L["Laggar till timestamp"]
    L --> M["Laser/skapar contacts.json"]
    M --> N["Sparar meddelande i array"]
    N --> O["Skriver tillbaka till fil"]
    O --> P["Skickar success-svar som JSON"]
    P --> Q["fetch then tar emot response"]
    Q --> R["Visar meddelande i result-div"]

    style A fill:#e6f3ff,color:#000
    style D fill:#e6ffe6,color:#000
    style I fill:#fffacd,color:#000
    style J fill:#e6f9ff,color:#000
    style R fill:#e6f9ff,color:#000
```

---

## Sammanfattning

### Grundbegrepp:

- **Client (Klient)** = Webbläsaren där användaren är
- **Server** = Node.js programmet som körs på datorn
- **HTTP** = Språket client och server pratar med varandra
- **GET** = "Ge mig en fil" (hämta hemsida)
- **POST** = "Ta emot denna data" (skicka formulär)
- **JSON** = Sätt att skicka data mellan client och server

### Flödet:

1. **Webbläsaren** laddar HTML-sidan
2. **Användaren** fyller i formuläret
3. **JavaScript** fångar submit och stoppar normal hantering
4. **Fetch** skickar data till servern i bakgrunden
5. **Servern** tar emot, bearbetar och sparar data
6. **Servern** skickar bekräftelse tillbaka
7. **JavaScript** visar resultatet för användaren

### Varför detta är bra:

- Sidan behöver inte laddas om
- Snabbare användarupplevelse
- Kan hantera fel på ett bra sätt
- Modernt sätt att bygga webbappar
