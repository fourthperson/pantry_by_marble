import React, {useEffect, useState} from 'react';
import {
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
import {PantryProduct} from '../../../types/PantryProduct.ts';
import CartItem from '../../../components/CartItem.tsx';

function Cart(): React.JSX.Element {
    const navigation = useNavigation();

    const [cartList, setCartList] = useState<Array<PantryProduct>>([]);

    const count = [1, 2, 3, 4, 5];

//    [
//        {"product": {}, quantity: 5},
//        {"product": {}, quantity: 5},
//    ]

    useEffect(() => {
        fillList();
    }, []);

    function fillList() {
        const product = new PantryProduct();
        product.id = 1;
        product.image = 2;
        product.price = 123;
        product.category = 'Lamb Chops';
        product.name = 'Product 334';

        setCartList([product]);
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
                        cartList.length > 0 &&
                        count.map((_) => {
                            return <CartItem product={cartList[0]} quantity={1}/>;
                        })
                    }
                </View>
                <View style={styles.checkoutGroup}>
                    <CheckoutTally label={'Sub total'} value={'R 289.00'}/>
                    <CheckoutTally label={'Delivery'} value={'R 28.00'}/>
                    <View style={styles.checkoutDivider}/>
                    <CheckoutTotal label={'Total'} value={'R 317.00'}/>
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
});

export default Cart;
