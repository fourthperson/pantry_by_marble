import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, sansRegular} from '../config/theme.ts';
import ChevLeftSvg from '../../assets/images/chevron-left-double.svg';
import ChevRightSvg from '../../assets/images/chevron-right-double.svg';

const PantryPagination = (props: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  minPagesToShowSkipButtons?: number;
}) => {
  const [pages, setPages] = useState<Array<number>>([]);

  const showSkipButtons: boolean =
    props.totalPages >= (props.minPagesToShowSkipButtons || 3);

  useEffect(() => {
    let array: Array<number> = [];
    for (let i = 1; i <= props.totalPages; i++) {
      array.push(i);
    }
    setPages([...array]);
  }, [props.totalPages]);

  return (
    <View style={styles.paginationGroup}>
      <View style={styles.row}>
        {showSkipButtons && (
          <View>
            {props.currentPage === 1 ? (
              <View style={styles.pageInactive} />
            ) : (
              <TouchableOpacity onPress={() => props.onPageChange(1)}>
                <ChevLeftSvg height={24} width={24} color={primaryColor} />
              </TouchableOpacity>
            )}
          </View>
        )}
        <View style={styles.fill}>
          <FlatList
            data={pages}
            horizontal={true}
            contentContainerStyle={styles.paginationContent}
            renderItem={({item}) => {
              const active = props.currentPage === item;
              return (
                <TouchableOpacity
                  onPress={() => props.onPageChange(item)}
                  style={active ? styles.pageActive : styles.pageInactive}>
                  <Text
                    style={
                      active ? styles.pageTextActive : styles.pageTextInactive
                    }>
                    {item.toString()}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {showSkipButtons && (
          <View>
            {props.currentPage === props.totalPages ? (
              <View style={styles.pageInactive} />
            ) : (
              <TouchableOpacity
                onPress={() => props.onPageChange(props.totalPages)}>
                <ChevRightSvg height={24} width={24} color={primaryColor} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationGroup: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
  },
  fill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageActive: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primaryColor,
    marginEnd: 4,
  },
  pageInactive: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginEnd: 4,
  },
  pageTextActive: {
    color: 'white',
    fontFamily: sansRegular,
    fontSize: 14,
  },
  pageTextInactive: {
    color: primaryColor,
    fontFamily: sansRegular,
    fontSize: 14,
  },
});

export default PantryPagination;
