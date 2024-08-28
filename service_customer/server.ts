import express from "express";
import { json } from "body-parser";

const app = express();
const PORT = 3000;

app.use(json());

app.get("/data", (req, res) => {
  const data = [
    { id: 1, name: "Peter", email: "Peter@example.com" },
    { id: 2, name: "Mad", email: "Mad@example.com" },
  ];
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
