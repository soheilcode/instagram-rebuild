import { Avatar } from "@material-ui/core"
import { Link } from "react-router-dom"

function Story({username , profile , id , seen }) {
    return (
            <div className="story">
                <Link to={`/story/${id}`} >
                    
                <div className="story__avatarWrap" style={seen ? {border : '1px black solid'} : {border : '2px #C92D8D solid'}} >
                    <Avatar className="story__avatar" src={profile}/>

                </div>
                </Link>
            <p className="story__user">{ username?.length > 10 ? username?.slice(0 , 9) + '...' : username }</p>
            </div>
    )
}

export default Story
