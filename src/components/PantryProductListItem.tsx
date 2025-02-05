import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PantrySpacer from './PantrySpacer.tsx';
import {
  baseStyle,
  primaryColor,
  sansBold,
  sansRegular,
} from '../config/theme.ts';
import CartSvg from '../../assets/images/cart.svg';
import {alertMsg, formatPrice, imageMapper} from '../util/util.ts';
import {CartItem, PantryProduct} from '../types/types.ts';
import {useAppDispatch} from '../store/store.ts';
import {addToCart} from '../store/cart_slice.ts';
import FastImage from 'react-native-fast-image';

const PantryProductListItem = (props: {
  product: PantryProduct;
}): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const add = useCallback(() => {
    dispatch(
      addToCart({
        quantity: 1,
        product: props.product,
      } as CartItem),
    );
    alertMsg(`${props.product.name} Added to cart!`, 'success');
  }, [dispatch, props.product]);

  return (
    <View>
      <FastImage
        style={styles.image}
        source={Image.resolveAssetSource(imageMapper(props.product.image))}
        resizeMode={FastImage.resizeMode.cover}
      />
      <PantrySpacer horizontal={false} space={20} />
      <Text style={styles.nameText}>{props.product.name}</Text>
      <PantrySpacer horizontal={false} space={10} />
      <View style={styles.priceCartRow}>
        <View style={baseStyle.fillSpace}>
          <Text style={styles.priceText}>
            {formatPrice(props.product.price)}
          </Text>
        </View>
        <TouchableOpacity onPress={add}>
          <View style={styles.circularBorder}>
            <CartSvg height={20} width={20} color={primaryColor} />
          </View>
        </TouchableOpacity>
      </View>
      <PantrySpacer horizontal={false} space={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 163,
    width: 163,
    borderRadius: 5,
    overflow: 'hidden',
  },
  nameText: {
    fontFamily: sansRegular,
    fontSize: 14,
    lineHeight: 20,
    color: primaryColor,
  },
  priceText: {
    fontFamily: sansBold,
    fontSize: 14,
    lineHeight: 20,
    color: primaryColor,
  },
  priceCartRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  circularBorder: {
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 30 / 2,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PantryProductListItem;
