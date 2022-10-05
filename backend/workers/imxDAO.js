import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const caller = axios.create({
    baseURL: process.env.IMX_API_BASEURL,
    timeout: process.env.IMX_API_TIMEOUT,
});

export default class IMXDAO {

    static async mintToken(data, options) {
        caller.post("/v2/mints", data)
        .then(res => {return {header: res.headers, body: res.data}})
        .catch(err => {handleAPIError(err, options)});
    }

    static handleAPIError(err, options) {
        if (err.response.status === 500 && options?.retries > 0) {
            console.log("Internal server error, retrying...");
            setTimeout(() => {
                return getNFTsOwned(query, {
                    retries: options.retries - 1,
                    backOff: options.backOff * 2
                })}, options.backOff);
        } else {return err}
    }
}