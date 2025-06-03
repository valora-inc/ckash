import * as React from "react"
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView } from "react-native"

export default function MPESAPaybills() {
    const [paybillNumber, setPaybillNumber] = React.useState<string>("100")
    const [accountNumber, setAccountNumber] = React.useState<string>("100")
    const [amount, setAmount] = React.useState<string>("5035")

    const handleContinue = () => {
        console.log("Continue pressed", { paybillNumber, accountNumber, amount })
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>MPESA Paybills</Text>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
                {/* Paybill Number Section */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Paybill Number</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={paybillNumber}
                            onChangeText={setPaybillNumber}
                            placeholder="Enter paybill number"
                            placeholderTextColor="#A0A0A0"
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.copyButton}>
                            <Text style={styles.copyIcon}>📋</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Account Number Section */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Account Number</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={accountNumber}
                            onChangeText={setAccountNumber}
                            placeholder="Enter account number"
                            placeholderTextColor="#A0A0A0"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                {/* Amount Section */}
                <View style={styles.amountSection}>
                    <View style={styles.amountHeader}>
                        <Text style={styles.inputLabel}>Amount</Text>
                        <Text style={styles.balanceText}>₦245.31</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.amountInput}
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="Enter amount"
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

                {/* Disclaimer */}
                <View style={styles.disclaimerContainer}>
                    <Text style={styles.disclaimerIcon}>⚠️</Text>
                    <Text style={styles.disclaimerText}>
                        Payment made to the wrong PayBill number is non-refundable
                    </Text>
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
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
    },
    inputSection: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    inputContainer: {
        backgroundColor: '#E8F0FF',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
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
    amountSection: {
        marginBottom: 32,
    },
    amountHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    balanceText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
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
        marginTop: 8,
        fontWeight: '500',
    },
    continueButton: {
        backgroundColor: '#2B5CE6',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    disclaimerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 4,
    },
    disclaimerIcon: {
        fontSize: 14,
        marginRight: 8,
        marginTop: 2,
    },
    disclaimerText: {
        flex: 1,
        fontSize: 12,
        color: '#666',
        lineHeight: 16,
    },
})