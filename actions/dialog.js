import * as types from './types.js'
import { get, post, put } from '../api'
import { parse } from 'path';
import { EPROTO } from 'constants';
import message from '../reducers/message.js';

export const openDialog = id => dispatch => {
    return put(`dialogs/open/${id}`, true, {})
    .then(res => {
         dispatch(setDialogId(res.data))
         return res.data
        })
}

export const getDialogList = () => dispatch => {
    return get("dialogs").then(res => {
        if(res.data){
                dispatch(setDialogList(res.data))
            }
        })
}

export const postMessage = message => dispatch =>{
    return post(`dialogs/${message.id}`, false, message.data).then(
        res=>{
            if(res.data){
                dispatch(addMessadge(res.data))
            }
        })
}

export const getDialog = id => dispatch => {
    return get(`dialogs/${id}`).then(
        res => dispatch(setDialog(res.data))
    )
}

export const deleteDialogs = data =>dispatch=> {
    return put('dialogs/delete', true, data).then(
        true
    )
}

export const addSocetMessadge = message => dispatch =>{

    dispatch(addMessadge(message))
}

export const addToInDialog = (data, key) => ({
    type: types.ADD_TO_IN_DIALOG,
    key,
    data
})

export const addMessadgeCounte = data => ({
    type: types.ADD_MESSADGE_COUNTE,
    data
})

export const removeMessadgeCounte = data => ({
    type: types.REMOVE_MESSADGE_COUNTE,
    data
})

export const addMessadge = data => ({
    type: types.ADD_MESSADGE,
    data
})

export const setDialogId = data => ({
    type: types.SET_DIALOG_ID,
    data
})

export const setDialog = data => ({
    type: types.SET_DIALOG,
    data
})

export const setDialogList = data => ({
    type: types.SET_DIALOG_LIST,
    data
})