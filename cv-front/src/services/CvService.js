import http from '../http-common';

const getAll = () => {
    return http.get("/cvs");
};

const get = id => {
    return http.get(`/cvs/${id}`);
};

const create = data => {
    return http.post("/cvs", data);
};

const update = (id, data) => {
    return http.put(`/cvs/${id}`, data);
};

const remove = id => {
    return http.delete(`/cvs/${id}`);
};

const findByName = nombre => {
    return http.get(`/cvs?nombre=${nombre}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
};