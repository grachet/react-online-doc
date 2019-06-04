import {REMOVE_NOTIFICATION, SEND_NOTIFICATION} from "./action.types";

export const sendNotification = notification => ({
  type: SEND_NOTIFICATION,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});

export const removeNotification = key => ({
  type: REMOVE_NOTIFICATION,
  key,
});
