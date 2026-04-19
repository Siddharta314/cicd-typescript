import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey()", () => {
  test("should return null if the authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("should return null if the header does not start with 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer some-token-123",
    };
    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("should return null if the header is malformed or missing the token part", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("should return the token when a valid ApiKey header is provided", () => {
    const expectedToken = "xyz-789-key";
    const headers: IncomingHttpHeaders = {
      authorization: `ApiKey ${expectedToken}`,
    };

    const result = getAPIKey(headers);
    expect(result).toBe(expectedToken);
  });
});
