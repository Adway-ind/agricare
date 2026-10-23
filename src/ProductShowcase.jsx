import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Maximize,
} from "lucide-react";

// Replace sample names, descriptions and images with your real product details.

const products = [
  {
    name: "Calciflux",
    image: "/products/product-1.png",
    category: "CALCIUM OXIDE (CaO): 35%",
    description:
      "A concentrated calcium suspension designed to support crop calcium nutrition, fruit development, and produce quality.",
    highlight: "SUPPORTS CROP QUALITY",
  },
  {
    name: "SupremeK Pro",
    image: "/products/product-2.png",
    category: "HIGH-POTASSIUM FOLIAR FERTILIZER",
    description:
      "A concentrated potassium formula with micronutrients to support fruit size, colour, sugar content, and overall produce quality.",
    highlight: "POTASSIUM-POWERED NUTRITION",
  },
  {
    name: "CuraBor",
    image: "/products/product-3.png",
    category: "SPECIALIST CROP NUTRITION",
    description:
      "A specialist crop nutrition solution. Confirm the product composition and intended use before displaying specific benefits.",
    highlight: "TARGETED CROP NUTRITION",
  },
  {
    name: "IntenseZ Pro",
    image: "/products/product-4.png",
    category: "ZINC-ENRICHED NPK FOLIAR FERTILIZER",
    description:
      "An NPK foliar fertilizer with elevated zinc and additional micronutrients to support balanced crop nutrition and crop quality.",
    highlight: "ZINC-FOCUSED NUTRITION",
  },
  {
    name: "Nutristim+",
    image: "/products/product-5.png",
    category: "PLANT NUTRITION",
    description:
      "A specialist agricultural product. Add the verified formulation and product benefits from the manufacturer's label.",
    highlight: "PRODUCT DETAILS TO BE CONFIRMED",
  },
  {
    name: "FulviCarb - H",
    image: "/products/product-6.png",
    category: "CROP NUTRITION",
    description:
      "A crop nutrition product. Confirm its composition and recommended application from the official product documentation.",
    highlight: "FORMULATION TO BE CONFIRMED",
  },
  {
    name: "Quiksol",
    image: "/products/product-7.png",
    category: "AGRICULTURAL SOLUTION",
    description:
      "A product-specific description can be added once its formulation and intended agricultural use are verified.",
    highlight: "PRODUCT DETAILS TO BE CONFIRMED",
  },
  {
    name: "CuraPhos",
    image: "/products/product-8.png",
    category: "CROP NUTRITION",
    description:
      "A specialist agricultural product. Confirm its phosphorus content, formulation, and intended use before making nutrient claims.",
    highlight: "FORMULATION TO BE CONFIRMED",
  },
  {
    name: "Xcell",
    image: "/products/product-9.png",
    category: "AGRICULTURAL SOLUTION",
    description:
      "Add the verified product description and key benefits from the official manufacturer documentation.",
    highlight: "PRODUCT DETAILS TO BE CONFIRMED",
  },
  {
    name: "Calcizinc",
    image: "/products/product-10.png",
    category: "CROP NUTRITION",
    description:
      "Confirm the calcium and zinc composition and intended use from the product label before publishing specific benefits.",
    highlight: "NUTRIENT PROFILE TO BE CONFIRMED",
  },
  {
    name: "Combi2",
    image: "/products/product-11.png",
    category: "AGRICULTURAL SOLUTION",
    description:
      "Add the verified nutrient composition and product benefits from the manufacturer's technical information.",
    highlight: "PRODUCT DETAILS TO BE CONFIRMED",
  },
  {
    name: "Magnit",
    image: "/products/product-12.png",
    category: "CROP NUTRITION",
    description:
      "Confirm the product's nutrient composition and intended agricultural use before displaying technical claims.",
    highlight: "FORMULATION TO BE CONFIRMED",
  },
  {
    name: "Potassium Schoenite",
    image: "/products/product-13.png",
    category: "POTASSIUM AND MAGNESIUM NUTRITION",
    description:
      "A potassium-magnesium sulfate mineral fertilizer. Verify the grade and nutrient analysis of your specific product before displaying percentages.",
    highlight: "POTASSIUM & MAGNESIUM",
  },
  {
    name: "OroSol",
    image: "/products/product-14.png",
    category: "AGRICULTURAL SOLUTION",
    description:
      "Add the verified formulation, intended use, and key benefits from the official product documentation.",
    highlight: "PRODUCT DETAILS TO BE CONFIRMED",
  },
];

