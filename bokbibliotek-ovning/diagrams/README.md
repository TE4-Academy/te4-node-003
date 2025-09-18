# Mermaid Diagram Översikt - Bokbibliotek Övning

Detta dokument ger en översikt över alla diagram som skapats för bokbibliotek-övningen.

## 📊 Diagram struktur (progressiv detaljnivå):

### 1. **01-systemarkitektur.md** - Övergripande vy

- **Syfte**: Visa hela systemets arkitektur
- **Målgrupp**: Alla - introduktion till client-server
- **Fokus**: Komponenter och deras roller

### 2. **02-formular-flode.md** - Användarinteraktion

- **Syfte**: Detaljerat flöde från formulär till server
- **Målgrupp**: För förståelse av preventDefault och formulärhantering
- **Fokus**: Felhantering och vanliga problem

### 3. **03-fetch-detaljer.md** - Teknisk implementation

- **Syfte**: Fördjupning i fetch API och HTTP
- **Målgrupp**: För teknisk förståelse av promises och HTTP
- **Fokus**: Async/await, error handling, HTTP detaljer

### 4. **04-sekvensdiagram.md** - Tidslinje

- **Syfte**: Kronologisk ordning av alla händelser
- **Målgrupp**: För förståelse av asynkron programmering
- **Fokus**: Timing, race conditions, event loop

### 5. **05-data-transformation.md** - Data flöde

- **Syfte**: Hur data transformeras genom systemet
- **Målgrupp**: För förståelse av JSON, serialisering
- **Fokus**: Data format, parsing, validering

## 💡 Diskussionsfrågor per diagram:

### Systemarkitektur:

- Varför separera klient och server?
- Vad är fördelarna med HTTP som protokoll?
- Hur skiljer sig detta från en desktop-app?

### Formulär flöde:

- Varför behöver vi preventDefault()?
- Vad händer om JavaScript är avstängt?
- Hur kan vi förbättra user experience?

### Fetch detaljer:

- Varför är fetch() asynkront?
- Skillnad mellan .then() och async/await?
- Hur hantera olika typer av fel?

### Sekvensdiagram:

- Vad händer om servern är långsam?
- Hur förhindra att användaren klickar flera gånger?
- Varför uppdatera listan efter submit?

### Data transformation:

- Varför använda JSON istället för XML?
- Vad försvinner när man serialiserar JavaScript objekt?
- Var bör man validera data?

## 🔧 Tips hur man läser och använder diagrammen:

1. **Starta enkelt**: Börja med systemarkitekturen
2. **Bygg på komplexitet**: Lägg till detaljer successivt
3. **Använd konkreta exempel**: Visa riktig kod tillsammans med diagrammen
4. **Gissa**: Vad tror du händer härnäst?
5. **Koppla till övningen**: "Detta är exakt vad vi ska fixa i steg X"

## 🎨 Visuella tips:

- Alla diagram använder samma färgkodning
- Grön = framgång, röd = fel, blå = process
- Emojis gör diagrammen mer läsbara
- Progressiv komplexitet - från översikt till detalj
