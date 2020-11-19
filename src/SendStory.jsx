import { Modal } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db, storage } from './firebase'
import firebase from 'firebase'
import { useStateValue } from './StateProvider'
function SendStory({sendOpen}) {
    //pretty much the same as SendPost but there is no caption

    //progress of file  upload in % , never used to view
    const [progress , setProgress] = useState(0)
    const [image , setImage] = useState(null) 
    const [imgUrl , setImgUrl] = useState(null)
    const [load , setLoad] = useState(false)
    const [state , dispatch] = useStateValue()
    const [open , setOpen] = useState(sendOpen)

    //open is inherited from parent component ,this would change state of this component when the parent component open state changes 
    useEffect(() => {
        setOpen(sendOpen)
    },[sendOpen])
    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        setLoad(true)
        if(image) {
            
            const uploadTask = storage.ref(`images/${image.name}`).put(image)
                uploadTask.on('state_changed' ,
                (snapshot) => {
                    setProgress(snapshot.bytesTransferred / snapshot.totalBytes)
                } ,
                (error) => {
                    console.log(error);
                    alert(error.message) ;
                } ,
                () => {
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {setImgUrl(url) ; setLoad(false)})
                }
                )

        }
    }
    const addPost = (e) => {
        e.preventDefault()
        if(imgUrl) {
            db.collection('stories').add({
                storyImg : imgUrl ,
                userName : state.user.displayName ,
                pic : state.user.photoURL ,
                seenBy : [] ,
                timestamp : firebase.firestore.FieldValue.serverTimestamp()
            })
            dispatch({type : 'SEND_STORY' , open : false})
            setOpen(false)
        }
    }
    return (
        <div>
        <Modal
        open={open}
        onClose={() => {dispatch({type : 'SEND_STORY' , open : false}) ; setOpen(false)}}
    
      >
        <div style={{
              top: `50%`,
              left: `50%`,
              transform: `translate(-50%, -50%)`,
              position: 'absolute',
              width: 350,
              height:'max-content' ,
              backgroundColor: "white",
              borderRadius : "20px" ,
              padding : '20px' ,
              outline : 'none' ,
              display : "flex" ,
              flexDirection : 'column',
              justifyContent : "space-between"
              

            }}
            className="sendPost__modal" 
        >
            <div className="modal__content">
                
                <h4 style={{padding : '10px'}}>Add a new Story</h4>
                <div style={{display : 'flex' , justifyContent : 'space-between' , alignItems : 'center' , margin: '10px 0px'}}>
                    <label htmlFor="postImage" className="upload__label">Choose File</label>
                    <input type="file" id="postImage" style={{display : 'none' , opacity : '0'}} onChange={handleChange}/>
                     <button onClick={handleUpload} className="upload__button" disabled={image ? false : true} style={image ? {backgroundColor : 'black' , cursor: 'pointer'} : {backgroundColor : '#909090'}}>Upload</button>
                </div>
                <div className="upload__preview">

                    
                {
                    //just a loading animation
                    load && (<div class="loadingio-spinner-spin-8794y121as5"><div class="ldio-h3vpreig2yr">
                    <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
                    </div></div>) 
                }
                {
                    imgUrl && <img src={imgUrl} alt="" className="preview__image"/>
                    
                }
                </div>
                <div className="modal__bottom">
                    <button onClick={addPost}>Post</button>
                </div>
                
            </div>
            
        </div>
            </Modal>
        </div>
    )
}

export default SendStory
