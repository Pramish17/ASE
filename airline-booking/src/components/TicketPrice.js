import React from 'react';

const TicketPrice = ({ prices }) => {
  return (
    <div className="ticket-price">
      <h4>Ticket Prices:</h4>
      <ul className="list-group">
        <li className="list-group-item">
          First Class: ${prices['first-class']}
        </li>
        <li className="list-group-item">
          Business Class: ${prices['business-class']}
        </li>
        <li className="list-group-item">
          Economy Class: ${prices['economy-class']}
        </li>
      </ul>
    </div>
  );
};

export default TicketPrice;
