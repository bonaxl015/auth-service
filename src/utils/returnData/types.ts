import ResponseCodes from '@enums/responseCodes';
import ReturnData from './returnData';
import ResponseMessage from '@enums/responseMessages';

export type ReturnSuccess = <T>(
  data: T,
  code: ResponseCodes,
  successMessage: ResponseMessage | string,
) => ReturnData<T>;

export type ReturnFail = <T = null>(
  data: T,
  code: ResponseCodes,
  errorMessage: ResponseMessage | string,
) => ReturnData<T>;
