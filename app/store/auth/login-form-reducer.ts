// export function loginFormReducer(draft: any, action: any) {
//   switch (action.type) {
//     case 'updateStatus': {
//       draft.status = action.status;
//       break;
//     }
//     case 'updateError': {
//       draft.status = action.status;
//       draft.message = action.message;
//       break;
//     }
//     case 'updateEmail': {
//       draft.email = action.email;
//       break;
//     }
//     case 'updatePassword': {
//       draft.password = action.password;
//       break;
//     }
//     case 'updateMessage': {
//       draft.message = action.message;
//       break;
//     }
//     default: {
//       throw Error('Unknown action: ' + action.type);
//     }
//   }
// }


// export function loginReducer(payload: any, action: any) {
//   switch (action.type) {
//     case 'updateStatus': {
//       return {...payload, status: action.status};
//     }
//     case 'updateError': {
//       return {
//         ...payload,
//         status: action.status,
//         message: action.message
//       };
//     }
//     case 'updateEmail': {
//       return {...payload, email: action.email};
//     }
//     case 'updatePassword': {
//       return {...payload, password: action.password};
//     }
//     case 'updateMessage': {
//       return {...payload, message: action.message};
//     }
//     default: {
//       throw Error('Unknown action: ' + action.type);
//     }
//   }
// }
