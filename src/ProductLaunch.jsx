import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
  EighthNotes,
  HeadphoneOff 
} from "lucide-react";
import { Link } from "react-router-dom";
import "./ProductLaunch.css";
import naturePodium from "./assets/images/nature-podium.png";
import launchVideo from "./assets/videos/luanch.mp4";
import product5 from "./assets/products/product-5.png";
import product6 from "./assets/products/product-6.png";
import launchMusic from "./assets/music/audio.mp3";

const products = [
  {
    name: "FulviCarb - H",
    category: "CROP NUTRITION",
    image: product6,
    subtitle: "PRECISION CROP NUTRITION",
    titleBg: "#d8291d", // Premium gold
  },
  {
    name: "Nutristim+",
    category: "PLANT NUTRITION",
    image: product5,
    subtitle: "POWERING CROP PERFORMANCE",
    titleBg: "#830606", // Agricultural green
  },
];

export default function ProductLaunch() {
  const [active, setActive] = useState(0);
  const [revealing, setRevealing] = useState(true);
  const [paused, setPaused] = useState(false);

  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.35);

  const audioRef = useRef(null);

  const videoRef = useRef(null);
  const product = products[active];

  const changeProduct = (index) => {
    setRevealing(false);

    window.setTimeout(() => {
      setActive((index + products.length) % products.length);
      setRevealing(true);
    }, 500);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = musicVolume;
    audio.muted = musicMuted;
  }, [musicVolume, musicMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => setMusicPlaying(true))
      .catch(() => setMusicPlaying(false));
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setMusicPlaying(true);
      } catch (error) {
        setMusicPlaying(false);
        console.warn("Music playback requires user interaction.", error);
      }
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  const toggleMusicMute = () => {
    setMusicMuted((muted) => !muted);
  };

  // Automatically rotate products every 9 seconds unless paused.
  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      changeProduct(active + 1);
    }, 9000);

    return () => window.clearInterval(timer);
  }, [active, paused]);

  // Pause or resume the background video and presentation.
  const togglePause = () => {
    setPaused((prev) => !prev);
  };

  const fullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen unavailable", error);
    }
  };

  return (
    <main className="launch-page">
      <video
        ref={videoRef}
        className="launch-background"
        autoPlay
        muted
        loop
        playsInline
        poster={naturePodium}
      >
        <source src={launchVideo} type="video/mp4" />
      </video>

      <div className="launch-overlay" />
      <div className="launch-vignette" />

      <header className="launch-header">
        <span className="launch-eyebrow">EXCLUSIVE PRODUCT LAUNCH</span>

        <span className="launch-index">
          0{active + 1} <i /> 0{products.length}
        </span>
      </header>

      <section
        className={`launch-stage ${revealing ? "launch-active" : ""}`}
        key={product.name}
      >
        <div className="launch-light-beam" />
        <div className="launch-energy-sweep" />

        <div className="launch-product">
          <div className="launch-product-glow" />

          <img
            src={product.image}
            alt={product.name}
            draggable="false"
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
        </div>

        <div className="launch-title">
          <span className="launch-kicker">{product.subtitle}</span>

          <h1
            style={{
              backgroundColor: product.titleBg,
            }}
          >
            {product.name}
          </h1>

          <div className="launch-rule" />
          <p>{product.category}</p>
        </div>
      </section>
      <div className="launch-bottom-label">INNOVATION · NUTRITION · GROWTH</div>

      <nav className="launch-controls" aria-label="Launch controls">
        <button
          onClick={() => changeProduct(active - 1)}
          aria-label="Previous product"
          title="Previous product"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => changeProduct(active + 1)}
          aria-label="Next product"
          title="Next product"
        >
          <ChevronRight />
        </button>

        <button
          onClick={togglePause}
          aria-label={paused ? "Resume slider" : "Pause slider"}
          title={paused ? "Resume slider" : "Pause slider"}
        >
          {paused ? <Play /> : <Pause />}
        </button>

        <button onClick={fullscreen} aria-label="Fullscreen" title="Fullscreen">
          <Maximize />
        </button>
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
          title={
            musicPlaying ? "Pause background music" : "Play background music"
          }
        >
          {musicPlaying ? <EighthNotes  size={20} /> : <HeadphoneOff   size={20} />}
        </button>

        <Link to="/" className="showcase__launch-link">
          Main
        </Link>
      </nav>
      <audio ref={audioRef} src={launchMusic} loop preload="auto" />
      
    </main>
  );
}
