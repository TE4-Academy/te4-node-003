// Bokbibliotek server - INNEHÅLLER FEL SOM SKA FIXAS!

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(method, url);

  // POST hantering för nya böcker - FEL 1: Förväntar sig JSON men får form-data
  if (method === "POST" && url === "/add-book") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      // FEL 2: Ingen felhantering för JSON.parse
      const bookData = JSON.parse(body);
      bookData.id = Date.now().toString();
      bookData.addedDate = new Date().toISOString();

      const filePath = path.join(__dirname, "books.json");
      let books = [];

      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf8");
        books = JSON.parse(fileData);
      }

      books.push(bookData);
      fs.writeFileSync(filePath, JSON.stringify(books, null, 2));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "success", message: "Bok tillagd" }));
    });
    return;
  }

  // GET hantering för statiska filer
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Fil hittades inte");
    return;
  }

  const data = fs.readFileSync(filePath);
  if (filePath.endsWith(".css")) {
    res.writeHead(200, { "Content-Type": "text/css" });
  } else if (filePath.endsWith(".html")) {
    res.writeHead(200, { "Content-Type": "text/html" });
  } else if (filePath.endsWith(".js")) {
    res.writeHead(200, { "Content-Type": "application/javascript" });
  }
  res.end(data);
});

server.listen(3043, () => {
  console.log("Bokbibliotek server körs på port 3043");
});
