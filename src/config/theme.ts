import {StyleSheet} from 'react-native';

// colors
export const bgColor = '#FCF9F5';
export const primaryColor = '#54634B';

// fonts
export const serifRegular = 'Adobe Garamond Pro';
export const serifBold = 'Adobe Garamond Pro Bold';
export const serifItalic = 'Adobe Garamond Pro Italic';
export const sansRegular = 'Avenir Roman';
export const sansItalic = 'Avenir Oblique';
// todo check bold font not working
export const sansBold = 'Geomanist Medium';
//export const sansBold = 'Avenir LT Std 85 Heavy';


export const baseStyle = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: bgColor,
  },
  fillSpace: {
    flex: 1,
  },
});

export const productImages = {
  0: require('../../assets/images/1.jpeg'),
  1: require('../../assets/images/2.jpeg'),
  2: require('../../assets/images/3.jpeg'),
  3: require('../../assets/images/4.jpeg'),
};
