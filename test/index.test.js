const { curlFetch, curl } = require("..");

const CURL_TEXT =
  "curl -vvv  -H accept:application/json -X GET https://en.wikipedia.org/api/rest_v1/page/summary/Cehegin ";

test("Test curl. Copy paste it and test it on your favourite shell", () => {
  expect(
    curl(
      "https://en.wikipedia.org/api/rest_v1/page/summary/Cehegin",
      {
        headers: { accept: "application/json" },
        // body: {}, //optional
        method: "GET",
      },
      "-vvv"
    )
  ).toBe(CURL_TEXT);
});

test("Test curlFetch. Copy paste it and test it on your favourite shell", async () => {
  const logSpy = jest.spyOn(console, "log");

  const response = await curlFetch(
    "https://en.wikipedia.org/api/rest_v1/page/summary/Cehegin",
    {
      headers: { accept: "application/json" },
      method: "GET",
    },
    "-vvv"
  );
  const data = await response.json();
  expect(JSON.stringify(data)).toContain("Murcia");
  expect(logSpy).toHaveBeenCalledWith(`\n${CURL_TEXT}`);
});
