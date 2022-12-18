import axios from "axios";

export const httpGetRequest = async  (url: string, params: any) => {
   
    let  headers:any =  {
        "Content-type": "application/x-www-form-urlencoded"
    }
    const token = localStorage.getItem('token')
    if(token) {
        headers.Authorization = `Bearer ${token}`
    }
    return axios.get(url,{
        params: params,
        headers: headers
    })
}

export const httpPostRequest = async (url: string, params: any) => {
    let headers: any = {
        "Content-type": "application/x-www-form-urlencoded"
    }
    const token = localStorage.getItem('token')
    if(token) {
        headers.Authorization = `Bearer ${token}`
    }

    return axios.post(url, params, headers)
}