import { BadLogger, BadPaymentService, BadUserService } from "./bad-practice";

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
});
