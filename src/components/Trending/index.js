import './index.css'

import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {VscFlame} from 'react-icons/vsc'
import Cookies from 'js-cookie'
import Header from '../Header'
import Options from '../Options'
import propsContext from '../../context/context'

export default class Trending extends Component {
  state = {trendingList: [], loader: true, failureView: false}

  retry = () => {
    this.getData()
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const cookiesData = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookiesData}`,
      },
    }
    const response = await fetch(url, options)
    const respData = await response.json()

    if (response.ok) {
      const data = respData.videos.map(each => ({
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({trendingList: data, loader: false, failureView: false})
    } else {
      console.log(response)
      console.log(respData)
      this.setState({failureView: true, loader: false})
    }
  }

  render() {
    const {trendingList, loader, failureView} = this.state

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
                    <VscFlame className="tr-t-logo" />
                    <h1
                      className={`tr-t-h ${
                        isDarkMode ? 'dark-text' : 'light-text'
                      }`}
                    >
                      Trending
                    </h1>
                  </div>
                  {loader ? (
                    <div className="loader-container" data-testid="loader">
                      <Loader
                        type="ThreeDots"
                        color={isDarkMode ? '#ffffff' : '#000000'}
                        height="50"
                        width="50"
                      />
                    </div>
                  ) : null}
                  {failureView === false ? (
                    <ul className="tr-ul">
                      {trendingList.map(each => (
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
                                    <li className="v-c-li-v">
                                      {each.viewCount}
                                    </li>
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
                  ) : (
                    <div className="no-results-div">
                      <img
                        className="no-results-img"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png "
                        alt="no videos"
                      />
                      <h3 className={isDarkMode ? 'dark-text' : 'light-text'}>
                        Oops! Something Went Wrong
                      </h3>
                      <p className="no-res-p">
                        We are having some trouble to complete your request.
                        Please try again.
                      </p>
                      <button
                        onClick={this.retry}
                        className="retry-btn"
                        type="button"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </propsContext.Consumer>
    )
  }
}
