import IMAGES from '../../assets/images';
import {showMessage, MessageType} from 'react-native-flash-message';
import {sansRegular} from '../config/theme.ts';
import {CountryCode, isPossibleNumber, isValidPhoneNumber} from 'libphonenumber-js';

export function imageMapper(index: number) {
    switch (index) {
        case 0:
            return IMAGES.ONE;
        case 2:
            return IMAGES.TWO;
        case 3:
            return IMAGES.THREE;
        default:
            return IMAGES.FOUR;
    }
}

export function formatPrice(p: number): string {
//    return `R ${p.toFixed(2).toString()}`;
    return `R ${p.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

export function alertMsg(message: string, type: MessageType, title?: string) {
    showMessage({
        message: title === undefined ? '' : title,
        description: message,
        type: type,
        textStyle: {
            fontFamily: sansRegular,
            fontSize: 14,
            color: 'white',
        },
    });
}

export function validPhone(phone: string, countryCode: CountryCode): boolean {
    return isPossibleNumber(phone, countryCode) && isValidPhoneNumber(phone, countryCode);
}
