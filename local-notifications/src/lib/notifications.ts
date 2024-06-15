import * as Notifications from 'expo-notifications';

export const initializeNotifications = async () => {
  await Notifications.requestPermissionsAsync();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true, // should keep on to work on Android
      shouldSetBadge: false,
    }),
  });
};
