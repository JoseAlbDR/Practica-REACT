import { isRouteErrorResponse } from 'react-router-dom';
import { IError } from '../interfaces/error.interfaces';

export const getError = (error: unknown): IError => {
  if (isRouteErrorResponse(error)) {
    return {
      msg: error.statusText,
      status: error.status,
    };
  } else if (error instanceof Error) {
    return { msg: error.message };
  } else if (typeof error === 'string') {
    return { msg: error };
  } else {
    console.log(error);
    return { msg: 'Unknown error' };
  }
};
