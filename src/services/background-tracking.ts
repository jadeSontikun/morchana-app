import BackgroundGeolocation from 'react-native-background-geolocation'
import { getAnonymousHeaders } from '../api'
import { Platform } from 'react-native'
import { API_URL } from '../config'
import I18n from '../../i18n/i18n'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
class BackgroundTracking {
  setup(startImmediately?: boolean) {
    if (startImmediately) {
      this.start()
    }
    BackgroundGeolocation.onHttp(async (response) => {
      console.log('BackgroundGeolocation [onHttp] ', response.status)
      const olds = await AsyncStorage.getItem('locationHttp')
      const currentList = JSON.parse(olds || '[]')
      currentList.push({ timestamp: moment().toISOString(), ...response })
      await AsyncStorage.setItem('locationHttp', JSON.stringify(currentList))
    })
  }

  private registerGeoLocation() {
    const headers = getAnonymousHeaders()
    return BackgroundGeolocation.ready({
      isMoving: true,
      // iOS
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      stationaryRadius: 50,

      // Android
      enableHeadless: false,
      allowIdenticalLocations: true,
      foregroundService: true,
      deferTime: 60 * 1000,

      // All
      locationUpdateInterval: 15 * 60 * 1000,
      distanceFilter: Platform.OS === 'android' ? 0 : 50,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      reset: true,
      debug: true,
      httpTimeout: Platform.OS === 'ios' ? 5000 : undefined,
      stopOnTerminate: false,
      startOnBoot: true,
      autoSync: true,
      // autoSyncThreshold: 10,
      batchSync: true,
      maxBatchSize: 20,
      headers,
      url: API_URL + '/location',
      httpRootProperty: 'locations',
      locationsOrderDirection: 'ASC',
      locationAuthorizationAlert: {
        titleWhenNotEnabled: I18n.t('pls_set_loc_serv_as_always'),
        titleWhenOff: I18n.t('pls_set_loc_serv_as_always'),
        instructions: I18n.t(
          'help_notify_if_you_get_near_risky_person_or_area',
        ),
        cancelButton: 'Cancel',
        settingsButton: 'Settings',
      },
      notification: {
        title: I18n.t('morchana_tracking_is_on'),
        text: I18n.t('you_will_be_notified_when_closed_to_risky_ppl'),
      },
    })
  }

  start() {
    return this.registerGeoLocation().then((state) => {
      if (!state.enabled) {
        BackgroundGeolocation.start().catch(console.log)
      }
    })
  }

  stop() {
    BackgroundGeolocation.removeAllListeners()
    return BackgroundGeolocation.stop()
  }

  destroyLocations() {
    return BackgroundGeolocation.destroyLocations()
  }

  getLocation(extras: any = {}) {
    return this.registerGeoLocation().then(() => {
      return BackgroundGeolocation.getCurrentPosition({
        samples: 1,
        ...extras,
      })
    })
  }
}

export const backgroundTracking = new BackgroundTracking()
