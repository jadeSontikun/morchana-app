import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, ScrollView, View } from 'react-native'
import { COLORS, FONT_SIZES } from '../../styles'
import { MyBackground } from '../../components/MyBackground'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../components/Button'
import BackgroundGeolocation from 'react-native-background-geolocation'
import { useNavigation } from 'react-navigation-hooks'
import { normalize } from 'react-native-elements'
import I18n from '../../../i18n/i18n'

export const DebugBackgroundLocation = () => {
  const navigation = useNavigation()
  const [logs, setLogs] = useState('')
  const logRef = React.useRef(logs)

  useEffect(() => {
    // let interval = setInterval(() => {
    //   console.log('DebugBackgroundLocation useEffect')
    //   BackgroundGeolocation.logger.getLog().then((log) => {
    //     console.log('DebugBackgroundLocation useEffect setLog', log)
    //     setLogs(log)
    //   });
    // }, (1000))
    // return () => clearInterval(interval)

    BackgroundGeolocation.onHttp((httpEvent) => {
      console.log('[http] ', httpEvent.success, httpEvent.status)
      var json: any = null
      try {
        json = JSON.parse(httpEvent.responseText)
      } catch (e) {
        console.log('error', e)
      }

      const locations = json.locations
      if (!Array.isArray(locations)) return

      const msg = locations.map((loc) => {
        console.log(loc);
        return `timestamp=${loc.timestamp} latitude=${loc.coords.latitude} longitude=${loc.coords.longitude}`
      })

      logRef.current += msg.join('\n') + '\nSENT : ' + new Date().toISOString() + '\n'
      setLogs(logRef.current)
    })
  }, [])

  return (
    <MyBackground variant="light">
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.PRIMARY_LIGHT}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Text
            selectable
            style={{
              fontSize: FONT_SIZES[200] * 0.75,
            }}
          >
            {logs}
          </Text>
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: normalize(16),
            marginBottom: 16,
          }}
        >
          <PrimaryButton
            title={I18n.t('close')}
            style={{ width: '100%' }}
            containerStyle={{ width: '100%' }}
            onPress={() => {
              navigation.pop()
            }}
          />
        </View>
      </SafeAreaView>
    </MyBackground>
  )
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionHeader: {
    height: 56,
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    color: '#AAAAAA',
    fontSize: FONT_SIZES[400],
  },
  settingsSection: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  horizontalRow: {
    flexDirection: 'row',
  },
  leftArea: {
    flex: 1,
  },
  rightArea: {
    justifyContent: 'flex-start',
  },
  sectionText: {
    fontSize: FONT_SIZES[500],
    color: '#000000',
  },
  sectionDescription: {
    marginTop: 4,
    fontSize: FONT_SIZES[400],
    color: '#888888',
  },
  mediumText: {
    fontSize: FONT_SIZES[600],
    color: '#000000',
  },
  largeText: {
    fontSize: FONT_SIZES[700],
    color: '#000000',
  },
  sectionTitle: {
    fontSize: FONT_SIZES[700],
    fontWeight: '600',
    color: '#000000',
  },
  scrollView: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
  },
})
