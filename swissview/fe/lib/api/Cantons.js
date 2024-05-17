import {BASE_URL, getJSON, putJSON} from "."
import {toast} from "react-toastify";

const URL = `${BASE_URL}/cantons`;

const CantonsAPI = {

    readAll() {
        return getJSON(`${URL}/`, {}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },

    read(id) {
        return getJSON(`${URL}/${id}`, {}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },

    getUserCount(id) {
        return getJSON(`${URL}/${id}/userCount`, {}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },

    update(id, canton, token) {
        return toast.promise(
            putJSON(`${URL}/${id}`, {body: canton, token}),
            {
                pending: 'Updating...',
                success: 'Canton updated!',
                error: {
                    render({data}) {
                        console.log(data)
                        return `Update failed: ${data.message}`;
                    }
                }
            }
        );
    },

    readComments(id) {
        return getJSON(`${URL}/${id}/comments`, {}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },

    readFeedbacks(id) {
        return getJSON(`${URL}/${id}/feedbacks`, {}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },

    readUsers(id) {
        return getJSON(`${URL}/${id}/users`, {}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },
}

export default CantonsAPI
