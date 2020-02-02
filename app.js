console.log("starting...");

const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/t", require("./routes/redirect.routes"));
app.use("/api/link", require("./routes/link.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get(
    "*",
    (req,
    res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    }
  );
}

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => console.log(`app is running on PORT ${PORT}`));
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();
