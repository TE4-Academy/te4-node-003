// Skapa en node server för att hantera servering av HTML. CSS oh JS filer

//Vi behöver assistans från mer JS för node
//importera kod

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); //visar server.js
const __dirname = path.dirname(__filename); //visar user/herkommer/dev/te4-node-003

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(method, url);

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

  //GET hantering
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url); //ternery

  if (!fs.existsSync(filePath)) {
    res.end("File does not exist");
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

server.listen(3042, () => {
  console.log("Server is alive");
});
