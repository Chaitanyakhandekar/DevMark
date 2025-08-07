class ApiError extends Error{
    constructor(
        statusCode,
        message="Something Went Wrong",
    ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false
    }

}

class ApiResponse{
    constructor(
        statusCode,
        data,
        message="Success",
        
    ){
        this.statusCode = statusCode
        this.data = data
        this.message = message
    }
}

export {ApiError,ApiResponse}