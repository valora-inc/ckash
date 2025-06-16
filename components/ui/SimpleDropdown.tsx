import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import tw from 'twrnc'


export interface DropdownItem {
  label: string
  value: string
  icon?: string
}

interface SimpleDropdownProps {
  items: DropdownItem[]
  selectedValue: string
  onSelect: (value: string) => void
  placeholder?: string

  // Styling props
  containerStyle?: string | object
  dropdownStyle?: string | object
  textStyle?: string | object

  // Dropdown list styling
  dropdownListStyle?: string | object
  itemStyle?: string | object
  selectedItemStyle?: string | object
  itemTextStyle?: string | object
  selectedItemTextStyle?: string | object

  // Behavior props
  maxHeight?: number
  disabled?: boolean
}

const SimpleDropdown: React.FC<SimpleDropdownProps> = ({
  items,
  selectedValue,
  onSelect,
  placeholder = 'Select an option',

  // Styling
  containerStyle,
  dropdownStyle = 'h-6 w-26 bg-[#8DADFE] ml-7.5 rounded flex-row items-center justify-between px-3',
  textStyle = 'text-xs text-black flex-1',

  // Dropdown list styling
  dropdownListStyle = 'bg-[#8DADFE] rounded border-0 shadow-lg mt-1',
  itemStyle = 'px-3 py-2 border-b border-[#7A96FE]/30',
  selectedItemStyle = 'bg-[#6B8BFE]',
  itemTextStyle = 'text-xs text-black',
  selectedItemTextStyle = 'text-xs text-white font-medium',

  // Behavior
  maxHeight = 200,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef<View>(null)
  const selectedItem = items.find((item) => item.value === selectedValue)

  const toggleDropdown = () => {
    if (disabled) return

    if (isOpen) {
      setIsOpen(false)
    } else {
      openDropdown()
    }
  }

  const openDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
        setIsOpen(true)
      })
    }
  }

  const handleItemSelect = (value: string) => {
    onSelect(value)
    setIsOpen(false)
  }

  // Convert style prop to object if it's a string (Tailwind class)
  const getStyle = (styleProp: string | object | undefined) => {
    if (typeof styleProp === 'string') {
      return tw`${styleProp}`
    }
    return styleProp
  }

  const renderDropdownItem = (item: DropdownItem, index: number) => {
    const isSelected = item.value === selectedValue
    const isLastItem = index === items.length - 1

    return (
      <TouchableOpacity
        key={`${item.value}-${index}`}
        style={[
          getStyle(isSelected ? selectedItemStyle : itemStyle),
          isLastItem && tw`border-b-0`,
        ]}
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

  return (
    <View style={[tw`relative`, getStyle(containerStyle)]}>
      <View ref={dropdownRef}>
        <TouchableOpacity
          style={[getStyle(dropdownStyle), disabled && tw`opacity-50`]}
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
            ]}
            numberOfLines={1}
          >
            {selectedItem ? selectedItem.label : placeholder}
          </Text>
          <View>
            <Text style={tw`text-xs text-black/70 ml-1`}>
              {isOpen ? '▲' : '▼'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {isOpen && (
        <View
          style={[
            {
              position: 'absolute',
              top: '100%',
              left: '22.5%', // Match original margin
              width: '76.5%', // Match original width
              zIndex: 1000,
              elevation: 1000, // For Android
            },
            getStyle(dropdownListStyle),
          ]}
        >
          <ScrollView
            style={{ maxHeight }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            nestedScrollEnabled={true}
          >
            {items.map((item, index) => renderDropdownItem(item, index))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default SimpleDropdown
