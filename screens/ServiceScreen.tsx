import * as React from "react"
import { navigate } from '@divvi/mobile'
import { RootStackScreenProps } from "./types"
import { View,StyleSheet ,Text,Image,FlatList,Pressable} from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { Service } from "./WalletScreen"



const services: Record<string, Service[]> = {
  "Kenya": [
    { name: "M-Pesa", icon: "https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png", navigate:  "KenyaSendMoney" },
    { name: "Airtime", icon: "https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png", navigate: "KenyaBuyAirtime" },
    
    { name: "Paybill", icon: "https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png", navigate: "KenyaPayBills" },
    { name: "Till", icon: "https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png", navigate: "KenyaBuyGoods" },
    
  ],

  "Uganda": [
    { name: "MTN ", icon: "https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png", navigate: "UgandaAirtime" },
    { name: "Airtel ", icon: "https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png", navigate: "AirtelMoney" },
   
  ],

  "Nigeria": [
    { name: "Bank ", icon: "https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png", navigate: "NigeriaSendMoney" },
    { name: "Airtime ", icon: "https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png", navigate: "NigeriaAirtime" },
   
  ],

  "Ghana": [
    { name: "MTN ", icon: "https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png", navigate: "GhanaSendMoney" },
    { name: "Airtel ", icon: "https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png", navigate: "GhanaSendMoney" },
    { name: "Telcel ", icon: "https://raw.githubusercontent.com/valora-inc/address-metadata/main/assets/tokens/cZAR.png", navigate: "GhanaSendMoney" },
   
  ],
};
//MTN | Airtel | Telcel



export default function ServiceScreen(_props: RootStackScreenProps<'Service'>){
     const [selectedCountry, setSelectedCountry] = React.useState('Kenya');
    // Dropdown state
      const [open, setOpen] = React.useState(false);
      const [value, setValue] = React.useState(selectedCountry);
      const [items, setItems] = React.useState([
        { label: '🇰🇪 Kenya', value: 'Kenya' },
        { label: '🇺🇬 Uganda', value: 'Uganda' },
         { label: '🇬🇭 Ghana', value: 'Ghana' },
           { label: '🇳🇬 Nigeria', value: 'Nigeria' },
    
      ]);
      function onPressNavigate(name:any) {
           navigate(name)
           
        }
      React.useEffect(() => {
          setSelectedCountry(value);
        }, [value]);
    return(
        <View style={styles.container}>
            {/**Countries */}
            <View style={styles.countries_selection}>
                <Text>Financial Services</Text>
              <View style={{backgroundColor:"transparent",width:"40%",zIndex:1000}}>
                              {/* <Picker
                      selectedValue={selectedCountry}
                      onValueChange={(value) => setSelectedCountry(value)}
                      style={{ marginBottom: 4 }}
                    >
                      {Object.keys(services).map((country) => (
                        <Picker.Item key={country} label={country} value={country} />
                      ))}
                    </Picker> */}
                    <DropDownPicker
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      textStyle={{fontSize:10,fontWeight:"400",letterSpacing:0,verticalAlign:"bottom",color:"#E4EBFE"}}
                      // zIndex={1000}
                      dropDownContainerStyle={{ zIndex: 1000,backgroundColor:"blue" }}
                      style={{ marginBottom: open ? 0 : 0 ,zIndex:1000,height:30,borderColor:"transparent",backgroundColor:"#0034BB",paddingVertical:0}}
                    />
                            </View>

                </View>

                {/**Services */}
                <View style={styles.services}>
                            <FlatList
                        data={services[selectedCountry]}
                        keyExtractor={(item, index) => index.toString()}
                       style={{width:"100%"}}
                        showsHorizontalScrollIndicator={false}
                        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
                        numColumns={3}
                       ItemSeparatorComponent={()=> <View style={{width:"30%"}}/>}
                        renderItem={({ item }) => (
                          <Pressable
                            onPress={() => {
                              console.log(`Navigate to ${item.navigate}`);
                              onPressNavigate(item.navigate)
                            }}
                            style={{
                              alignItems: 'center',
                              
                              
                              backgroundColor: '#DAE3FF',
                              borderRadius: 4,
                              width: 97,
                              height:61,
                             paddingHorizontal:24,
                             borderWidth:1,
                             borderColor:"#AEC5FF",
                              paddingVertical:12,
                              gap:7
                            }}
                          >
                            <Image
                              source={{ uri: item.icon }}
                              style={{ width: 20, height: 20 }}
                            />
                            <Text style={{ fontSize: 10, textAlign: 'center' ,fontWeight:"400",color:"#002586",verticalAlign:"bottom",lineHeight:16,letterSpacing:0}}>{item.name}</Text>
                          </Pressable>
                        )}
                      />
                          </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:16,
    },
    countries_selection:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        flex:1
    },
    services: {
        flex:5,
    flexDirection: "row",
    justifyContent: "space-between",
   
  },
})