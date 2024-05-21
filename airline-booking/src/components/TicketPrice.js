import React from 'react';
import '../styles/TicketPrice.css';

const TicketPrice = ({ prices }) => {
  return (
    <div className="ticket-price card p-3 shadow mb-4">
      <h3 className="card-title">Ticket Prices</h3>
      <ul className="list-group">
        <li className="list-group-item">First Class: ${prices.firstClass}</li>
        <li className="list-group-item">Business Class: ${prices.businessClass}</li>
        <li className="list-group-item">Economy Class: ${prices.economyClass}</li>
      </ul>
    </div>
  );
};

export default TicketPrice;
