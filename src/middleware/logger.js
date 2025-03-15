import morgan from "morgan";
import fs from "fs";
import path from "path";

const logDirectory = path.join(process.cwd(), "logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logStream = fs.createWriteStream(path.join(logDirectory, "access.log"), {
  flags: "a",
});

const fileLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream: logStream },
);

const consoleLogger = morgan("dev");

export default (app) => {
  app.use(fileLogger);
  app.use(consoleLogger);
};
