import { goAuth } from '../api'
import store from '../store'
import { logout } from '../actions/auth'
import { Router } from '../routes'

// export const getArray = (array, name) => {
// 	const temp = array.map(item => ({value: item.id, name: item.value}))
// 	return [{ value: '', name: name }, ...temp]
// }

export const getArray = (array, withDefault = true) => {
    const temp = withDefault ? [{id: '', name: 'Please select...'}] : [{id: '', name: 'Any'}]
    return [...temp, ...array]
}

export const getCounriesArrey = (array, withDefault = true, emptySelect = 2) => {
    // const emptySelect = 2;
    if(array[0]){
       if(array[ emptySelect ].id != ""){
            array.splice( emptySelect, 0, {id: '', name: ' ', disabled: true})
       }
    }
    const temp = withDefault ? [{id: '', name: 'Please select...'}] : [{id: '', name: 'Any'}, {id: '', name: ' ', disabled: true}]

    return [...temp, ...array]
}

export const getMultiArray = (array) => {
    return [{id: '0', name: 'Any'}, ...array]
}

export const getArrayAge = (withDefault = true) => {
    let temp = []
    for (let i=0;i<18;i++) {
        temp.push({id: i+1, name: i+1})
    }
    const start = withDefault ? [{id: '', name: 'Please select...'}] : [{id: '', name: 'Any'}]
    return [...start, ...temp, {id: 19, name: 'Older than 18'}]
}

export const getArrayChildren = () => {
    let temp = []
    for (let i=1;i<9;i++) {
        temp.push({id: i, name: i})
    }
    return [{id: '', name: 'Please select...'}, ...temp, {id: 9, name: 'More then 8'}]
}

export const toFeet = cm => {
    const realFeet = ((cm*0.393700) / 12);
    const feet = Math.floor(realFeet);
    const inches = Math.round((realFeet - feet) * 12);
    return `${feet}'${inches}''`
}

export const toLbs = kg => {
    return Math.floor(kg * 2.20462262)
}

export const heightArray = (withDefault = true) => {
    let temp = []
    for (let i=140;i<216;i++) {
        temp.push({id: i, name: `${i} cm / ${toFeet(i)}`})
    }
    const first = withDefault ? [{id: '', name: 'Please select...'}] : [{id: '', name: 'Any'}]
    return [...first, ...temp]
}

export const heightArrayBetween = (from, to) => {
    let temp = [{ 'id': '', 'name': 'Any' }]
    from = from ? from : 140
    to = to ? to : 216
    for (from; from <= to; from++) {
        temp.push({ 'id': from, 'name': `${from} cm / ${toFeet(from)}` })
    }
    return temp
}

export const weightArray = (withDefault = true) => {
    let temp = []
    for (let i=40;i<221;i++) {
        temp.push({id: i, name: `${i} kg / ${toLbs(i)} lbs`})
    }
    const first = withDefault ? [{id: '', name: 'Please select...'}] : [{id: '', name: 'Any'}]
	return [...first, ...temp]
}

export const weightArrayBetween = (from, to) => {
    let temp = [{ 'id': '', 'name': 'Any' }]
    from = from ? from : 40
    to = to ? to : 221
    for (from; from <= to; from++) {
        temp.push({ 'id': from, 'name': `${from} kg / ${toLbs(from)} lbs` })
    }
    return temp
}

// export const getDialogData = (data) =>{
// }

export const monthArray = () => {
    return [
        { 'id': '', 'name': 'Month'},
        { 'id': '1', 'name': 'Jan' }, 
        { 'id': '2', 'name': 'Feb' },
        { 'id': '3', 'name': 'Mar' },
        { 'id': '4', 'name': 'Apr' },
        { 'id': '5', 'name': 'May' },
        { 'id': '6', 'name': 'Jun' },
        { 'id': '7', 'name': 'Jul' },
        { 'id': '8', 'name': 'Aug' },
        { 'id': '9', 'name': 'Sep' },
        { 'id': '10', 'name': 'Oct' },
        { 'id': '11', 'name': 'Nov' },
        { 'id': '12', 'name': 'Dec' }
    ]
}

export const yearArray = () => {
    let temp = [{'id': '', 'name': 'Year'}]
    let date = new Date()
    let year = date.getFullYear()
    year -= 18
    let from = year - 72
    for (year; year >= from; year--) {
        temp.push({'id': year, 'name': year})
    }
    return temp
}

export const dayArray = () => {
    let temp = [{'id': '', 'name': 'Day'}]
    for (var k = 1; k <= 31; k++) {
        temp.push({'id': k, 'name': k})
    }
    return temp
}

export const ageArray = () => {
    let temp = [{'id': '', 'name': 'Any'}]
    for (var k = 18; k <= 70; k++) {
        temp.push({'id': k, 'name': k})
    }
    return temp
}

