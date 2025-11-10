import axios from "axios";

class DraftApi{
    constructor(){
        this.baseUrl = `${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/drafts`;
    }

    async createDraft(draftData,images=[]){
        try {
            const formData = new FormData();

            for(const key in draftData){
                formData.append(key,draftData[key]);
            }

            images.forEach((image)=>{
                formData.append("images",image);
            })

            const response = await axios.post(
                `${this.baseUrl}/`,
                formData,
                {
                    withCredentials:true,
                    Headers:{
                        "Content-Type":"multipart-form-data",
                    }
                }
            )

            // console.log("Create Draft API Response = ",response.data)

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

export const draftApi = new DraftApi();