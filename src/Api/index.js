import axios from 'axios';

const customerPostUrl = "http://13.233.25.140/insert_record"
const customerLoginUrl = "http://13.233.25.140/login"
const customerEditUrl = "http://13.233.25.140/update_record/"

// const config = {     
//     headers: { 'content-type': 'multipart/form-data' }
// }




// for form data
const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': `Bearer ${localStorage['access_token']}`
}

//for json
const headers_json = {
  'Content-Type': 'application/json',
}

export const customerInsert = (data) => axios.post(customerPostUrl,data,{headers:headers}); 

export const clientLogin = (data) =>  axios.post(customerLoginUrl,data,{headers:headers_json});

export const clientEdit = (data, id) => axios.patch(customerEditUrl +`${id}`,data,{headers:headers})

