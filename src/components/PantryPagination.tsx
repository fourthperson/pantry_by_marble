import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, sansRegular} from '../config/theme.ts';

const PantryPagination = (props: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = [];

  for (let i = 0; i < props.totalPages; i++) {
    pages.push(i + 1);
  }

  return (
    <View style={styles.paginationGroup}>
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
  );
};

const styles = StyleSheet.create({
  paginationGroup: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
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
