import { get, post } from '../api'
import * as types from './types.js'

export const setTerm = (data) => {
	return {
		type: types.SET_TERM,
		payload: data
	}
};

export const setPaymentMethod = (data) => {
	return {
		type: types.SET_PAYMENT_METHOD,
		payload: data
	}
};

export const changeRatioButton = (data) => {
	return {
		type: types.CHANGE_RADIO_BUTTON,
		payload: data
	}
};

// FETCH PLANS ACTIONS

export const plansRequested = () => {
	return {
		type: types.FETCH_PLANS_REQUEST
	}
};

export const plansLoaded = (data) => {
	return {
		type: types.FETCH_PLANS_SUCCESS,
		payload: data
	}
};

export const plansErr = (err) => {
	return {
		type: types.FETCH_PLANS_FAILURE,
		payload: err
	}
};

export const getPlans = async (dispatch)  => {
	dispatch(plansRequested());
	try {
		const res = await get('plans');
		dispatch(plansLoaded(res.data));
		return res.data;
	} catch(err) {
		dispatch(plansErr(err));
	}
};

export const startLoading = () => {
	return {
		type: 'START_LOADING'
	}
};

export const endLoading = () => {
	return {
		type: 'END_LOADING'
	}
};

// UPDATE PLANS
export const updatePlans = () => {
	return {
		type: types.UPDATE_PLANS
	}
};
export const setCurrentPlan = () => {
	return {
		type: types.SET_CURRENT_PLAN
	}
};

// Send Paypal data
export const sendPaymentData = (dispatch) => async (method, id, data) => {
	//if(method === 'stripe') dispatch(startLoading());
	return await post(`payments/${method}/${id}`, true, data);
	//if(res.statusCode === 200) dispatch(endLoading());
};

// Paid Status
export const paidStatusSuccess = () => {
	return {
		type: types.PAID_STATUS_SUCCESS,
	}
};
export const paidStatusFailure = () => {
	return {
		type: types.PAID_STATUS_FAILURE
	}
};

export const onMemInfo = () => {
	return {
		type: 'MEM_INFO'
	}
}

export const paypalLoading = () => {
	return {
		type: 'PAYPAL_LOADING_FINISH'
	}
};