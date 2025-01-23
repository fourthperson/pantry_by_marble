import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, sansBold, sansRegular, serifBold, serifItalic} from '../config/theme.ts';
import PantrySpacer from './PantrySpacer.tsx';
import Icon from 'react-native-vector-icons/Feather';
import {formatPrice, imageMapper} from '../util/util.ts';
import {CartItem} from '../types/types.ts';
import {useDispatch} from 'react-redux';
import {increaseQuantity, removeFromCart, subtractQuantity} from '../store/cart_slice';

function CartListItem(item: CartItem): React.JSX.Element {
    const dispatch = useDispatch();

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
            <Image
                style={styles.image}
                source={imageMapper(item.product.image)}/>
            <PantrySpacer horizontal={true} space={20}/>
            <View style={styles.detailGroup}>
                <Text
                    numberOfLines={2}
                    style={styles.nameStyle}>
                    {
                        item.product.name.toUpperCase()
                    }
                </Text>
                <Text
                    numberOfLines={1}
                    style={styles.priceStyle}>
                    {
                        formatPrice(item.product.price)
                    }
                </Text>
                <View style={styles.actionGroup}>
                    <RemoveButton onTap={remove}/>
                    <PantrySpacer horizontal={true} space={20}/>
                    <QuantityButton positive={false} onTap={sub}/>
                    <PantrySpacer horizontal={true} space={10}/>
                    <Text style={styles.quantityText}>
                        {count.toString()}
                    </Text>
                    <PantrySpacer horizontal={true} space={10}/>
                    <QuantityButton positive={true} onTap={add}/>
                </View>
            </View>
        </View>
    );
}


interface QuantityButtonProps {
    onTap: () => void;
    positive: boolean;
}

function QuantityButton(props: QuantityButtonProps): React.JSX.Element {
    return (
        <TouchableOpacity onPress={props.onTap}>
            <View style={styles.seekButton}>
                <Icon
                    name={props.positive ? 'plus' : 'minus'}
                    color={primaryColor}
                    size={15}/>
            </View>
        </TouchableOpacity>
    );
}

interface RemoveButtonProps {
    onTap: () => void;
}

function RemoveButton(props: RemoveButtonProps): React.JSX.Element {
    return (
        <TouchableOpacity onPress={props.onTap}>
            <View style={styles.removeButton}>
                <Text style={styles.buttonLabel}>Remove</Text>
            </View>
        </TouchableOpacity>
    );
}

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
    seekButton: {
        borderColor: primaryColor,
        borderWidth: 1.5,
        borderRadius: 15,
        paddingHorizontal: 5,
        height: 30,
        width: 30,
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        fontFamily: sansRegular,
        fontSize: 14,
        padding: 5,
        color: primaryColor,
    },
    quantityText: {
        // todo geomnast
        fontFamily: sansBold,
        color: primaryColor,
        fontSize: 18,
    },
});

export default CartListItem;
