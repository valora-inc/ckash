const baseURL = "https://api.xwift.africa"
const key = "niISiP9gF9cpgk9z"



class Pretium {
    api_key: string;

    constructor(api_Key: string) {
        this.api_key = api_Key;
    }

    getHeaders = () => {
        return {
            'Content-Type': 'application/json',
            'x-api-key': this.api_key || key
        };
    };

    exchange_rate = async () => {
        const requestOptions = {
            method: "POST" as const,
            headers: this.getHeaders(),
            body: JSON.stringify({
                "currency_code": "KES"
            })
        };
        const url = `${baseURL}/v1/exchange-rate`

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
            throw error;
        }
    };
    account_validation = async()=>{
        const requestOptions = {
            method: "POST" as const,
            headers: this.getHeaders(),
            body: JSON.stringify({
                "shortcode": "0701707772",
    "type": "MOBILE",
    "mobile_network": "Safaricom"
            })
        };
        const url = `${baseURL}/v1/validation`
        try{
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            return data;

        }catch(error){
            console.error("Error validating account:", error);
            console.log("THE ERROR IS",error)
            //throw error;

        }


    }

    make_payment = async({hash,amount}:{hash:string,amount:string})=>{

    //     "transaction_hash":"0x325caeb3cbb408faacb438a03e5b30f6f1068f65ec5b7de934f8d4a9ac2717b5",
    // "type": "MOBILE",
    // "shortcode": "0725212418",
    // "amount": "5000",
    // "mobile_network": "Safaricom"
    const requestOptions = {
            method: "POST" as const,
            headers: this.getHeaders(),
            body: JSON.stringify({
                "transaction_hash":hash,
    "type": "MOBILE",
    "shortcode": "0701707772",
    "amount": amount,
    "mobile_network": "Safaricom"
            })
        };


        const url = `${baseURL}/v1/pay`
        try{
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            return data;

        }catch(error){
            console.log("ERROR making payment");

        }
    }
}

export  {Pretium}
