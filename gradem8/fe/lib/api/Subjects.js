import {getJSON, BASE_URL, postJSON, putJSON, deleteJSON} from "."
import {toast} from "react-toastify";

const URL = `${BASE_URL}/subjects`;

const SubjectsAPI = {
    create(subject, semesterId, token) {
        return toast.promise(
            postJSON(`${URL}/`, {
                body: {
                    ...subject,
                    semester: {id: semesterId}
                }, token
            }),
            {
                pending: 'Creating...',
                success: 'Subject created!',
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

    update(id, subject, token) {
        return toast.promise(
            putJSON(`${URL}/${id}`, {body: subject, token}),
            {
                pending: 'Updating...',
                success: 'Subject updated!',
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
                success: 'Subject deleted!',
                error: {
                    render({data}) {
                        console.log(data)
                        return `Deletion failed: ${data.message}`;
                    }
                }
            }
        );
    },

    readGrades(id, token) {
        return getJSON(`${URL}/${id}/grades`, {token}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },
}

export default SubjectsAPI
