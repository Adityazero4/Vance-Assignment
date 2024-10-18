import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import Tabs from "./Tabs";

const ScrollChangeDataAndColor = () => {
  const { scrollYProgress } = useScroll();
  const [tabs, setTabs] = useState("Currency Converter");
  const [hasTabClicked, setHasTabClicked] = useState(false); // Track if a tab was clicked

  // Scroll-based background and text color transitions
  const scrollBackgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#fff", "#000", "#000"]
  );
  const scrollTextColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#000", "#fff", "#fff"]
  );

  // State for background and text colors, which will be updated on tab clicks
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [textColor, setTextColor] = useState("#000");

  // Heading content changes with scroll progress
  const dataContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 2]);
  const [currentContent, setCurrentContent] = useState(0);

  // Update the content and allow scroll to work when no tab click happens
  useEffect(() => {
    if (!hasTabClicked) {
      const unsubscribe = dataContent.onChange((latestValue) => {
        const roundedValue = Math.round(latestValue);
        setCurrentContent(roundedValue);

        // Automatically change the tab based on scroll progress
        if (roundedValue === 0) {
          setTabs("Currency Converter");
          setBackgroundColor("#fff");
          setTextColor("#000");
        } else if (roundedValue === 1) {
          setTabs("Live Rates");
          setBackgroundColor("#000");
          setTextColor("#fff");
        } else if (roundedValue === 2) {
          setTabs("Set Rate Alert");
          setBackgroundColor("#000");
          setTextColor("#fff");
        }
      });

      return () => unsubscribe();
    }
  }, [dataContent, hasTabClicked]);

  // Tab click handler
  const handleTabChange = (tabTitle) => {
    setHasTabClicked(true); // Set flag to indicate that a tab was manually clicked
    setTabs(tabTitle);

    if (tabTitle === "Currency Converter") {
      setBackgroundColor("#fff");
      setTextColor("#000");
      setCurrentContent(0);
    } else if (tabTitle === "Live Rates") {
      setBackgroundColor("#000");
      setTextColor("#fff");
      setCurrentContent(1);
    } else if (tabTitle === "Set Rate Alert") {
      setBackgroundColor("#000");
      setTextColor("#fff");
      setCurrentContent(2);
    }
  };

  // Function to change heading based on scroll or tab change
  const getHeading = (value) => {
    if (value === 0) return "Send money to India at Google rates.";
    return "Always know when it’s a good time to transfer with";
  };

  return (
    <motion.div
      className={cn("min-h-screen flex justify-center items-center p-5")}
      // Prioritize background and text color changes based on tab clicks
      style={{
        backgroundColor: hasTabClicked
          ? backgroundColor
          : scrollBackgroundColor,
        color: hasTabClicked ? textColor : scrollTextColor,
      }}
    >
      <motion.div className="fixed flex flex-col items-center top-28">
        <motion.h1 className="text-4xl font-bold text-center w-full">
          {getHeading(currentContent)}
        </motion.h1>

        {/* This paragraph and other content remain fixed */}
        <motion.p className="text-center opacity-75 text-base mt-5">
          Say goodbye to forex fees- get the best value for your transfers
        </motion.p>

        {/* Fixed store logos */}
        <motion.div className="flex justify-center items-center gap-x-3 mt-8">
          <motion.img
            src="/assets/landing-page/app-store.png"
            alt="App Store"
            height={60}
            width={120}
          />
          <motion.img
            src="/assets/landing-page/play-store.png"
            alt="Play Store"
            height={60}
            width={120}
          />
        </motion.div>

        {/* Fixed testimonial image */}
        <motion.div className="relative">
          <motion.img
            src="/assets/landing-page/testimonials.png"
            alt="Testimonials"
            height={500}
            width={500}
            className="object-cover object-center scale-150 mt-20"
          />
          <motion.div className="absolute bottom-0 left-[60%] transform -translate-x-1/2">
            <motion.img
              src="/assets/landing-page/mobile-hands.png"
              height={400}
              width={200}
              className="object-cover object-center scale-150"
            />
          </motion.div>
          <motion.div className="absolute bottom-28 right-[50%] transform translate-x-1/2">
            <Tabs tabs={tabs} handleTabChange={handleTabChange} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollChangeDataAndColor;
