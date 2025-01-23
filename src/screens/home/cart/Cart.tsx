import React, {useEffect, useState} from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    baseStyle,
    checkOutBackground,
    primaryColor,
    sansBold,
    sansRegular,
    serifBold,
} from '../../../config/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import PantryBackButton from '../../../components/PantryBackButton.tsx';
import PantrySpacer from '../../../components/PantrySpacer.tsx';
import {useNavigation} from '@react-navigation/native';
import PantryBar from '../../../components/PantryBar.tsx';
import PantryButton from '../../../components/PantryButton.tsx';
import {CartItem} from '../../../types/types.ts';
import CartListItem from '../../../components/CartListItem.tsx';
import {useSelector} from 'react-redux';
import {formatPrice} from '../../../util/util.ts';

function Cart(): React.JSX.Element {
    const navigation = useNavigation();

    const cart = useSelector(state => state.cart);
    console.log(cart);

    const [cartList, setCartList] = useState<Array<CartItem>>([]);

    const deliveryFee = 28;

    useEffect(() => {
        fillList();
    }, [cart]);

    function fillList() {
        if (!Array.isArray(cart.cart)) {
            return;
        }
        const items: Array<CartItem> = [];
        for (let i = 0; i < cart.cart.length; i++) {
            items.push(cart.cart[i] as CartItem);
        }
        setCartList(items);
    }

    function checkout() {
    }

    return (
        <View style={baseStyle.bgContainer}>
            <SafeAreaView style={baseStyle.fillSpace}>
                <View style={styles.headerGroup}>
                    <View style={styles.navRow}>
                        <PantryBackButton label={'Back'} onPress={navigation.goBack}/>
                    </View>
                    <PantrySpacer horizontal={false} space={30}/>
                    <Text style={styles.titleText}>Cart</Text>
                    <PantrySpacer horizontal={false} space={10}/>
                    <PantryBar/>
                    <PantrySpacer horizontal={false} space={10}/>
                </View>
                <View style={[baseStyle.fillSpace]}>
                    {
                        cartList && cartList.length > 0 &&
                        <FlatList
                            data={cartList}
                            renderItem={({item}) => <CartListItem
                                product={item.product}
                                quantity={item.quantity}/>}
                            contentContainerStyle={styles.flatlistBottom}
                        />
                    }
                </View>
                <View style={styles.checkoutGroup}>
                    <CheckoutTally label={'Sub total'} value={formatPrice(cart.total)}/>
                    <CheckoutTally label={'Delivery'} value={formatPrice(deliveryFee)}/>
                    <View style={styles.checkoutDivider}/>
                    <CheckoutTotal label={'Total'} value={formatPrice(cart.total + deliveryFee)}/>
                    <PantrySpacer horizontal={false} space={20}/>
                    <PantryButton label={'Checkout'} onPress={checkout}/>
                </View>
            </SafeAreaView>
        </View>
    );
}


interface TallyProps {
    label: string;
    value: string
}

function CheckoutTally(props: TallyProps): React.JSX.Element {
    return (
        <View style={styles.checkoutRow}>
            <Text style={styles.tallyLabel}>{props.label}</Text>
            <Text style={styles.tallyValue}>{props.value}</Text>
        </View>
    );
}

function CheckoutTotal(props: TallyProps): React.JSX.Element {
    return (
        <View style={styles.checkoutRow}>
            <Text style={styles.totalLabel}>{props.label}</Text>
            <Text style={styles.totalLabel}>{props.value}</Text>
        </View>
    );
}

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
        fontFamily: serifBold,
        color: primaryColor,
        lineHeight: 50,
        fontSize: 40,
    },
    checkoutGroup: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: checkOutBackground,
        paddingHorizontal: 16,
        paddingVertical: 20,
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
        paddingBottom: 200,
    },

});

export default Cart;
