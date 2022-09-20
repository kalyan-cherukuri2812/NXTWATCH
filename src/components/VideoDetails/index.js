import './index.css'

import {Component} from 'react'

import ReactPlayer from 'react-player'

import Cookies from 'js-cookie'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Header from '../Header'
import Options from '../Options'
import propsContext from '../../context/context'

class Videodetails extends Component {
  state = {videoDetails: {}, isLike: false, isDislike: false, isSaved: false}

  dislikeClick = () => {
    this.setState(prev => ({isDislike: !prev.isDislike}))
    this.setState({isLike: false})
  }

  likeClick = () => {
    this.setState(prev => ({isLike: !prev.isLike}))
    this.setState({isDislike: false})
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const CookiesData = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${CookiesData}`,
      },
    }
    const response = await fetch(url, options)

    const respData = await response.json()

    if (response.ok) {
      const videoDetailsData = {
        name: respData.video_details.channel.name,
        profileImageUrl: respData.video_details.channel.profile_image_url,
        subscriberCount: respData.video_details.channel.subscriber_count,
        id: respData.video_details.id,
        description: respData.video_details.description,
        publishedAt: respData.video_details.published_at,
        thumbnailUrl: respData.video_details.thumbnail_url,
        title: respData.video_details.title,
        videoUrl: respData.video_details.video_url,
        viewCount: respData.video_details.view_count,
      }
      this.setState({videoDetails: videoDetailsData})
    } else {
      console.log(response)
      console.log(respData)
    }
    const {videoDetails} = this.state
    const savedListData = await this.getSavedListFromLocalStorage()
    const saveStatus = await savedListData.some(
      each => each.id === videoDetails.id,
    )
    if (saveStatus) {
      this.setState({isSaved: true})
    }
  }

  getSavedListFromLocalStorage = () => {
    const stringifiedSavedList = localStorage.getItem('savedList')
    const parsedSavedList = JSON.parse(stringifiedSavedList)
    if (parsedSavedList === null) {
      return []
    }
    return parsedSavedList
  }

  saveClick = () => {
    this.setState({isSaved: true})
    const {videoDetails} = this.state
    const savedListData = this.getSavedListFromLocalStorage()
    savedListData.push(videoDetails)
    localStorage.setItem('savedList', JSON.stringify(savedListData))
  }

  removeSaveClick = () => {
    this.setState({isSaved: false})
    const {videoDetails} = this.state
    const savedListData = this.getSavedListFromLocalStorage()
    const removedData = savedListData.filter(
      each => each.id !== videoDetails.id,
    )
    localStorage.setItem('savedList', JSON.stringify(removedData))
  }

  render() {
    const {videoDetails, isLike, isDislike, isSaved} = this.state

    return (
      <propsContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <div
              className={`video-details-bg ${
                isDarkMode ? 'dark-bg' : 'light-bg'
              } `}
            >
              <Header />
              <div className="video-details-div">
                <Options />
                <div
                  className={`video-details-card ${
                    isDarkMode ? 'dark-text' : 'light-text'
                  }`}
                >
                  <ReactPlayer
                    className="video-card"
                    url={videoDetails.videoUrl}
                    controls="true"
                    width="auto"
                  />
                  <div className="v-t-div">
                    <h3 className="vd-title">{videoDetails.title}</h3>
                    <div className="vd-year-like-div gray">
                      <ul className="vd-year-ul">
                        <li className="vd-year-li-views">
                          {videoDetails.viewCount}
                        </li>
                        <li className="vd-year-li-pub">
                          {videoDetails.publishedAt}
                        </li>
                      </ul>
                      <div className="vd-l-d-s-div">
                        <button
                          className={`vd-l-d-s-btn ${isLike ? 'saved' : null}`}
                          type="button"
                          onClick={this.likeClick}
                        >
                          <AiOutlineLike className="vd-icons" />
                          Like
                        </button>
                        <button
                          className={`vd-l-d-s-btn ${
                            isDislike ? 'saved' : null
                          }`}
                          type="button"
                          onClick={this.dislikeClick}
                        >
                          <AiOutlineDislike className="vd-icons" />
                          Dislike
                        </button>

                        {isSaved === true ? (
                          <button
                            onClick={this.removeSaveClick}
                            className="vd-l-d-s-btn saved"
                            type="button"
                          >
                            <BiListPlus className="vd-icons" />
                            Saved
                          </button>
                        ) : (
                          <button
                            onClick={this.saveClick}
                            className="vd-l-d-s-btn"
                            type="button"
                          >
                            <BiListPlus className="vd-icons" />
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                    <hr className="hr" />
                    <div className="vd-profile-div">
                      <img
                        className="vd-profile-img"
                        src={videoDetails.profileImageUrl}
                        alt="profile"
                      />
                      <div className="vd-p-n-sub">
                        <h3>{videoDetails.name}</h3>
                        <h4 className="gray">
                          {videoDetails.subscriberCount} subscribers
                        </h4>
                      </div>
                    </div>
                    <p>{videoDetails.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </propsContext.Consumer>
    )
  }
}

export default Videodetails
