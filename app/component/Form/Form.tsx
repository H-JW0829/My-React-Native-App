import React, { ReactNode } from 'react';
import { Formik } from 'formik';

interface Params {
  initialValues: Object;
  onSubmit: ((values: Object, formikHelpers: Object) => void | Promise<any>) &
    Function;
  validationSchema: Object;
  children: Element;
}

function MyForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: Params) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default MyForm;
