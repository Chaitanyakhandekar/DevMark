import server from "./server.js";

server.listen(3000,()=>{
    console.log("DevMark server is live.")
})

server.get("/test/:id", (req,res)=>{
    res.send({
        message:`hello this is DevMark ${req.params.id}`
    })
})