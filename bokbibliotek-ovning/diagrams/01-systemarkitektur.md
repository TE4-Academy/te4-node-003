# Övergripande Systemarkitektur - Bokbibliotek App

Detta diagram visar den grundläggande arkitekturen för hela bokbibliotek-applikationen.

```mermaid
graph TB
    subgraph "Webbläsare (Klient)"
        U[👤 Användare]
        H[📄 HTML Sida]
        F[📝 Formulär]
        JS[⚙️ JavaScript/Fetch]
    end

    subgraph "Node.js Server"
        S[🖥️ HTTP Server]
        R[🔀 Router]
        PH[📮 POST Handler]
        GH[📥 GET Handler]
    end

    subgraph "Filsystem"
        JSON[📁 books.json]
        STATIC[📂 Statiska filer]
    end

    U --> F
    F --> JS
    JS -.->|HTTP Requests| S
    S --> R
    R --> PH
    R --> GH
    R --> STATIC
    PH --> JSON
    GH --> JSON

    S -.->|HTTP Responses| JS
    JS --> H
    H --> U

    style U fill:#e1f5fe
    style S fill:#f3e5f5
    style JSON fill:#fff3e0
    style JS fill:#e8f5e8
```

## Förklaring av komponenter:

### Klient-sidan (Webbläsare):

- **Användare**: Interagerar med formuläret
- **HTML**: Strukturen för sidan och formuläret
- **Formulär**: Input-fält för bokdata
- **JavaScript**: Hanterar fetch-anrop och DOM-manipulation

### Server-sidan (Node.js):

- **HTTP Server**: Lyssnar på port 3043
- **Router**: Dirigerar requests till rätt handler
- **POST Handler**: Behandlar nya böcker
- **GET Handler**: Serverar filer och hämtar bokdata

### Data/Filer:

- **books.json**: Persistent lagring av bokdata
- **Statiska filer**: HTML, CSS, JS-filer

## Diskussionspunkter:

1. **Separation of Concerns**: Klient vs Server ansvarsområden
2. **HTTP som kommunikationsprotokoll**
3. **Stateless kommunikation**: Varje request är oberoende
4. **Filbaserad databas**: Enkel persistent lagring
