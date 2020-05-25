import { API } from "$constants";
import { authFetch, toQuery } from "$app-helpers";

function get(queryObj, response, error, final) {
  const query = queryObj ? "?" + toQuery(queryObj) : "";
  authFetch(API.endpoint + "/resources" + query)
    .then(response)
    .catch(error)
    .finally(final);
}

export default {
  get,
};
