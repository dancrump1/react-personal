import React, { useEffect, useState } from "react";
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
import { ThemeProvider } from "../components/ui/theme-provider";
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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
  return (
    <>
      <div className="fixed top-0 right-0 z-50">
        <ModeToggle />
      </div>
      <div className="h-screen w-full rounded-md flex md:items-center md:justify-center dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-[-70px] h-screen md:left-60 md:-top-40"
          fill={ window.document.documentElement.classList.contains("light") ? "white" : 'green' }
        />
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-neutral-700 dark:text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 ">
            Dan Crump <br />
            <CardStack
              items={[
                {
                  id: 0,
                  content: (
                    <p>
                      So that's how
                      <Highlight> the web</Highlight> works
                    </p>
                  ),
                },
                {
                  id: 1,
                  content: (
                    <p>
                      So that's how
                      <Highlight> owning a home</Highlight> works
                    </p>
                  ),
                },
                {
                  id: 2,
                  content: (
                    <p>
                      So that's how
                      <Highlight> raising a family</Highlight> works
                    </p>
                  ),
                },
                {
                  id: 3,
                  content: (
                    <p>
                      So that's how
                      <Highlight> fixing an s10</Highlight> works
                    </p>
                  ),
                },
              ]}
            />
          </h1>
          <p className="mt-4 text-2xl text-neutral-500 max-w-lg text-center mx-auto dark:text-neutral-300">
            Figuring out each facet of life one trial-and-error at a time!
          </p>
        </div>
      </div>

      <h2 className="lg:h-[85px] md:h-[75px] h-[55px] mt-20 relative z-10 text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-600  text-center font-sans font-bold">
        Projects
      </h2>
      <div className="flex flex-wrap h-5/6 justify-center px-12 gap-2 md:gap-12 dark:bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem translateX={15} translateY={-10}>
              <h3>techdiff.io v1</h3>
            </CardItem>
            <CardItem translateZ={70}>
              <p>
                I had started this project in Twig/PHP, but wanted to jump to
                client rendered code
              </p>
            </CardItem>
            <CardItem translateZ={15}>
              <HoverCTA url={"google.com"} text="old tech diff site" />
            </CardItem>
          </CardBody>
        </CardContainer>
        <CardContainer>
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem translateX={15} translateY={-10}>
              <h3>Gelinas Siding LLC</h3>
            </CardItem>
            <CardItem translateZ={70}>
              <p>
                Given a deadline of 26 days, giving piece of mind to a business
                owner was my main priority
              </p>
            </CardItem>
            <CardItem translateZ={15}>
              <HoverCTA url={"google.com"} text="gelinassidding.com" />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      <div className="md:mt-24 w-full dark:bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-5xl text-3xl lg:text-7xl font-bold text-center text-neutral-800 relative z-20 dark:text-white">
          UI/UX coming soon... <br /> sorry for the barebones site!
        </h1>
        <div className="w-[40rem] relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor={
              window.document.documentElement.classList.contains("light")
                ? "#FFFFFF"
                : "#000000"
            }
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full dark:bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
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
      className="p-[2px] rounded-lg transition duration-300 group/input w-max mx-auto"
    >
      <a
        href={url}
        className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
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
