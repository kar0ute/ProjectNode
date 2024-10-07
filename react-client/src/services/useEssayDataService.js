import http from "../http-common";

export default function useEssayDataService() {

    const getAll = () => {
        return http.get("/essays") ;
    }

    const getEssay = (id) => {
        return http.get(`/essays/${id}`);
    }

    const createEssay = (data) => {
        return http.post("/essays", data);
    }

    const updateEssay = (id, data) => {
        return http.put(`/essays/${id}`, data);
    }

    
    const deleteEssay = (id) => {
        return http.delete(`/essays/${id}`);
    }

    const deleteAll = () => {
        return http.delete(`/essays`);
    }

    const findByTitle = (title) => {
        return http.get(`/essays?title=${title}`);
    }

    return {getAll,  getEssay,  createEssay,  updateEssay,  deleteEssay, deleteAll, findByTitle}
}