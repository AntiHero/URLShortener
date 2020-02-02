import React from "react";

const LinkCard = ({ link, handleClick }) => {
  return (
    <div className="link-card">
      <table className="link-card-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Clicks</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href={link.from} target="_blank" rel="noopener noreferrer">
                {link.from}
              </a>
            </td>
            <td>
              <a href={link.to} target="_blank" rel="noopener noreferrer" onClick={() => setTimeout(handleClick, 1000)}>
                {link.to}
              </a>
            </td>
            <td>
              <strong>{link.clicks}</strong>
            </td>
            <td>
              <strong>{new Date(link.date).toLocaleDateString()}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LinkCard;
