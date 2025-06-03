import { NativeStackScreenProps, StackParamList } from '@divvi/mobile'

type RootStackParamList = StackParamList & {
  Home: undefined,
  CustomWallet: undefined,
  Service:undefined,
  KenyaSendMoney:undefined,
  KenyaBuyAirtime: undefined;
  KenyaBuyGoods: undefined;
  KenyaPayBills: undefined;
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

// This allows type-safe navigation to known and custom screens using the `navigate` function from `@divvi/mobile`
declare global {
  namespace DivviNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
