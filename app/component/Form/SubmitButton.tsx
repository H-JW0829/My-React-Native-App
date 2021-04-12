import React from 'react';
import { useFormikContext } from 'formik';

import Button from '../Button';

interface Params {
  title: string;
  otherStyle?: Object;
}

function SubmitButton({ title, otherStyle = {} }: Params) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button title={title} onPress={handleSubmit} otherStyle={otherStyle} />
  );
}

export default SubmitButton;
