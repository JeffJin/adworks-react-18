'user client'
import { selectCurrentUser } from '@/app/store/features/auth/auth-slice';
import { chatActions } from '@/app/store/features/chat/chat-slice';
import { useAppSelector, useAppStore } from '@/app/store/hooks/global';
import { useRef } from 'react';

export default function Chat({ contact, onTextChange }: {contact: any, onTextChange: any}) {
  const store = useAppStore();
  const user = useAppSelector(selectCurrentUser);
  const initialized = useRef(false)
  if (!initialized.current) {
    if(user == null) {
      //TODO fetch user
    }
    store.dispatch(chatActions.initializeChat(user!))
    initialized.current = true
  }

  const text = contact.message;
  const sendMessage =(msg: string) => {
    if(msg){
      alert(msg);
    }
  };
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => onTextChange(e.target.value, contact.email)}
      />
      <br />
      <button disabled={text.length < 3} onClick={() => sendMessage(text)}>Send to {contact.email}</button>
    </section>
  );
}
