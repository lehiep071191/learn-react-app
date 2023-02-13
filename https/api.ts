import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
interface MyAxiosInstance extends AxiosInstance {
    setToken: (token: string) => void;
}


const instanceAxios= axios.create({
    baseURL: 'http://localhost:5101',
    timeout: 300000,
    headers:  {
        "Content-type": "application/x-www-form-urlencoded"  
    },
    withCredentials: true
}) as MyAxiosInstance

instanceAxios.setToken = function(token: string){
    localStorage.setItem('token', token )
}

async function refreshToken () { 
    const customAxios = axios.create({
        baseURL: '',
        timeout: 300000,
        headers:  {
            "Content-type": "application/x-www-form-urlencoded"  
        },
        withCredentials: true
    })
    return await  customAxios.post('http://localhost:5101/api/auth/refresh-token',{
        headers:  {
            "Content-type": "application/x-www-form-urlencoded"  
        },
        withCredentials: true
    })
}
const requests: any[] = []

instanceAxios.interceptors.response.use((response: AxiosResponse) => {
    const {status, message} = response.data
    return response
}, 
    async error => {
    if(error.response.status === 401) {
        try {
            await refreshToken().then(res => {
                instanceAxios.setToken(res?.data?.access_token)
                requests.forEach(cb => {
                    console.log(cb)
                })
                return instanceAxios(error.response.config)

            }).catch(e => {
                Promise.reject(e)
            })

            
        } catch(e) {
            console.log(e)
        }
       
    }
})


export const httpGetRequest = async  (url: string, params?: any) => {
   
    let token
    if(window && window.localStorage) {
        token = window.localStorage.getItem('token')
    }
    if(token) {
        instanceAxios.defaults.headers.Authorization = `Bearer ${token}`
    }
    return instanceAxios.get(url,{
        params: params,
    })
}

export const httpPostRequest = async (url: string, params: any) => {

    let token
    if(window && window.localStorage) {
        token = window.localStorage.getItem('token')
    }
    if(token) {
        instanceAxios.defaults.headers.Authorization = `Bearer ${token}`
    }
    console.log(instanceAxios)
    return instanceAxios.post(url, params)
}

