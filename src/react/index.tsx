import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Sheet, SheetTrigger, SheetContent } from "../components/ui/sheet";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import "../js/app";

// SHADCN
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { ThemeProvider, useTheme } from "../components/ui/theme-provider";
import { ModeToggle } from "../components/ui/mode-toggle";

// ACETERNITY
import { CardRotation } from "./components/CardRotation";
import { BackgroundGradientAnimation } from "./components/GradientBackground.tsx";
import { GoogleGeminiEffect } from "./components/LineBackground.tsx";
import { Spotlight } from "./components/Spotlight.tsx";
import { CardStack } from "./components/CardStack.tsx";
import { cn } from "./utils/cn.ts";
import { StickyScroll } from "./components/StickyScrollReveal.tsx";
import { CardBody, CardContainer, CardItem } from "./components/3dCard.tsx";
import { SparklesCore } from "./components/Sparkles.tsx";

const siteURL = process.env.PRIMARY_SITE_URL;

const World = lazy(() => import("./components/globe.tsx"));

const globeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 2,
};
const colors = [
  "#00AF2C",
  "#00AAFF",
  "#FF0062",
  "#FFA400",
  "#FF00D5",
  "#0000FF",
];
const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 5,
    startLat: 14.5995,
    startLng: 120.9842,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 5,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 6,
    startLat: -15.432563,
    startLng: 28.315853,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 6,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 6,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 7,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 7,
    startLat: 48.8566,
    startLng: -2.3522,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 7,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: -8.833221,
    startLng: 13.264837,
    endLat: 43.9792,
    endLng: 18.436529,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: 49.2827,
    startLng: -123.1207,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 9,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 9,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 9,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 10,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 10,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 10,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 11,
    startLat: 41.9028,
    startLng: 12.4964,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 11,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 11,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 12,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 12,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 12,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 13,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 13,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 13,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 14,
    startLat: -33.936138,
    startLng: 18.436529,
    endLat: 43.9792,
    endLng: -71.1203,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div>
        Something went wrong! You should call Dan and make him fix it... His
        phone number is ~~~~~REDACTED~~~~~~
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Here is where SSR would gain us value. Pull in JS libraries easily, utilize them, have the Server
// return HTML to quickly render while we are fetching data to hydrate said HTML.
/**
 * How to implement a React frontend with GraphQL. Currently not using Server Components. Yet...
 * @returns html that renders as the app
 */

