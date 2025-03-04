import React from 'react';
import {View} from 'react-native';

interface PantrySpacerProps {
  space: number;
  horizontal: boolean;
}

const PantrySpacer = (props: PantrySpacerProps): React.JSX.Element => {
  return (
    <View
      style={props.horizontal ? {width: props.space} : {height: props.space}}
    />
  );
};

export default PantrySpacer;
