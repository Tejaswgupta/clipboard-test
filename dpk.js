const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function hashData(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  let candidate;

  // If event is undefined or null, use trivial partition key
  if (!event) {
    candidate = TRIVIAL_PARTITION_KEY;
  } else {
    // If the event has a partitionKey, use it
    // Otherwise, create a hash of the event data
    candidate = event.partitionKey
      ? event.partitionKey
      : hashData(JSON.stringify(event));
  }

  // If the candidate is not a string, stringify it
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  // If the candidate length is greater than the max allowed, hash it
  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? hashData(candidate)
    : candidate;
};
