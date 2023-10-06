import { get, post, message, put, image, remove } from '../api'
import * as types from './types.js'

export const changeNotificationsMessagesPeriod = data => dispatch => {
  const dataToSend = {
    settings: [],
  };
    dataToSend.settings.push({
      type: 'email',
      name: 'new-message',
      value: data,
    });

	put(`notify-settings`, true, dataToSend).then(res => {
		if (res.data) {
			dispatch(setNotificationsParams(res.data))
		}
	})
}

export const changeNotificationsActivitiesPeriod = data => dispatch => {
  const dataToSend = {
    settings: [],
  };
    dataToSend.settings.push({
      type: 'email',
      name: 'new-activity',
      value: data,
    });

	put(`notify-settings`, true, dataToSend).then(res => {
		if (res.data) {
			dispatch(setNotificationsParams(res.data))
		}
	})
}

export const setNotificationsParams = data => {
  const resObj = {};
  data.forEach((i) => {
    if (i.type === 'email') resObj[i.name] = i.value;
  });
  return ({
    type: types.SET_NOTIFICATIONS_PARAMS,
    payload: resObj,
  })
  
};

export const getNotificationsSettings = () => (dispatch) => {
  return get(`notify-settings`).then(res => {
		if (res.data) {
			dispatch(setNotificationsParams(res.data))
		}
	})
}