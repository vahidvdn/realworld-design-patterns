import {
  BadLogger,
  BadPaymentService,
  BadUserService,
  main,
} from "./bad-practice";

describe("Singleton Pattern bad practice", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create multiple instances", () => {
    expect(new BadLogger()).not.toBe(new BadLogger());
  });

  it("should not share configuration (inconsistent state)", () => {
    const appLogger = new BadLogger();
    appLogger.setLevel("debug");

    const paymentService = new BadPaymentService();
    paymentService.charge(49);

    expect(paymentService.logger.getLevel()).toBe("info");
    // the debug log was dropped
    expect(paymentService.logger.getEntries()).toHaveLength(1);
  });

  it("should scatter logs across instances", () => {
    const userService = new BadUserService();
    const paymentService = new BadPaymentService();

    userService.register("john@example.com");
    paymentService.charge(49);

    expect(userService.logger.getEntries()).toHaveLength(1);
    expect(paymentService.logger.getEntries()).toHaveLength(1);
  });

  it("should log debug messages when the level allows it", () => {
    const logger = new BadLogger();
    logger.setLevel("debug");

    logger.log("debug", "Test", "kept");

    expect(logger.getEntries()).toHaveLength(1);
  });

  it("should run the example with scattered, inconsistent loggers", () => {
    main();

    const initCalls = (console.log as jest.Mock).mock.calls.filter(([msg]) =>
      String(msg).startsWith("Logger initialized"),
    );
    expect(initCalls).toHaveLength(3);
    expect(console.log).toHaveBeenCalledWith("App logger entries:", 0);
    expect(console.log).toHaveBeenCalledWith("User logger entries:", 1);
    expect(console.log).toHaveBeenCalledWith("Payment logger entries:", 1);
  });
});
