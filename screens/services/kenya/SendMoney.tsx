import * as React from "react"
import { View ,StyleSheet,TextInput,Text, Alert, ScrollView, TouchableOpacity} from "react-native"
import { RootStackScreenProps } from "../../types"
import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"
import { usePublicClient, useWallet, useWalletClient,unlockAccount, navigate,TransactionRequest,prepareTransactions,PreparedTransactionsNotEnoughBalanceForGas,sendTransactions,getFees,usePrepareTransactions} from '@divvi/mobile'
import { encodeFunctionData, erc20Abi, parseEther, parseUnits } from "viem"
import { celo } from "viem/chains"
import { useTokens } from "../../../utils"
import { TokenBalance } from "src/tokens/slice"
import { Pretium_api } from "../../../contants/constant"

interface Contact {
    phone: string;
    name: string;
}

export default function SendMoney(_props: RootStackScreenProps<'KenyaSendMoney'>){
    const [phoneNumber,setPhoneNumber]= React.useState<string>("")
    const [activeTab, setActiveTab] = React.useState<'saved' | 'recent'>('saved')
    const [savedContacts] = React.useState<Contact[]>([
        { phone: '254700000000', name: 'John Doe' },
        { phone: '254711111111', name: 'Jane Smith' }
    ])
    const {data:walletClient} = useWalletClient({networkId:"celo-mainnet"})
    const [amount,setAmount]= React.useState<string>('0');
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
    function selectContact(contact: Contact): void {
        setPhoneNumber(contact.phone)
    }
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Send Money</Text>
            </View>

            {/* Bank Selection Card */}
            <View style={styles.bankCard}>
                <Text style={styles.bankLabel}>Select Bank</Text>
                <View style={styles.bankSelector}>
                    <View style={styles.mpesaContainer}>
                        <Text style={styles.mpesaText}>M-</Text>
                        <Text style={[styles.mpesaText, styles.mpesaGreen]}>PESA</Text>
                    </View>
                    <Text style={styles.mpesaSubtext}>Mpesa</Text>
                </View>
            </View>

            {/* Account Input Card */}
            <View style={styles.inputCard}>
                <Text style={styles.inputLabel}>Account Number/Mobile Number</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.phoneInput}
                        value={phoneNumber}
                        onChangeText={handlePhoneChange}
                        placeholder="Enter account Number"
                        placeholderTextColor="#A0A0A0"
                        keyboardType="phone-pad"
                        maxLength={15}
                    />
                    <TouchableOpacity style={styles.contactButton}>
                        <Text style={styles.contactIcon}>📞</Text>
                    </TouchableOpacity>
                </View>
                {phoneNumber && (
                    <Text style={styles.accountName}>Account name: PABLO LEMONR</Text>
                )}
            </View>

            {/* Amount Input */}
            <View style={styles.amountSection}>
                <View style={styles.amountHeader}>
                    <Text style={styles.amountLabel}>Enter Amount (NGN)</Text>
                    <Text style={styles.amountDisplay}>₦ 245.31</Text>
                </View>
                <TextInput
                    style={styles.amountInput}
                    value={amount}
                    onChangeText={text => setAmount(text)}
                    placeholder="₦ 100"
                    placeholderTextColor="#A0A0A0"
                    keyboardType="numeric"
                />
                <Text style={styles.amountLimit}>(min. 200 max 60,000)</Text>
            </View>

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={handleSendMoney}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            {/* Contacts Section */}
            <View style={styles.contactsSection}>
                <View style={styles.contactsHeader}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
                        onPress={() => setActiveTab('saved')}
                    >
                        <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>
                            Saved Contact
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
                        onPress={() => setActiveTab('recent')}
                    >
                        <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>
                            Recent Contact
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreButton}>
                        <Text style={styles.moreIcon}>⚙️</Text>
                    </TouchableOpacity>
                </View>

                {/* Contact List */}
                <View style={styles.contactsList}>
                    {savedContacts.map((contact, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.contactItem}
                            onPress={() => selectContact(contact)}
                        >
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactPhone}>{contact.phone}</Text>
                                <Text style={styles.contactName}>{contact.name}</Text>
                            </View>
                            <View style={styles.contactAvatar}>
                                <Text style={styles.avatarText}>M</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        marginBottom: 8,
    },
    backButton: {
        marginRight: 16,
    },
    backArrow: {
        fontSize: 24,
        color: '#333',
        fontWeight: '300',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    bankCard: {
        backgroundColor: '#E8F0FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    bankLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    bankSelector: {
        alignItems: 'flex-start',
    },
    mpesaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mpesaText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF0000',
    },
    mpesaGreen: {
        color: '#00AA00',
    },
    mpesaSubtext: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    inputCard: {
        backgroundColor: '#E8F0FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    phoneInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    contactButton: {
        padding: 4,
    },
    contactIcon: {
        fontSize: 16,
        color: '#2B5CE6',
    },
    accountName: {
        fontSize: 12,
        color: '#2B5CE6',
        marginTop: 8,
    },
    amountSection: {
        backgroundColor: '#E8F0FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    amountHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    amountLabel: {
        fontSize: 14,
        color: '#666',
    },
    amountDisplay: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    amountInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 16,
        fontSize: 24,
        fontWeight: '300',
        color: '#333',
        marginBottom: 8,
    },
    amountLimit: {
        fontSize: 12,
        color: '#FF6B6B',
    },
    continueButton: {
        backgroundColor: '#2B5CE6',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 24,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    contactsSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    contactsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 16,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#2B5CE6',
    },
    tabText: {
        fontSize: 14,
        color: '#666',
    },
    activeTabText: {
        color: '#2B5CE6',
        fontWeight: '600',
    },
    moreButton: {
        marginLeft: 'auto',
    },
    moreIcon: {
        fontSize: 16,
    },
    contactsList: {
        gap: 12,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
    },
    contactInfo: {
        flex: 1,
    },
    contactPhone: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    contactName: {
        fontSize: 12,
        color: '#666',
    },
    contactAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2B5CE6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
})