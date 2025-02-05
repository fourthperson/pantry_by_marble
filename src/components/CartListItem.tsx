import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  primaryColor,
  sansBoldAlt,
  sansRegular,
  serifBold,
  serifItalic,
} from '../config/theme.ts';
import PantrySpacer from './PantrySpacer.tsx';
import {formatPrice, imageMapper} from '../util/util.ts';
import {CartItem} from '../types/types.ts';
import {
  increaseQuantity,
  removeFromCart,
  subtractQuantity,
} from '../store/cart_slice.ts';
import {useTranslation} from 'react-i18next';
import CartQuantityButton from './CartQuantityButton.tsx';
import {useAppDispatch} from '../store/store.ts';
import FastImage from 'react-native-fast-image';

const CartListItem = (props: {item: CartItem}): React.JSX.Element => {
  const dispatch = useAppDispatch();

  function add() {
    dispatch(increaseQuantity(props.item));
  }

  function sub() {
    dispatch(subtractQuantity(props.item));
  }

  function remove() {
    dispatch(removeFromCart(props.item));
  }

  return (
    <View style={[styles.container]}>
      <FastImage
        style={styles.image}
        source={Image.resolveAssetSource(imageMapper(props.item.product.image))}
        resizeMode={FastImage.resizeMode.cover}
      />
      <PantrySpacer horizontal={true} space={20} />
      <View style={styles.detailGroup}>
        <Text numberOfLines={2} style={styles.nameStyle}>
          {props.item.product.name.toUpperCase()}
        </Text>
        <Text numberOfLines={1} style={styles.priceStyle}>
          {formatPrice(props.item.product.price)}
        </Text>
        <View style={styles.actionGroup}>
          <RemoveButton onTap={remove} />
          <PantrySpacer horizontal={true} space={20} />
          <CartQuantityButton positive={false} onTap={sub} />
          <PantrySpacer horizontal={true} space={10} />
          <Text style={styles.quantityText}>
            {props.item.quantity.toString()}
          </Text>
          <PantrySpacer horizontal={true} space={10} />
          <CartQuantityButton positive={true} onTap={add} />
        </View>
      </View>
    </View>
  );
};

const RemoveButton = (props: {onTap: () => void}): React.JSX.Element => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity onPress={props.onTap}>
      <View style={styles.removeButton}>
        <Text style={styles.buttonLabel}>{t('remove')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingStart: 16,
    paddingEnd: 16,
    marginBottom: 10,
  },
  image: {
    height: 126,
    width: 133,
  },
  detailGroup: {
    paddingVertical: 16,
    justifyContent: 'space-around',
  },
  nameStyle: {
    fontFamily: serifItalic,
    fontSize: 16,
    color: primaryColor,
    lineHeight: 18,
  },
  priceStyle: {
    fontFamily: serifBold,
    fontSize: 16,
    color: primaryColor,
    lineHeight: 18,
  },
  actionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  removeButton: {
    borderColor: primaryColor,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  buttonLabel: {
    fontFamily: sansRegular,
    fontSize: 14,
    padding: 5,
    color: primaryColor,
  },
  quantityText: {
    fontFamily: sansBoldAlt,
    color: primaryColor,
    fontSize: 16,
  },
});

export default CartListItem;
