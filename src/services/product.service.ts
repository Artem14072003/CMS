import axios from "axios";
import {IProduct} from "../assets/ts/interface.ts";

export const ProductService = {
    async getAll() {
        const response = await axios.get('https://gorgeous-mellow-amaryllis.glitch.me/api/goods')
        return response.data
    },
    async getById(id: string) {
        const response = await axios
            .get(`https://gorgeous-mellow-amaryllis.glitch.me/api/goods/${id}`)
        return response.data
    },

    async create(data: IProduct) {
        return axios.post('https://gorgeous-mellow-amaryllis.glitch.me/api/goods', data)
    },

    async update(data: IProduct, id: string) {
        return axios.patch(`https://gorgeous-mellow-amaryllis.glitch.me/api/goods/${id}`, data)
    },

    async delete(id: string) {
        return axios.delete(`https://gorgeous-mellow-amaryllis.glitch.me/api/goods/${id}`)
    }
}