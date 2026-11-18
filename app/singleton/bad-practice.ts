import { LogEntry, LogLevel } from "./singleton-pattern";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class BadLogger {
  private level: LogLevel = "info";
  private readonly entries: LogEntry[] = [];

  // public constructor: anybody can create as many loggers as they want
  constructor() {
    console.log("Logger initialized (expensive setup happens again!)");
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
}

export class BadUserService {
  readonly logger = new BadLogger(); // Instance A

  register(email: string) {
    this.logger.log("info", "UserService", `User registered: ${email}`);
  }
}

export class BadPaymentService {
  readonly logger = new BadLogger(); // Instance B

  charge(amount: number) {
    this.logger.log("debug", "PaymentService", `Charging ${amount} EUR`);
    this.logger.log("info", "PaymentService", `Payment of ${amount} EUR done`);
  }
}

export function main() {
  // Configure the "application" logger... Instance C
  const appLogger = new BadLogger();
  appLogger.setLevel("debug");

  const userService = new BadUserService();
  const paymentService = new BadPaymentService();

  userService.register("john@example.com");
  paymentService.charge(49); // debug log is silently dropped!

  console.log("App logger entries:", appLogger.getEntries().length); // 0
  console.log("User logger entries:", userService.logger.getEntries().length); // 1
  console.log(
    "Payment logger entries:",
    paymentService.logger.getEntries().length,
  ); // 1
}

/* istanbul ignore next */
if (require.main === module) {
  main();
}
