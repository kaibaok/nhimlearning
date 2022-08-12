//import AppAuth from '../AppAuth';
// Config
// import AppConfig from '../appConfig'
import AppError from "../lib/AppError";

const originalFetch = require("isomorphic-fetch");
const fetchRetry = require("fetch-retry")(originalFetch);

const cacheControlHeader = "no-cache, no-store, must-revalidate, max-age=-1";
const expiresHeader = "-1";
const pragmaHeader = "no-cache";
const cacheOption = "no-store";

class AbstractFetch {
  /**
   * Wraps the standard fetch method.
   *
   * Adds automatic retries for GET requests.
   * Automatically logs out when a response indicates the user isn't authorized.
   *
   * @param url: The request url.
   * @param options: The request options.
   * @param retry: boolean: Whether to retry a failed request regardless of it being a GET.
   */
  static fetch = (url, options, retry = false) => {
    // when making a request, enable automatic retries to handle network blips, but only for GET requests, so we
    // don't do something silly like repeat a delete.
    // to enable callers to override this, particular for things like search (POST), we added the retry argument.

    const fetchFunc =
      options && (options.method === "GET" || retry)
        ? fetchRetry
        : window.fetch;
    const fetchOptions = options || {};
    fetchOptions.headers = fetchOptions.headers || {};

    // add the cache option if its not already set
    // this is a fetch request option, see https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
    if (fetchOptions.method === "GET" && !fetchOptions["cache"]) {
      fetchOptions["cache"] = cacheOption;
    }

    // add the Cache-Control, Expires and Pragma headers option to any GET request that doesn't already have have it.
    // this is to avoid issues in IE, see http://jussi.hallila.com/2016/05/01/fixing-internet-explorer-for-your-react-es6-app.html
    if (
      fetchOptions.method === "GET" &&
      !fetchOptions.headers["Cache-Control"]
    ) {
      fetchOptions.headers["Cache-Control"] = cacheControlHeader;
    }

    if (fetchOptions.method === "GET" && !fetchOptions.headers["Pragma"]) {
      fetchOptions.headers["Pragma"] = pragmaHeader;
    }

    if (fetchOptions.method === "GET" && !fetchOptions.headers["Expires"]) {
      fetchOptions.headers["Expires"] = expiresHeader;
    }

    // sometimes AWS can throw 503 errors from Cloudfront if there is high load at an edge location (https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/http-503-service-unavailable.html).
    // Also, AWS can return 502 (Bad Gateway) at any time (https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/http-502-bad-gateway.html)
    // We retry 500 errors because AWS can return 500 errors for transient conditions (which should really be 503)
    // but we have no control over it. While 500's aren't traditionally something we should retry, there's likely no
    // harm in it, and it'll clean up errors that users see every day. https://github.com/miEdge/app.newEdge/issues/363
    // We've seen a number of HTTP 421 errors from the userpreferences and saved_searches apis lately. After some
    // investigation, we determined these were likely transient issues from CloudFront, and are safe to retry.
    // we should retry in those cases
    if ((fetchOptions.method === "GET" || retry) && !fetchOptions.retryOn) {
      // Note: Setting retryOn causes fetch-retry to reject the promise after all retries are exhausted.
      fetchOptions.retryOn = [421, 500, 502, 503];
    }

    const handleErrors = (response) =>
      AbstractFetch.handleErrors(response, url, fetchOptions);

    return fetchFunc(url, fetchOptions).then(handleErrors).catch(handleErrors);
  };

  static handleErrors(response, requestUrl, requestFetchOptions) {
    // We do not check for 401 here, sessionExpired behavior is handled by the AppErrorThunk

    // When this method is called from AbstractFetch.fetch, it handles both promise resolution and rejection.
    // If the fetch promise resolves and this method decides to raise an exception because the response is bad, then
    // this method will get executed again as the rejected promise handler. To prevent rewrapping the exception in
    // an erroneous way, check for this condition and let the exception keep going.

    if (response instanceof AppError) {
      throw response;
    }

    if (response.ok) {
      return response;
    }

    console.log("handleErrors with error:");
    console.log(JSON.stringify(response));
    console.log(response);

    const url = requestUrl
      ? requestUrl
      : response && response.hasOwnProperty("url")
      ? response.url
      : "Unknow";
    // Remove query string parameters from the tech message so we can group similar errors easily in Sentry.
    const requestUrlWithoutParameters =
      url.indexOf("?") === -1 ? url : url.substring(0, url.indexOf("?"));

    const techMessage =
      requestFetchOptions.method +
      " " +
      requestUrlWithoutParameters +
      " failed with status " +
      response.status;

    throw new AppError(
      "Failed to fetch data.",
      response.status,
      {
        url: url,
        fetchOptions: requestFetchOptions,
        cookie: document.cookie,
        response: response,
      },
      techMessage
    );
  }
}

export default AbstractFetch;
