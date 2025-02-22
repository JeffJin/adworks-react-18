'use client';
import { useOnlineStatus, useOnlineStatusEffect } from '@/app/(public)/chat/chat-api';
import ContactList from '@/app/(public)/chat/chat-list';
import ChatRoom from '@/app/(public)/chat/chat-room';
import { fetchCustomers } from '@/app/lib/services/data';
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

  const isOnline = useOnlineStatusEffect();
  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

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
      <h1> User is {isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
      <button disabled={!isOnline} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={handleSaveClick}>
        {isOnline ? 'Save progress' : 'Reconnecting...'}
      </button>
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
