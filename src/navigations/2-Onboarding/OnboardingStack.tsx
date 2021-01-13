import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack'

import { OnboardLocation } from './OnboardLocation'
import { OnboardFace } from './OnboardFace'
import { OnboardFaceCamera } from './OnboardFaceCamera'
import { OnboardProgressing } from './OnboardProgressing'
import { OnboardComplete } from './OnboardComplete'
import { OnboardBluetooth } from './OnboardBluetooth'
import { OnboardNotification } from './OnboardNotification'
import { Platform } from 'react-native'

const OnboardFaceStack = createStackNavigator(
  {
    OnboardFace,
    OnboardFaceCamera,
  },
  {
    headerMode: 'none',
  },
)

export const OnboardingStack = createStackNavigator(
  {
    OnboardFaceStack,
    OnboardLocation,
    OnboardBluetooth,
    OnboardNotification,
    OnboardProgressing: {
      screen: OnboardProgressing,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    OnboardComplete: {
      screen: OnboardComplete,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
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
