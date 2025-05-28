import * as React from "react"

import { View ,StyleSheet,TextInput,Text, Alert} from "react-native"
import { RootStackScreenProps } from "../../types"
import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"
import { usePublicClient, useWallet, useWalletClient,unlockAccount, navigate,TransactionRequest,prepareTransactions,PreparedTransactionsNotEnoughBalanceForGas,sendTransactions,getFees,usePrepareTransactions} from '@divvi/mobile'
import { encodeFunctionData, erc20Abi, parseEther, parseUnits } from "viem"
import { celo } from "viem/chains"
import { useTokens } from "../../../utils"
import { TokenBalance } from "src/tokens/slice"
import { Pretium_api } from "../../../contants/constant"

export default function SendMoney(_props: RootStackScreenProps<'KenyaSendMoney'>){
    const [phoneNumber,setPhoneNumber]= React.useState<string>("")
     const {data:walletClient} = useWalletClient({networkId:"celo-mainnet"})
     const [amount,setAmount]= React.useState<number>(0);
     const recipientAddress = "0x8005ee53E57aB11E11eAA4EFe07Ee3835Dc02F98" //"0xEDE548D2fcEB23D27BfCa246995522D6e13Cbbc6"
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

    const handleAmountChange =async(text:string)=>{
         const rate = await Pretium_api.exchange_rate()
        console.log("THE KES RATE",rate.data.buying_rate)
          const amount = parseFloat(text) *  parseFloat(rate.data.buying_rate)
        
    }
    const handleSendMoney = async()=>{
        try{
            const feeData = await pub.estimateFeesPerGas();
//             const transactionsrequest ={
//                  to: cKESToken?.address as `0x${string}`, // cKES token address 
//                  data:  encodeFunctionData({
//                               abi: erc20Abi,
//                               functionName: 'transfer',
//                               args: [recipientAddress as `0x${string}`, parseEther("10")],
//                           }),
//                    //feeCurrency:cKESToken?.address as string,
//                    gas: BigInt(2000000),
                  
                  
//                   // _baseFeePerGas:BigInt(500000),
//                    maxFeePerGas: feeData.maxFeePerGas,
//   //estimatedGasUse: BigInt(200_000_000),
//    _estimatedGasUse:  BigInt(200_000_000),
//   _baseFeePerGas:  BigInt(200_000_000)


                          
                        
  
  


//             }
            
            

    //         const result = await prepareTransactions({networkId:"celo-mainnet",transactionRequests:[transactionsrequest]})
    //       // const result = await preparetransactionresult;
    //        //console.log("The result",preparetransactionresult)
    //        const fees =   getFees({
    //     feeCurrency: cKESToken as TokenBalance, transactions: [transactionsrequest],
    //     type:"possible",

    // })
    // console.log("The fees FEEEFS",fees)
   

if (true) {
    
    //  unlockAccount()
    // const tx = await sendTransactions({
    //     feeCurrency: cKESToken as TokenBalance,
    //      transactions: [transactionsrequest],
    //     type:"possible",
        
        

    // })
    //  Alert.alert(tx as unknown as string)
  // proceed with transaction
  //TODO CNAGE TO SEND TRANSACTIONS
  unlockAccount()
  const theamount = "0.3"
  const txRequest = await walletClient?.prepareTransactionRequest({
              chainId: 42220, // Celo chain ID
              to: cUSDToken?.address as `0x${string}`, // cKES token address
              data: encodeFunctionData({
                  abi: erc20Abi,
                  functionName: 'transfer',
                  args: [recipientAddress as `0x${string}`, parseEther(theamount)],
              }),
              chain: celo,
              account: walletClient?.account,
              feeCurrency:cUSDToken?.address as `0x${string}`
              
          });

   const signedTx = await walletClient?.signTransaction(txRequest as any);
          const txHash = await pub?.sendRawTransaction({ serializedTransaction: signedTx as any});
           const rate = await Pretium_api.exchange_rate()
        console.log("THE KES RATE",rate.data.buying_rate)
          const amount = parseFloat(theamount) *  parseFloat(rate.data.buying_rate)

          const response = await Pretium_api.make_payment({hash:txHash,amount:amount.toString()})

    Alert.alert(` The HASH ${response}`)

} else if (false) {
    Alert.alert("REDUCE BALANCE NOT ENOUGH")
  // ask user to reduce the spend amount
} else if (false) {
  // inform user they don't have enough gas balance
   Alert.alert("DON Have enough gas fee for gas")
}
            
            // const txRequest = await walletClient?.prepareTransactionRequest({
            //               chainId: 42220, // Celo chain ID
            //               to: "0x456a3d042c0dbd3db53d5489e98dfb038553b0d0", // cKES token address                          
            //               data: encodeFunctionData({
            //                   abi: erc20Abi,
            //                   functionName: 'transfer',
            //                   args: [recipientAddress as `0x${string}`, parseEther("0.00001")],
            //               }),
            //               chain: celo,
            //               account: walletClient?.account,
            //               feeCurrency:"0x456a3d042c0dbd3db53d5489e98dfb038553b0d0"
                          
            //           });
            //           const txx = await prepareTransactions({

            //     transactionRequests:txRequest,
                
            // })
                    //   unlockAccount()
            // const tx = await walletClient?.sendTransaction(txRequest as any)

        }catch(error){
            console.log("THE ERROR",error)
            Alert.alert(`${error} from the error`)

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
                    keyboardType="phone-pad"/>
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
        flex:1.5,
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