export const ageArraySignup = () => {
    let temp = [{'id': '', 'name': ''}]
    for (var k = 18; k <= 70; k++) {
        temp.push({'id': k, 'name': k})
    }
    return temp
}

export const ageArrayBetween = (from, to) => {
    let temp = [{ 'id': '', 'name': 'Any' }]
    from = from ? from : 18
    to = to ? to : 70
    for (from; from <= to; from++) {
        temp.push({ 'id': from, 'name': from })
    }
    return temp
}

export const getNumArray = (type, from, to) => {
    let temp = [{ 'id': '', 'name': '' }]
    if (type === 'from') {
        for (from; from <= to; from++) {
            temp.push({ 'value': from, 'name': from })
        }
    } else {
        for (from; from >= to; from--) {
            temp.push({ 'value': from, 'name': from })
        }
    }
    return temp
}

export const formatDate = value => {
	const digits = /[^0-9]+/g
	let digitsValue = value.replace(digits, '')
	if (digitsValue.length > 8) {
        digitsValue = digitsValue.slice(0, 8)
    }
    if (digitsValue.length >= 5) {
        digitsValue = `${digitsValue.slice(0,2)}/${digitsValue.slice(2,4)}/${digitsValue.slice(4)}`
    } else if (digitsValue.length >= 3) {
        digitsValue = `${digitsValue.slice(0,2)}/${digitsValue.slice(2)}`
    }
    return digitsValue
}

export const makeCDN = link => {
    if (typeof link === 'string') {
        const original = 'liveinlove.s3.us-west-2.amazonaws.com'
        const cdn = 'd2etktq4v0899q.cloudfront.net'
        return link.replace(original, cdn)
    }
    return link
}

export const getImage = (link, userAgent) => {
    if( /firefox/i.test(userAgent) )
      return link
    else if( /chrome/i.test(userAgent) )
      return link.replace('jpg', 'webp').replace('png', 'webp')
    else if( /safari/i.test(userAgent) )
      return link
    else if( /msie/i.test(userAgent) )
      return link
    else
      return link
}

export const sortByName = (list = []) => {
    const temp = list.sort((a, b) => {
        if(a.name === 'Others') { return 1; }
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
    return temp
}

export const sexPhotoFinder = (sex, main_photo) =>{
    if(main_photo){
        return main_photo
    }else if(sex === undefined){
        return ""
    }else if(sex === "F"){
        return '/static/assets/img/default-avatar-woman.png'
    }else return '/static/assets/img/default-avatar-man.png'
}

export const lastActivity = (activity_diff_in_seconds)=> {
    // if (window.innerWidth >= 768) {
    //     if (activity_diff_in_seconds===null) {
    //         return " Never been online"
    //     }else if(activity_diff_in_seconds <= 180){
    //         return "online " 
    //     }else if(activity_diff_in_seconds >= 180 && activity_diff_in_seconds < 3600){
    //         return "online " + Math.round(activity_diff_in_seconds/60) + " mins ago"
    //     }else if(activity_diff_in_seconds >= 3600 && activity_diff_in_seconds <7200){
    //         return "online " +  Math.round(activity_diff_in_seconds/3600) + " hour ago"
    //     }else if(activity_diff_in_seconds >= 7200 && activity_diff_in_seconds <86400){
    //         return "online " +  Math.round(activity_diff_in_seconds/3600) + " hours ago"
    //     }else if(activity_diff_in_seconds >= 86400 && activity_diff_in_seconds <172800){
    //         return "online " +  Math.round(activity_diff_in_seconds/86400) + " day ago"
    //     }else if(activity_diff_in_seconds >= 172800){
    //         return "online " +  Math.round(activity_diff_in_seconds/86400) + " days ago"
    //     }
    // }
    // else {
        if (activity_diff_in_seconds===null) {
            return " Never been online"
        }else if(activity_diff_in_seconds <= 180){
            return "online " 
        }else if(activity_diff_in_seconds >= 180 && activity_diff_in_seconds < 3600){
            return Math.round(activity_diff_in_seconds/60) + " mins ago"
        }else if(activity_diff_in_seconds >= 3600 && activity_diff_in_seconds <7200){
            return Math.round(activity_diff_in_seconds/3600) + " hour ago"
        }else if(activity_diff_in_seconds >= 7200 && activity_diff_in_seconds <86400){
            return (Math.round(activity_diff_in_seconds/3600) + " hours ago")
        }else if(activity_diff_in_seconds >= 86400 && activity_diff_in_seconds <172800){
            return Math.round(activity_diff_in_seconds/86400) + " day ago"
        }else if(activity_diff_in_seconds >= 172800){
            return Math.round(activity_diff_in_seconds/86400) + " days ago"
        }
    // }
}

export const textTrunc = (text, maut) =>{
    String.prototype.trunc = 
      function(n){
          return this.substr(0,n-1)+(this.length>n?'...':'');
      };
    if(text){
        return text.trunc(maut)
    }
}