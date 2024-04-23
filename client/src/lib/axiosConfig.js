import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8800/api/",
});

// // Also add/ configure interceptors && all the other cool stuff
// instance.interceptors.request.use(
//   (request) => {
//     console.log(request);
//     // Edit request config
//     return request;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     console.log(response);
//     // Edit response config
//     return response;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

export default instance;
