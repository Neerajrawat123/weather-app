import { fromJSON } from "postcss"

export function isSameDay(date1:String, date2:String) {
    let daysOf1 = date1.split(' ')[0].split('-')
    let daysOf2 = date2.split(' ')[0].split('-')

    for (let i = 0; i < daysOf1.length; i++) {
        if(daysOf1[i] !== daysOf2[i]){
            return false
        }

    }

    return true

    
}