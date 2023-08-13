import httpService from "./axios.config"
import { restApiEndpoint } from "./restapiEndpoint"

export interface IUser{
    firstName:string;
    lastName:string;
    password:string;
    email:string;
    twoFactorAuth?:boolean;
}

export interface ITwoFactorAuth{
    email:string;
    twoFactorAuth:boolean
}
export interface IUpdatePassword{
    newPassword:string;
    oldPassword:string;
    email:string
}

export interface ILogin{
    password:string;
    email:string;
}
export interface IAuth{
    email:string | undefined
}
export const getUsers=async()=>{
    return httpService.post(restApiEndpoint.getUser).then(res=>res.data)
    .catch(error=>{
        throw new Error(error)
    })
}

export const getUserByEmail=async(email:string)=>{
    return httpService.get(restApiEndpoint.getUserByEmail + email).then(res=>res.data)
    .catch(error=>{
        throw new Error(error)
    })
}
export const registerUser=async(data:IUser)=>{
    return httpService.post(restApiEndpoint.registerUser,data).then(res=>res.data)
    .catch(error=>{
        throw new Error(error)
    })
}

export const login=async(data:ILogin)=>{
    return httpService.post(restApiEndpoint.login,data).then(res=>res.data)
    .catch(error=>{
        throw new Error(error)
    })
}

export const twoFactorAuth=async(data:IAuth)=>{
return httpService.post(restApiEndpoint.twoFactorAuth,data).then(res=>res.data)
.catch(error=>{
    throw new Error(error)
})
}

export const updatePassword=async(data:IUpdatePassword)=>{
    const updateData={newPassword:data.newPassword,
    oldPassword:data.oldPassword}
    return httpService.put(restApiEndpoint.updatePassword + data.email,updateData).then(res=>res.data)
    .catch(error=>{
        throw new Error(error)
    })
}

export const updateTwoFactorAuth=async(data:ITwoFactorAuth)=>{
    const updateData={twoFactorAuth:data.twoFactorAuth}
    return httpService.put(`${restApiEndpoint.updateTwoFactorAuth}${ data.email}`,updateData).then(res=>res.data)
    .catch(error=>{
        throw new Error(error)
    })
}