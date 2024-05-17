import {getJSON, BASE_URL, postJSON, putJSON, deleteJSON} from "."
import {toast} from "react-toastify";

const URL = `${BASE_URL}/events`;

const EventsAPI = {
    create(event, userId, token) {
        return toast.promise(
            postJSON(`${URL}/`, {
                body: {
                    ...event,
                    user: {id: userId}
                }, token
            }),
            {
                pending: 'Creating...',
                success: 'Event created!',
                error: {
                    render({data}) {
                        console.log(data)
                        return `Creation failed: ${data.message}`;
                    }
                }
            }
        );
    },

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

    update(id, event, token) {
        return toast.promise(
            putJSON(`${URL}/${id}`, {body: event, token}),
            {
                pending: 'Updating...',
                success: 'Event updated!',
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
            deleteJSON(`${URL}/${id}`, {token}),
            {
                pending: 'Deleting...',
                success: 'Event deleted!',
                error: {
                    render({data}) {
                        console.log(data)
                        return `Deletion failed: ${data.message}`;
                    }
                }
            }
        );
    },
}

export default EventsAPI
