import { useState } from 'react'
import { useSubscribeDev } from '@subscribe.dev/react'
import './SpookyVideoGenerator.css'

type GenerationHistory = {
  prompt: string
  videoUrl: string
  generatedAt: number
}

const SPOOKY_THEMES = [
  'A ghostly figure floating through a misty graveyard at midnight',
  'A haunted house with flickering lights and moving shadows',
  'A creepy forest with glowing eyes in the darkness',
  'A zombie slowly emerging from the ground in an abandoned cemetery',
  'A witch brewing a mysterious potion with magical smoke',
  'A vampire castle on a stormy night with lightning strikes',
  'A possessed doll moving on its own in a dark attic',
  'A shadowy creature lurking in an abandoned asylum',
]

export function SpookyVideoGenerator() {
  const {
    client,
    usage,
    subscribe,
    subscriptionStatus,
    useStorage,
    signOut,
    user,
  } = useSubscribeDev()

  const [history, setHistory, syncStatus] = useStorage!<GenerationHistory[]>('video-history', [])
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)

  const handleGenerate = async (customPrompt?: string) => {
    if (!client) return

    const videoPrompt = customPrompt || prompt
    if (!videoPrompt.trim()) {
      setError('Please enter a prompt or select a theme')
      return
    }

    setLoading(true)
    setError(null)
    setCurrentVideo(null)

    try {
      const response = await client.run('wan-video/wan-2.2-5b-fast', {
        input: {
          prompt: videoPrompt,
          aspect_ratio: '16:9',
        },
      })

      const [videoUrl] = response.output as string[]
      setCurrentVideo(videoUrl)

      // Add to history
      const newEntry: GenerationHistory = {
        prompt: videoPrompt,
        videoUrl,
        generatedAt: Date.now(),
      }
      setHistory([newEntry, ...history.slice(0, 9)]) // Keep last 10
      setPrompt('')
    } catch (err: any) {
      console.error('Generation failed:', err)

      if (err.type === 'insufficient_credits') {
        setError('Insufficient credits. Please upgrade your plan to continue generating videos.')
      } else if (err.type === 'rate_limit_exceeded') {
        const retrySeconds = Math.ceil((err.retryAfter || 60000) / 1000)
        setError(`Rate limit exceeded. Please try again in ${retrySeconds} seconds.`)
      } else {
        setError(err.message || 'Failed to generate video. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleThemeClick = (theme: string) => {
    setPrompt(theme)
    handleGenerate(theme)
  }

  return (
    <div className="spooky-generator">
      <header className="generator-header">
        <div className="header-content">
          <h1 className="app-title">👻 Spooky Video Generator</h1>
          <div className="user-section">
            <div className="user-info">
              {user?.email && <span className="user-email">{user.email}</span>}
              <div className="credits-badge">
                <span className="credits-icon">⚡</span>
                <span>{usage?.remainingCredits ?? 0} credits</span>
              </div>
            </div>
            <div className="header-actions">
              {subscribe && (
                <button onClick={subscribe} className="manage-button">
                  Manage Plan
                </button>
              )}
              <button onClick={signOut} className="sign-out-button">
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="plan-status">
          <span className="plan-badge">
            {subscriptionStatus?.plan?.name ?? 'Free Plan'}
          </span>
          {syncStatus !== 'synced' && (
            <span className="sync-status">
              {syncStatus === 'syncing' ? '⏳ Syncing...' :
               syncStatus === 'local' ? '📱 Local' :
               '⚠️ Sync error'}
            </span>
          )}
        </div>
      </header>

      <main className="generator-main">
        <div className="generator-controls">
          <div className="prompt-section">
            <label htmlFor="prompt" className="prompt-label">
              Enter your spooky scene description:
            </label>
            <div className="prompt-input-container">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your terrifying scene..."
                className="prompt-input"
                rows={3}
                disabled={loading}
              />
            </div>
            <button
              onClick={() => handleGenerate()}
              disabled={loading || !prompt.trim()}
              className="generate-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating...
                </>
              ) : (
                <>
                  <span>🎬</span>
                  Generate Spooky Video
                </>
              )}
            </button>
          </div>

          <div className="themes-section">
            <h2 className="themes-title">Or choose a spooky theme:</h2>
            <div className="themes-grid">
              {SPOOKY_THEMES.map((theme, index) => (
                <button
                  key={index}
                  onClick={() => handleThemeClick(theme)}
                  disabled={loading}
                  className="theme-button"
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
            {error.includes('credits') && subscribe && (
              <button onClick={subscribe} className="upgrade-button">
                Upgrade Plan
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="loading-section">
            <div className="loading-animation">
              <span className="ghost-loader">👻</span>
            </div>
            <p className="loading-text">Conjuring your spooky video...</p>
            <p className="loading-subtext">This may take a minute</p>
          </div>
        )}

        {currentVideo && !loading && (
          <div className="video-result">
            <h2 className="result-title">Your Spooky Creation</h2>
            <div className="video-container">
              <video
                src={currentVideo}
                controls
                autoPlay
                loop
                className="generated-video"
              />
            </div>
            <a
              href={currentVideo}
              download="spooky-video.mp4"
              className="download-button"
            >
              Download Video
            </a>
          </div>
        )}

        {history.length > 0 && (
          <div className="history-section">
            <h2 className="history-title">Recent Generations</h2>
            <div className="history-grid">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <video
                    src={item.videoUrl}
                    className="history-video"
                    onClick={() => setCurrentVideo(item.videoUrl)}
                  />
                  <div className="history-info">
                    <p className="history-prompt">{item.prompt}</p>
                    <p className="history-date">
                      {new Date(item.generatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
