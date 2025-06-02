import * as React from "react"

import { View ,StyleSheet,TextInput,Text, Alert} from "react-native"
import { RootStackScreenProps } from "../../types"
import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"
import { usePublicClient, useWallet, useWalletClient,unlockAccount, navigate,prepareTransactions,PreparedTransactionsNotEnoughBalanceForGas,PreparedTransactionsPossible,sendTransactions,getFees,usePrepareTransactions} from '@divvi/mobile'
import { encodeFunctionData, erc20Abi, parseEther, parseUnits, TransactionRequestEIP1559 } from "viem"
import { celo, TransactionRequestCIP64 } from "viem/chains"
import debounce from 'lodash.debounce';
import { useTokens } from "../../../utils"
import { TokenBalance } from "src/tokens/slice"
import { Pretium_api } from "../../../contants/constant"
import { sendTransactionStable } from "../../../hooks/sendtransaction"


export type TransactionRequest = (TransactionRequestCIP64 | TransactionRequestEIP1559) & {
  _estimatedGasUse?: bigint
  _baseFeePerGas?: bigint
}

export default function SendMoney(_props: RootStackScreenProps<'KenyaSendMoney'>){
    const [phoneNumber,setPhoneNumber]= React.useState<string>("")
     const {data:walletClient} = useWalletClient({networkId:"celo-mainnet"})
     const [amount,setAmount]= React.useState<string>("");
     const [tokenAmount,setTokenAmount] = React.useState<string>("")
     const recipientAddress = "0x8005ee53E57aB11E11eAA4EFe07Ee3835Dc02F98" //"0x8005ee53E57aB11E11eAA4EFe07Ee3835Dc02F98" //"0x3668e51a4463b6250e73763458ba7a5e759424ed"  //meta//"0xEDE548D2fcEB23D27BfCa246995522D6e13Cbbc6" //pretium//"0x8005ee53E57aB11E11eAA4EFe07Ee3835Dc02F98"  mine//"0xEDE548D2fcEB23D27BfCa246995522D6e13Cbbc6"
     const {cKESToken,cUSDToken} = useTokens()
     const pub = usePublicClient({networkId:"celo-mainnet"})


     const handleGetRate = async()=>{
        const rate = await Pretium_api.exchange_rate()
        console.log("THE KES RATE",rate.data.buying_rate)
        const accountValdation = await Pretium_api.account_validation()
        console.log("Account Validation",accountValdation)
         }

    const handlePhoneChange =(text:string)=>{
        const cleaned = text.replace(/[^0-9]/g,'')
        setPhoneNumber(cleaned)
    }

    const fetchTokenAmount = React.useCallback(
    debounce(async (text: string) => {
      const numericValue = parseFloat(text);
      if (isNaN(numericValue)) {
        setTokenAmount('0');
        return;
      }

      try {
        const rate = await Pretium_api.exchange_rate();
        const exchangeRate = parseFloat(rate.data.buying_rate);

        if (!isNaN(exchangeRate) && exchangeRate > 0) {
          const tokenAmountToDeduct = numericValue / exchangeRate;
          setTokenAmount(tokenAmountToDeduct.toFixed(6));
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      }
    }, 500), // Delay in ms
    []
  );

  const handleAmountChange = (text: string) => {
    setAmount(text);
    fetchTokenAmount(text);
  };
    
    const handleSendMoney = async()=>{
        try{
           
           


                          
                        
  
  

if (!tokenAmount || tokenAmount ==null || tokenAmount == undefined){
    Alert.alert("Please provide Amount")
    return;
}

   


    
   
 



const txHash = await sendTransactionStable({from:walletClient?.account?.address as `0x${string}`,to:cUSDToken?.address as `0x${string}`,tokenBalance:cUSDToken as TokenBalance,type:"cip64",recipient:recipientAddress,amount:tokenAmount,feeCurrency:cUSDToken?.address as `0x${string}`})
    console.log("THE HASH PLAIN",txHash)

    if(!txHash){
      console.log("Failed to send")
      return;
    }
    
    const response = await Pretium_api.make_payment({mobile_network:"Safaricom",shortcode:phoneNumber,type:"MOBILE",transaction_hash:txHash as string,amount:amount})
    console.log("THE RESPONSE IS",response)
    Alert.alert(`We got ${txHash}`)
  
  
  


        }catch(error){
            console.log("THE ERROR",error)
            Alert.alert(`${error}`)

        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.sendMoney_card}>
                <Card style={styles.card}>
                    <View>
<Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.phoneNumber_input}
                    value={phoneNumber}
                    onChangeText={handlePhoneChange}
                    placeholder="0701707772"
                    keyboardType="phone-pad"
                    maxLength={15}
                    />
                    </View>

                    <View>
 <Text style={styles.label}>Amount</Text>
                    
                      <TextInput style={styles.phoneNumber_input}  placeholder="KES 50"
                    keyboardType="phone-pad" value={amount}
                    onChangeText={handleAmountChange}
                    />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"flex-end",alignItems: "flex-end"}}>
                        <Text>You will pay</Text>
                        <Text>{tokenAmount? tokenAmount : 0} cUSD</Text>
                    </View>
                    
                    

                </Card>

            </View>

            {/* confirm button */}
            <View style={styles.confirm}>
                <Button style={styles.send_button} title="SEND" onPress={handleSendMoney}/>

            </View>

        </View>

    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:16
    },
    sendMoney_card:{
        flex:2,
        gap:16

    },
    card:{
        width:"100%",
        height:"50%",
        gap:16,
        backgroundColor:"#AEC5FF"

    },
    confirm:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:"100%"

    },
    send_button:{
        width:"100%",
        alignItems:"center",
        backgroundColor:"blue"
    },
    phoneNumber_input:{
        borderWidth:1,
        backgroundColor:"#DAE3FF",
        borderColor:"#AEC5FF",
        paddingHorizontal:20,
        paddingVertical:12,
        borderRadius:2,
        fontSize:16
    },
    label:{
        fontSize:16,
        marginBottom:4,
        fontWeight:"400"
    }
})