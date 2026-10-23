import React from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import "./ProductLaunch.css";


const products = [
  {
    name: "FulviCarb - H",
    category: "CROP NUTRITION",
    image: "/products/product-6.png",
    subtitle: "PRECISION CROP NUTRITION",
  },
  {
    name: "Nutristim+",
    category: "PLANT NUTRITION",
    image: "/products/product-5.png",
    subtitle: "POWERING CROP PERFORMANCE",
  },
];

export default function ProductLaunch() {
  const [active, setActive] = useState(0);
  const [revealing, setRevealing] = useState(true);
  const [paused, setPaused] = useState(false);

  const videoRef = useRef(null);
  const product = products[active];

  const changeProduct = (index) => {
    setRevealing(false);

    window.setTimeout(() => {
      setActive((index + products.length) % products.length);
      setRevealing(true);
    }, 500);
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
        poster="/images/nature-podium.png"
      >
        <source src="/videos/v.mp4" type="video/mp4" />
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
          <h1>{product.name}</h1>
          <div className="launch-rule" />
          <p>{product.category}</p>
        </div>

        <div className="launch-bottom-label">
          INNOVATION · NUTRITION · GROWTH
        </div>
      </section>

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

        <Link to="/" className="showcase__launch-link">
          Main
        </Link>
      </nav>
    </main>
  );
}
