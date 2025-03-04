import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  baseStyle,
  bgColor,
  checkOutBackground,
  primaryColor,
  sansBold,
  sansRegular,
  serifBold,
  serifBoldItalic,
} from '../../../config/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import PantryBackButton from '../../../components/PantryBackButton.tsx';
import PantrySpacer from '../../../components/PantrySpacer.tsx';
import {useNavigation} from '@react-navigation/native';
import PantryBar from '../../../components/PantryBar.tsx';
import PantryButton from '../../../components/PantryButton.tsx';
import PromoCodeComponent from '../../../components/PromoCodeComponent.tsx';
import CartListItem from '../../../components/CartListItem.tsx';
import {formatPrice} from '../../../util/util.ts';
import CartSvg from '../../../../assets/images/cart.svg';
import {useTranslation} from 'react-i18next';
import {FlashList} from '@shopify/flash-list';
import {useAppSelector} from '../../../store/store.ts';

const Cart = (): React.JSX.Element => {
  const navigation = useNavigation();

  const {t} = useTranslation();

  const cart = useAppSelector(state => state.cart);

  // const cart.items = useMemo(() => {
  //   if (!Array.isArray(cart.items)) {
  //     return [];
  //   }
  //   const items: Array<CartItem> = [];
  //   for (let i = 0; i < cart.items.length; i++) {
  //     items.push(cart.items[i] as CartItem);
  //   }
  //   return items;
  // }, [cart]);

  const deliveryFee = cart.items.length === 0 ? 0 : 28;

  // const filListCallback = useCallback(() => {
  //   if (!Array.isArray(cart.items)) {
  //     return;
  //   }
  //   const items: Array<CartItem> = [];
  //   for (let i = 0; i < cart.items.length; i++) {
  //     items.push(cart.items[i] as CartItem);
  //   }
  //   setCartList(items);
  // }, [cart]);
  //
  // useEffect(() => {
  //   filListCallback();
  // }, [filListCallback]);

  return (
    <View style={baseStyle.bgContainer}>
      <SafeAreaView style={baseStyle.fillSpace}>
        <View style={styles.headerGroup}>
          <View style={styles.navRow}>
            <PantryBackButton label={t('back')} onPress={navigation.goBack} />
          </View>
          <PantrySpacer horizontal={false} space={30} />
          <Text style={styles.titleText}>{t('title_cart')}</Text>
          <PantrySpacer horizontal={false} space={10} />
          <PantryBar />
          <PantrySpacer horizontal={false} space={10} />
        </View>
        <View style={[baseStyle.fillSpace]}>
          {cart.items.length > 0 && (
            <FlashList
              data={cart.items}
              estimatedItemSize={118}
              renderItem={({item}) => <CartListItem item={item} />}
              contentContainerStyle={styles.flatlistBottom}
            />
          )}
          {cart.items.length === 0 && (
            <View style={styles.emptyGroup}>
              <CartSvg height={30} width={30} color={primaryColor} />
              <Text style={styles.emptyText}>{t('cart_empty')}</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backLinkText}>{t('add_items')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {cart.items.length > 0 && (
          <View style={styles.bottomGroup}>
            <View style={styles.promoGroup}>
              <PromoCodeComponent />
            </View>
            <View style={styles.checkoutGroup}>
              <CheckoutTally
                label={t('sub_total')}
                value={formatPrice(cart.total)}
              />
              <CheckoutTally
                label={t('delivery')}
                value={formatPrice(deliveryFee)}
              />
              <View style={styles.checkoutDivider} />
              <CheckoutTotal
                label={t('total')}
                value={formatPrice(cart.total + deliveryFee)}
              />
              <PantrySpacer horizontal={false} space={10} />
              <PantryButton label={t('checkout')} enabled={false} />
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const CheckoutTally = (props: {
  label: string;
  value: string;
}): React.JSX.Element => {
  return (
    <View style={styles.checkoutRow}>
      <Text style={styles.tallyLabel}>{props.label}</Text>
      <Text style={styles.tallyValue}>{props.value}</Text>
    </View>
  );
};

const CheckoutTotal = (props: {
  label: string;
  value: string;
}): React.JSX.Element => {
  return (
    <View style={styles.checkoutRow}>
      <Text style={styles.totalLabel}>{props.label}</Text>
      <Text style={styles.totalLabel}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerGroup: {
    margin: 16,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: serifBoldItalic,
    color: primaryColor,
    lineHeight: 50,
    fontSize: 40,
  },
  promoGroup: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bottomGroup: {
    backgroundColor: bgColor,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  checkoutGroup: {
    backgroundColor: checkOutBackground,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  checkoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  checkoutDivider: {
    backgroundColor: primaryColor,
    height: 1,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  tallyLabel: {
    fontFamily: sansRegular,
    fontSize: 12,
    color: primaryColor,
  },
  tallyValue: {
    fontFamily: sansBold,
    fontSize: 14,
    color: primaryColor,
  },
  totalLabel: {
    fontFamily: serifBold,
    fontSize: 18,
    color: primaryColor,
  },
  flatlistBottom: {
    paddingBottom: Platform.OS === 'ios' ? 230 : 280,
  },
  emptyGroup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  emptyText: {
    fontFamily: sansRegular,
    fontSize: 14,
    margin: 20,
  },
  backLinkText: {
    fontFamily: sansBold,
    fontSize: 14,
    color: primaryColor,
  },
});

export default Cart;
