import React, { useEffect, useState } from 'react';
import './styles.css';
import Api from '../../Api';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// eslint-disable-next-line import/no-anonymous-default-export
const NewChat = ({ chatlist, user, show, setShow }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const getList = async () => {
      if (user !== null) {
        let results = await Api.getContactList(user.id);
        setList(results);
      }
    };
    getList();
  }, [user]);

  const handleClose = () => setShow(false);
  const addNewChat = async (user2) => {
    await Api.addNewChat(user, user2);
    handleClose();
  };
  return (
    <div className="newChat" style={{ left: show ? 0 : -415 }}>
      <div className="newChat-head">
        <div className="newChat-backButton" onClick={handleClose}>
          <ArrowBackIcon />
        </div>
        <div className="newChat-headTitle">Nova Conversa</div>
      </div>
      <div className="newChat-list">
        {list.map((item, key) => (
          <div
            onClick={() => addNewChat(item)}
            className="newChat-item"
            key={key}
          >
            <img className="newChat-itemAvatar" src={item.avatar} alt="l"></img>
            <div className="newChat-itemName">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NewChat;
