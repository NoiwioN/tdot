import {getJSON, BASE_URL, postJSON, putJSON, deleteJSON} from "."
import {toast} from "react-toastify";

const URL = `${BASE_URL}/feedbacks`;

const FeedbacksAPI = {
    create(feedback, cantonId, userId, token) {
        return toast.promise(
            postJSON(`${URL}/`, {
                body: {
                    ...feedback,
                    user: {id: userId},
                    canton: {id: cantonId}
                }, token
            }),
            {
                pending: 'Creating...',
                success: 'Feedback created!',
                error: {
                    render({data}) {
                        return `Creation failed: ${data.message}`;
                    }
                }
            }
        );
    },

    read(id) {
        return getJSON(`${URL}/${id}`, {}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },

    update(id, feedback, token) {
        return toast.promise(
            putJSON(`${URL}/${id}`, {body: feedback, token}),
            {
                pending: 'Updating...',
                success: 'Feedback updated!',
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
                success: 'Feedback deleted!',
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

export default FeedbacksAPI
