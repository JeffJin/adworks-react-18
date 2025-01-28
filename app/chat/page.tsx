'use client';

import ContactList from '@/app/chat/chat-list';
import { useState } from 'react';
import Chat from './chat';


export default function Page() {
  const [users, setUsers] = useState(contacts);
  const selectedUser = users.findLast((u) => u.isSelected);
  console.log(users);
  const updateChatText = (text: string, email: string) => {
    const copy = users.slice();
    const target = copy.find(u => u.email === email);
    target!.message = text;
    setUsers(copy);
  }

  const onSelectUser = (user: any) => {
    const copy = users.slice();
    for(let u of copy) {
      u.isSelected = u.email == user.email;
    }
    setUsers(copy);
  }
  return (
    <div>
      <ContactList
        contacts={users}
        onSelect={(contact: any) => onSelectUser(contact)}
      />
      <Chat key={selectedUser!.email} contact={selectedUser} onTextChange={updateChatText} />
    </div>
  )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com', isSelected: true, message: '' },
  { name: 'Alice', email: 'alice@mail.com', isSelected: false, message: '' },
  { name: 'Bob', email: 'bob@mail.com', isSelected: false, message: '' }
];
