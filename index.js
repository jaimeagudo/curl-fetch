/**

    Whenever we might need to share a request with someone (likely backend team)
    it would be handy to have a `curl` command printed on the logs ready to be
    copy-pasted. Here you have one function that returns that string

    Same signature as fetch. It returns a ready to use curl command with
    {headers} optional JSON {body}, {method} and CLI {curlCliOptions}

    curl('https://en.wikipedia.org/api/rest_v1/page/summary/Cehegin',
          {
            headers: { accept: 'application/json' },
            body: {},
            method: 'GET'
          },
          '-vvv' });

*/

/**
    Same signature as fetch. It does `fetch` and logs a ready to use `curl` command.

    Usage: whenever you have

        `fetch(foo, boo)`

    replace it with


        `curlFetch(foo, boo)`

    Whenever we might need to share a request with someone (likely backend team)
    it would be handy to have a `curl` command printed on the logs ready to be
    copy-pasted. Here you have one function you can replace fetch with that will

    1. Print the `curl` on the logs
    2. Invoke `fetch` as expected
    3. Catch (if any) errors

*/

export const curlFetch = async function (...args) {
  const DEBUG = false || args[2] === "-v";
  try {
    DEBUG && console.log(args[0] + `\n`, curl.apply(null, args));
    const promise = await fetch.apply(null, args);
    DEBUG && console.log("promise:\n", promise);
    return promise;
  } catch (e) {
    DEBUG && console.error(e);
    return null;
  }
};

const noUserAgent = (h) => !/User/i.test(h);

export const curl = (
  url,
  { headers, body = null, method = "GET" },
  curlCliOptions = ""
) => {
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
};
