//TODO fix async issue
/// <reference types="react/experimental" />

import { createConnection } from '@/app/chat/chat-api';
import { showNotification } from '@/app/ui/common/notifications';
import { useState, useEffect, useCallback } from 'react';

const serverUrl = 'https://localhost:1234';
export default function ChatRoom({roomId, theme}: {roomId: string, theme: string}) {
  const onConnected = useCallback( () => {
    showNotification('Connected!', theme);
    //new Promise(resolve => setTimeout(resolve, 300));
  }, [theme]);

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      // showNotification('Connected!', theme);
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>;
}
