import './index.css'

import {Component} from 'react'
import {FaMoon, FaGamepad} from 'react-icons/fa'
import {GoThreeBars} from 'react-icons/go'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {VscFlame} from 'react-icons/vsc'
import {BiListPlus} from 'react-icons/bi'

import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'
import propsContext from '../../context/context'

class Header extends Component {
  state = {optionStatus: ''}

  home = () => {
    this.setState({optionStatus: 'Home'})
  }

  trending = () => {
    this.setState({optionStatus: 'Trending'})
  }

  gaming = () => {
    this.setState({optionStatus: 'Gaming'})
  }

  saved = () => {
    this.setState({optionStatus: 'Saved'})
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {optionStatus} = this.state
    return (
      <propsContext.Consumer>
        {value => {
          const {isDarkMode, toggleMode} = value

          const modeChange = () => {
            toggleMode()
          }

          return (
            <div className={`header ${isDarkMode ? 'dark-bg2' : 'light-bg2'}`}>
              <Link className="header-link" to="/">
                <img
                  className="header-logo"
                  src={
                    isDarkMode
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="logo"
                />
              </Link>

              <div className="header-icons-div">
                <FaMoon
                  onClick={modeChange}
                  className={`header-icons ${
                    isDarkMode ? 'dark-text' : 'light-text'
                  }`}
                />

                <Popup
                  modal
                  trigger={
                    <GoThreeBars
                      className={`header-icons mid-devi ${
                        isDarkMode ? 'dark-text' : 'light-text'
                      }`}
                    />
                  }
                >
                  {close => (
                    <div
                      className={`pop-opt-div ${
                        isDarkMode ? 'dark-bg' : 'light-bg'
                      }`}
                    >
                      <button
                        type="button"
                        className={`opt-close-button ${
                          isDarkMode ? 'dark-text' : 'light-text'
                        }`}
                        onClick={() => close()}
                      >
                        X
                      </button>

                      <ul className="options-ul opt-div  ">
                        <Link
                          onClick={this.home}
                          className={`link-opt  ${
                            isDarkMode ? 'dark-text' : 'light-text'
                          }`}
                          to="/"
                        >
                          <li className="options-li">
                            <AiFillHome
                              className={`option-icons ${
                                optionStatus === 'Home' ? 'red-icon' : null
                              }`}
                            />
                            <p>Home</p>
                          </li>
                        </Link>

                        <Link
                          onClick={this.trending}
                          className={`link-opt ${
                            isDarkMode ? 'dark-text' : 'light-text'
                          }`}
                          to="/trending"
                        >
                          <li className="options-li">
                            <VscFlame
                              className={`option-icons ${
                                optionStatus === 'Trending' ? 'red-icon' : null
                              }`}
                            />
                            <p>Trending</p>
                          </li>
                        </Link>

                        <Link
                          onClick={this.gaming}
                          className={`link-opt  ${
                            isDarkMode ? 'dark-text' : 'light-text'
                          }`}
                          to="/gaming"
                        >
                          <li className="options-li">
                            <FaGamepad
                              className={`option-icons ${
                                optionStatus === 'Gaming' ? 'red-icon' : null
                              }`}
                            />
                            <p>Gaming</p>
                          </li>
                        </Link>

                        <Link
                          onClick={this.saved}
                          className={`link-opt  ${
                            isDarkMode ? 'dark-text' : 'light-text'
                          }`}
                          to="/saved-videos"
                        >
                          <li className="options-li">
                            <BiListPlus
                              className={`option-icons ${
                                optionStatus === 'Saved' ? 'red-icon' : null
                              }`}
                            />
                            <p className="options-p">Saved videos</p>
                          </li>
                        </Link>
                      </ul>
                    </div>
                  )}
                </Popup>

                <Popup
                  modal
                  trigger={
                    <FiLogOut
                      className={`header-icons mid-devi ${
                        isDarkMode ? 'dark-text' : 'light-text'
                      }`}
                    />
                  }
                  className="logout-popup"
                >
                  {close => (
                    <div
                      className={`popup-card ${
                        isDarkMode ? 'dark-bg' : 'light-bg'
                      }`}
                    >
                      <div>
                        <p
                          className={`popup-p ${
                            isDarkMode ? 'dark-text' : 'light-text'
                          }`}
                        >
                          Are you sure you want to logout?
                        </p>
                      </div>
                      <div className="pop-up-btn-div">
                        <button
                          type="button"
                          className="close-button"
                          onClick={() => close()}
                        >
                          Close
                        </button>
                        <button
                          onClick={this.logout}
                          className="confirm-button"
                          type="button"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
                <img
                  className="header-profile-img"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />

                <Popup
                  modal
                  trigger={
                    <button className="logout-btn" type="button">
                      Logout
                    </button>
                  }
                  className="logout-popup"
                >
                  {close => (
                    <div className="popup-card">
                      <div>
                        <p className="popup-p">
                          Are you sure you want to logout?
                        </p>
                      </div>
                      <div className="pop-up-btn-div">
                        <button
                          type="button"
                          className="close-button"
                          onClick={() => close()}
                        >
                          Close
                        </button>
                        <button
                          onClick={this.logout}
                          className="confirm-button"
                          type="button"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          )
        }}
      </propsContext.Consumer>
    )
  }
}

export default withRouter(Header)
