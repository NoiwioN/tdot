function createFetchFunction(method) {
    return async (url, params) => {
        const _params = {
            method,
            headers: {
                "content-type": "application/json"
            },
            ...params
        }

        if (_params.body !== null && _params.body !== undefined) {
            _params.body = JSON.stringify(_params.body)
        }

        if (_params.token !== null && _params.token !== undefined) {
            _params.headers["Authorization"] = `Bearer ${_params.token}`
        }

        const response = await fetch(url, _params)

        if (!response.ok) {
            let error;
            if ([404, 400].includes(response.status)) {
                const json= await response.json();
                error = new Error(`${json.message} (Error ${response.status}) `);
            } else {
                error = new Error(`${await response.text()} (Error ${response.status}) `);
            }

            error.response = response
            throw error
        }

        // Special case for login handling (because headers are not normally returned)
        if (response.headers && response.headers.has("Authorization")) {
            return {
                accessToken: response.headers.get("Authorization").replace(" Bearer", "")
            }
        }

        return await response.json().catch(reason => {
            if (!["DELETE", "POST", "PUT"].includes(_params.method)) {
                console.warn("Couldn't parse JSON, returning empty object... Reason was", reason)
            }
            return {};
        });
    }
}

export const getJSON = createFetchFunction("GET")
export const postJSON = createFetchFunction("POST")
export const putJSON = createFetchFunction("PUT")
export const deleteJSON = createFetchFunction("DELETE")


export const BASE_URL = "http://192.168.2.136:8083"
