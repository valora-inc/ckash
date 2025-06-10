import * as React from 'react'
import tw from 'twrnc'
import { Pressable, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

interface ServiceButtonProps {
  name: string
  navigate: string
  icon: React.FC<{ width: number; height: number }>
}

export default function ServiceButton({
  name,
  navigate,
  icon: Icon,
}: ServiceButtonProps) {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => {
        console.log(`Navigate to ${navigate}`)
        navigation.navigate(navigate as never)
      }}
      style={tw`justify-center items-center bg-[#C0D0FF] rounded px-3 w-[88px] border border-[#AEC5FF] py-4`}
    >
      <Icon width={16} height={20} />
      <Text
        style={tw`text-[10px] text-center font-normal text-[#002586] leading-4`}
      >
        {name}
      </Text>
    </Pressable>
  )
}