const HOLD_MS = 6000;
const TRANSITION_MS = 900;

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const transitionTimer = useRef(null);
  const controlsTimer = useRef(null);

  const activeProduct = products[activeIndex];

  const changeProduct = (nextIndex) => {
    if (transitionTimer.current) {
      clearTimeout(transitionTimer.current);
    }

    setIsVisible(false);

    transitionTimer.current = setTimeout(() => {
      setActiveIndex((nextIndex + products.length) % products.length);

      requestAnimationFrame(() => setIsVisible(true));
    }, TRANSITION_MS);
  };

  useEffect(() => {
    const intro = setTimeout(() => setIsVisible(true), 450);

    return () => {
      clearTimeout(intro);
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = setInterval(() => {
      changeProduct(activeIndex + 1);
    }, HOLD_MS);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

  const revealControls = () => {
    setShowControls(true);

    if (controlsTimer.current) {
      clearTimeout(controlsTimer.current);
    }

    controlsTimer.current = setTimeout(() => setShowControls(false), 3500);
  };

  useEffect(() => {
    revealControls();

    return () => {
      if (controlsTimer.current) {
        clearTimeout(controlsTimer.current);
      }
    };
  }, []);

  const fullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn("Fullscreen is not available.", error);
    }
  };

  return (
    <main
      className="showcase"
      onMouseMove={revealControls}
      onTouchStart={revealControls}
    >
      <div className="showcase__image-fallback" aria-hidden="true" />

      <video
        className="showcase__video"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/nature-podium.png"
      >
        <source src="/videos/v.mp4" type="video/mp4" />
      </video>

      <div className="showcase__shade" aria-hidden="true" />

      {/* Product bottle: keep the podium alignment unchanged */}

      <div
        className={`showcase__product-stage ${
          isVisible ? "product-reveal-active" : ""
        }`}
        aria-live="polite"
      >
        <div className="showcase__light-beam" aria-hidden="true" />
        <div className="showcase__energy-sweep" aria-hidden="true" />

        <img
          key={activeProduct.image}
          className={`showcase__product ${isVisible ? "is-visible" : ""}`}
          src={activeProduct.image}
          alt={activeProduct.name}
          draggable="false"
          onError={(event) => {
            event.currentTarget.style.opacity = "0";
          }}
        />
      </div>

      {/* Animated product information */}

      {/* Product title at the top center */}

      {/* Product details at the bottom */}

      {/* Product information — positioned to match the reference image */}
      <section
        key={`info-${activeIndex}`}
        className="showcase__info"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="showcase__title-callout">
          <span className="showcase__callout-label">
            PRECISION CROP NUTRITION
          </span>
          <h1>{activeProduct.name}</h1>

          <div className="showcase__product-subinfo">
            <span className="showcase__details-heading" aria-hidden="true" />
            <span className="showcase__details-highlight">
              {activeProduct.category || activeProduct.highlight}
            </span>
            <p>{activeProduct.description}</p>
          </div>
        </div>
      </section>

      {/* Presentation controls */}
      <div
        className={`showcase__controls ${
          showControls ? "controls-visible" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => changeProduct(activeIndex - 1)}
          aria-label="Previous product"
          title="Previous product"
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-label={isPaused ? "Play presentation" : "Pause presentation"}
          title={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play /> : <Pause />}
        </button>

        <button
          type="button"
          onClick={() => changeProduct(activeIndex + 1)}
          aria-label="Next product"
          title="Next product"
        >
          <ChevronRight />
        </button>

        <button
          type="button"
          onClick={() => {
            setIsPaused(true);
            changeProduct(0);
          }}
          aria-label="Restart presentation"
          title="Restart"
        >
          <RotateCcw />
        </button>

        <button
          type="button"
          onClick={fullscreen}
          aria-label="Toggle fullscreen"
          title="Fullscreen"
        >
          <Maximize />
        </button>

        <Link to="/launch" className="showcase__launch-link">
          Launch
        </Link>
      </div>

      <div
        className={`showcase__counter ${
          showControls ? "controls-visible" : ""
        }`}
        aria-hidden="true"
      >
        {String(activeIndex + 1).padStart(2, "0")}
        <span>/</span>
        {String(products.length).padStart(2, "0")}
      </div>
    </main>
  );
}
