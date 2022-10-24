import axios from 'axios';
const base_url: string = 'http://174.138.23.203:8080/api/';

const API = async (url: string, method: 'get' | 'post' | 'put' | 'patch', token: any, data: any, callback: any) => {
  let options = {
    url: `${base_url}${url}`,
    method: method,
    data: data,
    timeout: 300000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? 'Bearer ' + token : ''
    }
  };
  console.log("options", options);
  axios(options)
    .then((res: any) => {
      if (res.status == 200) {
        callback(res.data);
      } else {
        callback(false);
      }
    })
    .catch(async (error: any) => {
      console.log("Có lỗi rồi: ", error.response)
      callback(false);
      if (error.response.status == 401) {
        // Do something ..
        // Hết hạn token
      }
    })
};

const APIFormData = async (url: string, method: 'get' | 'post' | 'put' | 'patch', token: any, data: any, callback: any) => {
  let options = {
    url: `${base_url}${url}`,
    method: method,
    data: data,
    timeout: 300000,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token ? 'Bearer ' + token : '',
      "mimeType": "multipart/form-data", 
    }
  };
  console.log("options", options);
  axios(options)
    .then((res: any) => {
      if (res.status == 200) {
        callback(res.data);
      } else {
        callback(false);
      }
    })
    .catch(async (error: any) => {
      console.log("Có lỗi rồi: ", error)
      callback(false);
      if (error.response.status == 401) {
        // Do something ..
        // Hết hạn token
      }
    })
};



export {
  API,
  APIFormData
}