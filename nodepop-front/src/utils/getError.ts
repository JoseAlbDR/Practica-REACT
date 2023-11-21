import { isRouteErrorResponse } from 'react-router-dom';
import { IError } from '../interfaces/error.interfaces';
import { CustomAxiosError } from '../api/customFetch';

export const getError = (error: unknown): IError => {
  console.log(error);
  if (isRouteErrorResponse(error)) {
    return {
      message: error.statusText,
      status: error.status,
    };
  } else if (error instanceof CustomAxiosError) {
    return {
      message: 'Advert not found!',
      status: error.status,
    };
  } else if (error instanceof Error) {
    return { message: error.message };
  } else if (typeof error === 'string') {
    return { message: error };
  } else {
    return { message: 'Unknown error' };
  }
};
