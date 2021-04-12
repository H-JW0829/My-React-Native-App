import React from 'react';
import { useFormikContext } from 'formik';
// import {TextInput} from 'react-native'

import TextInput from './TextInput';
import ErrorMessage from './ErrorMessage';

interface Params {
  [propName: string]: any;
}

function MyFormField({ name, width, ...otherProps }: Params) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        {...otherProps}
      />
      {/* @ts-ignore */}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default MyFormField;
