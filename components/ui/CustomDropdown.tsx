import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Pressable,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native'
import tw from 'twrnc'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export interface DropdownItem {
  label: string
  value: string
  icon?: string
}

interface CustomDropdownProps {
  items: DropdownItem[]
  selectedValue: string
  onSelect: (value: string) => void
  placeholder?: string

  // Styling props
  containerStyle?: string | object
  dropdownStyle?: string | object
  textStyle?: string | object
  placeholderStyle?: string | object

  // Dropdown list styling
  dropdownListStyle?: string | object
  itemStyle?: string | object
  selectedItemStyle?: string | object
  itemTextStyle?: string | object
  selectedItemTextStyle?: string | object

  // Behavior props
  maxHeight?: number
  disabled?: boolean
  searchable?: boolean

  // Animation props
  animationDuration?: number

  // Icon props
  showArrow?: boolean
  arrowStyle?: string | object
  customArrow?: React.ReactNode
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  items,
  selectedValue,
  onSelect,
  placeholder = 'Select an option',

  // Styling
  containerStyle,
  dropdownStyle = 'h-6 w-26 bg-[#8DADFE] ml-7.5 rounded flex-row items-center justify-between px-3',
  textStyle = 'text-xs text-black flex-1',
  placeholderStyle,

  // Dropdown list styling
  dropdownListStyle = 'bg-[#8DADFE] rounded border-0 shadow-lg',
  itemStyle = 'px-3 py-2 border-b border-[#7A96FE] last:border-b-0',
  selectedItemStyle = 'bg-[#6B8BFE]',
  itemTextStyle = 'text-xs text-black',
  selectedItemTextStyle = 'text-xs text-white font-medium',

  // Behavior
  maxHeight = 200,
  disabled = false,
  searchable = false,

  // Animation
  animationDuration = 200,

  // Icon
  showArrow = true,
  arrowStyle = 'text-xs text-black ml-1',
  customArrow,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const animatedValue = useRef(new Animated.Value(0)).current
  const dropdownRef = useRef<View>(null)

  const selectedItem = items.find((item) => item.value === selectedValue)

  // Filter items based on search query
  const filteredItems =
    searchable && searchQuery
      ? items.filter(
          (item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.value.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : items

  const toggleDropdown = () => {
    if (disabled) return

    if (isOpen) {
      closeDropdown()
    } else {
      openDropdown()
    }
  }

  const openDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
        // Calculate optimal position for dropdown
        const dropdownHeight = Math.min(maxHeight, filteredItems.length * 40)
        let topPosition = pageY + height + 2

        // Check if dropdown would go below screen
        if (topPosition + dropdownHeight > screenHeight - 100) {
          topPosition = pageY - dropdownHeight - 2
        }

        setDropdownPosition({
          x: pageX,
          y: topPosition,
          width,
          height: dropdownHeight,
        })

        setIsOpen(true)
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: false, // Changed to false to avoid bridge issues
        }).start()
      })
    }
  }

  const closeDropdown = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: animationDuration * 0.75,
      useNativeDriver: false, // Changed to false to avoid bridge issues
    }).start(() => {
      setIsOpen(false)
      setSearchQuery('')
    })
  }

  const handleItemSelect = (value: string) => {
    onSelect(value)
    closeDropdown()
  }

  // Convert style prop to object if it's a string (Tailwind class)
  const getStyle = (
    styleProp: string | object | undefined,
    defaultStyle: object = {},
  ) => {
    if (typeof styleProp === 'string') {
      return [tw`${styleProp}`, defaultStyle]
    }
    return [styleProp, defaultStyle]
  }

  const renderDropdownItem = ({
    item,
    index,
  }: {
    item: DropdownItem
    index: number
  }) => {
    const isSelected = item.value === selectedValue
    const isLastItem = index === filteredItems.length - 1

    return (
      <TouchableOpacity
        style={getStyle(
          isSelected ? selectedItemStyle : itemStyle,
          isLastItem ? { borderBottomWidth: 0 } : {},
        )}
        onPress={() => handleItemSelect(item.value)}
        activeOpacity={0.7}
      >
        <View style={tw`flex-row items-center`}>
          {item.icon && <Text style={tw`mr-2 text-sm`}>{item.icon}</Text>}
          <Text
            style={getStyle(isSelected ? selectedItemTextStyle : itemTextStyle)}
          >
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderArrow = () => {
    if (!showArrow) return null

    if (customArrow) return customArrow

    return (
      <View>
        <Text style={getStyle(arrowStyle)}>{isOpen ? '▲' : '▼'}</Text>
      </View>
    )
  }

  return (
    <>
      <View
        ref={dropdownRef}
        style={getStyle(containerStyle, { position: 'relative' })}
      >
        <TouchableOpacity
          style={getStyle(dropdownStyle, {
            opacity: disabled ? 0.5 : 1,
          })}
          onPress={toggleDropdown}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text
            style={[
              getStyle(textStyle),
              {
                fontSize: 10,
                fontWeight: '400',
                letterSpacing: 0,
              },
              !selectedItem && getStyle(placeholderStyle),
            ]}
            numberOfLines={1}
          >
            {selectedItem ? selectedItem.label : placeholder}
          </Text>
          {renderArrow()}
        </TouchableOpacity>
      </View>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeDropdown}
        statusBarTranslucent
      >
        <Pressable
          style={[
            tw`flex-1`,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
          ]}
          onPress={closeDropdown}
        >
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: dropdownPosition.x + dropdownPosition.width * 0.225, // Match original 22.5% margin
                top: dropdownPosition.y,
                width: dropdownPosition.width * 0.765, // Match original 76.5% width
                maxHeight: dropdownPosition.height,
                opacity: animatedValue,
                zIndex: 1000,
              },
              getStyle(dropdownListStyle),
            ]}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              nestedScrollEnabled={true}
              style={{ maxHeight: dropdownPosition.height }}
            >
              {filteredItems.map((item, index) => (
                <View key={`${item.value}-${index}`}>
                  {renderDropdownItem({ item, index })}
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  )
}

export default CustomDropdown
