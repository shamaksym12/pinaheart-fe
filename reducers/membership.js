import * as types from '../actions/types.js'

const initialState = {
    allPlans: [],
    plans: [],
    planId: null,
    paymentMethod: 'stripe',
    currentPlan: null,
    loading: true,
    clientIdLoading: true,
    stripeCard: null,
    selectedOption: '3 month',
    stripeLoading: false,
    memInfo: false,
    paidStatus: null,
    paypalLoading: true,
    err: null
};

const setPlans = (state, plans) => {
    const oldArr = [ ...plans ];
    let newArr = [];

    oldArr.reverse();
    oldArr.map(e => {
        if (e.type === state.paymentMethod) {
            newArr.push(e);
        }
    });

    return newArr;
};

const membership = (membership = initialState, action = {}) => {
    switch (action.type) {

        case types.FETCH_PLANS_REQUEST:
            return {
                ...membership,
            };

        case types.FETCH_PLANS_SUCCESS:
            const { plans, paypal_client_id } = action.payload;
            const plansByDefault = setPlans(membership, plans);
            const defaultPlan = plans.find(e => e.name === '3 month' && e.type === 'stripe');

            return {
                ...membership,
                loading: false,
                allPlans: plans,
                plans: plansByDefault,
                planId: defaultPlan.id,
                currentPlan: defaultPlan,
                clientId: paypal_client_id
            };

        case types.FETCH_PLANS_FAILURE:
            return {
              loading: false,
              err: action.payload
            };

        case types.SET_TERM:
            return {
                ...membership,
                planId: action.payload
            };

        case types.SET_PAYMENT_METHOD:
            const { currentPlan, allPlans } = membership;
            const newCurrentPlan = allPlans.find(e => e.name === currentPlan.name && e.type === action.payload);
            return {
                ...membership,
                paymentMethod: action.payload,
                currentPlan: newCurrentPlan
            };

        case types.UPDATE_PLANS:
            return {
                ...membership,
                plans: setPlans(membership, membership.allPlans)
            };

        case types.CHANGE_RADIO_BUTTON:
            return {
                ...membership,
                selectedOption: action.payload
            };

        case types.SET_CURRENT_PLAN:  {
            const { planId, allPlans } = membership;
            const plan = allPlans.find(e => e.id === planId);

            return {
                ...membership,
                currentPlan: plan
            }
        }

        case types.SET_STRIPE_CARD:
            return {
                ...membership,
                stripeCard: action.payload
            };

        case types.PAID_STATUS_SUCCESS:
            return {
              ...membership,
              paidStatus: 'success'
            };

        case types.PAID_STATUS_FAILURE:
            return {
                ...membership,
                paidStatus: 'failure'
            };

        case 'MEM_INFO':
            return {
                ...membership,
                memInfo: true,
            };

        case 'START_LOADING': {
            return  {
                ...membership,
                stripeLoading: true,
            }
        }

        case 'END_LOADING':
            return {
              ...membership,
                stripeLoading: false,
            };

        case 'PAYPAL_LOADING_FINISH':
            return  {
                ...membership,
                paypalLoading: false,
            }

        default:
            return membership;
    }
};

export default membership