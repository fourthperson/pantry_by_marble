import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
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
import {PantryProduct} from '../../../types/types.ts';
import {useAppSelector} from '../../../store/store.ts';
import {useAppDispatch} from '../../../store/store.ts';
import {productCategories} from '../../../config/constants.ts';
import {useTranslation} from 'react-i18next';
import {filterProducts, loadProducts} from '../../../store/product_slice.ts';
import {ColumnItem} from '../../../components/ColumnItem.tsx';
import {FlashList} from '@shopify/flash-list';
import CategoryFilter from '../../../components/CategoryFilter.tsx';
import PantryPagination from '../../../components/PantryPagination.tsx';

const Products = (props: {
  productCount: number;
  productsPerPage: number;
}): React.JSX.Element => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {t} = useTranslation();

  const categoryAll = productCategories[0];

  const products: Array<PantryProduct> = useAppSelector(
    state => state.products.filteredItems,
  );
  const isLoading: boolean = useAppSelector(state => state.products.loading);

  const [selectedCategories, setSelectedCategories] = useState<Array<string>>([
    categoryAll,
  ]);

  const totalPages = Math.ceil(products.length / props.productsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [productList, setProductList] = useState<Array<PantryProduct>>([]);

  const flatListRef = useRef<FlatList<PantryProduct>>();

  useEffect(() => {
    dispatch(loadProducts(props.productCount));
  }, [dispatch, props.productCount]);

  useEffect(() => {
    dispatch(filterProducts(selectedCategories));
    setCurrentPage(1);
  }, [dispatch, selectedCategories]);

  useEffect(() => {
    const startIndex: number =
      currentPage === 1 ? 0 : (currentPage - 1) * props.productsPerPage;
    const endIndex: number =
      currentPage === totalPages
        ? products.length
        : startIndex + props.productsPerPage;
    setProductList([...products.slice(startIndex, endIndex)]);
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  }, [currentPage, products, props.productsPerPage, totalPages]);

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
          <PantrySpacer horizontal={false} space={10} />
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
              {products.length}
              {t('based_on_your_selection')}
            </Text>
            <Text style={styles.productsTitle}>{t('title_our_products')}</Text>
            {
              <PantryPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            }
            <PantrySpacer horizontal={false} space={20} />
            <View style={styles.gridContainer}>
              {productList.length > 0 && (
                <FlashList
                  ref={flatListRef}
                  data={productList}
                  estimatedItemSize={245}
                  numColumns={2}
                  renderItem={({index, item}) => {
                    return (
                      <ColumnItem index={index} numColumns={2}>
                        <PantryProductListItem product={item} />
                      </ColumnItem>
                    );
                  }}
                />
              )}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 425 : 475,
  },
});

export default Products;
