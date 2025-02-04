import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  baseStyle,
  primaryColor,
  sansRegular,
  serifBold,
} from '../../../config/theme.ts';
import {useNavigation} from '@react-navigation/native';
import PantryBackButton from '../../../components/PantryBackButton.tsx';
import PantrySpacer from '../../../components/PantrySpacer.tsx';
import PantryBar from '../../../components/PantryBar.tsx';
import PantryProductListItem from '../../../components/PantryProductListItem.tsx';
import FilterSvg from '../../../../assets/images/filter.svg';
import {CartItem, PantryProduct} from '../../../types/types.ts';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/store.ts';
import {addToCart} from '../../../store/cart_slice';
import {alertMsg} from '../../../util/util.ts';
import {productCategories} from '../../../config/constants.ts';
import {useTranslation} from 'react-i18next';
import {filterProducts, loadProducts} from '../../../store/product_slice';
import {ColumnItem} from '../../../components/ColumnItem.tsx';
import {FlashList} from '@shopify/flash-list';
import CategoryFilter from '../../../components/CategoryFilter.tsx';

const Products = (props: {productCount: number}): React.JSX.Element => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {t} = useTranslation();

  const categoryAll = productCategories[0];

  const products: Array<PantryProduct> = useSelector(
    state => state.products.filteredItems,
  );
  const isLoading: boolean = useSelector(state => state.products.loading);

  const [productList, setProductList] = useState<Array<PantryProduct>>([]);
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>([
    categoryAll,
  ]);

  useEffect(() => {
    dispatch(loadProducts(props.productCount));
  }, [dispatch, props.productCount]);

  useEffect(() => {
    if (!Array.isArray(products)) {
      return;
    }
    setProductList(products);
  }, [products]);

  useEffect(() => {
    dispatch(filterProducts(selectedCategories));
  }, [dispatch, selectedCategories]);

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
            <PantryBackButton label={t('back')} onPress={navigation.goBack} />
            <View style={styles.filterGroup}>
              <Text style={styles.filterText}>{t('filter')}</Text>
              <PantrySpacer horizontal={true} space={10} />
              <FilterSvg color={primaryColor} height={20} width={20} />
            </View>
          </View>
          <PantrySpacer horizontal={false} space={30} />
          <Text style={styles.titleText}>{t('title_meat')}</Text>
          <PantrySpacer horizontal={false} space={10} />
          <PantryBar />
          <PantrySpacer horizontal={false} space={20} />
        </View>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={primaryColor} />
          </View>
        ) : (
          <View>
            <CategoryFilter
              categories={productCategories}
              initiallySelected={[categoryAll]}
              onChange={setSelectedCategories}
            />
            <PantrySpacer horizontal={false} space={20} />
            <Text style={styles.selectionText}>
              {productList.length}
              {t('based_on_your_selection')}
            </Text>
            <Text style={styles.productsTitle}>{t('title_our_products')}</Text>
            <PantrySpacer horizontal={false} space={20} />
            <View style={styles.gridContainer}>
              <FlashList
                data={productList}
                estimatedItemSize={245}
                numColumns={2}
                renderItem={({index, item}) => {
                  return (
                    <ColumnItem index={index} numColumns={2}>
                      <PantryProductListItem
                        product={item}
                        onCartPress={() => dispatchAddToCart(item)}
                      />
                    </ColumnItem>
                  );
                }}
                contentContainerStyle={styles.flatListBottom}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

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
  selectionText: {
    fontSize: 12,
    fontFamily: sansRegular,
    color: primaryColor,
    marginStart: 16,
    marginEnd: 16,
  },
  productsTitle: {
    fontSize: 30,
    color: primaryColor,
    fontFamily: serifBold,
    lineHeight: 40,
    marginStart: 16,
    marginEnd: 16,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  flatListBottom: {},
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 375 : 425,
  },
  categoriesGroup: {
    backgroundColor: 'transparent',
  },
});

export default Products;
