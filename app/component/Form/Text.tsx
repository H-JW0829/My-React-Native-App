import React, { ReactNode } from 'react';
import { Text } from 'react-native';

import defaultStyles from '../../config/styles';

interface Params {
  children: ReactNode;
  style?: object;
  [propName: string]: any;
}

function MyText({ children, style, ...otherProps }: Params) {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default MyText;
