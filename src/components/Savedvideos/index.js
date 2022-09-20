import './index.css'

import {Component} from 'react'
import {Link} from 'react-router-dom'

import {BiListPlus} from 'react-icons/bi'
import Header from '../Header'
import Options from '../Options'
import propsContext from '../../context/context'

export default class SavedVideos extends Component {
  state = {savedVideosList: []}

  componentDidMount = () => {
    this.getData()
  }

  getData = () => {
    const stringifiedSavedList = localStorage.getItem('savedList')
    const parsedSavedList = JSON.parse(stringifiedSavedList)
    console.log(parsedSavedList)
    this.setState({savedVideosList: parsedSavedList})
  }

  render() {
    const {savedVideosList} = this.state

    return (
      <propsContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <div
              className={`trending-bg-container ${
                isDarkMode ? 'dark-bg' : 'light-bg'
              }`}
            >
              <Header />
              <div className="trending-card">
                <Options />
                <div className="trending-page">
                  <div className="VscFlame">
                    <BiListPlus className="tr-t-logo" />
                    <h1
                      className={`tr-t-h ${
                        isDarkMode ? 'dark-text' : 'light-text'
                      }`}
                    >
                      Saved Videos
                    </h1>
                  </div>

                  <ul className="tr-ul">
                    {savedVideosList.map(each => (
                      <Link
                        key={each.id}
                        className="tr-link"
                        to={`/Videos/${each.id}`}
                      >
                        <li className="tr-li">
                          <img
                            className="tr-img"
                            src={each.thumbnailUrl}
                            alt="img"
                          />
                          <div className="title-profile-card">
                            <img
                              className="profile-img"
                              src={each.profileImageUrl}
                              alt="profileImageUrl"
                            />
                            <div className="title-div">
                              <h3
                                className={`title ${
                                  isDarkMode ? 'dark-text' : 'light-text'
                                }`}
                              >
                                {each.title}
                              </h3>
                              <div className="n-v-p-div">
                                <p className="name-h">{each.name}</p>
                                <ul className="v-p-ul">
                                  <li className="v-c-li-v">{each.viewCount}</li>
                                  <li className="v-c-li-p">
                                    {each.publishedAt}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </ul>

                  {savedVideosList.length === 0 ? (
                    <div className="no-results-div">
                      <img
                        className="no-results-img"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                      />
                      <h3 className={isDarkMode ? 'dark-text' : 'light-text'}>
                        No saved videos found
                      </h3>
                      <p className="no-res-p">
                        You can save your videos while watching them
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )
        }}
      </propsContext.Consumer>
    )
  }
}
