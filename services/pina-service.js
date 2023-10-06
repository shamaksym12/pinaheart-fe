import { post, get, put } from '../api';

class PinaService {
    upgradeMembership = async (payMethod, planId) => {
        return await post(`payments/${payMethod}/${planId}`)
    };

    fetchPayments = async () => {
        return await get('subscriptions', true);
    };

    enableSubscription = async (type, id) => {
    	return await put(`subscriptions/${type}/${id}/start`)
    }

    cancelSubscription = async (type, id) => {
        return await put(`subscriptions/${type}/${id}/stop`)
    };
};

const pinaService = new PinaService();

export default  pinaService;