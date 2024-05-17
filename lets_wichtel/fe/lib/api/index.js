function createFetchFunction(method) {
  return async (url, params, noObjectInResponse = false) => {
    const _params = {
      method,
      headers: {
        "content-type": "application/json",
      },
      ...params,
    };

    if (_params.body !== undefined && _params.body !== null) {
      _params.body = JSON.stringify(_params.body);
    }

    if (_params.token !== undefined && _params.token !== null) {
      _params.headers["Authorization"] = "Bearer " + _params.token;
    }

    const response = await fetch(url, _params);

    if (!response.ok) {
      const error = new Error("Request failed with status " + response.status);
      error.response = response;
      throw error;
    }

    if (response.headers && response.headers.has("Authorization")) {
      return {
        accessToken: response.headers
          .get("Authorization")
          .replace(" Bearer", ""),
      };
    }

    if (noObjectInResponse) {
      return response;
    }

    const data = await response.json();
    return data;
  };
}

export const getJSON = createFetchFunction("GET");
export const postJSON = createFetchFunction("POST");
export const putJSON = createFetchFunction("PUT");
export const deleteJSON = createFetchFunction("DELETE");
export const BASE_URL = "192.168.2.136:8081"
