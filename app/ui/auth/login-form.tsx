import './login-form.scss';
import {
  LoginFormStatus,
  submitForm,
  updateEmail,
  updateError,
  updateMessage,
  updatePassword,
  updateStatus,
} from '@/app/store/auth/login-form-slice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { submitLoginFormAction } from '@/app/ui/auth/auth-thunks';
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

  function handleSubmit(event: any){
    event.preventDefault();
    dispatch(submitLoginFormAction(email, password));
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

  const handleFocus = () => {
    dispatch(updateStatus(LoginFormStatus.Typing));
  };
  const handleBlur = () => {
    dispatch(updateStatus(LoginFormStatus.None));
  };

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
                   onChange={handleEmailChange} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
          <div className={"row"}>
            <label htmlFor={"pwd"}>Password:</label>
            <input type={"password"} id={"pwd"} name={"pwd"} value={password}
                   onChange={handlePasswordChange}  onFocus={handleFocus} onBlur={handleBlur} />
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
