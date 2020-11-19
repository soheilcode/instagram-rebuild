import { IconButton, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import {db, storage} from './firebase'
import firebase from 'firebase'
function SendPost({scrolled , user}) {
    const [open , setOpen] = useState(false)
    
    //progress of file  upload in % , never used to view
    const [progress , setProgress] = useState(0)
    const [image , setImage] = useState(null) 
    const [imgUrl , setImgUrl] = useState(null)
    const [load , setLoad] = useState(false)
    const [caption , setCaption] = useState(null)
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
        if(imgUrl && caption) {
            db.collection('posts').add({
                userImg : user.photoURL ,
                userName : user.displayName ,
                postImg : imgUrl ,
                likedBy : [] ,
                caption : caption ,
                comments : [] ,
                timestamp : firebase.firestore.FieldValue.serverTimestamp()
            })
            setOpen(false)
        }
    }
    return (
       
        <div className="sendPost">
            
            <IconButton className="sendPost__button" onClick={() => setOpen(true)}>
                <AddIcon />
            </IconButton>
            <Modal
        open={open}
        onClose={() => setOpen(false)}
    
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
                
                <h4 style={{padding : '10px'}}>Add a new post</h4>
                <div style={{display : 'flex' , justifyContent : 'space-between' , alignItems : 'center' , margin: '10px 0px'}}>
                    <label htmlFor="postImage" className="upload__label">Choose File</label>
                    <input type="file" id="postImage" style={{display : 'none' , opacity : '0'}} onChange={handleChange}/>
                     <button onClick={handleUpload} className="upload__button" disabled={image ? false : true} style={image ? {backgroundColor : 'black' , cursor: 'pointer'} : {backgroundColor : '#909090'}}>Upload</button>
                </div>
                <div className="upload__preview">

                    
                {
                    load && (<div class="loadingio-spinner-spin-8794y121as5"><div class="ldio-h3vpreig2yr">
                    <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
                    </div></div>) 
                }

                {
                    imgUrl && <img src={imgUrl} alt="" className="preview__image"/>
                    
                }
                </div>
                <div className="modal__bottom">
                    <textarea type="text" placeholder="Write a caption for your post..." value={caption} onChange={(e) => setCaption(e.target.value)}/>
                    <button onClick={addPost}>Post</button>
                </div>
                
            </div>
            
        </div>
            </Modal>
        </div>
    )
}

export default SendPost

