import { BASE_URL, getJSON, postJSON, putJSON, deleteJSON } from ".";

const URL = `${BASE_URL}`;

const WichtelsAPI = {
  findByQuery(query) {
    return getJSON(`${URL}/wichtels/search?query=${query}`);
  },
  getAllWichtelJoined(token) {
    return getJSON(`${URL}/wichtels/joined`, { token });
  },
  getWichtelJoined(id, token) {
    return getJSON(`${URL}/wichtels/joined?wichtel_id=${id}`, { token });
  },
  getWichtelById(id, token) {
    return getJSON(`${URL}/wichtels/id/${id}`, { token });
  },
  getWichtelByURL(_url, token) {
    if (!token) return getJSON(`${URL}/wichtels/url/${_url}`);

    return getJSON(`${URL}/wichtels/url/${_url}`, { token });
  },
  getAccountsInWichtel(id, token) {
    return getJSON(`${URL}/wichtels/id/${id}?all=true`, { token });
  },
  getSpecificAccountInWichtel(wichtelId, accountId) {
    return getJSON(`${URL}/wichtels/id/${wichtelId}?account_id=${accountId}`);
  },
  getRoleInWichtel(wichtelId, token) {
    return getJSON(`${URL}/wichtels/role?wichtel_id=${wichtelId}`, { token });
  },
  getOwnWishlist(wichtelId, token) {
    return getJSON(`${URL}/wichtels/wunschliste?wichtel_id=${wichtelId}`, {
      token,
    });
  },
  validatePassword(wichtelId, password) {
    return getJSON(`${URL}/wichtels/id/${wichtelId}?password=${password}`);
  },
  createWichtel(post, token) {
    return postJSON(`${URL}/wichtels`, { body: post, token }, true);
  },
  updateWichtel(post, token) {
    return putJSON(`${URL}/wichtels`, { body: post, token }, true);
  },
  joinWichtel(id, password, token) {
    if (password) {
      return putJSON(
        `${URL}/wichtels/join?wichtel_id=${id}&password=${password}`,
        { token },
        true
      );
    }
    return putJSON(`${URL}/wichtels/join?wichtel_id=${id}`, { token }, true);
  },
  updateWishlist(post, token) {
    return putJSON(`${URL}/wichtels/wunschliste`, { body: post, token }, true);
  },
  startWichtel(post, token) {
    return putJSON(`${URL}/wichtels/start`, { body: post, token }, true);
  },
  updateRoleOfAccountInWichtel(roleId, accountId, wichtelId, token) {
    return putJSON(
      `${URL}/wichtels/role?role_id=${roleId}&account_id=${accountId}&wichtel_id=${wichtelId}`,
      { token },
      true
    );
  },
  removeAccountFromWichtel(accountId, wichtelId, token) {
    return deleteJSON(
      `${URL}/wichtels?wichtel_id=${wichtelId}&account_id=${accountId}`,
      { token },
      true
    );
  },
  deleteWichtel(id, token) {
    return deleteJSON(`${URL}/wichtels?wichtel_id=${id}`, { token }, true);
  },
};

export default WichtelsAPI;
