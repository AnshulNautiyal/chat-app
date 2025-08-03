import { useState, useCallback } from 'react';

// Mock friends data
const MOCK_FRIENDS = [
  { id: 1, name: 'Alice Johnson', online: true, color: 'bg-purple-500' },
  { id: 2, name: 'Bob Smith', online: false, color: 'bg-green-500' },
  { id: 3, name: 'Carol Davis', online: true, color: 'bg-pink-500' },
  { id: 4, name: 'David Wilson', online: true, color: 'bg-indigo-500' },
  { id: 5, name: 'Emma Brown', online: false, color: 'bg-red-500' },
];

// Generate unique message ID
let messageIdCounter = 1;
const generateMessageId = () => messageIdCounter++;

const useMessenger = () => {
  const [friends] = useState(MOCK_FRIENDS);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [conversations, setConversations] = useState({});

  // Get messages for current friend
  const getCurrentMessages = useCallback(() => {
    if (!selectedFriend) return [];
    return conversations[selectedFriend.id] || [];
  }, [selectedFriend, conversations]);

  // Get last message for a friend
  const getLastMessage = useCallback((friendId) => {
    const messages = conversations[friendId] || [];
    return messages[messages.length - 1] || null;
  }, [conversations]);

  // Send a message
  const sendMessage = useCallback((friendId, text) => {
    const message = {
      id: generateMessageId(),
      text,
      sender: 'me',
      timestamp: new Date(),
    };

    setConversations(prev => ({
      ...prev,
      [friendId]: [...(prev[friendId] || []), message]
    }));

    // Simulate friend response after a delay
    setTimeout(() => {
      const responses = [
        "That's interesting!",
        "I see what you mean",
        "Absolutely!",
        "Tell me more about that",
        "I agree with you",
        "That sounds great!",
        "Thanks for sharing",
        "I hadn't thought of it that way",
        "Good point!",
        "Let's discuss this further"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const friendMessage = {
        id: generateMessageId(),
        text: randomResponse,
        sender: 'friend',
        timestamp: new Date(),
      };

      setConversations(prev => ({
        ...prev,
        [friendId]: [...(prev[friendId] || []), friendMessage]
      }));
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  }, []);

  // Select a friend
  const selectFriend = useCallback((friend) => {
    setSelectedFriend(friend);
  }, []);

  return {
    friends,
    selectedFriend,
    messages: getCurrentMessages(),
    selectFriend,
    sendMessage,
    getLastMessage,
  };
};

export default useMessenger;