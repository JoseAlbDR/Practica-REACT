import { isRouteErrorResponse } from 'react-router-dom';
import { IError } from '../interfaces/error.interfaces';
import { CustomAxiosError } from '../api/customFetch';

export const getError = (error: unknown): IError => {
  console.log({ error });

  if (isRouteErrorResponse(error)) {
    return {
      message: error.statusText,
      status: error.status,
    };
  }

  if (error instanceof CustomAxiosError) {
    if (error.status === 404)
      return {
        message: 'Advert not found!',
        status: error.status,
      };
    return { message: error.message, status: error.status };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  if (typeof error === 'string') {
    return { message: error };
  }

  return { message: 'Unknown error' };
};
