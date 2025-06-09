import React from 'react'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface AlertModalProps {
  visible: boolean
  onClose: () => void
  title: string
  amount?: string
  iconType?: 'success' | 'error' | 'info'
  accountName?: string
  loading?: boolean
}

const iconConfig = {
  success: { name: 'checkmark-circle', color: '#2979FF' },
  error: { name: 'close-circle', color: '#FF5252' },
  info: { name: 'information-circle', color: '#FFD600' },
}

export const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  onClose,
  title,
  amount,
  iconType = 'success',
  accountName,
  loading,
}) => {
  const icon = iconConfig[iconType]
    React.useEffect(() => {
      let timer: NodeJS.Timeout
      if (visible) {
        timer = setTimeout(() => {
          onClose()
        }, 5000) // 5 seconds
      }
      return () => clearTimeout(timer)
    }, [visible, onClose])

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {loading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#2979FF"
                style={{ marginVertical: 24 }}
              />
              <Text style={styles.description}>Please wait...</Text>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Ionicons name="close" size={20} color="#222" />
              </TouchableOpacity>
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={icon.name as any}
                  size={48}
                  color={icon.color}
                />
              </View>
              <Text style={styles.title}>{title}</Text>
              {accountName && (
                <Text style={styles.description}>{accountName}</Text>
              )}
              {amount && <Text style={styles.amount}>{amount}</Text>}
              <TouchableOpacity style={styles.actionBtn} onPress={onClose}>
                <Text style={styles.actionBtnText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 370,
    backgroundColor: '#E8F0FF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 2,
    padding: 4,
  },
  iconWrapper: {
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 48,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
    textAlign: 'center',
  },
  amount: {
    fontSize: 12,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  actionBtn: {
    marginTop: 12,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default AlertModal
