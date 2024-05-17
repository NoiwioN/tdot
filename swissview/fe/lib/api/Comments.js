import {getJSON, BASE_URL, postJSON, putJSON, deleteJSON} from "."
import {toast} from "react-toastify";

const URL = `${BASE_URL}/comments`;

const CommentsAPI = {
    createInCanton(comment, cantonId, userId, token) {
        return toast.promise(
            postJSON(`${URL}/`, {
                body: {
                    ...comment,
                    user: {id: userId},
                    canton: {id: cantonId}
                }, token
            }),
            {
                pending: 'Creating...',
                success: 'Comment created!',
                error: {
                    render({data}) {
                        console.log(data)
                        return `Creation failed: ${data.message}`;
                    }
                }
            }
        );
    },

    createSubcomment(comment, parentId, userId, token) {
        return toast.promise(
            postJSON(`${URL}/`, {
                body: {
                    ...comment,
                    user: {id: userId},
                    parent: {id: parentId}
                }, token
            }),
            {
                pending: 'Creating...',
                success: 'Comment created!',
                error: {
                    render({data}) {
                        console.log(data)
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
                success: 'Comment updated!',
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
                success: 'Comment deleted!',
                error: {
                    render({data}) {
                        console.log(data)
                        return `Deletion failed: ${data.message}`;
                    }
                }
            }
        );
    },

    readSubcomments(id) {
        return getJSON(`${URL}/${id}/subcomments`, {}).catch(reason => {
            toast.error(`Fetch failed: ${reason}`);
            return null;
        })
    },
}

export default CommentsAPI
