import React, {useEffect, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
    baseStyle,
    primaryColor,
    sansBold,
    sansRegular,
    serifBold,
} from '../../../config/theme.ts';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {PantryProduct} from '../../../types/PantryProduct.ts';
import PantryBackButton from '../../../components/PantryBackButton.tsx';
import PantrySpacer from '../../../components/PantrySpacer.tsx';
import PantryBar from '../../../components/PantryBar.tsx';
import PantryProductItem from '../../../components/PantryProductItem.tsx';

function ProductsListing(): React.JSX.Element {
    const navigation = useNavigation();

    const numberOfProducts: number = 50;

    const categories: Array<string> = [
        'All', 'Beef', 'Fish', 'Pork', 'Poultry',
    ];
    const images: Array<number> = [1, 2, 3, 4];

    const [productList, setProductList] = useState<Array<PantryProduct>>([]);

    const [selectedCategories, setSelectedCategories] = useState(['All']);

    useEffect(() => {
        fillProducts();
    }, []);

    function toggleCategory(cat: string) {
        let modded: Array<string> = selectedCategories;
        if (modded.includes(cat)) {
            // remove
            const index: number = modded.indexOf(cat);
            if (index > -1) {
                modded = modded.splice(index);
            }
        } else {
            if (cat === categories[0]) {
                // all category selected
                // remove all others
                modded = [];
                // add all
                modded.push(categories[0]);
            } else {
                // add new category
                modded.push(cat);
            }
        }
        if (modded.length === 0) {
            modded.push('All');
        }
        if (modded.length > 1 && modded.includes(categories[0])) {
            // remove all if length > 1 and includes all
            modded.splice(selectedCategories.indexOf(categories[0]));
        }
        setSelectedCategories(modded);
    }

    function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function fillProducts() {
        let products: Array<PantryProduct> = [];
        for (let i = 0; i < numberOfProducts; i++) {
            const catIndex: number = getRandomInt(1, categories.length - 1);
            const imageIndex: number = getRandomInt(0, images.length - 1);
            const category: string = categories[catIndex];

            const product: PantryProduct = new PantryProduct();
            product.id = i + 1;
            product.name = `Product ${i + 1}`;
            product.category = category;
            product.image = imageIndex;
            product.price = getRandomInt(15, 100);

            products[i] = product;
        }
        setProductList(products);
    }

    return (
        <View style={baseStyle.bgContainer}>
            <SafeAreaView style={styles.container}>
                <View style={styles.topGroup}>
                    <View style={styles.navRow}>
                        <PantryBackButton label={'Back'} onPress={navigation.goBack}/>
                        <View style={styles.filterGroup}>
                            <Text style={styles.filterText}>Filter</Text>
                            <PantrySpacer horizontal={true} space={10}/>
                            <Icon name={'sliders'} color={primaryColor} size={20}/>
                        </View>
                    </View>
                    <PantrySpacer horizontal={false} space={30}/>
                    <Text style={styles.titleText}>Meat</Text>
                    <PantrySpacer horizontal={false} space={10}/>
                    <PantryBar/>
                    <PantrySpacer horizontal={false} space={20}/>
                    <FlatList
                        data={categories}
                        horizontal={true}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({item}) => {
                            return (
                                <FilterTile
                                    title={item}
                                    selected={selectedCategories.includes(item)}
                                    onTap={(s) => toggleCategory(s)}/>
                            );
                        }}
                    />
                    <PantrySpacer horizontal={false} space={20}/>
                    <Text style={styles.selectionText}>Based on your selection</Text>
                    <Text style={styles.productsTitle}>Our products</Text>
                    <PantrySpacer horizontal={false} space={20}/>
                    <FlatList
                        data={productList}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        renderItem={({item}) => {
                            return (<PantryProductItem product={item}/>);
                        }}
                        contentContainerStyle={styles.flatlistBottom}/>
                </View>
            </SafeAreaView>
        </View>
    );
}

interface FilterTileProps {
    title: string;
    selected: boolean;
    onTap: (title: string) => void;
}

function FilterTile(props: FilterTileProps): React.JSX.Element {
    return (
        <TouchableWithoutFeedback onPress={() => {
            props.onTap(props.title);
        }}>
            <Text style={props.selected ? styles.filterTextActive : styles.filterTextInactive}>{props.title}</Text>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topGroup: {
        margin: 16,
    },
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterText: {
        fontFamily: sansRegular,
        fontSize: 14,
        color: primaryColor,
    },
    titleText: {
        fontFamily: serifBold,
        color: primaryColor,
        lineHeight: 50,
        fontSize: 40,
    },
    filterTextActive: {
        fontFamily: sansBold,
        color: primaryColor,
        fontSize: 14,
        paddingEnd: 10,
        paddingStart: 10,
    },
    filterTextInactive: {
        fontFamily: sansRegular,
        color: primaryColor,
        fontSize: 14,
        paddingEnd: 10,
        paddingStart: 10,
    },
    selectionText: {
        fontSize: 12,
        fontFamily: sansRegular,
        color: primaryColor,
    },
    productsTitle: {
        fontSize: 30,
        color: primaryColor,
        fontFamily: serifBold,
        lineHeight: 40,
    },
    row: {
        flex: 1,
        justifyContent: 'space-around',
    },
    flatlistBottom: {paddingBottom: 240},
});

export default ProductsListing;
