import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import AuthContext from '../../context/AuthContext';

export const AuthPage = () => {

  const auth = useContext(AuthContext);
  const message = useMessage();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const signupHandler = async () => {
    try {
      const data = await request("api/auth/signup", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("api/auth/login", "POST", { ...form });
      message(data.message);
      auth.login(data.token, data.userId)
    } catch (e) {}
  };

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="row auth">
      <div className="col s6 offset-s3">
        <h1 className="center-align heading">URL Shortener</h1>
        <div className="card blue lighten-1">
          <div className="card-content white-text">
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn orange accent-1 auth__login-btn"
              disabled={loading}
              onClick={loginHandler}
            >
              Log In
            </button>
            <button
              className="btn pink lighten-3"
              disabled={loading}
              onClick={signupHandler}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
