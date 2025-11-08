import axios from "axios";

class BlogApi{
    constructor(){
        this.baseUrl = `${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/blogs`
    }

    async updateBlog(blogId,blogData){
         try {
            
         } catch (error) {
            
         }
    }

    async getBlogById(blogId){
        try {
            const response = await axios.get(
                `${this.baseUrl}/${blogId}`,
                {
                    withCredentials:true
                }
            )

            console.log("Fetched Blog by ID Response = ",response.data.data)

            return {
                success:true,
                data:response.data.data
            }


            // return response.data
        } catch (error) {
            console.error("Error fetching blog by ID:", error)
            return {
                success:false,
                message:error.message,
                error:error
            }
        }
    }
}

export const blogApi = new BlogApi();