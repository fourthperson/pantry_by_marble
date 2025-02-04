import React, {useState} from 'react';
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
} from '../store/cart_slice';
import {useTranslation} from 'react-i18next';
import CartQuantityButton from './CartQuantityButton.tsx';
import {useAppDispatch} from '../store/store.ts';

const CartListItem = (item: CartItem): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const [count, setCount] = useState<number>(item.quantity);

  function add() {
    dispatch(increaseQuantity(item));
    setCount(count + 1);
  }

  function sub() {
    if (count > 1) {
      dispatch(subtractQuantity(item));
      setCount(prev => prev - 1);
    }
  }

  function remove() {
    dispatch(removeFromCart(item));
  }

  return (
    <View style={[styles.container]}>
      <Image style={styles.image} source={imageMapper(item.product.image)} />
      <PantrySpacer horizontal={true} space={20} />
      <View style={styles.detailGroup}>
        <Text numberOfLines={2} style={styles.nameStyle}>
          {item.product.name.toUpperCase()}
        </Text>
        <Text numberOfLines={1} style={styles.priceStyle}>
          {formatPrice(item.product.price)}
        </Text>
        <View style={styles.actionGroup}>
          <RemoveButton onTap={remove} />
          <PantrySpacer horizontal={true} space={20} />
          <CartQuantityButton positive={false} onTap={sub} />
          <PantrySpacer horizontal={true} space={10} />
          <Text style={styles.quantityText}>{count.toString()}</Text>
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
