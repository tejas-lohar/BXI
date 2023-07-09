import axios from "axios";

// const baseURL = "http://localhost:7000/ap/i/v1/";
// Testing ==> https://bxi-testing.unada.in/
// const v1Backend = axios.create({
//   baseURL: "https://bxi-testing.unada.in/api/v1/",
//   baseURL:
//     process.env.NODE_ENV === "production"
//       ? "https://development-stage.bxi.unada.in/api/v1/"
//       : "http://localhost:7000/api/v1/",
//   withCredentials: true,
// });

// const baseURL = "https://bxi-testing.unada.in/api/v1/";
// const baseURL = "http://localhost:7000/api/v1/";
const baseURL = "https://development-stage.bxi.unada.in/api/v1/";

// process.env.NODE_ENV === "production"
//   ? "https://development-stage.bxi.unada.in/api/v1/"
//   :
// "http://localhost:7000/api/v1/";
//   : "http://localhost:7000/api/v1/";

const v1Backend = axios.create({
  baseURL,
  withCredentials: true,
});

export default v1Backend;
