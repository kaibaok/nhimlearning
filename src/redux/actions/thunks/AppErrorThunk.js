import { onAppError, handleSessionExpired } from "../Actions";
import Raven from "raven-js";
// ROUTER
import { browserHistory } from "react-router";

export function reportError(error) {
  return function (dispatch) {
    if (error.statusCode === 401) {
      dispatch(handleSessionExpired(error));
      return;
    }

    // If an HTTP request returns a 403 code, the user's access is restricted.
    // This may occur when a user browses to a URL they aren't entitled to.
    // For example, if the user has access to search the state of Florida, they save the URL of the search results
    // page, then they change their access to only allow the state of Texas, if they then try to open the saved URL
    // the server will return an HTTP 403 because they don't have access to Florida anymore. In this situation, the
    // user should be told they don't have access. Further, we should not report this incident as a Sentry error
    // because it is normal behavior of the working system.
    // https://github.com/miEdge/app.miedge/issues/71
    if (error.statusCode === 403) {
      browserHistory.push({
        pathname: "/notfound",
        state: { homePathname: "/" },
      });
      return;
    }

    // report the error to Sentry and then dispatch the Action

    // If the error contains a tech message and a user message, report the tech message to Sentry and display the
    // user message. This ensures that fetch errors reported to Sentry don't all end up with the same message
    // which causes them to be grouped into one Sentry report.

    const originalErrorMessage = error.message;

    if (error.techMessage) {
      error.message = error.techMessage;
    }

    // Raven has a limit on the size of error reports ~200kb
    // This includes data we put in the error and any breadcrumbs (like console.log)
    // Carve up post data if it's too big.
    // This was originally necessary because the Employee Benefits PDF report has 330kb of post data for Walmart.

    if (
      error.extraData &&
      error.extraData.fetchOptions &&
      error.extraData.fetchOptions.method &&
      error.extraData.fetchOptions.method === "POST" &&
      error.extraData.fetchOptions.body &&
      JSON.stringify(error.extraData.fetchOptions.body).length > 2000
    ) {
      error.extraData.fetchOptions.body =
        JSON.stringify(error.extraData.fetchOptions.body).substring(0, 2000) +
        "...truncated";
    }

    const errorString = JSON.stringify(error);
    console.log(errorString);
    Raven.setExtraContext(error);
    Raven.captureException(error);

    error.message = originalErrorMessage;
    dispatch(onAppError(error));
  };
}
