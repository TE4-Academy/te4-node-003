# Formulär Submit Flöde - Från användare till server

Detta diagram visar det detaljerade flödet när en användare skickar in formuläret för att lägga till en ny bok.

```mermaid
flowchart TD
    A[Användare fyller i formulär] --> B[Klickar Submit]
    B --> C{preventDefault körs?}

    C -->|NEJ - FEL!| D[Normal form submit]
    C -->|JA - RÄTT!| E[JavaScript tar över]

    D --> D1[Sidan laddas om]
    D1 --> D2[Server får form-data istället för JSON]
    D2 --> D3[JSON.parse kraschar]

    E --> F[Samla formulärdata]
    F --> G[Konvertera till JavaScript objekt]
    G --> H[JSON.stringify]
    H --> I[fetch anrop]

    I --> J{Fetch lyckas?}
    J -->|NEJ| K[Network error]
    J -->|JA| L[Server tar emot JSON]

    L --> M[Validera data]
    M --> N[Läs befintlig books.json]
    N --> O[Lägg till ny bok]
    O --> P[Skriv tillbaka till fil]
    P --> Q[Skicka success response]

    Q --> R[Klient får response]
    R --> S[Visa success meddelande]
    S --> T[Rensa formulär]

    K --> U[Visa error meddelande]
    D3 --> V[Server error 500]

    style A fill:#e1f5fe
    style E fill:#e8f5e8
    style Q fill:#c8e6c9
    style D3 fill:#ffcdd2
    style K fill:#ffcdd2
```

## Kritiska punkter att diskutera:

### 1. preventDefault() - Varför behövs den?

- **Utan**: Normal HTML form submit → sidan laddas om
- **Med**: JavaScript kan ta kontroll över processen

### 2. Data transformation:

- **HTML formulär** → JavaScript objekt → **JSON string** → Server

### 3. Felhantering på flera nivåer:

- **JavaScript fel**: Formulärvalidering, JSON konvertering
- **Network fel**: Fetch misslyckas
- **Server fel**: JSON parsing, filhantering

### 4. User Experience:

- **Feedback**: Success/error meddelanden
- **State management**: Rensa formulär efter success

## Vanliga fel vi kan stöta på:

1. **Glömmer preventDefault()** → Sidan laddas om
2. **Skickar FormData istället för JSON** → Server kan inte hantera
3. **Fel Content-Type header** → Server förstår inte datatypen
4. **Ingen felhantering** → Tyst misslyckande
