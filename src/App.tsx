import { useSubscribeDev } from '@subscribe.dev/react'
import './App.css'
import { SignInScreen } from './components/SignInScreen'
import { SpookyVideoGenerator } from './components/SpookyVideoGenerator'

function App() {
  const { isSignedIn } = useSubscribeDev()

  return isSignedIn ? <SpookyVideoGenerator /> : <SignInScreen />
}

export default App
