import React, { useState, useRef } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalVideos = 4;

  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);

  const getVideoSrc = (index) => `videos/hero-${index <= totalVideos ? index : 1}.mp4`;
  const nextIndex = currentIndex === totalVideos ? 1 : currentIndex + 1;

  useGSAP(() => {
    gsap.to("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
      duration: 1.2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "top center",
        end: "bottom center",
        scrub: true,
        // markers: true, // Uncomment to debug
      },
    });

    ScrollTrigger.refresh();
  }, []);

  const handleMiniVdClick = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    gsap.set(nextVideoRef.current, {
      visibility: 'visible',
      scale: 0,
      zIndex: 30,
    });

    gsap.to(nextVideoRef.current, {
      scale: 1,
      duration: 1.2,
      ease: 'power2.inOut',
      onStart: () => nextVideoRef.current?.play(),
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
        gsap.set(nextVideoRef.current, { visibility: 'hidden', scale: 0 });
      }
    });
  };

  return (
    <>
      <div className="relative h-dvh w-screen overflow-x-hidden">
        {/* Main Hero Layer */}
        <div className="absolute h-dvh w-screen overflow-x-hidden z-10">
          <div
            id="video-frame"
            className="relative z-10 h-dvh w-screen overflow-hidden will-change-transform"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              borderRadius: "0% 0% 0% 0%",
            }}
          >
            {/* Current Fullscreen Video */}
            <video
              id="main-video"
              ref={currentVideoRef}
              src={getVideoSrc(currentIndex)}
              autoPlay
              loop
              muted
              className="absolute left-0 top-0 size-full object-cover object-center"
            />

            {/* Next Video */}
            <video
              ref={nextVideoRef}
              src={getVideoSrc(nextIndex)}
              loop
              muted
              className="absolute left-0 top-0 size-full object-cover object-center invisible scale-0"
            />

            {/* Hoverable Mini Video */}
            <div className="absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  src={getVideoSrc(nextIndex)}
                  loop
                  muted
                  className="size-64 origin-center scale-150 object-cover object-center"
                />
              </div>
            </div>

            {/* Bottom Right Text */}
            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
              G<b>a</b>ming
            </h1>

            {/* Top Left Content */}
            <div className="absolute left-0 top-0 z-40 size-full">
              <div className="mt-5 px-5 sm:px-10">
                <h1 className="special-font hero-heading text-blue-75">redifi <b>n</b>e</h1>
                <p className="mb-5 max-w-64 font-robert-regular text-blue-75">
                  Enter the Metagame Layer <br /> Unleash the Play Economy
                </p>
                <Button
                  id="watch-trailer"
                  title="Watch Trailer"
                  leftIcon={<TiLocationArrow />}
                  containerClass="!bg-yellow-300 flex-center gap-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Overlapping Background Layer Below */}
        <div className="absolute h-dvh w-screen overflow-x-hidden z-0">
          <h1 className="special-font hero-heading absolute bottom-5 right-5 z-20 text-black">
            G<b>a</b>ming
          </h1>
        </div>
      </div>
    </>
  );
};

export default Hero;
