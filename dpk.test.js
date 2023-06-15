const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it('should return "0" if event is undefined', () => {
    expect(deterministicPartitionKey()).toBe("0");
  });

  it("should return the partitionKey if event has partitionKey", () => {
    const event = { partitionKey: "test" };
    expect(deterministicPartitionKey(event)).toBe("test");
  });

  it("should return the SHA3-512 hash of the event if event does not have partitionKey", () => {
    const event = { data: "test" };
    const hash = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    expect(deterministicPartitionKey(event)).toBe(hash);
  });

  it("should return the SHA3-512 hash if the candidate length is more than 256", () => {
    const event = { partitionKey: "a".repeat(257) };
    const hash = crypto
      .createHash("sha3-512")
      .update(event.partitionKey)
      .digest("hex");
    expect(deterministicPartitionKey(event)).toBe(hash);
  });
});
