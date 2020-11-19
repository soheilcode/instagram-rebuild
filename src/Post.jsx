import { Avatar, Button, IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { db } from './firebase';
function Post({userImg , userName , postImg , caption , likedBy , comments , timestamp , id , user}) {
    const [viewAll , setViewAll] = useState(false)
    const [comment , setComment] = useState('')

    const sendComment = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(comment) {
            db.collection('posts').doc(id).update({
                comments : [
                    ...comments ,
                    {
                        userName : user.displayName ,
                        comment : comment
                    }
                ]
            })
        }
        setComment("")
    }  

    const handleLike = () => {
        if(likedBy.every(name => name!==user.displayName)) {
            db.collection('posts').doc(id).update({
    
                likedBy : [...likedBy , user.displayName]
            })

        }
    }

    let likedByMe = likedBy.some(name => name === user?.displayName)

    return (
        <div className="post">
            <div className="post__header">
                <div className="post__headerInfo">
                <Avatar src={userImg} className="post__avatar"/>
                 <h4>{userName}</h4>

                </div>
                <IconButton>
                    <MoreHorizIcon style={{fontSize:"20px"}}/>
                </IconButton>
            </div>
            
            <div className="post__img">
                <img src={postImg} alt="" onDoubleClick={handleLike}/>
            </div>
            <div className="post__options">
                <div className="post__optionsIconsRight">
                    <div onClick={handleLike}>
                        {
                            likedByMe ? <FavoriteIcon htmlColor="#ED4956"/> : <FavoriteBorderIcon />
                        }
                    </div>
                    <div onClick={() => {setViewAll(!viewAll)}}>
                        <ChatBubbleOutlineIcon />
                    </div>
                    
                </div>
                <div className="post__optionsIconsLeft">
                    <BookmarkBorderIcon />
                </div>
            </div>
            <div className="post__content">
            <div className="post__likes">
                
    Liked By {likedBy.length > 2 && <><strong>{likedBy[0]}</strong> and</>} {likedBy.length > 2 ? <strong>{likedBy.length - 1} others</strong> : <strong>{likedBy.length} people.</strong> }
            </div>
            <div className="post__caption">
                <p><strong>{userName}</strong>
                {caption}</p>
            </div>
            <div className="post__comments">
                {
                    comments.length > 2 && <p style={{margin : '5px 14px' , fontSize : '14px' , color : '#8E8E8E' , cursor : 'pointer'}} onClick={() => setViewAll(!viewAll)}>{!viewAll ? `View all ${comments.length} comments` : 'Hide'}</p>
                }
            
                {   viewAll ? 
                    comments.map(com => (
                        <div className="comment">
                            <strong>{com.userName}</strong>
                             <p>{com.comment}</p>
                        </div>
                    ))
                    : 
                    <>
                    <div className="comment"><strong>{comments[0]?.userName}</strong><p>{comments[0]?.comment}</p></div>
                    <div className="comment"><strong>{comments[1]?.userName}</strong><p>{comments[1]?.comment}</p></div>
                    </>
                }
            </div>
                <div className="post__timestamp">
                    <p>{timestamp?.toDate().toUTCString()}</p>
                </div>
                <div className="post__addComment">
                    <form action="post">
                        <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => {setComment(e.target.value)}}/>
                        <Button type="submit" onClick={sendComment}>Post</Button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default Post
