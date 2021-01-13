import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack'
import { QuestionaireForm } from './QuestionaireForm'
import { QuestionaireSummary } from './QuestionaireSummary'
import { QuestionaireHome } from './QuestionaireHome'
import { Platform } from 'react-native'

export const QuestionaireStack = createStackNavigator(
  {
    QuestionaireHome: QuestionaireHome,
    QuestionaireForm: {
      screen: QuestionaireForm,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    QuestionaireSummary: QuestionaireSummary,
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
