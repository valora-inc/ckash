import { useState } from 'react'

interface UseContactPickerProps {
  onContactSelect: (phoneNumber: string) => void
}

export const useContactPicker = ({
  onContactSelect,
}: UseContactPickerProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openContactPicker = () => {
    setIsModalVisible(true)
  }

  const closeContactPicker = () => {
    setIsModalVisible(false)
  }

  const handleContactSelect = (phoneNumber: string) => {
    onContactSelect(phoneNumber)
    setIsModalVisible(false)
  }

  return {
    openContactPicker,
    closeContactPicker,
    isModalVisible,
    handleContactSelect,
  }
}
