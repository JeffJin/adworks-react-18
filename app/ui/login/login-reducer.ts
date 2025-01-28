export function loginReducer(payload: any, action: any) {
  switch (action.type) {
    case 'updateStatus': {
      return {...payload, status: action.status};
    }
    case 'updateError': {
      return {
        ...payload,
        status: action.status,
        message: action.message
      };
    }
    case 'updateEmail': {
      return {...payload, email: action.email};
    }
    case 'updatePassword': {
      return {...payload, password: action.password};
    }
    case 'updateMessage': {
      return {...payload, message: action.message};
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
