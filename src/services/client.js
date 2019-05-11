import axios from 'axios';

function get(url) {
    return axios.get(`/api/2557663390919470/${url}`)
}

export default get;