import { InputStatus } from 'antd/es/_util/statusUtils';
import { FormikProps } from 'formik';

function handleCheckFormikErrors<T>(formik: FormikProps<T>, key: keyof T): boolean {
  return !!(formik.errors?.[key] && formik.touched?.[key]);
}

export function handleCheckErrorStatus<T>(formik: FormikProps<T>, key: keyof T): InputStatus {
  return handleCheckFormikErrors<T>(formik, key) ? 'error' : '';
}

export function handleDisplayErrorMsg<T>(formik: FormikProps<T>, key: keyof T): JSX.Element {
  return handleCheckFormikErrors<T>(formik, key) ? <span className='form-error-message'>{formik.errors?.[key] as string}</span> : <></>;
}

export function handleDisableSubmitButton<T, I>(values: T, data: I): boolean {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.entries(values).every(([key, value]) => value === data[key]);
}
