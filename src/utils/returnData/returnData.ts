import ResponseCodes from '@enums/responseCodes';
import ResponseMessage from '@enums/responseMessages';
import ResponseStatus from '@enums/responseStatus';

class ReturnData<T> {
  public code: ResponseCodes;

  public data: T;

  public message: ResponseMessage | string;

  public status: ResponseStatus;

  constructor(
    code: ResponseCodes,
    data: T,
    message: ResponseMessage | string,
    status: ResponseStatus,
  ) {
    this.code = code;
    this.data = data;
    this.message = message;
    this.status = status;
  }
}

export default ReturnData;
