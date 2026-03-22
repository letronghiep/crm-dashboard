const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const fs = require("fs/promises");
const cors = require("cors");
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Ensure uploads folder exists
fs.mkdir("uploads", { recursive: true });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file provided" });
  return res.json({
    name: req.file.originalname,
    serverPath: `/uploads/${req.file.filename}`,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

app.use("/uploads", express.static("uploads"));

app.delete("/upload", async (req, res) => {
  const { serverPath } = req.body;
  if (!serverPath)
    return res.status(400).json({ message: "No serverPath provided" });
  try {
    await fs.unlink(path.join(__dirname, serverPath));
    return res.json({ message: "SUCCESS" });
  } catch (err) {
    return res.status(404).json({ message: "File not found" });
  }
});
async function readFile(fileName) {
  try {
    const filePath = `src/data/${fileName}.json`;
    const data = await fs.readFile(filePath, "utf8");
    const jsonObject = JSON.parse(data);

    return jsonObject;
  } catch (error) {}
}

async function writeFile(fileName, newData) {
  try {
    const filePath = `src/data/${fileName}.json`;
    const data = await readFile(filePath, data);
    data.push(newData);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(error);
  }
}
app.get("/employees", async function (req, res) {
  const data = await readFile("employees");
  return res.json({
    message: "SUCCESS",
    contents: data,
  });
});
app.get("/dashboard/overview", async function (req, res, next) {
  try {
    const workload = await readFile("employees");
    const projects = await readFile("projects");
    const users = await readFile("employees");
    const projectsWithAss = projects.map((project) => {
      return {
        ...project,
        users: users
          .filter((user) => project.assignees.includes(user.id))
          .map((user) => user.avatar),
      };
    });
    const response = {
      workload,
      projects: projectsWithAss,
    };
    return res.json({
      message: "SUCCESS",
      contents: response,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/nearest-event", async (req, res, next) => {
  try {
    const nearestEvent = await readFile("event");
    return res.json({
      message: "SUCCESS",
      contents: nearestEvent,
    });
  } catch (error) {}
});
app.get("/nearest-event/:id", async (req, res, next) => {
  try {
    const nearestEvent = await readFile("event");
    const result = nearestEvent.find(
      (item) => item.id.toString() === req.params.id.toString(),
    );
    return res.json({
      message: "SUCCESS",
      data: result,
    });
  } catch (error) {}
});
let SERVER_PORT = 3000;
app.listen(SERVER_PORT, () =>
  console.log(`Server is listening on port: ${SERVER_PORT}`),
);
