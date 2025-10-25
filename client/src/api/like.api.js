import axios from "axios";

class LikeApi{

    constructor(){
        this.baseUrl = `${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}`
    }

    async toggleBlogLike(blogId){
        try {
            const response = await axios.post(
                `${this.baseUrl}/likes/${blogId}`,
                {
                    withCredentials:true
                }
            )

            console.log("Like Toggle Response = ",response.data)
        } catch (error) {
            return {
                success:false,
                message:error.message,
                error:error
            }
        }
    }
}

export const likeApi = new LikeApi()