import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack'
import { Platform } from 'react-native'

import { AuthPhone } from './AuthPhone'
import { AuthOTP } from './AuthOTP'
import { OnboardPhone } from './OnboardPhone'
/*
  handle deeplink
  morchana://app/:appId
*/
export const AuthStack = createStackNavigator(
  {
    OnboardPhone,
    AuthPhone,
    AuthOTP,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      cardStyleInterpolator:
        Platform.OS === 'ios'
          ? CardStyleInterpolators.forHorizontalIOS
          : CardStyleInterpolators.forFadeFromBottomAndroid,
    },
  },
)
