import {StyleSheet} from 'react-native';

// colors
export const bgColor = '#FCF9F5';
export const primaryColor = '#54634B';
export const tabInactiveColor = '#999f91';
export const checkOutBackground = '#ebeae5';

// fonts
// serif
export const serifRegular = 'Adobe Garamond Pro';
export const serifBold = 'Adobe Garamond Pro Bold';
// todo check italic font
export const serifItalic = 'Adobe Garamond Pro Italic';
export const serifBoldItalic = 'Adobe Garamond Pro Bold Italic';
// sans
export const sansRegular = 'Avenir Roman';
// todo check bold font not working
export const sansBold = 'Avenir LT Std 95 Black';
export const sansBoldAlt = 'Geomanist Medium';


export const baseStyle = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: bgColor,
  },
  fillSpace: {
    flex: 1,
  },
});
