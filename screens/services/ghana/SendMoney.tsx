import * as React from "react"
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { RootStackScreenProps } from "../../types";

interface SavedContact {
    phone: string;
    name: string;
}

interface Bank {
    id: string;
    name: string;
    logo: string;
}

export default function GhanaSendMoney(_props: RootStackScreenProps<'GhanaSendMoney'>) {
    const [selectedBank, setSelectedBank] = React.useState<Bank | null>(null)
    const [accountNumber, setAccountNumber] = React.useState<string>("")
    const [accountName, setAccountName] = React.useState<string>("PABLO LEMONR")
    const [amount, setAmount] = React.useState<string>("100")
    const [activeTab, setActiveTab] = React.useState<'saved' | 'recent'>('saved')

    const banks: Bank[] = [
        { id: 'mtn', name: 'MTN', logo: '🟡' },
        { id: 'telecel', name: 'Telecel', logo: '🔴' },
        { id: 'airteltigo', name: 'AirtelTigo', logo: '🔵' }
    ]

    const savedContacts: SavedContact[] = [
        { phone: "025457656", name: "PABLO LEMONR" },
        { phone: "025457656", name: "PABLO LEMONR" }
    ]

    const handleBankSelect = (bank: Bank) => {
        setSelectedBank(bank)
    }

    const handleContinue = () => {
        console.log("Continue pressed", { selectedBank, accountNumber, accountName, amount })
    }

    const selectContact = (contact: SavedContact) => {
        setAccountNumber(contact.phone)
        setAccountName(contact.name)
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

            {/* Bank Selection Section */}
            <View style={styles.bankSection}>
                <Text style={styles.sectionLabel}>Select Bank</Text>
                <View style={styles.bankGrid}>
                    {banks.map((bank) => (
                        <TouchableOpacity
                            key={bank.id}
                            style={[
                                styles.bankOption,
                                selectedBank?.id === bank.id && styles.selectedBankOption
                            ]}
                            onPress={() => handleBankSelect(bank)}
                        >
                            <Text style={styles.bankLogo}>{bank.logo}</Text>
                            <Text style={[
                                styles.bankName,
                                selectedBank?.id === bank.id && styles.selectedBankName
                            ]}>
                                {bank.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Account Details Section */}
            <View style={styles.accountSection}>
                <Text style={styles.sectionLabel}>Account Number/Mobile Number</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={accountNumber}
                        onChangeText={setAccountNumber}
                        placeholder="Enter account number"
                        placeholderTextColor="#A0A0A0"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.copyButton}>
                        <Text style={styles.copyIcon}>📋</Text>
                    </TouchableOpacity>
                </View>
                
                {accountName && (
                    <View style={styles.accountNameContainer}>
                        <Text style={styles.accountNameLabel}>Account name</Text>
                        <Text style={styles.accountNameText}>{accountName}</Text>
                    </View>
                )}
            </View>

            {/* Amount Section */}
            <View style={styles.amountSection}>
                <View style={styles.amountHeader}>
                    <Text style={styles.sectionLabel}>Enter Amount (NGN)</Text>
                    <Text style={styles.balanceText}>₦245.31</Text>
                </View>
                <View style={styles.amountInputContainer}>
                    <Text style={styles.currencySymbol}>₦</Text>
                    <TextInput
                        style={styles.amountInput}
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="100"
                        placeholderTextColor="#A0A0A0"
                        keyboardType="numeric"
                    />
                </View>
                <Text style={styles.limitText}>(min: 200 max 60,000)</Text>
            </View>

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
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
                        <Text style={styles.moreIcon}>ℹ️</Text>
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
    bankSection: {
        backgroundColor: '#E8F0FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    sectionLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        fontWeight: '500',
    },
    bankGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    bankOption: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        flex: 1,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedBankOption: {
        borderColor: '#2B5CE6',
    },
    bankLogo: {
        fontSize: 20,
        marginBottom: 4,
    },
    bankName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    selectedBankName: {
        color: '#2B5CE6',
    },
    accountSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    inputContainer: {
        backgroundColor: '#E8F0FF',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    copyButton: {
        padding: 4,
    },
    copyIcon: {
        fontSize: 16,
        color: '#2B5CE6',
    },
    accountNameContainer: {
        backgroundColor: '#E8F0FF',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    accountNameLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    accountNameText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4CAF50',
    },
    amountSection: {
        backgroundColor: '#FFFFFF',
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
    balanceText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    amountInputContainer: {
        backgroundColor: '#E8F0FF',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    currencySymbol: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginRight: 8,
    },
    amountInput: {
        flex: 1,
        fontSize: 20,
        color: '#333',
        fontWeight: '700',
    },
    limitText: {
        fontSize: 12,
        color: '#FF8C00',
        fontWeight: '500',
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
    contactInfo: {
        flex: 1,
    },
    contactPhone: {
        fontSize: 14,
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