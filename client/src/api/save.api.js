import axios from "axios";

class SaveApi {

    constructor(){
        this.baseUrl = `${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/saves`;
    }

    async toggleBlogSave(blogId){
        try {
            const response = await axios.get(
                `${this.baseUrl}/toggle/${blogId}`,
                {
                    withCredentials:true
                }
            )
            console.log("Save Toggle API Response = ",response.data.data)
            return {
                success:true,
                data:response.data.data
            }
        } catch (error) {
            return {
                success:false,
                message:error.message,
                error:error
            }
        }
    }

    async isBlogSaved(blogId){
        try {
            const response = await axios.get(
                `${this.baseUrl}/is-saved/${blogId}`,
                {
                    withCredentials:true
                }
            )

            console.log("Save API Response = ",response.data.data)
            return {
                success:true,
                data:response.data.data
            }
        } catch (error) {
            return {
                success:false,
                message:error.message,
                error:error
            }
        }
    }

}

export const saveApi = new SaveApi();