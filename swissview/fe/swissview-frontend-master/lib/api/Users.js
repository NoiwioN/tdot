import {BASE_URL, deleteJSON, getJSON, postJSON, putJSON} from "."
import {toast} from "react-toastify";

const URL = `${BASE_URL}`;

const UsersAPI = {
    login(user) {
        return toast.promise(
            postJSON(`${URL}/login`, {body: user}),
            {
                pending: 'Logging in...',
                success: 'Login successful!',
                error: {
                    render({data}){
                        console.log(data)
                        return `Login failed: ${data.message}`;
                    }
                }
            }
        );
    },

    create(user) {
        return toast.promise(
            postJSON(`${URL}/users`, {body: user}),
            {
                pending: 'Registering...',
                success: 'Successfully registered!',
                error: {
                    render({data}) {
                        console.log(data)
                        return `Registration failed: ${data.message}`;
                    }
                }
            }
        );
    },

    readByUsername(username, token) {
        return getJSON(`${URL}/users/username/${username}`, {token}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },

    read(id, token) {
        return getJSON(`${URL}/users/${id}`, {token}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },

    update(id, user, token) {
        return toast.promise(
            putJSON(`${URL}/users/${id}`, {body: user, token}),
            {
                pending: 'Updating...',
                success: 'User updated!',
                error: {
                    render({data}) {
                        console.log(data)
                        return `Update failed: ${data.message}`;
                    }
                }
            }
        );
    },

    delete(id, token) {
        return toast.promise(
            deleteJSON(`${URL}/users/${id}`, {token}),
            {
                pending: 'Deleting...',
                success: 'User deleted!',
                error: {
                    render({data}) {
                        console.log(data)
                        return `Deletion failed: ${data.message}`;
                    }
                }
            }
        );
    },

    readComments(id, token) {
        return getJSON(`${URL}/users/${id}/comments`, {token}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },

    readFeedbacks(id, token) {
        return getJSON(`${URL}/users/${id}/feedbacks`, {token}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },
}

export default UsersAPI
