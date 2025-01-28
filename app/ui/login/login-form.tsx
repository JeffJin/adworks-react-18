import { login } from '@/app/lib/login-service';
import { loginImmerReducer } from '@/app/ui/login/login-immer-reducer';
import { loginReducer } from '@/app/ui/login/login-reducer';
import { useReducer } from 'react';
import './login-form.scss';
import { useImmerReducer } from 'use-immer';

const initialForm = {
  status: 'typing',
  message: '',
  password: '',
  email: '',
};

export default function LoginForm() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [message, setMessage] = useState('');
  // const [loginStatus, setLoginStatus] = useState('typing');
  // const [form, dispatch] = useReducer(loginReducer, initialForm);

  const [form, dispatch] = useImmerReducer(loginImmerReducer, initialForm);
  const {message, email, password, status} = form;
  const handleEmailChange = (event: any) => {
    event.preventDefault();
    dispatch({
      type: 'updateEmail',
      email: event.target.value,
    })
    // setLoginStatus('typing');
    // setMessage('');
    // setEmail(event.target.value);
  }

  const handlePasswordChange = (event: any) => {
    event.preventDefault();
    dispatch({
      type: 'updatePassword',
      password: event.target.value,
    })
  }

  async function handleSubmit(event: any){
    event.preventDefault();
    dispatch({
      type: 'updateStatus',
      status: 'submitting',
    });
    // setLoginStatus('submitting');
    try {
      const {status, msg} = await login(email, password);
      if(status == 200){
        dispatch({
          type: 'updateStatus',
          status: 'success',
        });
        // setLoginStatus('success');
      } else {
        dispatch({
          type: 'updateStatus',
          status: 'typing',
        });
        // setLoginStatus('typing');
      }
      dispatch({
        type: 'updateMessage',
        message: msg,
      });
      // setMessage(msg);
    } catch(err: any) {
      dispatch({
        type: 'updateError',
        message: err.msg,
        status: 'typing'
      });
      // setMessage(err.msg);
      // setLoginStatus('typing');
    }
  }

  const handleSignupClick = (event: any) => {
    // showRegisterForm();
    event.preventDefault();
  }

  const passwordValid = (pwd: string): boolean  => {
    return pwd.length > 5;
  }
  const emailValid = (email: string): boolean  => {
    return email.indexOf('@') >= 1;
  }

  const formValid = passwordValid(password) && emailValid(email);

  return (
    <div className='login-form'>
      <div className={'wrapper'}>
        <form onSubmit={handleSubmit}>
          <h3>Sign In ({status})</h3>
          {message &&
            <p className={status == 'success' ? 'success' : 'error'}>{message}</p>
          }
          <div className={"row"}>
            <label htmlFor={"email"}>Email:</label>
            <input autoComplete="off" type={"text"} id={"email"} name={"email"} value={email}
                   onChange={handleEmailChange}/>
          </div>
          <div className={"row"}>
            <label htmlFor={"pwd"}>Password:</label>
            <input type={"password"} id={"pwd"} name={"pwd"} value={password} onChange={handlePasswordChange}/>
          </div>
          <div className={"row"}>
            <button type="submit" disabled={!formValid || status == 'submitting'}>Login</button>
          </div>
          <div className={"row"}>
            <button type="button" onClick={handleSignupClick}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
