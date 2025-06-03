import { useState } from 'react';
import { Alert } from 'react-native';
import { SendTransactionProp, sendTransactionStable } from '../services/sendtransaction';


export const useSendTransactionStable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState< string | null>(null);

  const sendStableToken = async (tx: SendTransactionProp) => {
    setLoading(true);
    setError(null);
    try {
      const result = await sendTransactionStable(tx);
      setTxHash(result as string);
      return result;
    } catch (err: any) {
      const message = err?.message || 'Failed to send transaction';
      setError(message);
      Alert.alert('Transaction Error', message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendStableToken,
    loading,
    error,
    txHash,
  };
};
