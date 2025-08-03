import { User, MessageCircle } from 'lucide-react';

const FriendsList = ({ friends, selectedFriend, onSelectFriend, getLastMessage }) => {
  return (
    <div className="friends-list">
      <div className="friends-header">
        <h2 className="friends-title">
          <MessageCircle className="w-5 h-5" />
          Messages
        </h2>
      </div>
      
      <div className="friends-scroll">
        {friends.map((friend) => {
          const lastMessage = getLastMessage(friend.id);
          const isSelected = selectedFriend?.id === friend.id;
          
          return (
            <div
              key={friend.id}
              onClick={() => onSelectFriend(friend)}
              className={`friend-item ${isSelected ? 'selected' : ''}`}
            >
              <div className="friend-content">
                <div className={`friend-avatar ${friend.color.replace('bg-', '').replace('-500', '')}`}>
                  <User className="w-6 h-6" />
                </div>
                
                <div className="friend-info">
                  <div className="friend-header">
                    <h3 className="friend-name">
                      {friend.name}
                    </h3>
                    <span className={`status-indicator ${friend.online ? 'online' : 'offline'}`} />
                  </div>
                  
                  {lastMessage && (
                    <p className="last-message">
                      {lastMessage.text}
                    </p>
                  )}
                  
                  {!lastMessage && (
                    <p className="no-messages">
                      No messages yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsList;