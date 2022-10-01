import axios from "axios";

const caller = axios.create({
    baseURL: "https://api.ropsten.x.immutable.com",
    timeout: 2000,
});

export default class IMXDAO {

    static async mintToken(data, options) {
        caller.post("/v2/mints", data)
        .then( res => {
            console.log(res);
            return { header: res.headers, body: res.data };
        })
        .catch( err => {
            if (err.response.status === 500 && options.retries) {
                console.log("Internal server error, retrying...");
                setTimeout(() => {
                    return mintToken(data, {
                        retries: options.retries - 1,
                        backOff: options.backOff * 2
                    })}, options.backOff);
            } else if (err.request) {
                console.log("No response from IMX");
            } else {
                console.log(err);
            }
        });
    }
}