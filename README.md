# curl-fetch

A drop-in replacement for Javascript `fetch` that logs `curl` commands ready to share

Usage: whenever you have

    ```js
        fetch(url, opts)
    ```

replace it with

    ```js   
        curlFetch(url, opts)
    ```

And you get ready to copy curl on your `console.log`

## Motivation

Whenever we might need to share a request with someone (likely backend team) 
it would be handy to have a `curl` command printed on the logs ready to share.