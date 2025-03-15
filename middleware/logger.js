import morgan from "morgan";
import fs from "fs";
import path from "path";

const logStream = fs.createWriteStream(path.join("logs", "access.log"), {
  flags: "a",
});

const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream: logStream },
);

export default logger;
