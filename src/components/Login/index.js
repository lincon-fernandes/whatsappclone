import React from 'react';
import Api from '../../Api';
import './styles.css';

const Login = ({ onReceive }) => {
  const handlefacebooklogin = async () => {
    let result = await Api.fbPopup();
    if (result) {
      onReceive(result.user);
    } else {
      alert('erro');
    }
  };
  return (
    <div className="login">
      <button onClick={handlefacebooklogin}>logar via facebook</button>
    </div>
  );
};
export default Login;
