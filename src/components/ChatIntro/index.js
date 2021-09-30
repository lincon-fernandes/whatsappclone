import React from 'react';
import image from '../../images/wpp-conection-menssage.jpg';
import './styles.css';
// eslint-disable-next-line import/no-anonymous-default-export
const ChatIntro = () => {
  return (
    <div className="chatIntro">
      <img src={image} alt="userpicture" />
      <h1>Mantenha seu celular conectado</h1>
      <h2>
        O WhatsApp conecta ao seu telefone para sincronizar suas menssagens.
        Para reduzir o uso de dados, conecte seu celular a uma rede Wi-fi.
      </h2>
    </div>
  );
};
export default ChatIntro;
