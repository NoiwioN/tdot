import {getJSON, BASE_URL, postJSON, putJSON, deleteJSON} from "."
import {toast} from "react-toastify";

const URL = `${BASE_URL}/grades`;

const GradesAPI = {
    create(grade, subjectId, token) {
        return toast.promise(
            postJSON(`${URL}/`, {
                body: {
                    ...grade,
                    subject: {id: subjectId}
                }, token
            }),
            {
                pending: 'Creating...',
                success: 'Grade created!',
                error: {
                    render({data}) {
                        console.log(data)
                        return `Creation failed: ${data.message}`;
                    }
                }
            }
        );
    },

    read(id, token) {
        return getJSON(`${URL}/${id}`, {token}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },

    update(id, grade, token) {
        return toast.promise(
            putJSON(`${URL}/${id}`, {body: grade, token}),
            {
                pending: 'Updating...',
                success: 'Grade updated!',
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
                success: 'Grade deleted!',
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

export default GradesAPI