function App() {
  const { theme, fun } = useTheme();

  return (
    <>
      <div className="fixed top-0 right-0 z-50">
        <ModeToggle />
      </div>
      <div className="h-screen w-full rounded-md flex items-center justify-center dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="h-screen md:left-60 md:-top-40"
          fill={theme === "light" ? "grey" : "white"}
        />
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-neutral-700 dark:text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 ">
            {fun === "business" ? "Daniel Crump" : "Dan Crump"} <br />
            <CardStack
              items={[
                {
                  id: 0,
                  content: (
                    <p>
                      So that's how <Highlight>the web</Highlight> works
                    </p>
                  ),
                },
                {
                  id: 1,
                  content: (
                    <p>
                      So that's how <Highlight>owning a home</Highlight> works
                    </p>
                  ),
                },
                {
                  id: 2,
                  content: (
                    <p>
                      So that's how <Highlight>raising a family</Highlight>
                      works
                    </p>
                  ),
                },
                {
                  id: 3,
                  content: (
                    <p>
                      So that's how <Highlight>fixing an s10</Highlight> works
                    </p>
                  ),
                },
              ]}
            />
          </h1>
          <p className="text-2xl text-neutral-500 text-center mx-auto dark:text-neutral-300">
            Figuring out each facet of life one trial-and-error at a time!
          </p>
        </div>
      </div>

      <h2 className="h-[100px] mt-20 relative z-10 text-5xl bg-clip-text md:text-7xl text-transparent bg-gradient-to-b from-neutral-500 to-neutral-600 text-center font-sans font-bold">
        Some of my{" "}
        <span className="bg-clip-text bg-gradient-to-r to-emerald-700 from-sky-600 dark:to-emerald-600 dark:from-sky-400">
          Projects
        </span>
      </h2>
      <p className="text-center text-base md:text-lg font-normal mb-6 text-neutral-700 dark:text-neutral-200 mx-auto py-2">
        Psttt.... notice anything missing? Hint: it's styling... styling is
        missing
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 h-5/6 justify-center px-4 gap-x-2 dark:bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <ProjectCard
          header={"Gelinas Siding LLC"}
          description={`Given a deadline of 26 days, giving piece of mind to a business owner was my main priority`}
          url={"http://gelinas-siding.k9rria1zz3-rz83yxpn04d7.p.temp-site.link"}
          cta={"gelinassidding.com"}
          img="/local/gelinas.png"
          cardClass="col-span-1"
        />
        <ProjectCard
          header={"Shop Country Stores"}
          description={
            "A good moral project that I thought would be an amazing starting point for my portfolio"
          }
          url={"https://dancrump2.wixsite.com/shop-country-stores"}
          cta={"Shop Country Stores"}
          img="/local/scs.png"
          cardClass="md:col-span-2"
          perspective="2500px"
        />
        <ProjectCard
          header={"Ned Ninja"}
          description={"A buddy and his fish 🎣"}
          url={"http://app-feeney.k9rria1zz3-rz83yxpn04d7.p.temp-site.link/"}
          cta={"Ned Ninja"}
          img="/local/ned.png"
          cardClass="md:col-span-2"
          perspective="2500px"
        />
        <ProjectCard
          header={"WIP OSG Paintball map"}
          description={`A conversation turned into reality, hope to be able to refine this and actually get it onto OSG's website!`}
          url={"https://test-hover-map.multiscreensite.com/"}
          cta={"Would this be cool on their site?"}
          img="/local/osg.png"
          cardClass="col-span-1"
        />
        <ProjectCard
          header={"techdiff.io V1"}
          description={
            "I had started this project in Twig/PHP, but wanted to jump to client rendered code"
          }
          url={"http://old-techdiff.k9rria1zz3-rz83yxpn04d7.p.temp-site.link/"}
          cta={"old tech diff site"}
          img="/local/old_techdiff.png"
          cardClass="col-span-1"
        />
        <ProjectCard
          header={"Room To Improve Interiors"}
          description={
            "Working with my FMIL, we started making her dream jobs landing page."
          }
          url={"https://www.roomtoimproveinteriors.com"}
          cta={"Room to Improve"}
          img="/local/rtii.png"
          cardClass="col-span-1"
        />
        <ProjectCard
          header={"A tool for a friend"}
          description={"He uses Twitch far too much"}
          url={"http://twitch-clips.k9rria1zz3-rz83yxpn04d7.p.temp-site.link"}
          cta={"What happend to Heroku?"}
          img="/local/twitch.png"
          cardClass="col-span-1"
        />
        <ProjectCard
          header={"An old personal site"}
          description={"Back in my coding bootcamp days..."}
          url={"http://dan.k9rria1zz3-rz83yxpn04d7.p.temp-site.link"}
          cta={"An oldie but a goodie!"}
          img="/local/old.png"
          cardClass="md:col-span-3"
          perspective="5000px"
        />
      </div>

      <div className="w-full dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative">
        <h2 className="h-[100px] mt-40 relative z-10 text-5xl bg-clip-text md:text-7xl text-transparent bg-gradient-to-b from-neutral-500 to-neutral-600 text-center font-sans font-bold">
          About{" "}
          <span className="bg-clip-text bg-gradient-to-r to-emerald-700 from-sky-600 dark:to-emerald-600 dark:from-sky-400">
            Me
          </span>
        </h2>

        <p className="text-center text-base md:text-lg px-2 font-normal mb-6 text-neutral-700 dark:text-neutral-200 mx-auto py-2">
          Tearing apart toasters and XBox controllers, then paintball markers
          and cars. After I graduated college, I turned my attention towards
          computers...
        </p>

        <div className="max-w-[80vw] mx-auto md:flex md:justify-center md:gap-6">
          <Spotlight
            className="h-screen hidden md:block md:left-40 md:-top-0"
            fill={theme === "light" ? "grey" : "white"}
          />
          <img
            src={
              fun === "business"
                ? "/local/bw_ry_wedding.jpg"
                : "/local/bw_paintball.jpg"
            }
            className={`object-cover rounded-full h-[50vh] md:w-[25vw] md:h-[80vh] mx-auto md:mx-0`}
            alt="Picture of Dan"
          />
          {fun === "party" ? (
            <div className="pt-5">
              <TimelineHeading heading={"Sept 9, 2011"} />
              <TimelineItem
                heading="Paintball @ NHIP"
                text="Little did I know how much this would affect the course of my life!"
                Icon={() => null}
              />
              <TimelineHeading heading={"July 9, 2012"} />
              <TimelineItem
                heading="AG Paintball"
                text="Meeting my teammates in the wild"
                Icon={() => null}
              />
              <TimelineHeading heading={"August 25, 2012"} />
              <TimelineItem
                heading="Speedball makes an appearance"
                text="3 man games were a whole new experience"
                Icon={() => null}
              />
              <TimelineHeading heading={"Sept 16, 2012"} />
              <TimelineItem
                heading="The first tourney?"
                text="Didn't even have a jersey, but we went for it!"
                Icon={() => null}
              />
              <TimelineHeading heading={"Jan 28, 2014"} />
              <TimelineItem
                heading="Getting 2 new teammates"
                text="Time for some 5 man tournaments"
                Icon={() => null}
              />

              <TimelineHeading heading={"Apr 28, 2014"} />
              <TimelineItem
                heading="Bringing college friends to OSG"
                text="Knowing some of my OSG teammates went to UNH made the blend so much simpler"
                Icon={() => null}
              />
              <TimelineHeading heading={"Apr 5, 2017"} />
              <TimelineItem
                heading="The move to CO leads me to Blitz paintball"
                text="Here I was promoted to head ref for the summer and enjoyed learning about tons of different people and play styles"
                Icon={() => null}
              />
            </div>
          ) : (
            <div className="pt-5">
              <TimelineHeading heading={"Aug 2016"} />
              <TimelineItem
                heading="College in Colorado"
                text="I enjoy trying to understand peoples personalities and how they tick"
                Icon={() => (
                  <svg
                    className="flex-shrink-0 size-4 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" x2="8" y1="13" y2="13"></line>
                    <line x1="16" x2="8" y1="17" y2="17"></line>
                    <line x1="10" x2="8" y1="9" y2="9"></line>
                  </svg>
                )}
              />

              <TimelineHeading heading={"Apr 5, 2017"} />
              <TimelineItem
                heading="The move to CO leads me to Blitz paintball"
                text="Here I was promoted to head ref for the summer and enjoyed learning about tons of different people and play styles"
                Icon={() => null}
              />

              <TimelineHeading heading={"May 18, 2018"} />
              <TimelineItem
                heading="Move back to NH"
                text="I enjoy trying to understand computers and what makes them tick"
                Icon={() => null}
              />
              <TimelineHeading heading={"July 20, 2018"} />

              <TimelineItem
                heading="Move to Mnt Washington Valley"
                text="Home sweet home"
                Icon={() => null}
              />
              <TimelineHeading heading={"Sept, 2018"} />

              <TimelineItem
                heading="MERN stack coding bootcamp"
                text="Foundational knowledge I still use today!"
                Icon={() => null}
              />

              <TimelineHeading heading={"May, 18 2023"} />
              <TimelineItem
                heading="Married my best friend"
                text="Science can not have access to this 🦄"
                Icon={() => null}
              />
              <TimelineHeading heading={"July 2023"} />
              <TimelineItem
                heading="Bought property in the valley"
                text="A slice of paradise to start setting roots down into!"
                Icon={() => null}
              />

              <TimelineHeading heading={"Sept 2023"} />
              <TimelineItem
                heading="Player 3 enters the world"
                text="Just chill for now... 😉"
                Icon={() => null}
              />
            </div>
          )}
        </div>

        <Suspense fallback={<div>coming soon</div>}>
          <div className="flex flex-row items-center justify-center pt-20 h-screen md:h-auto dark:bg-black bg-white relative w-full">
            <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem]">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                }}
                className="div"
              >
                <h3 className="text-center text-xl md:text-2xl font-bold text-black dark:text-white">
                  Located in New Hampshire
                </h3>
                <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
                  Proud to work locally and with people across our world
                </p>
              </motion.div>
              <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
              <div className="absolute w-full -bottom-20 h-full z-10">
                <World data={sampleArcs} globeConfig={globeConfig} />;
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
}

