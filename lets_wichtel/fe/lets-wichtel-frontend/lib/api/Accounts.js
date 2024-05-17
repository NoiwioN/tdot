import { BASE_URL, getJSON, postJSON, putJSON, deleteJSON } from ".";

const URL = `${BASE_URL}`;

const AccountsAPI = {
  login(post) {
    return postJSON(`${URL}/login`, { body: post }, true);
  },
  register(post) {
    return postJSON(`${URL}/accounts/sign-up`, { body: post }, true);
  },
  getAccount(token) {
    return getJSON(`${URL}/accounts`, { token });
  },
  updateAccount(post, token) {
    return putJSON(`${URL}/accounts/update`, { body: post, token }, true);
  },
  deleteAccount(token) {
    return deleteJSON(`${URL}/accounts/delete`, { token }, true);
  },
};

export default AccountsAPI;
