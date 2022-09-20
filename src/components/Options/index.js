import './index.css'

import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {VscFlame} from 'react-icons/vsc'
import {FaGamepad} from 'react-icons/fa'
import {BiListPlus} from 'react-icons/bi'
import propsContext from '../../context/context'

class Options extends Component {
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

  render() {
    const {optionStatus} = this.state
    console.log(optionStatus)
    return (
      <propsContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <div
              className={`options ${
                isDarkMode ? 'dark-bg2 dark-text' : 'light-bg2 light-text'
              }`}
            >
              <ul className="options-ul ">
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
              <div className="contact-div">
                <h2>Contact us</h2>
                <div>
                  <img
                    className="fb-tw-li-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                    alt="facebook logo"
                  />
                  <img
                    className="fb-tw-li-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                  <img
                    className="fb-tw-li-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </div>
                <p>Enjoy! Now to see your channels and recommendations!</p>
              </div>
            </div>
          )
        }}
      </propsContext.Consumer>
    )
  }
}

export default Options
