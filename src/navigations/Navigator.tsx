import React, { useEffect } from 'react'
import { View, Platform } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack'

import { COLORS } from '../styles'
import { AuthStack } from './1-Auth/AuthStack'
import { OnboardingStack } from './2-Onboarding/OnboardingStack'
import { MainAppStack } from './3-MainApp/MainAppStack'
import { applicationState } from '../state/app-state'
import { QuestionaireStack } from './4-Questionaire/QuestionaireStack'
import { PrivacyPolicy } from './PrivacyPolicy'
import { HomeStack } from './0-Home/HomeStack'
import { WebviewScreen } from './Webview'
import { ChangeLanguageScreen } from './ChangeLanguage'

const Root = ({ navigation }) => {
  useEffect(() => {
    const redirect = async () => {
      const isSkipRegistration = applicationState.getData('skipRegistration')
      const onboarded = applicationState.getData('isPassedOnboarding')
      // const isFilledQuestionaire = applicationState.getData(
      //   'filledQuestionaireV2',
      // )
      // const routeName = isSkipRegistration
      //   ? onboarded
      //     ? isFilledQuestionaire
      //       ? 'MainApp'
      //       : 'Questionaire'
      //     : 'Onboarding'
      //   : 'Home'

      const routeName = isSkipRegistration
        ? onboarded
          ? 'MainApp'
          : 'Onboarding'
        : 'Home'

      const action = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName,
          }),
        ],
        key: null,
      })
      navigation.dispatch(action)
    }
    redirect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <View style={{ flex: 1, backgroundColor: COLORS.PRIMARY_DARK }} />
}

export default createStackNavigator(
  {
    Root: {
      screen: Root,
    },
    Home: {
      screen: HomeStack,
    },
    Auth: {
      screen: AuthStack,
    },
    Onboarding: {
      screen: OnboardingStack,
    },
    MainApp: {
      screen: MainAppStack,
    },
    Questionaire: {
      screen: QuestionaireStack,
    },
    Webview: {
      screen: WebviewScreen,
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
    },
    ChangeLanguage: {
      screen: ChangeLanguageScreen,
    },
  },
  {
    initialRouteName: 'Root',
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyleInterpolator:
        Platform.OS === 'ios'
          ? CardStyleInterpolators.forHorizontalIOS
          : CardStyleInterpolators.forFadeFromBottomAndroid,
    },
  },
)
