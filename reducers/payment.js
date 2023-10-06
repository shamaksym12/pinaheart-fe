const initialState = {
  paymentList: [],
    active: {status: ''},
  loading: true,
  err: false,
};

const payment = (payment = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PAYMENTS': {
            let active = action.payload.find(e => e.status === 'active');
            if(!active) {
                active = action.payload.find(e => e.status === 'suspended');
            }
            if(!active) { active = { status: '' } }
            const temp = action.payload.map((pay, i) => ({
                id: pay.id,
                idx: i+1,
                plan: pay.plan,
                amt: pay.payments[0].amount,
                currency: pay.payments[0].currency.toUpperCase(),
                start: pay.start.split(' ')[0],
                end: pay.next ? pay.next.split(' ')[0] : '',
                status: pay.status,
                type: pay.type,
            }))
            return Object.assign({}, payment, {
                loading: false,
                paymentList: temp,
                active: active,
            })
        }

        case 'DISABLE_CHECKBOX':
            const { paymentList } = payment;
            const idx = paymentList.findIndex(e => e.id === action.payload);
            const oldItem = paymentList[idx];
            const newItem = {...oldItem, status: 'suspended' };
            return {
                ...payment,
                paymentList: [
                    ...paymentList.slice(0, idx),
                    newItem,
                    ...paymentList.slice(idx + 1)
                ],
                active: newItem,
            };

        case 'ENABLE_CHECKBOX': {
            const { paymentList } = payment;
            const idx = paymentList.findIndex(e => e.id === action.payload);
            const oldItem = paymentList[idx];
            const newItem = {...oldItem, status: 'active' };
            return {
                ...payment,
                paymentList: [
                    ...paymentList.slice(0, idx),
                    newItem,
                    ...paymentList.slice(idx + 1)
                ],
                active: newItem,
            };
        }

        case 'initErr':
            return {
              loading: false,
              err: true,
            };


        default:
            return payment
    }
};

export default payment;