import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack'
import { Platform } from 'react-native'

import { Home } from './Home'
import { AgreementPolicy } from './AgreementPolicy'

export const HomeStack = createStackNavigator(
  {
    Home,
    AgreementPolicy,
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyleInterpolator:
        Platform.OS === 'ios'
          ? CardStyleInterpolators.forHorizontalIOS
          : CardStyleInterpolators.forFadeFromBottomAndroid,
    },
  },
)
