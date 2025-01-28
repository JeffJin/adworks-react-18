export function loginImmerReducer(draft: any, action: any) {
  switch (action.type) {
    case 'updateStatus': {
      draft.status = action.status;
      break;
    }
    case 'updateError': {
      draft.status = action.status;
      draft.message = action.message;
      break;
    }
    case 'updateEmail': {
      draft.email = action.email;
      break;
    }
    case 'updatePassword': {
      draft.password = action.password;
      break;
    }
    case 'updateMessage': {
      draft.message = action.message;
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
