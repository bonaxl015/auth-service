import ResponseCodes from '@enums/responseCodes';
import ResponseMessage from '@enums/responseMessages';
import ResponseStatus from '@enums/responseStatus';
import ReturnData from './returnData';
import { ReturnFail, ReturnSuccess } from './types';

export const returnSuccess: ReturnSuccess = (
  data,
  code: ResponseCodes = ResponseCodes.REQUEST_OK,
  successMessage: ResponseMessage | string = ResponseMessage.SUCCESS,
) => new ReturnData(code, data, successMessage, ResponseStatus.SUCCESS);

export const returnFail: ReturnFail = <T>(
  data: T,
  code: ResponseCodes = ResponseCodes.REQUEST_FAIL,
  errorMessage: ResponseMessage | string = ResponseMessage.FAIL,
): ReturnData<T> =>
  new ReturnData(code, data, errorMessage, ResponseStatus.FAIL);
