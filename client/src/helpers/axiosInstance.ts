import axios from 'axios';
const apiAxios = axios.create();


const baseURL =String(process.env.VITE_API_ENPOINT)
const url = `${baseURL.substring(1,baseURL.length-1)}`;
apiAxios.defaults.baseURL = url;
apiAxios.defaults.withCredentials = true;
export default apiAxios;