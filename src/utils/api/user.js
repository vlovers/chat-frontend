import { axios } from "../../core";

const user = {
    getMe: () => axios.get("/user/me"),
    login: postData => axios.post("/user/login", postData),
    registration: postData => axios.post("/user/registration", postData),
    verifyHash: hash => axios.get(`/user/verify?hash=${hash}`),
    findUsers: query => axios.get("/user/find?query=" + query)
};

export default user;