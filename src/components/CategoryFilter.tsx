import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {productCategories} from '../config/constants.ts';
import ToggleAbleTile from './ToggleAbleTile.tsx';

const CategoryFilter = (props: {
  categories: Array<string>;
  initiallySelected?: Array<string>;
  onChange: (selected: Array<string>) => void;
}) => {
  const [selected, setSelected] = useState<Array<string>>(
    props.initiallySelected || [],
  );

  useEffect(() => {
    props.onChange(selected);
  }, [props, selected]);

  function toggleCategory(cat: string) {
    let array = [...selected];
    if (cat === props.categories[0]) {
      array = [props.categories[0]];
    } else {
      // remove the 'all' category
      const allIndex = array.indexOf(props.categories[0]);
      if (allIndex > -1) {
        array.splice(allIndex, 1);
      }
      // toggle category
      const catIndex = array.indexOf(cat);
      catIndex > -1 ? array.splice(catIndex, 1) : array.push(cat);
      if (array.length === 0) {
        array = [props.categories[0]];
      }
    }
    setSelected([...array]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productCategories}
        horizontal={true}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <ToggleAbleTile
              title={item}
              selected={selected.includes(item)}
              onTap={s => toggleCategory(s)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
});

export default CategoryFilter;
