import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import propsContext from '../../context/context'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    errStstus: false,
  }

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  psdClick = event => {
    if (event.target.checked) {
      this.setState({showPassword: true})
    } else {
      this.setState({showPassword: false})
    }
  }

  submit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const respData = await response.json()
    console.log(response)
    console.log(respData)
    if (response.ok) {
      const {history} = this.props
      history.replace('/')
      Cookies.set('jwt_token', respData.jwt_token, 30)
      this.setState({errorMsg: '', errStstus: false})
    } else {
      this.setState({errorMsg: respData.error_msg, errStstus: true})
    }
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showPassword, errorMsg, errStstus} = this.state
    return (
      <propsContext.Consumer>
        {value => {
          const {isDarkMode} = value
          console.log(isDarkMode)
          return (
            <div
              className={`login-bg-container ${
                isDarkMode ? 'dark-bg' : 'light-bg'
              }`}
            >
              <div
                className={`login-card ${
                  isDarkMode ? 'dark-bg2' : 'light-bg2'
                }`}
              >
                <form className="login-form" onSubmit={this.submit}>
                  <img
                    className="login-logo"
                    src={
                      isDarkMode
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    }
                    alt="img"
                  />
                  <div className="input-div">
                    <label
                      className={`login-label ${
                        isDarkMode
                          ? 'dark-text-input-label'
                          : 'light-text-input-label'
                      }`}
                      htmlFor="username"
                    >
                      USERNAME
                    </label>
                    <input
                      className={`login-input ${
                        isDarkMode
                          ? 'dark-text-input-label'
                          : 'light-text-input-label'
                      }`}
                      onChange={this.usernameChange}
                      value={username}
                      id="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="input-div">
                    <label
                      className={`login-label ${
                        isDarkMode
                          ? 'dark-text-input-label'
                          : 'light-text-input-label'
                      }`}
                      htmlFor="password"
                    >
                      PASSWORD
                    </label>
                    <input
                      className={`login-input ${
                        isDarkMode
                          ? 'dark-text-input-label'
                          : 'light-text-input-label'
                      }`}
                      onChange={this.passwordChange}
                      value={password}
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                    />
                  </div>
                  <div
                    className={
                      isDarkMode
                        ? 'showPassword-div dark-text-input-label'
                        : 'showPassword-div'
                    }
                  >
                    <input
                      className="p-c-box"
                      id="showPassword"
                      onClick={this.psdClick}
                      type="checkbox"
                    />
                    <label htmlFor="showPassword">Show Password</label>
                  </div>

                  <button className="login-btn" type="submit">
                    Login
                  </button>
                  {errStstus ? <p className="err-msg">*{errorMsg}</p> : null}
                </form>
              </div>
            </div>
          )
        }}
      </propsContext.Consumer>
    )
  }
}

export default Login
