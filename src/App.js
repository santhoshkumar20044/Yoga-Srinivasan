import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  // Only WORKING videos (removed all broken links)
  const allVideos = [
    { id: 1, title: "🎬 Chee Short Film - Diploma Project", type: "youtube", url: "https://www.youtube.com/embed/83me_qqq6nk", platform: "YouTube" },
    { id: 2, title: "🎤 Lyrical Video Production", type: "youtube", url: "https://www.youtube.com/embed/svbZ53t7Awc", platform: "YouTube" },
    { id: 3, title: "🧟 Zombie Movie - Lyrical Video", type: "youtube", url: "https://www.youtube.com/embed/eDsfhJ65cZE", platform: "YouTube" },
    { id: 4, title: "🎶 Premji Album Song - Music Video", type: "youtube", url: "https://www.youtube.com/embed/MLXCWbVRmGA", platform: "YouTube" },
    { id: 5, title: "🎓 SRM School of Media Studies", type: "youtube", url: "https://www.youtube.com/embed/9asK9liQUPA", platform: "YouTube" },
    { id: 6, title: "⭐ IMDb Profile - Film Credits", type: "imdb", url: "https://www.imdb.com/name/nm12827872/", platform: "IMDb", isExternal: true }
  ];

  const showreelVideos = allVideos.filter(v => !v.isExternal);
  
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const reelTimerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const reelFrameRef = useRef(null);

  const getPlatformIcon = (platform) => {
    if (platform === 'YouTube') return 'fab fa-youtube';
    if (platform === 'Instagram') return 'fab fa-instagram';
    return 'fab fa-imdb';
  };

  const resetTimer = () => {
    if (reelTimerRef.current) clearInterval(reelTimerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    if (isPlaying) {
      setProgress(0);
      const startTime = Date.now();
      
      reelTimerRef.current = setInterval(() => {
        goToNext();
      }, 5000);
      
      progressIntervalRef.current = setInterval(() => {
        if (!isPlaying) return;
        const elapsed = Date.now() - startTime;
        let percent = (elapsed / 5000) * 100;
        if (percent >= 100) {
          percent = 100;
          clearInterval(progressIntervalRef.current);
        }
        setProgress(percent);
      }, 50);
    } else {
      setProgress(0);
    }
  };

  const loadShowreelVideo = (index) => {
    setCurrentReelIndex(index);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentReelIndex((prev) => (prev + 1) % showreelVideos.length);
  };

  const goToPrev = () => {
    setCurrentReelIndex((prev) => (prev - 1 + showreelVideos.length) % showreelVideos.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playVideoInPlayer = (video) => {
    if (video.isExternal) {
      window.open(video.url, '_blank');
      return;
    }
    const showreelIndex = showreelVideos.findIndex(v => v.id === video.id);
    if (showreelIndex !== -1) {
      setCurrentReelIndex(showreelIndex);
      resetTimer();
    } else {
      // For any other video (though all are in showreel)
      if (reelFrameRef.current) {
        let embedUrl = video.url;
        if (video.type === 'youtube') {
          embedUrl = video.url + "?autoplay=1&rel=0";
        }
        // This would need additional state for custom video
      }
    }
    document.querySelector('.showreel-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Effect to load video when index changes
  useEffect(() => {
    resetTimer();
  }, [currentReelIndex, isPlaying]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (reelTimerRef.current) clearInterval(reelTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const currentVideo = showreelVideos[currentReelIndex];
  const embedUrl = currentVideo?.type === 'youtube' 
    ? `${currentVideo.url}?autoplay=0&rel=0&modestbranding=1&showinfo=0`
    : currentVideo?.url;

  return (
    <div className="main-container">
      {/* Premium Profile Section */}
      <div className="profile-row">
        <div className="photo-col">
          <div className="avatar">
            <img src="image.png" alt="Yoga Srinivasan" onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=Yoga+S'} />
          </div>
        </div>
        <div className="about-col">
          <h1>Yoga Srinivasan</h1>
          <div className="role">
            <i className="fas fa-video"></i> Video Editor & Motion Graphics Artist
          </div>
          <p>🎬 12+ years experience in film editing, post-production, and motion graphics. Expert in Adobe Premiere Pro, After Effects, DaVinci Resolve, Final Cut Pro.</p>
          <p>🏆 Edited Telugu feature film <strong>"Brandy Diaries"</strong>, Tamil film <strong>"Login"</strong>, Z Tamil Channel 'Uyir Mei' serial, and 85+ projects.</p>
          <div className="contact-row">
            <span><i className="fas fa-envelope"></i> sriniofficial90@gmail.com</span>
            <span><i className="fas fa-phone"></i> +91 95008 14946</span>
            <span><i className="fas fa-map-marker"></i> Chennai, India</span>
          </div>
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="work-section">
        <div className="section-title">
          <i className="fas fa-briefcase"></i>
          <span>Professional Journey</span>
        </div>
        <div className="exp-list">
          <div className="exp-card">
            <h3>Senior Video Editor</h3>
            <div className="exp-company">STRAIVE (Edtech) | 2022 – Present</div>
            <p>Educational videos, motion graphics, post-production</p>
          </div>
          <div className="exp-card">
            <h3>Assistant Professor</h3>
            <div className="exp-company">SRM University | 2016 – 2020</div>
            <p>Mentored 150+ students, NLE curriculum design</p>
          </div>
          <div className="exp-card">
            <h3>Video Editor</h3>
            <div className="exp-company">News 7 Tamil | 2014 – 2016</div>
            <p>News editing, color correction, broadcast packaging</p>
          </div>
          <div className="exp-card">
            <h3>Feature Film Editor</h3>
            <div className="exp-company">"Brandy Diaries" & "Login"</div>
            <p>Full feature editing, color grading, post-production</p>
          </div>
        </div>
      </div>

      {/* Compact Showreel Section */}
      <div className="showreel-section">
        <div className="showreel-title">
          <i className="fas fa-play-circle"></i>
          <span>🎬 Premium Showreel</span>
        </div>
        <div className="compact-player">
          <div className="video-frame">
            <iframe 
              ref={reelFrameRef}
              src={embedUrl} 
              allow="autoplay; encrypted-media; fullscreen" 
              allowFullScreen
              title="Showreel Player"
            ></iframe>
          </div>
          <div className="player-controls">
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="ctrl-btn" onClick={goToPrev}>
                <i className="fas fa-backward"></i> Prev
              </button>
              <button className="ctrl-btn" onClick={goToNext}>
                Next <i className="fas fa-forward"></i>
              </button>
              <button className="ctrl-btn" onClick={togglePlayPause}>
                {isPlaying ? <><i className="fas fa-pause"></i> Pause</> : <><i className="fas fa-play"></i> Play</>}
              </button>
            </div>
            <div className="video-info">
              <i className={getPlatformIcon(currentVideo?.platform)}></i> {currentVideo?.title?.substring(0, 40)}
            </div>
            <div className="timeline">
              <div className="timeline-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <div className="thumb-strip">
            {showreelVideos.map((video, idx) => (
              <div 
                key={video.id}
                className={`thumb ${idx === currentReelIndex ? 'active' : ''}`}
                onClick={() => loadShowreelVideo(idx)}
              >
                <i className={getPlatformIcon(video.platform)}></i>
                <span>{video.title.substring(0, 12)}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="reel-note">▶ Each video plays for 5 seconds automatically | Click any thumbnail to watch</p>
      </div>

      {/* Complete Portfolio Grid */}
      <div className="videos-section">
        <div className="section-title">
          <i className="fas fa-th-large"></i>
          <span>📽️ Complete Portfolio</span>
        </div>
        <div className="video-grid">
          {allVideos.map((video) => (
            <div 
              key={video.id}
              className="video-card"
              onClick={() => playVideoInPlayer(video)}
            >
              <div className="video-thumb">
                <i className={getPlatformIcon(video.platform)}></i>
              </div>
              <div className="video-card-info">
                <h4>{video.title}</h4>
                <div className="platform-badge">
                  <i className={getPlatformIcon(video.platform)}></i> {video.platform}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <p><i className="fas fa-copyright"></i> 2025 Yoga Srinivasan | Premium Video Editor Portfolio | All videos play inside website</p>
      </footer>
    </div>
  );
};

export default App;