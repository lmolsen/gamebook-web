import express from "express";
import "dotenv/config";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const PORT = process.env.PORT ?? 5050;

const router = express.Router();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

router.use((req, res, next) => {
    try {
        const wallOfFame = JSON.parse(fs.readFileSync("./data/entries.json"));
        req.wallOfFame = wallOfFame;
        next();
    }
    catch (error) {
        console.error("Error reading entries.json.", error);
        return res.status(500).send("Failed to read entries.json.");
}
});

router.post("/wall-of-fame", (req, res) => {
  const { name, accomplishment } = req.body;

  if (!name || !accomplishment) {
    return res
      .status(400)
      .send("Request body must include a name and an accomplishment.");
  }

  const newPost = {
    name,
    accomplishment,
    id: uuidv4(),
  };

  try {
    req.wallOfFame.push(newPost);
    fs.writeFileSync(
      "./data/entries.json",
      JSON.stringify(req.wallOfFame, null, 2)
    );
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error writing to entries.json:", error);
    res.status(500).send("Failed to save the new post.");
  }
});

router.get("/wall-of-fame", (req, res) => {
  try {
    res.json(req.wallOfFame);
  } catch (error) {
    console.error("Error reading the Wall of Fame data:", error);
    res.status(500).send("Failed to retrieve Wall of Fame data.");
  }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
  