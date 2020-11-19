import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { auth } from './firebase'
function Login() {
    const [signUp , setSignUp] = useState(false)
    const [email, setEmail] = useState("test@email.com")
    const [pass, setPass] = useState("testme")
    const [user, setUser] = useState("")
    const [url , setUrl] = useState('')
    const [err , setErr] = useState(null)
    const handleSign = () => {
        if(signUp && user) {
            auth.createUserWithEmailAndPassword(email , pass).catch(error => setErr(error.message)).then(authUser => authUser.user.updateProfile({displayName : user , photoURL : url}))
        }else {
            auth.signInWithEmailAndPassword(email , pass).catch(error => setErr(error.message))
        }
    }
    return (
        <div className="login">
            <div className="login__content">
                <div className="login__image">
                    <img src="https://firebasestorage.googleapis.com/v0/b/instagram-a5bca.appspot.com/o/Screen%20Shot%202020-10-28%20at%2012.42.03%20PM.png?alt=media&token=6dc9544d-3bb6-46aa-aa3f-ac663faecacc" alt="" className="login__phone"/>
                </div>
                <div className="login__right">
                    <div className="login__inputs">
                        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="instagram-logo"/>
                        {
                            signUp ? (
                                <form>
                                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}/>
                                    <input type="text" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)}/>
                                    <input type="text" placeholder="Profile Image URL (Optional)" value={url} onChange={(e) => setUrl(e.target.value)}/>
                                    <Button onClick={handleSign}>Sign Up</Button>
                                </form>
                            ) : (
                                <form>
                                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}/>
                                    <Button onClick={handleSign}>Log In</Button>
                                </form>
                            )
                        }
                        {
                            err && <p className="login__err" >{err}</p> 
                        }
                    </div>
                    <div className="login__status">
                        <div>{signUp ? "Have an account? " : "Don't have an account? "}<p className="login__signUpClick" onClick={() => {setSignUp(!signUp)}}>{signUp ? "Log in" : "Sign up"}</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