const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const HoverCTA = ({ url, text }) => {
  const radius = 100; // change this to increase the rdaius of the hover effect

  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input w-max mx-auto mt-6"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-full border bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
           "
      >
        {text}
      </a>
    </motion.div>
  );
};

const ProjectCard = ({
  header,
  description,
  url,
  cta,
  img,
  cardClass,
  perspective = "1000px",
}) => {
  return (
    <CardContainer
      className="inter-var w-full h-full"
      containerClassName={cn(cardClass, "w-full")}
      perspective={perspective}
    >
      <CardBody className="bg-gray-50 relative group/card h-full dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-6 border  ">
        <CardItem translateZ={15}>
          <h3 className="w-full text-xl font-bold text-neutral-600 dark:text-white">
            {header}
          </h3>
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={img}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem translateZ={70}>
          <p className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
            {description}
          </p>
        </CardItem>
        <CardItem translateZ={15}>
          <HoverCTA url={url} text={cta} />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

const TimelineItem = ({ heading, text, Icon }) => {
  return (
    <div className="flex gap-x-3">
      <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
        <div className="relative z-10 size-7 flex justify-center items-center">
          <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
        </div>
      </div>

      {/* <!-- Right Content --> */}
      <div className="grow pt-0.5 pb-8">
        <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
          <Icon />
          {heading}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
          {text}
        </p>
      </div>
      {/* <!-- End Right Content --> */}
    </div>
  );
};

const TimelineHeading = ({ heading }) => {
  return (
    <div className="ps-2 my-2 first:mt-0">
      <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
        {heading}
      </h3>
    </div>
  );
};
