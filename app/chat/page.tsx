'use client';

import ContactList from '@/app/chat/chat-list';
import ChatRoom from '@/app/chat/chat-room';
import { fetchCustomers } from '@/app/lib/data';
import { useCallback, useEffect, useState } from 'react';
import Chat from './chat';


export default function Page() {
  const [users, setUsers] = useState([] as User[]);

  const fetchUsers = useCallback(async () => {
    const customers = await fetchCustomers(6);
    const newUsers: User[] = (customers.map(c => {
      return {
        id: c.id,
        email: c.email,
        name: c.name,
        message: '',
        isSelected: false,
      };
    }));
    newUsers[0].isSelected = true;
    setUsers(newUsers);
  }, []);
  //
  // useEffect(() => {
  //   fetchUsers().catch(console.error);
  // },[fetchUsers]);
  let count = 6;
  useEffect(() => {
    let isCustomerLoaded = false;
    const fetchUsers = async () => {
      const customers = await fetchCustomers(count);
      const newUsers: User[] = (customers.map(c => {
        return {
          id: c.id,
          email: c.email,
          name: c.name,
          message: '',
          isSelected: false,
        };
      }));
      newUsers[0].isSelected = true;
      if (!isCustomerLoaded) {
        setUsers(newUsers);
      }
    };

    fetchUsers().catch(console.error);
    return () => {
      isCustomerLoaded = true;
    };
  }, [count]);

  const selectedUser = users.find((u: User) => u.isSelected);

  const updateChatText = (text: string, email: string) => {
    const copy = users.slice();
    const target: User | undefined = copy.find((u: User) => u.email === email);
    target!.message = text;
    setUsers(copy);
  };

  const onSelectUser = (user: any) => {
    const copy: User[] = users.slice();
    for (let u of copy) {
      u.isSelected = u.email == user.email;
    }
    setUsers(copy);
  };

  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      {users.length && <ContactList
        contacts={users}
        onSelect={(contact: any) => onSelectUser(contact)}
      />}
      {selectedUser && <Chat key={selectedUser.email} contact={selectedUser} onTextChange={updateChatText}/>}
      <br/><br/>

      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr/>
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}

interface User {
  id: string;
  name: string;
  email: string;
  isSelected: boolean;
  message: string;
}

const contacts = [
  {name: 'Taylor', email: 'taylor@mail.com', isSelected: true, message: ''},
  {name: 'Alice', email: 'alice@mail.com', isSelected: false, message: ''},
  {name: 'Bob', email: 'bob@mail.com', isSelected: false, message: ''}
];
