import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ClearIcon from '@material-ui/icons/Clear';
import { db } from './firebase'
import { useStateValue } from './StateProvider';

function StoryView() {
    const {id} = useParams()
    const [{stories , user} , dispatch] = useStateValue();
    const history = useHistory()
    useEffect(() => {
        if(!id) {
            history.push('/')
        }
    })
    const [data , setData] = useState(null)
    const index = useRef()

    //index ref is used for navigating through stories (its about passing ids to this component in order)
    index.current = stories.indexOf(id)
    
    //get data for specific story id
    useEffect(() => {
       db.collection('stories').doc(id).onSnapshot(shot => setData(shot.data()))
    }, [id])

    //when I see some story if its first time add my uid in seenBy (should make display name unique, but uid is)
    useEffect(() => {
        if(!data?.seenBy?.some(id => id === user?.uid)) {
            db.collection('stories').doc(id).update({
                seenBy : [user?.uid]
            })
        }
    },[id , data , user])

    return (
        <div className="storyView">
            <IconButton onClick={() => {index.current = (index.current - 1) ; if(stories[index.current]){
                
                history.push(`/story/${stories[index.current]}`)
               }else {
                history.push('/')
            }}}>
                <ArrowBackIosIcon />
            </IconButton>
           <div className="storyView__story">
               <div className="view__top">
                   <Avatar src={data?.pic}/>
                   <h5>{data?.userName}</h5>
               </div>
               <div className="view__progress">

               </div>
               <div className="view__img">
                   <img src={data?.storyImg} alt=""/>
                   <Link className="view__clear" to='/'>
                        <ClearIcon />
                    </Link>
               </div>
           </div>
           
           <IconButton onClick={() => {
               index.current = (index.current + 1) ; 
        
               if(stories[index.current]){
                
                history.push(`/story/${stories[index.current]}`)
               }else {
                   history.push('/')
               }
               }}>
                <ArrowForwardIosIcon />
           </IconButton>
        </div>
    )
}

export default StoryView
