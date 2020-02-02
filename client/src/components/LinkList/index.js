import React from "react";
import { Link } from 'react-router-dom';

const LinkList = ({ links }) => {
  if (!links.length) {
    return <p className="center no-links">You have no links yet...Create Some!</p>
  }

  return (
    <table className="link-list-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Original</th>
          <th>Shortened</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link, index)  => (
          <tr key={link._id}>
            <td>
              {index + 1}
            </td>
            <td>
              <a href={link.from} target="_blank" rel="noopener noreferrer">
                {link.from}
              </a>
            </td>
            <td>
              <a href={link.to} target="_blank" rel="noopener noreferrer">
                {link.to}
              </a>
            </td>
            <td><Link to={`/details/${link._id}`}>Show details</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinkList;
