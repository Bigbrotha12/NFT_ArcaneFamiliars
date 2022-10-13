import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export default class IMXDAO {

    static async mintToken(data, options, context) {
        const self = context || this;
        try {
            let response = await axios.post(`${process.env.IMX_API_BASEURL}/v2/mints`, data)
            console.log(response); 
            return {header: res.headers, body: res.data}
        } catch(error) {
            return {}
            // await self.handleAPIError(self, self.mintToken, data, error, options);
        }
    }

    // static async handleAPIError(context, target, data, error, options) {
    //     if (error.response.status === 500 && options?.retries > 0) {
    //         console.log("Internal server error, retrying attempt %d", options.retries);
    //         await setTimeout(() => {
    //             return target(data, {
    //                 retries: options.retries - 1,
    //                 backOff: options.backOff * 2
    //             }, context)}, options.backOff);
    //     } else {return {}}
    //}
}