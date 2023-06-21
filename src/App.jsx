import { useEffect, useState } from 'react'
import patternDesktop from './assets/pattern-divider-desktop.svg'
import patternMobile from './assets/pattern-divider-mobile.svg'
import dice from './assets/icon-dice.svg'
import './App.css'

function App() {
  const [advice, setAdvice] = useState(null)
  const [loading, setLoading] = useState(false)
  const adviceGenerator = async () => {
    setLoading(true)
    const data = await (await fetch(`https://api.adviceslip.com/advice`)).json()
    setAdvice(data.slip)
    setLoading(false)
  }

  useEffect(() => {
    adviceGenerator()
  }, [])
  return (
    <main className='container'>
      <div className="box">
        <h3>advice # {advice?.id}</h3>
        <p>{loading ? "Loading..." : `${advice?.advice}`}</p>
        <img src={`${patternDesktop}`} srcSet={`${patternMobile} 375w,${patternDesktop} 1440w`} alt="" />
        <button type='button' className={`dice ${loading ? 'rotating' : ''}`} onClick={adviceGenerator} disabled={loading}>
          <img src={dice} alt="" />
        </button>
      </div>
    </main>
  )
}

export default App
