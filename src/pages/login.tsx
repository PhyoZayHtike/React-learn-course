import React from 'react'
import {auth,provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
export const Login = () => {
    const navigate = useNavigate()
    const signInWithGoogle = async () => {
      const result = await signInWithPopup(auth,provider)
      navigate("/")
    }
  return (
    <div style={{height:"80vh"}} className="container d-flex flex-column align-items-center justify-content-center">
    <div className="h2 mb-4">Sign in with Google</div>
    <button
      onClick={signInWithGoogle}
      className="btn btn-primary btn-lg"
      style={{ backgroundColor: '#4285F4', borderColor: '#4285F4' }}
    >
      Sign In With Google
    </button>
  </div>

  )
}
