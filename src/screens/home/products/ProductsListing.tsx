import React, {useEffect, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
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
import PantryBackButton from '../../../components/PantryBackButton.tsx';
import PantrySpacer from '../../../components/PantrySpacer.tsx';
import PantryBar from '../../../components/PantryBar.tsx';
import PantryProductListItem from '../../../components/PantryProductListItem.tsx';
import {
    CartItem,
    PantryProduct,
} from '../../../types/types.ts';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../../store/cart_slice';
import {alertMsg, getRandomInt} from '../../../util/util.ts';
import {
    numberOfProducts,
    productCategories,
    productImages,
} from '../../../config/constants.ts';

function ProductsListing(): React.JSX.Element {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const categoryAll = productCategories[0];

    const [productList, setProductList] = useState<Array<PantryProduct>>([]);
    const [filteredProducts, setFilteredProducts] = useState<Array<PantryProduct>>([]);

    const [selectedCategories, setSelectedCategories] = useState([categoryAll]);

    useEffect(() => {
        populateProducts();
    }, []);

    useEffect(() => {
        filterProductsByCategory();
    }, [selectedCategories, productList]);

    function populateProducts() {
        let products: Array<PantryProduct> = [];
        for (let i = 0; i < numberOfProducts; i++) {
            const catIndex: number = getRandomInt(1, productCategories.length - 1);
            const imageIndex: number = getRandomInt(0, productImages.length - 1);
            const category: string = productCategories[catIndex];

            products[i] = {
                id: i + 1,
                name: `Product ${i + 1}`,
                category: category,
                image: imageIndex,
                price: getRandomInt(15, 100),
            };
        }
        setProductList(products);
    }

    function toggleCategory(cat: string) {
        let array = [...selectedCategories];
        if (cat !== categoryAll) {
            // remove the 'All' category
            const allIndex = array.indexOf(categoryAll);
            if (allIndex > -1) {
                array.splice(allIndex, 1);
            }
            if (array.includes(cat)) {
                // remove category
                const index = array.indexOf(cat);
                if (index > -1) {
                    // exists, remove
                    array.splice(index, 1);
                }
            } else {
                // add
                array.push(cat);
            }
            if (array.length === 0) {
                array = [categoryAll];
            }
        } else {
            array = [categoryAll];
        }
        setSelectedCategories([...array]);
    }

    function filterProductsByCategory() {
        if (selectedCategories.length === 1 && selectedCategories[0] === categoryAll) {
            // clear filters
            setFilteredProducts([...productList]);
        } else {
            // filter
            let matches: Array<PantryProduct> = [];
            for (let i = 0; i < selectedCategories.length; i++) {
                for (let j = 0; j < productList.length; j++) {
                    if (productList[j].category === selectedCategories[i]) {
                        // match
                        matches.push(productList[j]);
                    }
                }
            }
            setFilteredProducts(matches);
        }
    }

    function dispatchAddToCart(product: PantryProduct) {
        const cartItem: CartItem = {
            quantity: 1,
            product: product,
        };
        dispatch(addToCart(cartItem));
        alertMsg(`${product.name} Added to cart!`, 'success');
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
                        data={productCategories}
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
                    <Text style={styles.selectionText}>{filteredProducts.length} Based on your selection</Text>
                    <Text style={styles.productsTitle}>Our products</Text>
                    <PantrySpacer horizontal={false} space={20}/>
                    <FlatList
                        data={filteredProducts}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        renderItem={({item}) => {
                            return (
                                <PantryProductListItem
                                    product={item}
                                    onCartPress={() => dispatchAddToCart(item)}
                                />
                            );
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
        <TouchableOpacity onPress={() => {
            props.onTap(props.title);
        }}>
            <Text style={props.selected ? styles.filterTextActive : styles.filterTextInactive}>{props.title}</Text>
        </TouchableOpacity>
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
        paddingEnd: 15,
        paddingStart: 15,
    },
    filterTextInactive: {
        fontFamily: sansRegular,
        color: primaryColor,
        fontSize: 14,
        paddingEnd: 15,
        paddingStart: 15,
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
    flatlistBottom: {
        paddingBottom: 220,
    },
});

export default ProductsListing;
