import React from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native'
import { PrimaryButton } from '../../components/Button'
import I18n from '../../../i18n/i18n'
import {useNavigation} from 'react-navigation-hooks'

type Props = {
  contentMessage: string
}

const ProvinceSanboxConsentScreen: React.FC<Props> = ({ contentMessage }) => {

  const navigation = useNavigation()
  
  const cancel = () => {
    console.log('cancel')
  }

  const accepted = () => {
    console.log('accepted')
    navigation.navigate('Auth')
  }

  return (
    <SafeAreaView>
      <View style={styles.headers}>
        <TouchableOpacity>
          <Text>{'back'}</Text>
        </TouchableOpacity>
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <Text>{contentMessage}</Text>
      </ScrollView>
      <View style={styles.buttons}>
        <View>
          <PrimaryButton title={I18n.t('submit')} onPress={accepted} />
          <PrimaryButton title={I18n.t('cancel')} onPress={cancel} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export const PhuketSanboxConsentScreen: React.FC = () => {
  return (
    <ProvinceSanboxConsentScreen contentMessage="Phuket sanbox consent message" />
  )
}

const styles = StyleSheet.create({
  headers: {
    flex: 1,
  },
  scrollView: {
    height: '100%',
  },

  buttons: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  logo: {
    height: 30,
    width: '100%',
  },
})
