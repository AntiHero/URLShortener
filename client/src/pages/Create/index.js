import React, {useState, useContext} from "react";
import {useHistory} from 'react-router-dom';
import { useHttp } from "../../hooks/http.hook";
import AuthContext from "../../context/AuthContext";

export const CreatePage = () => {
  const history = useHistory();
  const {request} = useHttp();
  const [link, setLink] = useState('');
  const auth = useContext(AuthContext);

  const pressHandler = async (e) => {
    if (e.key === 'Enter' || e.target.name === 'generate-button') {
      try {
        const data = await request('api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`});
        history.push(`/details/${data.link._id}`);
        console.log(data)
      } catch (e) {

      }
    }
  }

  return (
    <div className="row create-link">
      <div className="col s8 create-link-wrapper">
        <div className="input-field">
          <input
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Your link</label>
        </div>
        <a className="waves-effect waves-light btn-large center" name="generate-button" onClick={pressHandler}>Generate</a>
      </div>
    </div>
  );
};
