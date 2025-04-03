import { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { setInput, setRecentPrompt, setShowResult } = useContext(Context);

  // Function to handle "New Chat" click
  // const handleNewChat = () => {
  //   setInput(""); // Clear input
  //   setRecentPrompt(""); // Clear previous prompt
  //   setShowResult(false); // Hide previous chat results
  // };

  return (
    <div className='sidebar'>
      <div className="top">
        <img 
          className="menu" 
          src={assets.menu_icon} 
          alt="Menu" 
          onClick={() => setExtended(!extended)} 
        />

        <div className="new-chat">
          <img src={assets.plus_icon} alt="New Chat" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended && (
          <div className="recent">
            <p className='recent-title'>Recents</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="Message Icon" />
              <p>What is React ....</p>
            </div>
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Setting" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
