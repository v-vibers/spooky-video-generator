import { useSubscribeDev } from '@subscribe.dev/react'
import './SignInScreen.css'

export function SignInScreen() {
  const { signIn } = useSubscribeDev()

  return (
    <div className="sign-in-screen">
      <div className="sign-in-container">
        <div className="spooky-header">
          <h1 className="spooky-title">👻 Spooky Video Generator</h1>
          <p className="spooky-subtitle">Create terrifying AI-generated videos</p>
        </div>

        <div className="sign-in-content">
          <p className="sign-in-message">
            Sign in to start generating spine-chilling videos powered by AI
          </p>

          <button onClick={signIn} className="sign-in-button">
            Sign In to Continue
          </button>

          <div className="features">
            <div className="feature">
              <span className="feature-icon">🎬</span>
              <span>Generate custom spooky videos</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span>Fast AI-powered creation</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🌙</span>
              <span>Multiple horror themes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
