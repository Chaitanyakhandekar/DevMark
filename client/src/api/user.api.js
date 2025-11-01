import axios from "axios";

class UserApi {

    constructor() {
        this.baseUrl = import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV;
    }

    
    async signupUser(user) {
        try {
            const res = await axios.post(`${this.baseUrl}/users/register`, user)

            return {
                success: true,
                data: res.data
            };
        } catch (error) {
            console.log("Signup User :: Error :: ", error.message)
            return error
        }
    }

    async loginUser(user) {
        try {
            const res = await axios
                .post(`${this.baseUrl}/users/login
                `,
                    user,
                    {
                        withCredentials: true
                    }
                )

            console.log("data = ", res.data.success)

            if(!res.data.success){
                throw new Error(res.data.message || "Login Failure")
            }
            return {
                success: true,
                data: res.data
            }
        } catch (error) {
            // console.log("Login User :: Error :: ", error.message)
            return {
                success: false,
                error: error.message

            }
        }
    }

    async logoutUser() {
        try {
            const res = await axios
                .get(`${this.baseUrl}/users/logout
                `,
                    {
                        withCredentials: true
                    }
                )

            console.log("data = ", res.data)
            return {
                success: true,
                data: res.data
            }
        } catch (error) {
            console.log("Logout User :: Error :: ", error.message)
            return error
        }
    }

    async fetchUserProfile(){
        try {
            const res = await axios.get(
                `${this.baseUrl}/users/profile`,
                {
                    withCredentials:true
                }
            )

            console.log("response of Profile = ",res.data.data)

            return {
                success:true,
                data:res.data.data
            }
        } catch (error) {
            console.log("Fetch User Profile :: ERROR :: ",error.message)
            return {
                success:false,
                error:error.message
            }
        }
    }

    async updateUserProfile(profileData){
        try {

            const res = await axios.patch(
                `${this.baseUrl}/users/profile`,
                profileData,
                {
                    withCredentials:true
                }
            )

            if(res.data.success){
                return {
                    success:true,
                    data:res.data.data
                }
            }

            console.log("update Data response = ",res.data)
            
        } catch (error) {
            console.log("Update User Profile :: ERROR :: ",error.message)
            return{
                success:false,
                message:error.message
            }
        }
    }

    async updateUserAvatar(data){
        try {
            const res = await axios.patch(`
                    ${this.baseUrl}/users/avatar
                `,
                data,
                {
                    withCredentials:true,
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }
            )

            if(!res.data.success){
                throw new Error("Update Avatar Failure.")
            }

            console.log("Avatar Update ",res.data)

            return {
                success:true,
                data:res.data
            }
        } catch (error) {
            return {
                success:false,
                error:error.message
            }
        }
    }

}

export const userApi = new UserApi();