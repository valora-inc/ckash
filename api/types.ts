


export type MAKEPAYMENT ={
     "transaction_hash":string,
    "type": PaymentType,
    "shortcode": string,
    account_number?:string,
    "amount": string,
    "mobile_network": MobileNetwork,
    country_code?:string
    account_name?:string
}
export type PaymentType = 'MOBILE' | 'PAYBILL' | 'BUY_GOODS'

export type MobileNetwork = 'Safaricom' | 'MTN' | 'AirtelTigo' | 'Telcel'  | 'Airtel'

export type CountryCodes =  'KES' |  'GHS' | 'UGX' | 'NGN' 

//ALL SERVICES USES baseurl/v1/pay



/********
 * KENYA SERVICES
 * 1. Send money
 *  *******************
 * BODY:{
 * transaction_hash:string, i.e "0x75674743763476734677567"
 * type:"MOBILE",
 * shortcode:string , i.e "0701707772"
 * amount:string  , i.e "5000"
 * mobile_network:"Safaricom"  
 * }* 
 * 
 * ***************************** 
 * 2. PAYBILL
 * ******************
 *BODY:{
 * transaction_hash:string, i.e "0x75674743763476734677567"
 * type:"PAYBILL",
 * shortcode:string , i.e "247247"
 * account_number:string, i.e "0701707772"
 * amount:string  , i.e "5000"
 * 
 * }* 
 * *******************
 * 3. BUY GOODS
 * ******************
 * BODY:{
 * transaction_hash:string, i.e "0x75674743763476734677567"
 * type:"BUY_GOODS",
 * shortcode:string , i.e "456839"
 * amount:string  , i.e "5000"
 *   
 * }* 
 * **********
 * 
 * 
 * UGANDA
 * 
 * 1."SEND MONEY"
 * BODY:{
 * transaction_hash:string, i.e "0x75674743763476734677567"
 * type:"MOBILE",
 * shortcode:string , i.e "0701707772"
 * amount:string  , i.e "5000"
 * mobile_network:"MTN"  either MTN | Airtel 
 * }* 
 * 
 * 
 * 
 * *****************************
 * GHANA
 * 
 * 1. SEND MONEY
 * BODY:{
 * transaction_hash:string, i.e "0x75674743763476734677567"
 * type:"MOBILE",
 * shortcode:string , i.e "0701707772"
 * amount:string  , i.e "5000"
 * mobile_network:"MTN"   either MTN | AirtelTigo | Telcel
 * }* 
 * 
 * 
 */