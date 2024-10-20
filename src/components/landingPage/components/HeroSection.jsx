import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import Tabs from "../../common/Tabs";

const StoreLink = ({ src, alt, link }) => (
  <motion.img
    src={src}
    alt={alt}
    height={70}
    width={140}
    className="!cursor-pointer"
    onClick={() => window.open(link, "_blank")}
    style={{ pointerEvents: "auto", zIndex: 9999 }}
  />
);

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const [tabs, setTabs] = useState("Currency Converter");
  const [hasTabClicked, setHasTabClicked] = useState(false);
  const [currentContent, setCurrentContent] = useState(0);
  const [screenImage, setScreenImage] = useState(
    "/assets/landing-page/screen-1.png"
  );

  const backgroundColors = ["#fff", "#000"];
  const textColors = ["#000", "#fff"];
  const radialGradientColors = [
    "",
    "radial-gradient(50% 50% at 50% 50%, #4602D9 0%, #111 100%)",
    "radial-gradient(50% 50% at 50% 50%, #C31111 0%, #111 100%)",
  ];
  const screenImages = [
    "/assets/landing-page/screen-1.png",
    "/assets/landing-page/screen-2.png",
    "/assets/landing-page/screen-3.png",
  ];
  const tabTitles = ["Currency Converter", "Live Rates", "Set Rate Alert"];

  const scrollBackgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    backgroundColors
  );
  const scrollTextColor = useTransform(scrollYProgress, [0, 0.5], textColors);
  const dataContent = useTransform(scrollYProgress, [0, 1], [0, 2]);

  useEffect(() => {
    const handleScrollChange = (latestValue) => {
      const roundedValue = Math.round(latestValue);
      if (roundedValue !== currentContent) {
        setCurrentContent(roundedValue);
        setScreenImage(screenImages[roundedValue]);
        setTabs(tabTitles[roundedValue]);
      }
    };

    const unsubscribe = dataContent.on("change", handleScrollChange);
    return () => unsubscribe();
  }, [dataContent, currentContent, tabTitles, screenImages]);

  const getStyles = (isTabClicked) => ({
    backgroundColor:
      isTabClicked || scrollYProgress.get() > 0.5
        ? backgroundColors[1]
        : scrollBackgroundColor,
    color:
      isTabClicked || scrollYProgress.get() > 0.5
        ? textColors[1]
        : scrollTextColor,
  });

  const getHeading = (value) =>
    value === 0
      ? "Send money to India at Google rates."
      : "Always know when it’s a good time to transfer with";

  const getSubHeading = (value) =>
    value === 0
      ? "Say goodbye to forex fees- get the best value for your transfers."
      : "Set a desired rate, and we'll notify you when it's time to make your move.";

  const screenTransitionVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
  };

  return (
    <motion.div
      className={cn("h-screen flex justify-center items-center")}
      style={getStyles(hasTabClicked)}
    >
      <motion.div className="fixed flex flex-col items-center w-full h-full top-32">
        <motion.div
          className="flex flex-col items-center justify-center w-full gap-y-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 className="w-full text-5xl font-bold text-center">
            {getHeading(currentContent)}
          </motion.h1>
          <motion.p className="text-lg font-medium text-center opacity-75 max-w-[700px]">
            {getSubHeading(currentContent)}
          </motion.p>
        </motion.div>

        <motion.div className="flex items-center justify-center mt-8 gap-x-3 h-fit">
          <StoreLink
            src="/assets/landing-page/app-store.png"
            alt="App Store"
            link="https://apps.apple.com/in/app/vance-money-transfer-to-india/id6444683240"
          />
          <StoreLink
            src="/assets/landing-page/play-store.png"
            alt="Play Store"
            link="https://play.google.com/store/apps/details?id=tech.vance.app&pli=1"
          />
        </motion.div>

        <motion.div
          className="absolute z-10 w-full h-full opacity-50 "
          style={{
            backgroundImage: radialGradientColors[currentContent],
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <motion.div
          className="relative z-20 h-full mt-10 opacity-50"
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src="/assets/landing-page/testimonials.png"
            alt="Testimonials"
            height={800}
            width={800}
            className={cn("object-cover object-center", {
              "opacity-10": currentContent !== 0,
            })}
          />
          <motion.div className="absolute -bottom-[10px] left-[56%] transform -translate-x-1/2 w-[380px] h-[600px] flex justify-center items-center">
            <motion.img
              src="/assets/landing-page/mobile-hands.png"
              className="relative object-cover object-center scale-110"
              style={{
                filter: "drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.2))",
              }}
            />
            {currentContent === 2 && (
              <motion.div
                className="absolute top-28 -left-2 w-full h-full object-contain z-[9999] transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                }}
              >
                <motion.img
                  src="/assets/landing-page/testimonial-card.png"
                  className="object-contain"
                  height={40}
                  width={280}
                />
              </motion.div>
            )}
            <motion.div className="absolute top-[25px] left-[34%] rounded-2xl transform -translate-x-1/2 w-[190px] h-[410px] overflow-hidden">
              <motion.img
                src={screenImages[0]}
                alt="Screen Image"
                className="absolute object-contain w-[290px] h-[410px]"
              />
            </motion.div>
            <motion.div className="absolute top-[25px] left-[34%] rounded-2xl transform -translate-x-1/2 w-[190px] h-[410px] overflow-hidden">
              <AnimatePresence mode="wait">
                {currentContent > 0 && (
                  <motion.img
                    key={screenImage}
                    src={screenImage}
                    alt="Screen Image"
                    variants={screenTransitionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.6 }}
                    className="absolute object-contain w-[290px] h-[410px]"
                  />
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              className={cn(
                "absolute left-[34%] rounded-2xl transform -translate-x-1/2 overflow-hidden",
                {
                  "bottom-60": currentContent === 0,
                  "bottom-80": currentContent !== 0,
                }
              )}
            >
              <Tabs tabs={tabs} handleTabChange={setTabs} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
