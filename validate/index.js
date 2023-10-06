import { setAlert, setUiKey } from '../actions/ui'
import store from '../store';

export default class Validator {
    static check(value, rules = [], name) {
        let error = {};
        error.valid = true
        if (rules.length) {
            for (var k in rules) {
                if (error.valid) {
                    error = Validator[rules[k]](value, name)
                }
            }
            return error
        }
        return error
    }

    static showAlert(text, level) {
        store.dispatch(setAlert(text, level))
    }

    static isValid(underValidate) {
        const inValid = Object.keys(underValidate).reduce((obj, key) => {
            if (!underValidate[key].valid) {
                obj[key] = underValidate[key].message
            }
            return obj
        }, {})
        store.dispatch(setUiKey('inValid', inValid))
        if (!Object.keys(inValid).length) {
            Validator.reset()
        }
        return !Object.keys(inValid).length
    }

    static getInvalidObject(underValidate) {
        const inValid = Object.keys(underValidate).reduce((obj, key) => {
            if (!underValidate[key].valid) {
                obj[key] = underValidate[key].message
            }
            return obj
        }, {})

        if (!Object.keys(inValid).length) {
            Validator.reset()
        }
        return Object.keys(inValid).length ? inValid : false
    }

    static setInvalid(validateObj) {
        const temp = Object.keys(validateObj).reduce((obj, key) => {
            obj[key] = validateObj[key][0]
            return obj
        }, {})
        store.dispatch(setUiKey('inValid', temp))
    }

    static reset() {
        store.dispatch(setUiKey('inValid', {}))
    }

    static required(value, name) {
        if (value === undefined
            || value === null
            || value === ''
            || (value instanceof Array && !value.length)
            || value === false
            || typeof value === 'undefined') {
            // this.showAlert(name + ' is required', 'error')
            return { valid: false, message: name + ' is required' }
        }
        return { valid: true, message: '' }
    }

    static email(value, name) {
        let data = { valid: true, message: '' }
        if (/\S+@\S+\.\S+/.test(value)) {
            return { valid: true, message: '' }
        }
        // this.showAlert(name + ' is incorrect', 'error')
        return { valid: false, message: name + ' is incorrect' }

    }

    static string(value, name) {
        if (typeof value === 'string') {
            return 1
        }
        this.showAlert(name + ' must be string', 'error')
        return 0;
    }

    static alphabet(value, name) {
        let letters = /^[\sA-Za-z]+$/
        if (value.match(letters)) {
            return 1
        }
        this.showAlert(name + ' must be alphabet characters only', 'error')
        return 0
    }

    static reqiredArray(value, name) {
        if (!value.length) {
            this.showAlert(name + ' is required', 'error')
            return 0
        }
        return 1
    }

    static checked(value, name) {
        if (!value) {
            this.showAlert('You must agree ' + name, 'error')
            return 0
        }
        return 1
    }

    static integer(value, name) {
        if (!Number.isInteger(Number(value))) {
            this.showAlert(name + ' is incorrect', 'error')
            return 0
        }
        return 1
    }

    static phone(value, name) {
        let temp = value
        if (temp.indexOf('+') === 0) {
            temp = value.replace('+', '')
        }
        if (!Number.isInteger(Number(temp)) || temp * 1 < 0) {
            this.showAlert(name + ' is incorrect', 'error')
            return 0
        }
        return 1
    }

    static plus(value, name) {
        if (value < 0) {
            this.showAlert(name + ' is incorrect', 'error')
            return 0
        }
        return 1
    }

    static promoValid(value, name) {
        return { valid: true, massage: 'Promo code is not valid' }
    }
}