import React from 'react';
import Button from './Button';
import "../index.css";

const Header = ({ showForm, changeTextAndColor }) => {
  return (
      <header className="header">
          <h2 className="app-header">Agendamento</h2>
          <Button onClick={showForm} color={changeTextAndColor ? 'red' : 'green'} text=     {changeTextAndColor ? 'Ver todos agendamento' : 'Agendar consulta'} />
        </header>
    )
}
export default Header;