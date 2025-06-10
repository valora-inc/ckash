import * as React from "react"
import { View, TextInput, Text, TouchableOpacity, ScrollView, Image, Alert } from "react-native"
import { RootStackScreenProps } from "../../types";
import { useSend } from "../../../hooks/useSend"
import { useTokens } from "../../../utils"
import { useWalletClient } from '@divvi/mobile'
import { getExchangeRate, getRatedAmount, validateAccount } from "../../../lib/cKash"
import debounce from "lodash.debounce"
import { TokenBalance } from "src/tokens/slice"
import AlertModal from "../../../components/AlertModal"
import Button from "../../../components/ui/Button"
import Card from "../../../components/ui/Card"
import { MobileNetwork } from "../../../api/types";
import tw from 'twrnc';
import AirtelTigoIcon from '../assets/icons/airteltigo-icon.svg'
import MTNIcon from '../assets/icons/mtn-icon.svg'
import TelecelIcon from '../assets/icons/telecel-icon.svg'

interface SavedContact {
    phone: string;
    name: string;
}

interface Bank {
    id: string;
    name: string;
    logo: React.ReactNode;
}

export default function GhanaSendMoney(_props: RootStackScreenProps<'GhanaSendMoney'>) {
    const [selectedBank, setSelectedBank] = React.useState<Bank | null>(null)
    const [accountNumber, setAccountNumber] = React.useState<string>("")
    const [accountName, setAccountName] = React.useState<string | null>(null)
    
    const [activeTab, setActiveTab] = React.useState<'saved' | 'recent'>('saved')

    const [amount, setAmount] = React.useState<string>("")
    const [modalVisible, setModalVisible] = React.useState(false)
    const { data: walletClient } = useWalletClient({ networkId: 'celo-mainnet' })
    
    const [tokenAmount, setTokenAmount] = React.useState<string>('')

    const { sendMoney, loading } = useSend()
    
    const { cUSDToken } = useTokens()

    const fetchTokenAmount = React.useCallback(
        debounce(async (text: string) => {
            const numericValue = parseFloat(text)
            if (isNaN(numericValue)) {
                setTokenAmount('0')
                return
            }

            try {
                const ratedAmountToDeduct = await getRatedAmount(numericValue, 'GHS')
                console.log("RATE AMOUNT",ratedAmountToDeduct)
                const rate = await getExchangeRate("GHS")
                console.log("RATE RATE",rate)
                setTokenAmount(ratedAmountToDeduct.toString())
            } catch (error) {
                console.error('Failed to fetch exchange rate:', error)
            }
        }, 500), // Delay in ms
        [],
    )

    const banks: Bank[] = [
        { id: 'mtn', name: 'MTN', logo: <MTNIcon width={24} height={24} /> },
        { id: 'telecel', name: 'Telecel', logo: <TelecelIcon width={24} height={24} /> },
        { id: 'airteltigo', name: 'AirtelTigo', logo: <AirtelTigoIcon width={24} height={24} /> }
    ]

    const savedContacts: SavedContact[] = [
        { phone: "025457656", name: "PABLO LEMONR" },
        { phone: "025457656", name: "PABLO LEMONR" }
    ]

    const handleBankSelect = (bank: Bank) => {
        setSelectedBank(bank)
    }

    const account_name = async (shortcode: string) => {
        try {
            const result = await validateAccount({shortcode:shortcode,mobile_network:selectedBank?.name as MobileNetwork,country_code:"GHS"})
            setAccountName(result || null)
        } catch (error) {
            setAccountName(null)
        }
    }
    
    React.useEffect(() => {
        if (accountNumber.length >= 0) {
            account_name(accountNumber)
        } else {
            setAccountName(null)
        }
    }, [accountNumber])

    const handleContinue = () => {
        console.log("Continue pressed", { selectedBank, accountNumber, accountName, amount })
    }

    const handleAmountChange = (text: string) => {
        setAmount(text)
        fetchTokenAmount(text)
    }

    const selectContact = (contact: SavedContact) => {
        setAccountNumber(contact.phone)
        setAccountName(contact.name)
    }

    const resetForm = () => {
        setAccountNumber('')
        setAmount('')
        setTokenAmount('')
    }

    const handleSendMoney = async () => {
        try {
            if (!tokenAmount || tokenAmount == null || tokenAmount == undefined || !accountName) {
                Alert.alert('All Fields required')
                return
            }
            if( !selectedBank){
                Alert.alert('Please Select Mobile Network')
                return
            }  
            const {response } = await sendMoney({
                shortcode: accountNumber,
                account_name:accountName,
                ratedTokenAmount: tokenAmount,
                rawAmount: amount,
                country_code:"GHS",
                type:"MOBILE",
                mobileNetwork: selectedBank?.name as MobileNetwork,
                tokenBalance: cUSDToken as TokenBalance,
                from: walletClient?.account?.address as `0x${string}`,
                to: cUSDToken?.address as `0x${string}`,
                feeCurrency: cUSDToken?.address as `0x${string}`,
            })
            console.log('THE RESPONSE', response)
            setModalVisible(true)
        } catch (error) {
            console.log('THE ERROR', error)
            Alert.alert(`${error}`)
        }
    }

    return (
        <ScrollView style={tw`flex-1 bg-slate-50 px-4`} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={tw`flex-row items-center py-4 mb-2`}>
                <TouchableOpacity style={tw`mr-4`}>
                    <Text style={tw`text-2xl text-gray-800 font-light`}>‹</Text>
                </TouchableOpacity>
                <Text style={tw`text-lg font-semibold text-gray-800`}>Send Money</Text>
            </View>

            {/* Bank Selection Section */}
            <Card style={tw.style('bg-blue-50 rounded-xl mb-4')}>
                <Text style={tw`text-sm text-gray-600 mb-3 font-medium`}>Select Bank</Text>
                <View style={tw`flex-row gap-3`}>
                    {banks.map((bank) => (
                        <TouchableOpacity
                            key={bank.id}
                            style={tw`bg-white rounded-lg py-3 px-4 items-center flex-1 border-2 ${
                                selectedBank?.id === bank.id ? 'border-blue-600' : 'border-transparent'
                            }`}
                            onPress={() => handleBankSelect(bank)}
                        >
                            <View style={tw`mb-1`}>{bank.logo}</View>
                            <Text style={tw`text-xs font-semibold ${
                                selectedBank?.id === bank.id ? 'text-blue-600' : 'text-gray-800'
                            }`}>
                                {bank.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Card>

            {/* Account Details Section */}
            <Card style={tw.style('bg-white rounded-xl mb-4')}>
                <Text style={tw`text-sm text-gray-600 mb-3 font-medium`}>Account Number/Mobile Number</Text>
                <View style={tw`bg-blue-50 rounded-lg px-4 py-4 flex-row items-center mb-3`}>
                    <TextInput
                        style={tw`flex-1 text-base text-gray-800 font-semibold`}
                        value={accountNumber}
                        onChangeText={setAccountNumber}
                        placeholder="Enter account number"
                        placeholderTextColor="#A0A0A0"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={tw`p-1`}>
                        <Text style={tw`text-base text-blue-600`}>📋</Text>
                    </TouchableOpacity>
                </View>
                
                {accountName && (
                    <View style={tw`bg-blue-50 rounded-lg px-4 py-3`}>
                        <Text style={tw`text-xs text-gray-600 mb-1`}>Account name</Text>
                        <Text style={tw`text-sm font-semibold text-green-500`}>{accountName}</Text>
                    </View>
                )}
            </Card>

            {/* Amount Section */}
            <Card style={tw.style('bg-white rounded-xl mb-6')}>
                <View style={tw`flex-row justify-between items-center mb-3`}>
                    <Text style={tw`text-sm text-gray-600 font-medium`}>Enter Amount (GHS)</Text>
                    <Text style={tw`text-sm font-semibold text-gray-800`}>₵</Text>
                </View>
                <View style={tw`bg-blue-50 rounded-lg px-4 py-4 flex-row items-center mb-2`}>
                    <Text style={tw`text-xl font-bold text-gray-800 mr-2`}>₵</Text>
                    <TextInput
                        style={tw`flex-1 text-xl text-gray-800 font-bold`}
                        value={amount}
                        onChangeText={handleAmountChange}
                        placeholder="10"
                        placeholderTextColor="#A0A0A0"
                        keyboardType="numeric"
                    />
                </View>
                <Text style={tw`text-xs text-orange-500 font-medium`}>(min: 10 max 1,000)</Text>
            </Card>

            {/* Continue Button */}
            <Button
                title="Continue"
                onPress={handleSendMoney}
                disabled={loading}
                style={tw.style('bg-blue-600 rounded-xl py-4 mb-6')}
                textStyle={tw.style('text-white text-base font-semibold')}
            />

            {/* Contacts Section */}
            <Card style={tw.style('bg-white rounded-xl mb-6')}>
                <View style={tw`flex-row items-center mb-4`}>
                    <TouchableOpacity
                        style={tw`py-2 px-4 mr-4 ${activeTab === 'saved' ? 'border-b-2 border-blue-600' : ''}`}
                        onPress={() => setActiveTab('saved')}
                    >
                        <Text style={tw`text-sm ${
                            activeTab === 'saved' ? 'text-blue-600 font-semibold' : 'text-gray-600'
                        }`}>
                            Saved Contact
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`py-2 px-4 mr-4 ${activeTab === 'recent' ? 'border-b-2 border-blue-600' : ''}`}
                        onPress={() => setActiveTab('recent')}
                    >
                        <Text style={tw`text-sm ${
                            activeTab === 'recent' ? 'text-blue-600 font-semibold' : 'text-gray-600'
                        }`}>
                            Recent Contact
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`ml-auto`}>
                        <Text style={tw`text-base`}>ℹ️</Text>
                    </TouchableOpacity>
                </View>

                {/* Contact List */}
                <View style={tw`gap-2`}>
                    {savedContacts.map((contact, index) => (
                        <TouchableOpacity
                            key={index}
                            style={tw`flex-row justify-between items-center py-3 px-4 bg-gray-50 rounded-lg`}
                            onPress={() => selectContact(contact)}
                        >
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-sm font-semibold text-gray-800 mb-0.5`}>{contact.phone}</Text>
                                <Text style={tw`text-xs text-gray-600`}>{contact.name}</Text>
                            </View>
                            <View style={tw`w-8 h-8 rounded-full bg-blue-600 items-center justify-center`}>
                                <Text style={tw`text-white text-sm font-semibold`}>M</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </Card>
            
            <AlertModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false)
                    resetForm()
                }}
                title="Transaction Successful"
                amount={amount ? `Amount: ${amount} GHS` : ''}
                iconType="success"
                loading={loading}
                accountName={accountName ? `Recipient: ${accountName}` : ''}
            />
        </ScrollView>
    )
}
