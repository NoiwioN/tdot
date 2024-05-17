import { getJSON, postJSON, putJSON, deleteJSON, BASE_URL } from "."

const URL = `${BASE_URL}/api`

const ICTKebabAPI = {
    readFood() {
            const data =  getJSON(`${URL}/food`);
            return data;
        },

    readDrinks() {
            const data =  getJSON(`${URL}/drinks`);
            return data;
    },

    readSauces() {
            const data =  getJSON(`${URL}/sauces`);
            return data;
    },

    create(order, token){
        const data = postJSON(`${URL}/orders`, {body: 
            JSON.stringify(order), token: token}, true)
        return data
    },

    delete(order, token){
        let data = null
        try{
            data = deleteJSON(`${URL}/${order.id}`, {token}, true)
            toast.success("Successful deleted post")
        } catch (error) {
            toast.error("Error while deleting post")
        }
        return data
    },

    update(order, token){
        const data = putJSON(URL, {body:order, token})
        toast.success("Successful updated post")
        return data
    },
    
     async readIdFood(id) {
        const data = await getJSON(`${URL}/food/${id}`)
        return data;
    },

    async readIdDrinks(id) {
        const data = await getJSON(`${URL}/drinks/${id}`)
        return data;
    },

    async readIdSauces(id) {
        const data = await getJSON(`${URL}/sauces/${id}`)
        return data;
    }
      
}

export default ICTKebabAPI;