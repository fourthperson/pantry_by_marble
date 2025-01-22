import React from 'react';
import {Image, View} from 'react-native';

export interface PantryProductProps {
    imageUrl: string;
    name: string;
    price: number;
}

function PantryProductItem(props: PantryPantryProductProps): React.JSX.Element {
    return (
        <View>
            <Image />
        </View>
    );
}

export default PantryProductItem;
