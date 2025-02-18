//TODO fix async issue
/// <reference types="react/experimental" />

import { createConnection } from '@/app/(public)/chat/chat-api';
import { showNotification } from '@/app/ui/common/notifications';
import { useState, useEffect, useCallback, experimental_useEffectEvent as useEffectEvent } from 'react';

const serverUrl = 'https://localhost:1234';
export default function ChatRoom({roomId, theme}: {roomId: string, theme: string}) {
  // const onConnected = useEffectEvent( () => {
  //   showNotification('Connected!', theme);
  // });
  const onMessage = (msg: string) => {
    showNotification('New message: ' + msg, theme);
  }

  useChatRoom({roomId, onMessage});

  return <h1>Welcome to the {roomId} room!</h1>;
}

export function useChatRoom({roomId, onMessage}: {roomId: string, onMessage: (msg: string) => void}) {

  useEffect(() => {
    const connection = createConnection({ serverUrl, roomId });
    connection.on('connected', () => {
      setTimeout(() => {
        onMessage('Connected! ' + roomId);
      }, 500);
    });
    connection.on('message', (msg: string) => {
      onMessage(msg);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
}
