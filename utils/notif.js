import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

/**
* @description - Field name under which localNotification
* @description - flag is set inside AsyncStorage
*/
const NOTIFICATION_KEY = 'FlashCardsApp:notifications'

/**
* @description - Clears all local notifications
* @util
* @returns null
*/
export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

/**
* @description - Creates a notification object
* @factory
* @returns notification object
*/
function createNotification () {
  return {
    title: 'Practice your quizes!',
    body: "👋 don't forget to practice your quizes today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

/**
* @description - Sets local notification at 8PM every day
* @util
* @returns null
*/
export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
