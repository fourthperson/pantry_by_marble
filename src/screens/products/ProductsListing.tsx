import React, {useState} from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Touchable,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {baseStyle, primaryColor, sansRegular, serifBold} from '../../config/theme.ts';
import PantryBackButton from '../../components/PantryBackButton.tsx';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import PantrySpacer from '../../components/PantrySpacer.tsx';
import PantryBar from '../../components/PantryBar.tsx';

function ProductsListing(): React.JSX.Element {
    const navigation = useNavigation();

    const [categories] = useState([
        'All', 'Beef', 'Fish', 'Pork', 'Poultry',
    ]);
    const [selectedCategories, setSelectedCategories] = useState(['All']);

    function toggleCategory(cat: string) {
        if (selectedCategories.includes(cat)) {
            // remove
            const index: number = selectedCategories.indexOf(cat);
            let modded = selectedCategories;
            if (index > -1) {
                modded = selectedCategories.splice(index);
                setSelectedCategories(modded);
            }
            if (modded.length === 0) {
                modded.push('All');
            }
        } else {
            // add
            setSelectedCategories([...selectedCategories, cat]);
        }
    }

    return (
        <View style={baseStyle.bgContainer}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
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
                    </View>
                </ScrollView>
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
    backArrowBar: {},
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
        // todo switch to sansBold when it works
        fontFamily: serifBold,
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
});

export default ProductsListing;
