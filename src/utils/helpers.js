import { useLocation, useNavigate, useParams } from "react-router-dom"

export function withRouter (Component) {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        )
    }

    return ComponentWithRouterProp
}

export function normalize(data) {
    let byId = data
    let allIds = []
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            allIds.push(key)
        }
    }
    return {byId, allIds}
}

export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatTweet (tweet, author, authedUser, parentTweet) {
  const { id, likes, replies, text, timestamp } = tweet
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentTweet ? null : {
      author: parentTweet.author,
      id: parentTweet.id,
    }
  }
}

