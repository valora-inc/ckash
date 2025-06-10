import * as React from 'react'
import { navigate } from '@divvi/mobile'
import { RootStackScreenProps } from './types'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { services } from '../constants'
import tw from 'twrnc'


export default function ServiceScreen(_props: RootStackScreenProps<'Service'>) {
  const [selectedCountry, setSelectedCountry] = React.useState('Kenya')
  // Dropdown state
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(selectedCountry)
  const [items, setItems] = React.useState([
    { label: '🇰🇪 Kenya', value: 'Kenya' },
    { label: '🇺🇬 Uganda', value: 'Uganda' },
    { label: '🇬🇭 Ghana', value: 'Ghana' },
    { label: '🇳🇬 Nigeria', value: 'Nigeria' },
  ])

  React.useEffect(() => {
    setSelectedCountry(value)
  }, [value])
  return (
    <View style={styles.container}>
      {/**Countries */}
      <View style={styles.countries_selection}>
        <Text>Utilities</Text>
        <View
          style={{ backgroundColor: 'transparent', width: '40%', zIndex: 1000 }}
        >
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            textStyle={{
              fontSize: 10,
              fontWeight: '400',
              letterSpacing: 0,
              verticalAlign: 'bottom',
              color: '#E4EBFE',
            }}
            // zIndex={1000}
            dropDownContainerStyle={{
              zIndex: 1000,
              backgroundColor: 'blue',
              paddingVertical: 0,
            }}
            style={{
              marginBottom: open ? 0 : 0,
              zIndex: 1000,
              height: 30,
              borderColor: 'transparent',
              backgroundColor: '#0034BB',
              paddingVertical: 0,
              marginVertical: 0,
            }}
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
                style={tw`text-[10px] text-center font-normal text-[#002586] leading-4`}
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
