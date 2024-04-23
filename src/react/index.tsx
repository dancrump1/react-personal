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
  initialPosition: { lat: 43.9792, lng: -71.1203 },
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
      <div className="h-screen w-full rounded-md flex md:items-center md:justify-center dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-[-70px] h-screen md:left-60 md:-top-40"
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

      <h2 className="mt-20 relative z-10 text-5xl bg-clip-text md:text-7xl text-transparent bg-gradient-to-b from-neutral-500 to-neutral-600 text-center font-sans font-bold">
        Some of my{" "}
        <span className="bg-clip-text bg-gradient-to-r to-emerald-700 from-sky-600 dark:to-emerald-600 dark:from-sky-400">
          Projects
        </span>
      </h2>
      <p className="text-center text-base md:text-lg font-normal mb-6 text-neutral-700 dark:text-neutral-200 mx-auto py-2">
        Psttt.... notice anything missing? Hint: it's styling... styling is
        missing
      </p>
      <div className="flex flex-wrap h-5/6 justify-center px-12 gap-x-2 md:gap-x-12 dark:bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <ProjectCard
          header={"Gelinas Siding LLC"}
          description={`Given a deadline of 26 days, giving piece of mind to a business owner was my main priority`}
          url={"http://gelinas-siding.k9rria1zz3-rz83yxpn04d7.p.temp-site.link"}
          cta={"gelinassidding.com"}
          img="/local/gelinas.png"
        />
          <ProjectCard
            header={"Shop Country Stores"}
            description={
              "A good moral project that I thought would be an amazing starting point for my portfolio"
            }
            url={"https://dancrump2.wixsite.com/shop-country-stores"}
            cta={"Shop Country Stores"}
            img="/local/scs.png"
          />
        <ProjectCard
          header={"WIP OSG Paintball map"}
          description={`A conversation turned into reality, hope to be able to refine this and actually get it onto OSG's website!`}
          url={"https://test-hover-map.multiscreensite.com/"}
          cta={"Would this be cool on their site?"}
          img="/local/osg.png"
        />
        <ProjectCard
          header={"techdiff.io V1"}
          description={
            "I had started this project in Twig/PHP, but wanted to jump to client rendered code"
          }
          url={"http://old-techdiff.k9rria1zz3-rz83yxpn04d7.p.temp-site.link/"}
          cta={"old tech diff site"}
          img="/local/old_techdiff.png"
        />
        <ProjectCard
          header={"Room To Improve Interiors"}
          description={
            "Working with my FMIL, we started making her dream jobs landing page."
          }
          url={"https://www.roomtoimproveinteriors.com"}
          cta={"Room to Improve"}
          img="/local/rtii.png"
        />
        <ProjectCard
          header={"A tool for a friend"}
          description={"He uses Twitch far too much"}
          url={"http://twitch-clips.k9rria1zz3-rz83yxpn04d7.p.temp-site.link"}
          cta={"What happend to Heroku?"}
          img="/local/twitch.png"
        />
        <ProjectCard
          header={"An old personal site"}
          description={"Back in my coding bootcamp days..."}
          url={"http://dan.k9rria1zz3-rz83yxpn04d7.p.temp-site.link"}
          cta={"An oldie but a goodie!"}
          img="/local/old.png"
        />
      </div>

      <div className="w-full rounded-md md:items-center md:justify-center dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <h2 className="h-[55px] mt-20 relative z-10 text-5xl bg-clip-text md:text-7xl text-transparent bg-gradient-to-b from-neutral-500 to-neutral-600 text-center font-sans font-bold lg:h-[85px] md:h-[75px]">
          About{" "}
          <span className="bg-clip-text bg-gradient-to-r to-emerald-700 from-sky-600 dark:to-emerald-600 dark:from-sky-400">
            Me
          </span>
        </h2>

        <p className="text-center text-base md:text-lg font-normal mb-6 text-neutral-700 dark:text-neutral-200 mx-auto py-2">
          I started with toasters and XBox controllers, then moved onto
          paintball markers and cars. Then, I graduated college and needed a
          career.
        </p>

        <img
          src={
            fun === "business"
              ? "/local/profile.jpg"
              : "/local/bw_paintball.jpg"
          }
          className="mx-auto object-cover rounded-full md:max-h-[50vh]"
          alt="Picture of Dan"
        />
        <div className="flex flex-col md:grid md:grid-cols-2">
          <p className="text-center text-base md:text-lg font-normal mb-6 text-neutral-700 dark:text-neutral-200 mx-auto py-2">
            I enjoy trying to understand peoples personalities and how they tick
          </p>
          <p className="text-center text-base md:text-lg font-normal mb-6 text-neutral-700 dark:text-neutral-200 mx-auto py-2">
            I enjoy trying to understand computers and what makes them tick
          </p>
        </div>

        <Suspense fallback={<div>coming soon</div>}>
          <div className="flex flex-row items-center justify-center py-20 h-screen md:h-auto dark:bg-black bg-white relative w-full">
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
                  Proud to work locally
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

const ProjectCard = ({ header, description, url, cta, img }) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem translateZ={15}>
          <h3 className="text-xl font-bold text-neutral-600 dark:text-white">
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
