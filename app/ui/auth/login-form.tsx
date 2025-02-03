import loginService from '@/app/lib/login-service';
import './login-form.scss';
import { login } from '@/app/store/auth/auth-slice';
import {
  LoginFormStatus,
  updateEmail,
  updateError,
  updateMessage,
  updatePassword,
  updateStatus,
  submitForm,
} from '@/app/store/auth/login-form-slice';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import Link from 'next/link';


export default function LoginForm() {
  const dispatch = useAppDispatch();
  const {message, email, password, status} = useAppSelector(state => state.loginForm);
  const handleEmailChange = (event: any) => {
    event.preventDefault();
    dispatch(updateEmail(event.target.value));
  }

  const handlePasswordChange = (event: any) => {
    event.preventDefault();
    dispatch(updatePassword(event.target.value));
  }

  async function handleSubmit(event: any){
    event.preventDefault();
    dispatch(submitForm());

    try {
      const {status, msg, user} = await loginService.login(email, password);
      if(status == 200){
        dispatch(updateStatus(LoginFormStatus.Success));
        dispatch(login(user));
      } else {
        dispatch(updateStatus(LoginFormStatus.Typing));
      }
      dispatch(updateMessage(msg));
    } catch(err: any) {
      dispatch(updateError({
        message: err.msg,
        status: LoginFormStatus.Typing
      }));
    }
  }

  const passwordValid = (pwd: string): boolean  => {
    return pwd.length > 5;
  }
  const emailValid = (email: string): boolean  => {
    const result = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return !!result;
  }

  const formValid = passwordValid(password) && emailValid(email);

  return (
    <div className='login-form'>
      <div className={'wrapper'}>
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
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
            <button>
              <Link href="/register">
                Sign Up
              </Link>
            </button>
          </div>
          <div className="row">
            <label className={'status'}>{status}</label>
          </div>
        </form>
      </div>
    </div>
);
}
