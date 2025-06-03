const noUserAgent = (h) => !/User/i.test(h);

/**

    @param Same signature as fetch.
    @returns a string containing a ready to use `curl` command. See https://curl.se/docs/manpage.html

*/
function curl(
  url,
  { headers, body = null, method = "GET" },
  curlCliOptions = ""
) {
  let headerString = "";
  if (headers?.forEach) {
    headers.forEach((value, headerKey) => {
      headerString = noUserAgent(headerKey)
        ? headerString.concat(` -H '${headerKey}:${value}'`)
        : headerString;
    });
  } else {
    const headerKeys = headers ? Object.keys(headers).filter(noUserAgent) : [];
    headerString = headerKeys.reduce(
      (s, headerKey) => `${s} -H ${headerKey}:${headers[headerKey]}`,
      ""
    );
  }
  const bodyArgs = body ? `-d ${JSON.stringify(body)}` : "";
  return `curl ${curlCliOptions} ${headerString} -X ${method} ${url} ${bodyArgs}`;
}

/**
    Same signature as fetch. It does `fetch` and logs a ready to use `curl` command.
    See https://curl.se/docs/manpage.html

    Usage: whenever you have

        `fetch(url, opts)`

    replace it with


        `curlFetch(url, opts)`

    Whenever we might need to share a request with someone (likely backend team)
    it would be handy to have a `curl` command printed on the logs ready to be
    copy-pasted. Here you have one function you can replace fetch with that will do it

*/
function curlFetch(...args) {
  const curlText = curl.apply(null, args);
  console.log(`\n${curlText}`);
  return fetch.apply(null, args);
}

module.exports = { curl, curlFetch };
