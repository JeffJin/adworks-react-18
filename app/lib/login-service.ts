import { IUser } from '@/app/lib/dtos';
import { SERVER_API } from '@/app/lib/settings';


function logout(): Promise<{status: number, msg: string}> {
  const headers = {'Content-Type': 'application/json'};

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({status: 200, msg: 'Logout Success!'});
    }, 1500);
  });
  // return fetch(`${SERVER_API}/account/logout`, {
  //   method: 'post',
  //   headers
  // }).then((response) => {
  //   if (response.ok) {
  //     return response.json();
  //   }
  //   throw Error(response.statusText);
  // }).then(result => {
  //   return result;
  // });
}
function login(email: string, password: string): Promise<{status: number, msg: string, user: IUser}> {
  const headers = {'Content-Type': 'application/json'};
  const dto = {
    'Email': email,
    'Password': password
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(email == 'jeff@jeffjin.com') {
        resolve({
          status: 200,
          msg: 'Login Successful!',
          user: {
            email: email,
            phoneNumber: '647-409-8889',
            userName: 'Jeff Jin',
            token: 'dhg23798g74fbdwial'
          }
        });
      } else {
        reject({status: 400, msg: 'Login Failure!'});
      }
    }, 1500);
  });
  // return fetch(`${SERVER_API}/account/login`, {
  //   method: 'post',
  //   body: JSON.stringify(dto),
  //   headers
  // }).then((response) => {
  //   if (response.ok) {
  //     return response.json();
  //   }
  //   throw Error(response.statusText);
  // }).then(result => {
  //   return result;
  // });
}
export default {
  login,
  logout,
};
