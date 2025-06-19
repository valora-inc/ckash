import * as React from 'react'
import { navigate } from '@divvi/mobile'
import { RootStackScreenProps } from './types'
import { View, StyleSheet, Text, FlatList, Pressable } from 'react-native'
import SimpleDropdown from '../components/ui/SimpleDropdown'
import { services } from '../constants'
import tw from 'twrnc'

export default function ServiceScreen(_props: RootStackScreenProps<'Service'>) {
  const [selectedCountry, setSelectedCountry] = React.useState('Kenya')
  // Dropdown state
  const [dropdownItems] = React.useState([
    { label: '🇰🇪 Kenya', value: 'Kenya' },
    { label: '🇺🇬 Uganda', value: 'Uganda' },
    { label: '🇬🇭 Ghana', value: 'Ghana' },
    { label: '🇳🇬 Nigeria', value: 'Nigeria' },
  ])

  const handleCountrySelect = (value: string) => {
    setSelectedCountry(value)
  }

  return (
    <View style={styles.container}>
      {/**Countries */}
      <View style={styles.countries_selection}>
        <Text
          style={{ fontFamily: 'Heebo-Medium', fontSize: 18, color: '#1B1A46' }}
        >
          Utilities
        </Text>
        <View
          style={{ backgroundColor: 'transparent', width: '40%', zIndex: 1000 }}
        >
          <SimpleDropdown
            items={dropdownItems}
            selectedValue={selectedCountry}
            onSelect={handleCountrySelect}
            dropdownStyle="h-6 w-22 border-transparent bg-[#8DADFE] ml-14 rounded-[2px] flex-row items-center justify-between px-2"
            textStyle="text-xs text-black flex-1 font-normal"
            dropdownListStyle="bg-[#8DADFE] rounded-md rounded-[2px] border border-[#7A96FE]"
            itemStyle="px-2 py-2.5 border-b border-[#7A96FE]/30"
            selectedItemStyle="bg-[#6B8BFE] px-2 py-2.5 border-[#5A7BFE]"
            itemTextStyle="text-xs text-black font-normal"
            selectedItemTextStyle="text-xs text-white font-medium"
            maxHeight={160}
          />
        </View>
      </View>

      {/**Services */}
      <View style={styles.services}>
        <FlatList
          data={services[selectedCountry]}
          keyExtractor={(index) => index.toString()}
          style={{ width: '100%' }}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{
            gap: 16,
            marginBottom: 16,
          }}
          numColumns={3}
          ItemSeparatorComponent={() => <View style={{ width: '30%' }} />}
          renderItem={({ item }) => (
            <Pressable
              key={item.name}
              onPress={() => {
                console.log(`Navigate to ${item.navigate}`)
                navigate(item.navigate)
              }}
              style={tw`justify-center items-center bg-[#C0D0FF] rounded  px-6.5 border border-[#AEC5FF] py-2.5`}
            >
              <item.icon width={60} height={40} />
              <Text
                style={{
                  fontSize: 10,
                  textAlign: 'center',
                  fontFamily: 'Heebo-Medium',
                  fontWeight: '600',
                  color: '#002586',
                  lineHeight: 16,
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  countries_selection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  services: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
