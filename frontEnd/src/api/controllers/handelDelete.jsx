
import CostumAxios from "../axios";

const handleDelete = async (url,id) => {
    try {
        await CostumAxios.delete(`/${url}/${id}`);
    } catch (error) {
        console.error(error);
        alert("وقعت شي مشكلة ❌");
    }
};


export default handleDelete;