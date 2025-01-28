import { SERVER_API } from '@/app/lib/settings';


export function login(email: string, password: string): Promise<{status: number, msg: string}> {
  const headers = {'Content-Type': 'application/json'};
  const dto = {
    'Email': email,
    'Password': password
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(email == 'jeff@jeffjin.com') {
        resolve({status: 200, msg: 'Login Successful!'});
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
