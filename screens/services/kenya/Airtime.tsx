import * as React from "react"
import { View, StyleSheet, TextInput, Text, Alert, TouchableOpacity, ScrollView } from "react-native"
import { RootStackScreenProps } from "../../types"
import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"
import { usePublicClient, useWallet, useWalletClient, unlockAccount, navigate, TransactionRequest, prepareTransactions, PreparedTransactionsNotEnoughBalanceForGas, sendTransactions, getFees, usePrepareTransactions } from '@divvi/mobile'
import { encodeFunctionData, erc20Abi, parseEther, parseUnits } from "viem"
import { celo } from "viem/chains"
import { useTokens } from "../../../utils"
import { TokenBalance } from "src/tokens/slice"
import { Pretium_api } from "../../../contants/constant"

interface SavedContact {
    phone: string;
    name: string;
}

interface AmountOption {
    value: number;
    label: string;
}

export default function BuyAirtime(_props: RootStackScreenProps<'KenyaBuyAirtime'>) {
    const [phoneNumber, setPhoneNumber] = React.useState<string>("")
    const [selectedAmount, setSelectedAmount] = React.useState<number | null>(null)
    const [customAmount, setCustomAmount] = React.useState<string>("")
    const [activeTab, setActiveTab] = React.useState<'saved' | 'recent'>('saved')
    
    const { data: walletClient } = useWalletClient({ networkId: "celo-mainnet" })
    const { cKESToken, cUSDToken } = useTokens()
    const pub = usePublicClient({ networkId: "celo-mainnet" })

    const amountOptions: AmountOption[] = [
        { value: 100, label: "₦ 100" },
        { value: 200, label: "₦ 200" },
        { value: 500, label: "₦ 500" },
        { value: 1000, label: "₦ 1000" },
        { value: 2000, label: "₦ 2000" },
        { value: 5000, label: "₦ 5000" }
    ]

    const savedContacts: SavedContact[] = [
        { phone: "0816 057 3659", name: "PABLO LEMONR" },
        { phone: "0816 057 3659", name: "PABLO LEMONR" },
        { phone: "0816 057 3659", name: "PABLO LEMONR" },
        { phone: "0816 057 3659", name: "PABLO LEMONR" }
    ]

    const handleGetRate = async () => {
        const rate = await Pretium_api.exchange_rate()
        console.log("THE KES RATE", rate.data.buying_rate)
        const accountValidation = await Pretium_api.account_validation()
        console.log("Account Validation", accountValidation)
    }

    const handlePhoneChange = (text: string) => {
        const cleaned = text.replace(/[^0-9]/g, '')
        // Format as XXXX XXX XXXX
        const formatted = cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')
        setPhoneNumber(formatted)
    }

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount)
        setCustomAmount("")
    }

    const handleCustomAmountChange = (text: string) => {
        setCustomAmount(text)
        setSelectedAmount(null)
    }

    const handleBuyAirtime = async () => {
        try {
            const amount = selectedAmount || parseFloat(customAmount)
            if (!amount || !phoneNumber) {
                Alert.alert("Error", "Please select an amount and enter phone number")
                return
            }

            const feeData = await pub.estimateFeesPerGas();

            if (true) {
                unlockAccount()
                const amountInEther = (amount / 1000).toString() // Convert NGN to appropriate token amount
                const txRequest = await walletClient?.prepareTransactionRequest({
                    chainId: 42220,
                    to: cUSDToken?.address as `0x${string}`,
                    data: encodeFunctionData({
                        abi: erc20Abi,
                        functionName: 'transfer',
                        args: ["0x8005ee53E57aB11E11eAA4EFe07Ee3835Dc02F98" as `0x${string}`, parseEther(amountInEther)],
                    }),
                    chain: celo,
                    account: walletClient?.account,
                    feeCurrency: cUSDToken?.address as `0x${string}`
                });

                const signedTx = await walletClient?.signTransaction(txRequest as any);
                const txHash = await pub?.sendRawTransaction({ serializedTransaction: signedTx as any });
                
                const rate = await Pretium_api.exchange_rate()
                const calculatedAmount = amount * parseFloat(rate.data.buying_rate)

                

                Alert.alert("Success", `Airtime purchase successful! Hash: ${txHash}`)
            }
        } catch (error) {
            console.log("THE ERROR", error)
            Alert.alert("Error", `Transaction failed: ${error}`)
        }
    }

    const selectContact = (contact: SavedContact) => {
        setPhoneNumber(contact.phone)
    }

    const getCurrentAmount = () => {
        return selectedAmount || parseFloat(customAmount) || 0
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backArrow}>{'‹'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Buy Airtime</Text>
            </View>

            {/* Amount Selection Card */}
            <View style={styles.amountCard}>
                <Text style={styles.sectionLabel}>Choose Amount (NGN)</Text>
                <View style={styles.amountGrid}>
                    {amountOptions.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.amountOption,
                                selectedAmount === option.value && styles.selectedAmountOption
                            ]}
                            onPress={() => handleAmountSelect(option.value)}
                        >
                            <Text style={[
                                styles.amountOptionText,
                                selectedAmount === option.value && styles.selectedAmountText
                            ]}>
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Custom Amount Input */}
                <View style={styles.customAmountSection}>
                    <View style={styles.customAmountHeader}>
                        <Text style={styles.customAmountLabel}>Input an Amount (NGN)</Text>
                        <Text style={styles.balanceDisplay}>₦ 245.31</Text>
                    </View>
                    <TextInput
                        style={styles.customAmountInput}
                        value={customAmount}
                        onChangeText={handleCustomAmountChange}
                        placeholder="₦ 100"
                        placeholderTextColor="#A0A0A0"
                        keyboardType="numeric"
                    />
                </View>
            </View>

            {/* Phone Number Input */}
            <View style={styles.phoneSection}>
                <Text style={styles.sectionLabel}>Phone Number</Text>
                <View style={styles.phoneInputContainer}>
                    <TextInput
                        style={styles.phoneInput}
                        value={phoneNumber}
                        onChangeText={handlePhoneChange}
                        placeholder="0816 057 3659"
                        placeholderTextColor="#A0A0A0"
                        keyboardType="phone-pad"
                        maxLength={13}
                    />
                    <TouchableOpacity style={styles.contactButton}>
                        <Text style={styles.contactIcon}>📞</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.networkSupport}>📶 All mobile networks are supported</Text>
            </View>

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={handleBuyAirtime}>
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
                            <Text style={styles.contactPhone}>{contact.phone}</Text>
                            <Text style={styles.contactName}>{contact.name}</Text>
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
    amountCard: {
        backgroundColor: '#E8F0FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    sectionLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    amountGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    amountOption: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '31%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    selectedAmountOption: {
        backgroundColor: '#2B5CE6',
        borderColor: '#2B5CE6',
    },
    amountOptionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    selectedAmountText: {
        color: '#FFFFFF',
    },
    customAmountSection: {
        marginTop: 8,
    },
    customAmountHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    customAmountLabel: {
        fontSize: 14,
        color: '#666',
    },
    balanceDisplay: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    customAmountInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 16,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    phoneSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 8,
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
    networkSupport: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
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
        gap: 8,
    },
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
    },
    contactPhone: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    contactName: {
        fontSize: 12,
        color: '#666',
    },
})