import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

interface LogEntry {
  id: string;
  timestamp: string;
  input: any;
  modelResponse: any;
  notes?: string;
}

export async function logInteraction(data: {
  input: any;
  modelResponse: any;
  notes?: string;
}) {
  const logEntry: LogEntry = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    input: data.input,
    modelResponse: data.modelResponse,
    notes: data.notes,
  };

  const logDir = path.join(process.cwd(), "logs");
  const logFile = path.join(logDir, "interactions.log.json");

  try {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const currentLogs = fs.existsSync(logFile)
      ? JSON.parse(fs.readFileSync(logFile, "utf-8"))
      : [];

    currentLogs.push(logEntry);

    fs.writeFileSync(logFile, JSON.stringify(currentLogs, null, 2));
  } catch (err) {
    console.error("Error writing log:", err);
  }
}
