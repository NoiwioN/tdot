import { BASE_URL, getJSON, postJSON } from "."


const URL = `${BASE_URL}`

const AuthenticationAPI = {
    login(user) {
        const data = postJSON(`${URL}/login`, {
            body: JSON.stringify(user)
        });
        return data;
    },

    getUserPerUsername(username, token){ 
        return getJSON(`${BASE_URL}/api/users/name/${username}`, { token }) 
        
    },

    getUserById(id, token){
        return getJSON(`${BASE_URL}/users/${id}`, {token })
    },
 
    signUp(user){
        return postJSON(`${URL}/api/users/sign-up`, {body: JSON.stringify(user)})
    }   
}

export default AuthenticationAPI