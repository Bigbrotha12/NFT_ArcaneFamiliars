import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();

//axios.defaults.baseURL = process.env.IMX_API_BASEURL;
//  const caller = axios.create({
//      baseURL: process.env.IMX_API_BASEURL,
//      timeout: process.env.IMX_API_TIMEOUT,
//     });

export default class IMXDAO {

    static async mintToken(data, options) {
        try {
            let response = await axios.post(`${process.env.IMX_API_BASEURL}/v2/mints`, data)
            console.log(response); 
            return {header: res.headers, body: res.data}
        } catch(error) {
            this.handleAPIError(error, options);
        }
    }

    static handleAPIError(error, options) {
        console.log(error);
        if (error.response.status === 500 && options?.retries > 0) {
            console.log("Internal server error, retrying...");
            setTimeout(() => {
                return getNFTsOwned(query, {
                    retries: options.retries - 1,
                    backOff: options.backOff * 2
                })}, options.backOff);
        } else {return error}
    }
}