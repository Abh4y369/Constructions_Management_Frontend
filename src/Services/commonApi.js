import axios from "axios";


const commonApi=async (reqUrl,reqMethod,reqData,reqHeader)=>{
    const config={
        url:reqUrl,
        method:reqMethod,
        data:reqData,
        headers:reqHeader?reqHeader:{'Content-type':'application/json'}
    }

    try{
        const res=await axios(config)
        return res
    }
    catch(err){
       return err.response || { status: 0, data: { message: "Unable to reach the server" } };
    }

    
}


export default commonApi
