import React, { useEffect, useState } from 'react'
import SendPost from './SendPost';
import Header from './Header';
import Story from './Stories';
import Post from './Post'
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import { Button } from '@material-ui/core';
import { AddCircleOutlineOutlined } from '@material-ui/icons';
import SendStory from './SendStory';
function Home() {
    const [posts, setPosts] = useState([])
    const [stories , setStories] = useState([])
    const [{user} , dispatch] = useStateValue();
    const [open , setOpen] = useState(false)
    //get posts
    useEffect(() => {
        db.collection('posts').orderBy('timestamp' , 'desc').onSnapshot(shot => {
            setPosts(shot.docs.map(doc => ({
                postId : doc.id ,
                postData : doc.data()
            })))
        })
    } , [])

    //get stories and dispatch an array of story ids
    useEffect(() => {
      db.collection('stories').orderBy('timestamp' , 'desc').onSnapshot(shot => {
        setStories(shot.docs.map(doc => ({
          storyId : doc.id ,
          storyData : doc.data()
        })))
        dispatch({type : 'SET_STORIES' , stories : shot.docs.map(doc => doc.id)})
      })
    },[dispatch])

    return (
        <div>
            <Header />
          <div className="stories">
            <Button onClick={()=>setOpen(!open)} className="stories__btn">
                <AddCircleOutlineOutlined />
            </Button>
            <SendStory sendOpen={open}/>
            
            {
             //take stories seen by me to the end
              stories?.sort(storyObj => storyObj.storyData.seenBy?.some(id => id === user?.uid) ? 1 : -1).map(storyObj => (
                <Story profile={storyObj.storyData.pic} username={storyObj.storyData.userName} id={storyObj.storyId} key={storyObj.storyId} timestamp={storyObj.storyData.timestamp} seen={storyObj.storyData.seenBy?.some(id => id === user?.uid)}/>
              ))
            }
           
          </div>
          
          <div className="posts">
            {
              posts.map(post => (
                <Post key={post.postId} user={user} id={post.postId} userImg={post.postData.userImg} userName={post.postData.userName} postImg={post.postData.postImg} likedBy={post.postData.likedBy} caption={post.postData.caption} comments={post.postData.comments} timestamp={post.postData.timestamp}/>
              ))
            }
          </div>
          <SendPost user={user}/>
        </div>
    )
}

export default Home
