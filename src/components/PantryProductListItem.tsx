import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PantrySpacer from './PantrySpacer.tsx';
import {
    baseStyle,
    primaryColor,
    sansBold,
    sansRegular,
} from '../config/theme.ts';
import Icon from 'react-native-vector-icons/Feather';
import {
    formatPrice,
    imageMapper,
} from '../util/util.ts';
import {PantryProduct} from '../types/types.ts';

interface PantryProductProps {
    product: PantryProduct
    onCartPress: () => void
}

function PantryProductListItem(props: PantryProductProps): React.JSX.Element {

    return (
        <View>
            <Image
                style={styles.image}
                source={imageMapper(props.product.image)}
            />
            <PantrySpacer horizontal={false} space={20}/>
            <Text style={styles.nameText}>{props.product.name}</Text>
            <PantrySpacer horizontal={false} space={10}/>
            <View style={styles.priceCartRow}>
                <View style={baseStyle.fillSpace}>
                    <Text style={styles.priceText}>{formatPrice(props.product.price)}</Text>
                </View>
                <TouchableOpacity onPress={(_) => props.onCartPress()}>
                    < View style={styles.circularBorder}>
                        <Icon name={'shopping-cart'} size={16} color={primaryColor}/>
                    </View>
                </TouchableOpacity>
            </View>
            <PantrySpacer horizontal={false} space={20}/>
        </View>
    );
}

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
