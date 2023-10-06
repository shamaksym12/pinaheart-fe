
import pinaService from "../services/pina-service";

const paymentInit = (paymentList) => {
    return {
        type: 'FETCH_PAYMENTS',
        payload: paymentList
    }
};

const disableCheckbox = (id) => {
  return {
      type: 'DISABLE_CHECKBOX',
      payload: id
  }
};

const enableCheckbox = (id) => {
    return {
        type: 'ENABLE_CHECKBOX',
        payload: id
    }
};

const initErr = () => {
  return {
      type: 'INIT_ERR'
  }
};

export const cancelSubscription = (dispatch) => async (active) => {
    if (!active) return;
    const { type, id } = active;
    try {
        const res = await pinaService.cancelSubscription(type, id);
        if (res.data) {
            dispatch(disableCheckbox(id));
        }
    } catch (e) {
        dispatch(initErr());
    }
};

export const activeSubscription = (active) => async (dispatch) => {
    if(!active) return;
    const { type, id } = active
    try {
        const res = await pinaService.enableSubscription(type, id);
        if (res.data) {
            dispatch(enableCheckbox(id))
        }
    } catch (e) {
        dispatch(initErr());
    }
}

export const fetchPayment = () => async (dispatch) => {
    try {
        const { data } = await pinaService.fetchPayments();
        // console.log(data);
        dispatch(paymentInit(data));
    } catch (e) {

    }
};