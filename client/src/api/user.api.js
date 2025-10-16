import axios from "axios";

class UserApi {

    constructor() {

    }

    async loginUser(user) {
        try {
            const res = await axios
                .post(`
                    ${import.meta.env.VITE_ENV === 'production' ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.
                        VITE_BACKEND_URL_DEV
                    }/users/login
                `,
                    user,
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
            console.log("Login User :: Error :: ", error.message)
            return error
        }
    }

    async signupUser(user) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/users/register`, user)

            return {
                success: true,
                data: res.data
            };
        } catch (error) {
            console.log("Signup User :: Error :: ", error.message)
            return error
        }
    }

}

export const userApi = new UserApi();