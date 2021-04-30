import processCronExpression from "../src/processor";

describe("Processor", () => {
  it("Should parse the cron expression with the expected output", () => {
    const cronInputExpression = "*/15 0 1,15 * 1-5 /usr/bin/find";
    const args = ["node", "jest", cronInputExpression, "test"];
    const parsedExpression = processCronExpression(args);

    expect(parsedExpression).toMatchInlineSnapshot(`
      "
              minute: 0 15 30 45
              hour: 0
              day of month: 1 15
              month: 1 2 3 4 5 6 7 8 9 10 11 12
              day of week 1 2 3 4 5
              command: /usr/bin/find
          "
    `);
  });

  it("Should throw an error if less than 6 parameters are provided", () => {
    const cronInputExpression = "*/15 0 1,15 *";
    const args = ["node", "jest", cronInputExpression, "test"];
    expect(() => processCronExpression(args)).toThrow();
  });
});
