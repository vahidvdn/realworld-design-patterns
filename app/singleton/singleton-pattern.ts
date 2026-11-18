export type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export interface LogEntry {
  level: LogLevel;
  context: string;
  message: string;
  timestamp: Date;
}

export class Logger {
  // private static instance (only one!)
  private static instance: Logger | null = null;

  private level: LogLevel = "info";
  private readonly entries: LogEntry[] = [];

  // private constructor: `new Logger()` is not allowed outside this class
  private constructor() {
    console.log("Logger initialized (expensive setup happens only once)");
  }

  // public static getInstance(): the global access point
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  setLevel(level: LogLevel) {
    this.level = level;
  }

  getLevel(): LogLevel {
    return this.level;
  }

  log(level: LogLevel, context: string, message: string) {
    if (LEVEL_PRIORITY[level] < LEVEL_PRIORITY[this.level]) return;

    const entry: LogEntry = { level, context, message, timestamp: new Date() };
    this.entries.push(entry);
    console.log(
      `[${entry.timestamp.toISOString()}] ${level.toUpperCase()} [${context}] ${message}`,
    );
  }

  getEntries(): readonly LogEntry[] {
    return this.entries;
  }

  // Only meant for tests, so each test starts from a fresh instance
  static resetInstance() {
    Logger.instance = null;
  }
}

// Different parts of the application, all sharing the same logger
export class UserService {
  private readonly logger = Logger.getInstance();

  register(email: string) {
    this.logger.log("info", "UserService", `User registered: ${email}`);
  }
}

export class PaymentService {
  private readonly logger = Logger.getInstance();

  charge(amount: number) {
    this.logger.log("debug", "PaymentService", `Charging ${amount} EUR`);
    this.logger.log("info", "PaymentService", `Payment of ${amount} EUR done`);
  }
}

// Example usage
export function main() {
  // Configure once, at application bootstrap
  Logger.getInstance().setLevel("debug");

  new UserService().register("john@example.com");
  new PaymentService().charge(49);

  console.log(
    "Same instance everywhere:",
    Logger.getInstance() === Logger.getInstance(),
  );
  console.log("Total entries:", Logger.getInstance().getEntries().length);
}

/* istanbul ignore next */
if (require.main === module) {
  main();
}
