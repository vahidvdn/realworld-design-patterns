import {
  Logger,
  main,
  PaymentService,
  UserService,
} from "./singleton-pattern";

describe("Singleton Pattern", () => {
  beforeEach(() => {
    Logger.resetInstance();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should always return the same instance", () => {
    const a = Logger.getInstance();
    const b = Logger.getInstance();

    expect(a).toBe(b);
  });

  it("should initialize only once", () => {
    Logger.getInstance();
    Logger.getInstance();
    Logger.getInstance();

    const initCalls = (console.log as jest.Mock).mock.calls.filter(([msg]) =>
      String(msg).startsWith("Logger initialized"),
    );
    expect(initCalls).toHaveLength(1);
  });

  it("should default to the info level", () => {
    expect(Logger.getInstance().getLevel()).toBe("info");
  });

  it("should share configuration across all services", () => {
    Logger.getInstance().setLevel("debug");
    expect(Logger.getInstance().getLevel()).toBe("debug");

    new PaymentService().charge(49);

    const entries = Logger.getInstance().getEntries();
    expect(entries).toHaveLength(2);
    expect(entries[0].level).toBe("debug");
  });

  it("should collect logs from all services in one place", () => {
    new UserService().register("john@example.com");
    new PaymentService().charge(49);

    const entries = Logger.getInstance().getEntries();
    expect(entries.map((e) => e.context)).toEqual([
      "UserService",
      "PaymentService",
    ]);
  });

  it("should filter out logs below the configured level", () => {
    const logger = Logger.getInstance();
    logger.setLevel("warn");

    logger.log("info", "Test", "ignored");
    logger.log("error", "Test", "kept");

    expect(logger.getEntries()).toHaveLength(1);
    expect(logger.getEntries()[0].message).toBe("kept");
  });

  it("should run the example with one shared logger", () => {
    main();

    expect(console.log).toHaveBeenCalledWith("Same instance everywhere:", true);
    expect(console.log).toHaveBeenCalledWith("Total entries:", 3);
  });
});
