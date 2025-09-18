# Fetch API och HTTP Kommunikation - Tekniska detaljer

Detta diagram fokuserar på den tekniska delen av fetch API:t och HTTP-kommunikationen.

```mermaid
graph TD
    subgraph "JavaScript (Klient)"
        A[fetch anrop startar]
        B[Promise skapas]
        C[HTTP Request byggs]
        D[.then väntar]
        E[Promise resolves]
        F[Promise rejects]
    end

    subgraph "HTTP Request Detaljer"
        G[Method: POST]
        H[Headers:<br/>Content-Type: application/json]
        I[Body: JSON string]
        J[URL: /add-book]
    end

    subgraph "Network Layer"
        K[HTTP Request skickas]
        L[Väntar på response]
        M[HTTP Response kommer]
    end

    subgraph "HTTP Response Detaljer"
        N[Status Code: 200]
        O[Response Headers:<br/>Content-Type: application/json]
        P[Response Body: JSON]
    end

    subgraph "Promise Chain"
        Q[.then response]
        R[response.json]
        S[.then data]
        T[.catch error]
    end

    A --> B
    B --> C
    C --> G
    C --> H
    C --> I
    C --> J

    G --> K
    H --> K
    I --> K
    J --> K

    K --> L
    L --> M

    M --> N
    M --> O
    M --> P

    N --> E
    O --> E
    P --> E

    E --> Q
    Q --> R
    R --> S

    B --> D
    D --> F
    F --> T

    style A fill:#e3f2fd
    style B fill:#fff3e0
    style E fill:#e8f5e8
    style F fill:#ffebee
    style Q fill:#f3e5f5
```

## Promise-kedjan i detalj:

```mermaid
sequenceDiagram
    participant JS as JavaScript
    participant Promise as Promise Object
    participant Network as Network
    participant Server as Server

    JS->>Promise: fetch('/add-book', options)
    Promise-->>JS: Returnerar Promise<Response>

    Promise->>Network: Skicka HTTP request
    Network->>Server: POST /add-book

    Note over Server: Bearbetar request<br/>Sparar till books.json

    Server->>Network: HTTP 200 + JSON response
    Network->>Promise: Response object

    Promise->>JS: Promise resolves med Response

    JS->>Promise: response.json()
    Promise-->>JS: Returnerar Promise<Object>
    Promise->>JS: Promise resolves med parsed data

    JS->>JS: Hantera data (visa meddelande, etc.)
```

## Viktiga diskussionspunkter:

### 1. Promises vs Callbacks:

- **Promise**: Modernare, kedja-bar, lättare att läsa
- **Callback**: Äldre mönster, "callback hell"

### 2. Async/Await alternativ:

```javascript
// Med .then() kedja
fetch("/add-book", options)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Med async/await
try {
  const response = await fetch("/add-book", options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

### 3. HTTP Headers betydelse:

- **Content-Type**: Talar om dataformat
- **Accept**: Vad klienten förväntar sig tillbaka
- **Authorization**: För säkerhet (inte i denna övning)

### 4. Status codes:

- **200**: OK - Success
- **400**: Bad Request - Fel i data
- **404**: Not Found - Endpoint finns inte
- **500**: Server Error - Server kraschar

### 5. Error handling:

- **Network errors**: fetch() rejects
- **HTTP errors**: fetch() resolves men status ≥ 400
- **JSON parsing errors**: response.json() kan faila
