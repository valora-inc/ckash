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


export type TransactionRequest = (TransactionRequestCIP64 | TransactionRequestEIP1559) & {
  _estimatedGasUse?: bigint
  _baseFeePerGas?: bigint
}

export default function SendMoney(_props: RootStackScreenProps<'KenyaSendMoney'>){
    const [phoneNumber,setPhoneNumber]= React.useState<string>("")
     const {data:walletClient} = useWalletClient({networkId:"celo-mainnet"})
     const [amount,setAmount]= React.useState<string>("");
     const [tokenAmount,setTokenAmount] = React.useState<string>("")
     const recipientAddress = "0x8005ee53E57aB11E11eAA4EFe07Ee3835Dc02F98" //"0x3668e51a4463b6250e73763458ba7a5e759424ed"  //meta//"0xEDE548D2fcEB23D27BfCa246995522D6e13Cbbc6" //pretium//"0x8005ee53E57aB11E11eAA4EFe07Ee3835Dc02F98"  mine//"0xEDE548D2fcEB23D27BfCa246995522D6e13Cbbc6"
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
           
            //const feeData = await pub.estimateFeesPerGas();
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


// Custom TransactionRequest type for Celo and EVM

//new 
if (!tokenAmount || tokenAmount ==null || tokenAmount == undefined){
    Alert.alert("Please provide Amount")
    return;
}
const transactionsrequest: TransactionRequest = {
    from:walletClient?.account?.address,
  type: 'cip64',
  to: cUSDToken?.address as `0x${string}`, // cKES token address
  data: encodeFunctionData({
    abi: erc20Abi,
    functionName: 'transfer',
    args: [recipientAddress as `0x${string}`, parseEther(tokenAmount)],
  }),
  //value: BigInt(0), // ERC-20 transfers require this to be 0
  feeCurrency: cUSDToken?.address as `0x${string}`, // optional but recommended
  gas: BigInt(100000),
maxFeePerGas: BigInt(10000000000),
 maxPriorityFeePerGas: BigInt(10000000000),
  _estimatedGasUse: BigInt(20000000),
  _baseFeePerGas: BigInt(200000000),
}
           

 const result:PreparedTransactionsPossible = {
                 feeCurrency: cUSDToken as TokenBalance,
         transactions: [transactionsrequest],
        type:"possible",   
            }
            const fees = await getFees(result)
            console.log("THE FEES",fees)
            
            
            

    //         const result = await prepareTransactions({networkId:"celo-mainnet",transactionRequests:[transactionsrequest]})
    //       // const result = await preparetransactionresult;
    //        //console.log("The result",preparetransactionresult)
    //        const fees =   getFees({
    //     feeCurrency: cKESToken as TokenBalance, transactions: [transactionsrequest],
    //     type:"possible",

    // })
    // console.log("The fees FEEEFS",fees)
   

if (true) {
    
   
    // const tx = await sendTransactions({
    //     feeCurrency: cKESToken as TokenBalance,
    //      transactions: [transactionsrequest],
    //     type:"possible",
        
        

    // })
    //  Alert.alert(tx as unknown as string)
  // proceed with transaction
  //TODO CNAGE TO SEND TRANSACTIONS
  const unlockResult = await unlockAccount()

  if (unlockResult === 'success') {
    console.log('Wallet unlocked successfully!')
//     const theamount = "0.2"
//   const txRequest = await walletClient?.prepareTransactionRequest({
//               chainId: 42220, // Celo chain ID
//               to: cUSDToken?.address as `0x${string}`, // cKES token address
//               data: encodeFunctionData({
//                   abi: erc20Abi,
//                   functionName: 'transfer',
//                   args: [recipientAddress as `0x${string}`, parseEther(theamount)],
//               }),
//               chain: celo,
//               account: walletClient?.account,
//               feeCurrency:cUSDToken?.address as `0x${string}`
              
//           });

//    const signedTx = await walletClient?.signTransaction(txRequest as any);
//           const txHash = await pub?.sendRawTransaction({ serializedTransaction: signedTx as any});
//            const rate = await Pretium_api.exchange_rate()
//         console.log("THE KES RATE",rate.data.buying_rate)
//           const amount = parseFloat(theamount) *  parseFloat(rate.data.buying_rate)

//           const response = await Pretium_api.make_payment({hash:txHash,amount:amount.toString()})
//           console.log("THE RESPONSE",response)

//     Alert.alert(` The HASH ${JSON.stringify(response)}`)

//use this new
const txHash = await sendTransactions({
        feeCurrency: cUSDToken as TokenBalance,
         transactions: [transactionsrequest],
        type:"possible",      
        

    })
    console.log("THE HASH PLAIN",txHash)
    console.log("THE HASH 0",txHash[0])
    const response = await Pretium_api.make_payment({mobile_network:"Safaricom",shortcode:phoneNumber,type:"MOBILE",transaction_hash:txHash[0] as string,amount:amount})
    console.log("THE RESPONSE IS",response)
    Alert.alert(`We got ${txHash}`)
  } else if (unlockResult === 'failure') {
    console.warn('Failed to unlock wallet.')
    Alert.alert(` Failed to unlock wallet.`)
  } else if (unlockResult === 'canceled') {
    console.log('User canceled unlock.')
     Alert.alert(` User canceled unlock.`)
    
  }
  
  

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