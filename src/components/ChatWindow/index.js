import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

import './style.css';

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import Api from '../../Api';
import MenssageItem from '../MenssageItem';
// eslint-disable-next-lin
// eslint-disable-next-line import/no-anonymous-default-export
const ChatWindow = ({ user, data }) => {
  const body = useRef();

  const [text, setText] = useState('');
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setList([]);
    let unsub = Api.onChatContent(data.chatId, setList, setUsers);
    return unsub;
  }, [data.chatId]);
  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [list]);

  let recognition = null;
  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (speechRecognition !== undefined) {
    recognition = new speechRecognition();
  }

  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  };
  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  };
  const handleEmojiClick = (e, emojiObject) => {
    setText(text + emojiObject.emoji);
  };
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSendClick();
    }
  };
  const handleSendClick = () => {
    if (text !== '') {
      Api.sendMessage(data, user.id, 'text', text, users);
      setText('');
      setEmojiOpen(false);
    }
  };
  //transcrever microfone
  const handleMicClick = () => {
    if (speechRecognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript);
      };
      recognition.start();
    }
  };
  return (
    <div className="chatWindow">
      <div className="chatWindow-header">
        <div className="chatWindow-header-info">
          <img className="chatWindow-avatar" src={data.image} alt="" />
          <div className="chatWindow-name">{data.title}</div>
        </div>
        <div className="chatWindow-header-buttons">
          <div className="chatWindow--btn">
            <SearchIcon style={{ color: '#919191' }} />
          </div>
          <div className="chatWindow--btn">
            <AttachFileIcon style={{ color: '#919191' }} />
          </div>
          <div className="chatWindow--btn">
            <MoreVertIcon style={{ color: '#919191' }} />
          </div>
        </div>
      </div>
      <div ref={body} className="chatWindow-body">
        {list.map((item, key) => (
          <MenssageItem key={key} data={item} user={user} />
        ))}
      </div>
      <div
        className="chatWindow-emojiarea"
        style={{ height: emojiOpen ? '200px' : '0px' }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>

      <div className="chatWindow-footer">
        <div className="chatWindow-pre">
          <div
            onClick={handleCloseEmoji}
            className="chatWindow--btn"
            style={{ width: emojiOpen ? 40 : 0 }}
          >
            <CloseIcon style={{ color: '#919191' }} />
          </div>
          <div onClick={handleOpenEmoji} className="chatWindow--btn">
            <InsertEmoticonIcon
              style={{ color: emojiOpen ? '#009688' : '#919191' }}
            />
          </div>
        </div>
        <div className="chatWindow-inputarea">
          <input
            className="chatWindow-input"
            type="text"
            placeholder="Digite uma menssagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </div>
        <div className="chatWindow-pos">
          {text === '' && (
            <div onClick={handleMicClick} className="chatWindow--btn">
              <MicIcon style={{ color: listening ? '#126ece' : '#919191' }} />
            </div>
          )}
          {text !== '' && (
            <div onClick={handleSendClick} className="chatWindow--btn">
              <SendIcon style={{ color: '#919191' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatWindow;
