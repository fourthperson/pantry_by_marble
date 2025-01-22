import { StyleSheet } from 'react-native';

// colors
export const bgColor = '#FCF9F5';
export const primaryColor = '#54634B';

// fonts
export const serifRegular = 'Adobe Garamond Pro';
export const serifBold = 'Adobe Garamond Pro Bold';
export const serifItalic = 'Adobe Garamond Pro Italic';
export const sansRegular = 'Avenir Roman';
export const sansItalic = 'Avenir Oblique';
export const sansBold = 'Avenir Black';


export const baseStyle = StyleSheet.create({
    bgContainer: {
        flex: 1,
        backgroundColor: bgColor,
    },
});
