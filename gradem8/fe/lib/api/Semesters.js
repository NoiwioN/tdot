import {getJSON, BASE_URL, postJSON, putJSON, deleteJSON} from "."
import {toast} from "react-toastify";

const URL = `${BASE_URL}/semesters`;

const SemestersAPI = {
    create(semester, userId, token) {
        return toast.promise(
            postJSON(`${URL}/`, {
                body: {
                    ...semester,
                    user: {id: userId}
                }, token
            }),
            {
                pending: 'Creating...',
                success: 'Semesters created!',
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

    update(id, semester, token) {
        return toast.promise(
            putJSON(`${URL}/${id}`, {body: semester, token}),
            {
                pending: 'Updating...',
                success: 'Semester updated!',
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
                success: 'Semester deleted!',
                error: {
                    render({data}) {
                        console.log(data)
                        return `Deletion failed: ${data.message}`;
                    }
                }
            }
        );
    },

    readSubjects(id, token) {
        return getJSON(`${URL}/${id}/subjects`, {token}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },
}

export default SemestersAPI
