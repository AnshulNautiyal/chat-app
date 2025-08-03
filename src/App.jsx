import FriendsList from './components/FriendsList'
import ChatWindow from './components/ChatWindow'
import useMessenger from './hooks/useMessenger'
import './App.css'

function App() {
  const {
    friends,
    selectedFriend,
    messages,
    selectFriend,
    sendMessage,
    getLastMessage,
  } = useMessenger();

  return (
    <div className="app">
      <FriendsList
        friends={friends}
        selectedFriend={selectedFriend}
        onSelectFriend={selectFriend}
        getLastMessage={getLastMessage}
      />
      <ChatWindow
        friend={selectedFriend}
        messages={messages}
        onSendMessage={sendMessage}
      />
    </div>
  )
}

export default App
