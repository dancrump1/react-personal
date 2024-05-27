import React, { Suspense, lazy, useEffect } from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider, useTheme } from "../components/ui/theme-provider";
import { ModeToggle } from "../components/ui/mode-toggle";

// ACETERNITY
import { Spotlight } from "./components/Spotlight.tsx";
import { CardStack } from "./components/CardStack.tsx";
import { cn } from "./utils/cn.ts";
import { CardBody, CardContainer, CardItem } from "./components/3dCard.tsx";

import "../js/app";
import { WobbleCard } from "./components/WobbleCard.tsx";

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

  // open modal by id
  function openModal(id) {
    document.getElementById(`${id}-modal`)?.classList.add("open");
    document.body.classList.add("modal-open");
  }
  // close currently open modal
  function closeModal() {
    document.querySelector(".modal.open")?.classList.remove("open");
    document.body.classList.remove("modal-open");
  }

  useEffect(() => {
    // close modals on background click
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
        closeModal();
      }
    });
    document
      .getElementById("sherwood_forest")
      ?.addEventListener("click", (event) => {
        openModal(event.target.id);
      });
    document.getElementById("star_wars")?.addEventListener("click", (event) => {
      openModal(event.target.id);
    });
    document
      .getElementById("first_contact")
      ?.addEventListener("click", (event) => {
        openModal(event.target.id);
      });
    document.getElementById("area_51")?.addEventListener("click", (event) => {
      openModal(event.target.id);
    });
    document
      .getElementById("halo_village")
      ?.addEventListener("click", (event) => {
        openModal(event.target.id);
      });
    document
      .getElementById("empire_castle")
      ?.addEventListener("click", (event) => {
        openModal(event.target.id);
      });
    document
      .getElementById("hamburger_hill")
      ?.addEventListener("click", (event) => {
        openModal(event.target.id);
      });
    document
      .getElementById("james_woods")
      ?.addEventListener("click", (event) => {
        openModal(event.target.id);
      });
    document.getElementById("tombstone")?.addEventListener("click", (event) => {
      openModal(event.target.id);
    });
    document.getElementById("the_lz")?.addEventListener("click", (event) => {
      openModal(event.target.id);
    });
    document.getElementById("mounds")?.addEventListener("click", (event) => {
      openModal(event.target.id);
    });
    document
      .getElementById("pirate_cove")
      ?.addEventListener("click", (event) => {
        openModal(event.target.id);
      });
    document
      .getElementById("urban_town")
      ?.addEventListener("click", (event) => {
        openModal(event.target.id);
      });
    document
      .getElementById("sherwood_forest")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("star_wars")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("first_contact")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("area_51")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("halo_village")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("empire_castle")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("hamburger_hill")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("james_woods")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("tombstone")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("the_lz")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("mounds")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("pirate_cove")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("urban_town")
      ?.addEventListener("mouseenter", (event) => {
        event.target.style.fill = "#00000080";
      });
    document
      .getElementById("sherwood_forest")
      ?.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#00000000";
      });
    document
      .getElementById("star_wars")
      ?.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#00000000";
      });
    document
      .getElementById("first_contact")
      ?.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#00000000";
      });
    document
      .getElementById("area_51")
      ?.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#00000000";
      });
    document
      .getElementById("halo_village")
      ?.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#00000000";
      });
    document
      .getElementById("empire_castle")
      ?.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#00000000";
      });
    document
      .getElementById("hamburger_hill")
      ?.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#00000000";
      });
    document
      .getElementById("james_woods")
      ?.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#00000000";
      });
    document
      .getElementById("tombstone")
      ?.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#00000000";
      });
    document.getElementById("the_lz")?.addEventListener("mouseout", (event) => {
      event.target.style.fill = "#00000000";
    });
    document.getElementById("mounds")?.addEventListener("mouseout", (event) => {
      event.target.style.fill = "#00000000";
    });
    document
      .getElementById("pirate_cove")
      ?.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#00000000";
      });
    document
      .getElementById("urban_town")
      ?.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#00000000";
      });
  }, []);

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
            Figuring out each facet of life one trial-and-error at a time
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
        "I can't pick the paint color, or the decor for the walls, or which
        style sink to install. But, I can paint with the color you choose, I can
        hang anything you pick, and can build a whole bathroom to fit the sink
        you choose."
      </p>
      <div className="grid overflow-hidden grid-cols-1 mb-6 md:grid-cols-3 h-5/6 justify-center pt-7 px-4 md:px-16 gap-14 dark:bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <ProjectCard
          header={"Gelinas Siding LLC (Apr 10, 2024)"}
          description={`Given a deadline of 26 days, giving piece of mind to a business owner was my main priority`}
          url={"https://gelinassiding.com"}
          cta={"gelinassidding.com"}
          img="/local/gelinas.png"
          cardClass="col-span-1"
        />
        <ProjectCard
          header={"Shop Country Stores (Jan 2024, WIX)"}
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
          header={"Emma's Physical Therapy"}
          description={"New beginnings deserve a good start"}
          url={"http://emma.5ms7u3m2ew-xlm41vl554dy.p.temp-site.link/"}
          cta={"PT for you and me"}
          img="/local/Untitled.png"
          cardClass="md:col-span-2"
          perspective="2500px"
        />
        <ProjectCard
          header={"Ned Ninja (Apr 19, 2024)"}
          description={"A buddy and his fish 🎣"}
          url={"http://ned-ninja.k9rria1zz3-rz83yxpn04d7.p.temp-site.link/"}
          cta={"Ned Ninja"}
          img="/local/ned.png"
          cardClass="md:col-span-1"
          perspective="2500px"
        />

        <ProjectCard
          header={"techdiff.io V1 (Nov 14, 2023)"}
          description={
            "I had started this project in Twig/PHP, but wanted to jump to client rendered code"
          }
          url={"http://old-techdiff.k9rria1zz3-rz83yxpn04d7.p.temp-site.link/"}
          cta={"old tech diff site"}
          img="/local/old_techdiff.png"
          cardClass="col-span-1"
        />
        <ProjectCard
          header={"Room To Improve Interiors (Aug 26, 2023)"}
          description={
            "Working with my FMIL, we started making her dream jobs landing page."
          }
          url={"https://www.roomtoimproveinteriors.com"}
          cta={"Room to Improve"}
          img="/local/rtii.png"
          cardClass="col-span-1"
        />
        <ProjectCard
          header={"A tool for a friend (Jan 25, 2020)"}
          description={"He uses Twitch far too much"}
          url={"http://twitch-clips.k9rria1zz3-rz83yxpn04d7.p.temp-site.link"}
          cta={"What happend to Heroku?"}
          img="/local/twitch.png"
          cardClass="col-span-1"
        />
        <ProjectCard
          header={"An old personal site (Mar 21, 2019)"}
          description={"Back in my coding bootcamp days..."}
          url={"http://dan.k9rria1zz3-rz83yxpn04d7.p.temp-site.link"}
          cta={"An oldie but a goodie!"}
          img="/local/old.png"
          cardClass="md:col-span-3"
          perspective="5000px"
        />
        <>
          <div id="sherwood_forest-modal" className="modal">
            <div className="modal-body">
              <h1>pictures of big woods</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="hamburger_hill-modal" className="modal">
            <div className="modal-body">
              <h1>pictures of hamburger hill</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="star_wars-modal" className="modal">
            {" "}
            <div className="modal-body">
              {" "}
              <h1>pictures of star wars</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="first_contact-modal" className="modal">
            {" "}
            <div className="modal-body">
              {" "}
              <h1>pictures of first contact</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="area_51-modal" className="modal">
            {" "}
            <div className="modal-body">
              {" "}
              <h1>pictures of area 51</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="halo_village-modal" className="modal">
            {" "}
            <div className="modal-body">
              {" "}
              <h1>pictures of halo village</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="empire_castle-modal" className="modal">
            {" "}
            <div className="modal-body">
              {" "}
              <h1>pictures of empire castle</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="james_woods-modal" className="modal">
            {" "}
            <div className="modal-body">
              {" "}
              <h1>pictures of james woods</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="tombstone-modal" className="modal">
            {" "}
            <div className="modal-body">
              {" "}
              <h1>pictures of western</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="the_lz-modal" className="modal">
            {" "}
            <div className="modal-body">
              {" "}
              <h1>pictures of lx</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="urban_town-modal" className="modal">
            {" "}
            <div className="modal-body">
              {" "}
              <h1>pictures of urban</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="pirate_cove-modal" className="modal">
            {" "}
            <div className="modal-body">
              {" "}
              <h1>pictures of pirate ship</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div id="mounds-modal" className="modal">
            {" "}
            <div className="modal-body">
              {" "}
              <h1>pictures of mounds</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src="https://lirp.cdn-website.com/85887690/dms3rep/multi/opt/2022_OSG_Field_Map-1920w.png"
              id="field_image"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 783 1200"
              style={{
                position: "absolute",
                top: 0,
                zIndex: 10,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <path
                id="star_wars"
                className="cls-3"
                d="M456.9,309.5c3.8-2.9,3.8-7.7,5.4-11.5,7-16.7,13.5-33.7,20.5-50.5,5.1-12.1,9.8-24.4,13.8-36.9,2.4-7.7,5.2-15.3,8.7-22.6,4.8-9.8,6.2-20.4,2.1-30.9-3.1-7.9-4.1-17-11-23-11.8-10.1-23.8-19.9-37.9-26.6-5.8-2.7-11.6-5.5-17.4-8.1-5.5-2.4-10.7-5.8-15.5-9.4-8-6.2-17.7-9.3-26.1-14.9-4.5-3-9.3-3.7-14.5-3.5-7.5.3-15,.2-22.5,0-3.6,0-5.7,1-7.6,4.5-5.4,9.9-10.4,20-15.4,30-8.8,17.6-17.9,35.1-27,52.5-6.9,13.2-11.7,27.5-19.8,40.1-1.8,2.8-4.5,5.1-5.8,8.5.5,2,2.1,2.9,3.6,3.9,10.1,7.4,20.7,13.6,32.5,18,8.1,3,15,8.3,21.3,13.7,6.9,6.1,14.8,9.3,22.8,12.5,6.2,2.4,11.4,6.2,17.3,8.9,6.4,2.9,12.3,7,18.6,10.3,11.2,5.8,21.8,12.4,31.5,20.5,5.5,4.5,11.5,8.4,18,11.6.9.4,1.7,1,2.5,1.5,2.8,1.8,2.4,4.8,3,7.5"
                style={{ fill: " rgba(0, 0, 0, 0)" }}
              ></path>
              <path
                id="halo_village"
                className="cls-3"
                d="M433.4,430.5c-1.9-3.3-4.1-6.5-4.5-10.5-.3-2.6-2.2-3.9-4.5-4.5-5.8-1.3-11.6-2.9-17.5-3.4-9.7-.8-19-3.4-28.5-5.3-8.2-1.6-16.3-2.7-24.5-3.8-7.5-1.1-15-1.9-22.5-3.2-6.2-1.1-12.4-1.7-18.6-2.7-8-1.3-16.2-2-24-4.6-5-1.6-10.2-2.1-15.5-2.6-8.9-.8-17.7-2.5-26.5-3.3-9.4-.9-18-4.6-27-6.4-4.1-.8-8.3-1-12.5-2.1-3.1-.9-5.5.2-7.1,3.8-2.5,5.7-3.7,12-6.5,17.5-5.6,10.8-11.6,21.5-20,30.5-3.9,4.2-5.6,9.2-7.8,14.1-.3.6.6,1.6.9,2.5.3.7.5,1.6,1,2,8.7,6.4,12.7,16.7,19.7,24.4,9.4,10.4,17.6,22,29.3,30.2,7.8,5.5,13.2,13.3,18.4,21,6.2,9.3,14.7,16.4,22.7,23.9,8.1,7.6,17.2,13.9,26.4,20.1,4.9,3.2,7.7,8.3,11.4,12.7,5.6,6.8,10.7,14.1,18.9,19.2,11.3,7.2,23.1,14.4,32.7,24.4,5.7-2.9,5.9-8.9,7.9-13.4,4.1-9.3,9.1-18.1,13.2-27.4,4.1-9.3,8.6-18.4,12.1-27.9,2.9-7.7,6.4-15.1,9.9-22.5,4.6-9.6,7.1-20,11.9-29.5,3.1-6.2,6-12.5,8.5-19,4-10.4,9.3-20.3,11.9-31.4,1.5-6.7,6-12.8,9.3-19,.5-1,1.5-1.8,1.4-3"
              ></path>
              <path
                id="tombstone"
                className="cls-3"
                d="M336.4,650.5c-4.5-2-8.7.5-12.4,1.7-8.8,3-17.7,5.4-26.6,7.7-9.4,2.4-19,4-28.5,6.1-4.2,1-8.4,2.5-12.5,4-2.8,1-5.3,2.7-8.5,3-3.6.4-6.2,2.1-8.2,5.8-4.5,8.2-12.3,14.4-15.6,23.2-3.3,8.7-9.3,13.3-17.7,16-5,1.6-6.4,2.8-10.4,7.5,7.3,8,15.7,15.2,24.6,21.3,9.6,6.6,18.3,14.1,27.2,21.4,1.4,1.1,2.1,2.5,4.1,1.4,6.1-3.3,12.7-4.6,19.5-5.5,7.1-1,13.8-3.6,20.4-6.1,6.9-2.7,13.8-5,21.1-6.3,11.8-2.2,23-6.4,34-11.1,7.5-3.2,15.9-4,23.1-8.3,3.3-1.9,4.3-2.8,2-6.2-2.1-3.2-1.5-7.4-3.4-11-6.4-12-12.6-24.1-18-36.8-3.9-9.2-9.5-17.7-13.2-27.1"
              ></path>
              <path
                id="the_lz"
                className="cls-3"
                d="M241.9,776.5c2.9,1.3,4.7,3.1,6.8,5.7,5.7,7.1,11.6,14.4,19.3,19.6,7.6,5.1,15.5,10.3,24,13.3,7.8,2.7,13.6,8.3,21.5,11.2,4.9-3.8,10-8.3,15.8-11.9,9-5.5,16.9-12.6,25.7-18.2,9.4-5.9,16.9-14.3,26.8-19.3,2.2-1.1,1.7-3.2,1.5-5-1.2-11.1-5.3-21.5-9-32.6-6.8,1.1-13.1,3.4-19.5,5.6-10.7,3.6-21.4,7.2-32,11-9.4,3.4-18.5,7.8-28.1,10.2-10.8,2.7-21.8,5.2-32.9,6.9-5.2.8-11.2.3-15,5.4"
              ></path>
              <path
                id="mounds"
                className="cls-3"
                d="M254.6,926.5c-.5,2.3-2.1,5.1-1.3,6.9,2.9,6.8,3.4,14.7,9.2,20.2,2.7,2.6,5.9,4.7,8.1,7.9,3,4.4,6.4,8.5,10.4,12.1,10.3,9.4,20.8,18.6,30.4,28.6,8.1,8.5,17.4,15.5,25.7,23.8,1.7,1.7,4,2.2,7,.3,4.4-2.9,8.1-6.7,12.2-9.9,9.6-7.5,18.2-16.2,27.5-24,9.7-8.2,19.2-16.8,29-25,11.3-9.3,22.1-19.2,33.1-28.9,1.6-1.4,3-2.9,3.5-5l5.5.5c-3.3.3-4.8-2.1-7.1-3.9-8.4-6.6-16.1-14-25.3-19.9-6.6-4.2-12.3-10.1-19.2-14.2-7.8-4.6-14.6-10-20.7-16.8-4.3-4.8-11.1-7.5-16.7-11.2-5-3.3-10-6.4-14.1-10.9-4.5-4.8-8.5-4.3-15.8,1.5-4.7,3.7-9.5,7.6-13.5,12-10.7,12-23.4,21.6-35.4,32.1-9.8,8.5-21,15.4-29.2,25.8-2.7,3.4-5.9,2.3-9,.5"
              ></path>
              <path
                id="james_woods"
                className="cls-3"
                d="M558.9,527c3.4-.8,3.5,2.4,5.1,3.9,6,6,12,12,18.5,17.5,9.2,7.7,18.8,14.7,26.1,24.5,2.3,3.1,6.3,5.2,9.9,7.1,12.8,6.8,21.8,17.5,30,29,1,1.5,2.7,2.3,4.3,3.3,2.8,1.6,4.3.9,6.7-.6,7.2-4.7,11.7-12,17.5-18,9-9.3,18.3-18.4,27.5-27.5s2.9-3.2,4.5-4.5c6.6-5.1,9-12.1,11.2-20,4.4-15.5-1.1-28.5-7.8-41.5-1.7-3.2-4.3-5.6-8.4-6.2-3.1-.5-6-2.3-9-3.3-1.9-.6-4.3-1.6-5.9-.9-5.9,2.4-11,.2-16-2.2-6-2.9-11.8-6.2-17.7-9.1-4.3-2.1-10.2-.4-14.8,1.8-10.5,4.9-20.8,10-31,15.5-7.1,3.8-14.1,7.6-20.2,13.3-7.3,6.9-16.1,12.1-24.9,17.2-.6.3-1,1-1.5,1.5"
              ></path>
              <path
                id="empire_castle"
                className="cls-3"
                d="M647.8,621.2c-6.5-7.1-13-14.3-19.8-21.2-10-10.1-21.7-18.3-31.7-28.3s-6.1-2.8-7.8-5.2c-6.3-9-14.9-15.8-22.2-23.8-4.5-5-9.5-10.1-15.5-12.9-13.9-6.4-28-12.6-41.9-19.2-10.5-4.9-21.7-8.6-29-18.5-2.9-3.9-6.3-7.5-7.5-12.5-.3-1.1-1.1-2.2-2-3-6.1-5.4-10.6-12.1-15.5-18.5-4.5-5.9-8.3-12.5-14.8-18-3.5,6.4-6.6,12.2-9.7,18v1c-2,6.6-3.1,13.4-6.1,19.5-5.5,11.1-9.6,22.8-14.5,34.2-4.5,10.6-9.3,21.4-13.8,32.1-6.8,16-13.4,32.2-21.7,47.6-6.9,13-13.7,26.1-22.4,38,.8,2.7,2.3,4.1,2.3,8s3.4,5.2,4.7,8c.2.5.5,1,.5,1.5-.3,7.7,4.3,13.9,6,21,2.3,9.6,8.3,17.4,11.6,26.5,2.3,6.6,4.7,13.3,9,18.9,7.6,10,15.9,19.4,23.9,29.1l-1.5-2.8c3.8-.5,7.3-1.9,10.5-3.6,4.7-2.6,9.2-2.3,13.5,0,19,10.2,39.2,17.5,58.5,27,10.6,5.2,22.6,7.6,32.5,14.4l.4,4c.4-1.5-.9-3.2,1-4.5,2.7-1.8,3.4-5,5.1-7.5,14.8-22,30.1-43.7,44.3-66.1,12.5-19.8,27.6-37.1,44.6-53,9.7-9,19-18.4,27.9-28.1,2.1-2.2,3.7-2.8,6.2-2.8"
                style={{ fill: " rgba(0, 0, 0, 0)" }}
              ></path>
              <path
                id="first_contact"
                className="cls-3"
                d="M203.9,370.5c2-1.3,4.4-1.5,6.5-.9,9,2.5,18.4,3,27.5,4.9,8,1.7,15.9,4.1,24,5.3,6.3,1,12.7,1.7,19,2.5s12.2,2.3,18,4.6l-4-1.9c5.6-8.1,12.1-16.2,13.2-26,1.2-10.1,7.2-16.8,12.3-24.5,1.5-2.2,3-4.5,4-7,3.1-8.2,8.8-14.7,14.1-21.4,4.9-6.1,7.1-13.5,9.9-20.6,2.1-5.3,4.2-10.5,8-15,4.2-5,3.5-11.2-2-14.3-5.6-3.2-10.9-6.8-17.3-9.1-5.7-2-11.1-5.6-16.7-8.5-7.5-4-15.2-7.6-23-11.6-4.6,10.8-13.6,18.1-19.5,27.5-7.2,11.5-15,22.5-21.7,34.4-6.6,11.7-13.8,23.1-19.5,35.2-3.2,6.9-5.1,14.7-9.8,20.8-5,6.3-8.8,13.4-13.9,19.6-1.1,1.3-2,2.7-2,4.5"
                style={{ fill: " rgba(0, 0, 0, 0)" }}
              ></path>
              <path
                id="hamburger_hill"
                className="cls-3"
                d="M285.4,222.4c-3.6,9.9-9.4,18.4-14.9,27.1-3.9,6.1-7.7,12.4-10.8,18.9-5.9,12.3-14.9,22.3-21.9,33.7-6.8,11-15.5,20.9-19.5,33.6-1.8,5.7-7.3,8.7-10,13.7-3.8,7-7.4,13.9-10.8,21.1-.4.7,0,2-.6,2.5-6.4,5.5-8.2,13.4-11,21-1.1,3-2.6,6.2-5.9,7.7,0-4.6-3.9-6.5-6.6-8.9-7.8-7.1-16-13.7-23.9-20.6-7.9-6.9-15.3-14.5-23.7-20.7-3.4-2.5-6.2-5.7-9.6-8.1-3.7-2.6-8-5.3-10.7-9.2-2.1-3.1-4.7-5.5-7.4-8.1-5.3-5-11.4-9-17.2-13.3-5.1-3.7-7.8-8.2-5.9-14.5,2.7-9-.8-16.2-6.1-23-1.7-2.2-3.3-4.4-5-6.5-4.7-5.8-7.3-12.1-4.5-19.5,1.5-4,.7-9.3,4.6-11.8,3.2-2.1,6.1-4.7,9.4-6.6,2.9-1.6,5.5-4.1,9-4.5,4.2-.4,7-2.6,8.5-6.5l.5-.9c1.2-1.1,2.2-2.5,4-2.5,5-.1,9.4-2.1,12.9-5.1,4-3.4,8.4-5.9,12.5-9,1.9-1.4,3.4-1.9,5.6-1.9,12.6.6,25.3-.8,38,.9,7.5,1,15.2-.9,22.5,1.7,3.9,1.3,7.9-.2,11.5.6,7.1,1.7,14.8.1,21.5,3.8,5.5-2.7,11,1,16.5,0,1.2-.3,2.6-.2,4,.3,7,2.4,14.1,4.1,21.5.7,1.1-.5,2.9,0,4.5.7,3.4,1.5,6.4,3.4,10.4,4,3.7.5,9.1,1.1,9.1,7.2.1,1,1.2,1,2,1l-2.5,1Z"
              ></path>
              <path
                id="pirate_cove"
                className="cls-3"
                d="M310.1,851c-6.7,7.2-14.6,13.2-21.7,20-7.5,7.2-15.9,13.3-24.7,18.8-6.7,4.2-12.9,8.6-18.5,14.1-2.1,2-5.4.8-7.8-.5-2.1-1.1-4.3-2.6-5.4-4.5-5.1-8.3-13.6-13.8-18.1-22.4-3.5-6.7-8.6-11.7-16-15.1,4.6-11.3,8.9-22.1,20.4-28.6,5.8-3.3,10.5-8.3,14.7-13.8,4.7-6,10.4-11.3,15.4-16.6,12.4,8.8,24.9,16.9,36.4,26.2,8.7,7.1,18.8,12.6,25.6,21.8l-.3.6h0Z"
              ></path>
              <path
                id="urban_town"
                className="cls-2"
                d="M100.9,773c1.9-.9,3.1-2.1,4.2-4.2,3.4-6.2,6.8-12.5,12.1-17.6,2.3-2.2,4.8-1.4,6.7-2.8,3.6-2.8,7.1-5.9,10.5-9,2.6-2.3,4.9-4.8,7.5-7,3.6-3,8.5-3,12.5-.6,11.1,6.8,21.8,14.3,31.3,23.2,8.1,7.5,18.4,11.8,26,19.5,8.7,8.8,19.5,14.7,28.6,22.9h1.6c-2.1-.4-2.5,1.7-3.5,2.6-3.6,3.6-7.4,7-11.6,9.9-8,5.5-14.3,12.8-19.8,20.6-5.7,8.1-13,14.3-19.7,21.3-.8.9-1.5,1.4-1.4,2.6v-1.9c-1.9-1.3-3.9-2.5-5.5-4-11.7-11-23.3-22.1-35-33-7.6-7.1-15-14.5-23.1-20.9-7.8-6.2-14.1-13.5-18.9-22.1"
              ></path>
              <path
                id="area_51"
                className="cls-3"
                d="M370.9,265.5c8.5,3.9,15.3,10.4,23.9,14.2,3.6,1.6,6.9,4.4,9.7,7.8,5.2,6.4,12.8,9.9,19.4,14.6,6.4,4.5,12.6,9.3,19.5,12.9,3.4,1.8,7.6,2.1,10.5,5l1-.5c-3.3,4.7-4.4,10.3-6.4,15.5-3.7,9.9-8.2,19.6-10.6,30-1.2,5.1-.4,10.5-2.5,15.5-.3.8.4,1.8-.5,2.5-7.7,5.5-6.2,14.4-8.2,22l-2.9,1.2c-3.5.9-6.9.6-10.5.3-5.1-.5-9.6-2.6-14.5-3.4-9.2-1.6-18.3-3.7-27.5-5.4-5.1-.9-10.4-2.1-15.5-1.8-3.4.2-7,.1-9.9-.9-9.8-3.5-20.1-3.8-30-6.1-4-1-8.7.9-11.9-2.5.5-1.3.5-2.4,1.3-3.4,10.1-12.5,15.3-27.7,23-41.5,5.2-9.4,9.5-19.3,15.2-28.4,6.9-11.1,13.9-22,17.9-34.6,1.6-4.8,3.6-9.5,8-12.5,1.5-1,1.1-2.2.5-3.5"
                style={{ fill: " rgba(0, 0, 0, 0)" }}
              ></path>
              <path
                id="sherwood_forest"
                className="cls-1"
                d="M183.4,721.3c.7-.3,1.5-.6,2.2-1,6.9-3.9,13.4-8.2,21-10.6,3.2-1.1,5.5-3.7,5.9-7,.3-2.8,1.5-5.1,2.6-7.5,4.8-9.9,12.2-18,19-26.5.7-.8,1.6-.8,2.5-1,11.5-2.8,23.1-5.4,34.5-8.5,19-5,37.8-10.7,57-15.1,1.6-.3,4.5,0,5-2.3.9-4,4.4-6.8,4.6-11-8.5-7.3-16.7-15.1-25.6-21.9-12.4-9.6-26.3-16.7-39.4-25.2-9.5-6.2-18.8-13-25.9-21.6-13.1-15.8-27.6-30.2-40.8-45.8-11.1-13.1-22.9-25.7-34.4-38.5-3.6-4-6.3-8.4-8.1-13.5-.8-2.3-1.2-5.7-3.5-6.3-3.4-1-3.4-3.2-3.4-5.7-3.5,15.6-9.2,30.3-12.5,46-.3,1.6-1.7,3.6,1,4.2-3.3,8.9-8.5,16.7-14.5,24-2,2.5-3.9,5.2-5.5,8-5.4,9.5-14.1,16.6-19.2,26.4-2.5,4.9-3.4,10.2-5.1,15.2-1,2.9-2,6.1-3.1,8.8-7.4,19-11.7,38.9-18.2,58.1-.8,2.5-1.7,5-2.5,7.5,4.2,1.6,5.7,6,7.8,9.1,6.2,9.5,15.1,15.8,24.2,21.8,11.2,7.5,22.1,15.5,32.5,24,8.5,7,17.2,13.8,26.9,19.2,3.7,2.1,6.8.9,10.1.2,2.3-.5,4.4-2.5,6.5-3.8"
              ></path>
            </svg>
          </div>
        </>
      </div>

      <div className="w-full dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <h2 className="pointer-events-none h-[100px] mt-40 relative z-10 text-5xl bg-clip-text md:text-7xl text-transparent bg-gradient-to-b from-neutral-500 to-neutral-600 text-center font-sans font-bold">
          About{" "}
          <span className="bg-clip-text bg-gradient-to-r to-emerald-700 from-sky-600 dark:to-emerald-600 dark:from-sky-400">
            Me
          </span>
        </h2>

        <p className="pointer-events-none text-center z-10 relative text-base md:text-lg px-2 font-normal mb-6 dark:text-neutral-200 text-neutral-500 mx-auto py-2">
          Tearing apart toasters and XBox controllers, then paintball markers
          and cars. After I graduated college, I turned my attention towards
          computers...
        </p>

        <div className="max-w-[80vw] mx-auto flex flex-col md:flex-row md:justify-center md:gap-6 py-3">
          <Spotlight
            className="h-screen hidden md:block md:left-40 md:-top-0 z-10"
            fill="white"
          />
          <img
            src={
              fun === "business"
                ? "/local/bw_ry_wedding.jpg"
                : "/local/bw_paintball.jpg"
            }
            className={`pointer-events-none object-cover rounded-full h-[50vh] md:w-[25vw] md:h-[80vh] mx-auto md:mx-0 z-10 pt-5`}
            alt="Picture of Dan"
          />
          <div className="pt-5 relative">
            {fun === "party" ? (
              <>
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
              </>
            ) : (
              <>
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

                <TimelineHeading heading={"May 2019 - Feb 2023"} />
                <TimelineItem
                  heading="React/Redux front end developer"
                  text="Helped implement modern React features and move from Class components to Func + hook based components"
                  Icon={() => null}
                />

                <TimelineHeading heading={"Feb 2023 - Present · 1 yr 3 mos"} />
                <TimelineItem
                  heading="Marketing always leads back to the website..."
                  text="New job making websites for small and large businesses across the country. Primarily focussed on internal process and tooling, but I have learned so much about Front End, Back End, Server and DNS maintenance, and so much more"
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
              </>
            )}
            <canvas
              id="fluids"
              className="absolute z-0 inset-0 h-full w-full"
            ></canvas>
          </div>
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
                {/* <h3 className="text-center text-xl md:text-2xl font-bold text-black dark:text-white">
                  Located in New Hampshire
                </h3>
                <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
                  Proud to work locally and with people across our world
                </p> */}
                <h3 className="text-center text-xl md:text-2xl font-bold text-black dark:text-white">
                  {"<New Hampshire>"}
                </h3>
              </motion.div>
              <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
              <div className="absolute w-full -bottom-20 h-full z-10">
                <World data={sampleArcs} globeConfig={globeConfig} />;
              </div>
              <h3 className="absolute w-full -bottom-40 text-center text-xl md:text-2xl font-bold text-black dark:text-white">
                {"</ New Hampshire>"}
              </h3>
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
    <WobbleCard containerClassName={cardClass}>
      <div className="w-1/2">
        <h3 className="w-full text-xl font-bold text-neutral-600 dark:text-white">
          {header}
        </h3>
        <p className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {description}
        </p>
        <HoverCTA url={url} text={cta} />
      </div>
      <img
        src={img}
        height="1000"
        width="1000"
        className="h-60 w-full object-cover object-left-top group-hover/card:shadow-xl absolute -bottom-[0%] -right-[50%] -z-10"
        alt="thumbnail"
      />
    </WobbleCard>
    // <CardContainer
    //   className="inter-var w-full h-full"
    //   containerClassName={cn(cardClass, "w-full")}
    //   perspective={perspective}
    // >
    //   <CardBody className="bg-gray-50 relative group/card h-full dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-6 border  ">
    //     <CardItem translateZ={15}>
    //       <h3 className="w-full text-xl font-bold text-neutral-600 dark:text-white">
    //         {header}
    //       </h3>
    //     </CardItem>
    //     <CardItem translateZ="100" className="w-full mt-4">
    //       <img
    //         src={img}
    //         height="1000"
    //         width="1000"
    //         className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
    //         alt="thumbnail"
    //       />
    //     </CardItem>
    //     <CardItem translateZ={70}>
    //       <p className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
    //         {description}
    //       </p>
    //     </CardItem>
    //     <CardItem translateZ={15}>
    //       <HoverCTA url={url} text={cta} />
    //     </CardItem>
    //   </CardBody>
    // </CardContainer>
  );
};

const TimelineItem = ({ heading, text, Icon }) => {
  return (
    <div className="flex gap-x-3 pointer-events-none">
      <div className="relative z-10 last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-neutral-700">
        <div className="relative z-10 size-7 flex justify-center items-center">
          <div className="size-2 rounded-full bg-neutral-600"></div>
        </div>
      </div>

      {/* <!-- Right Content --> */}
      <div className="grow pt-0.5 pb-8 z-10">
        <h3 className="flex gap-x-1.5 font-semibold text-white">
          <Icon />
          {heading}
        </h3>
        <p className="mt-1 text-sm text-neutral-200">{text}</p>
      </div>
      {/* <!-- End Right Content --> */}
    </div>
  );
};

const TimelineHeading = ({ heading }) => {
  return (
    <div className="ps-2 my-2 first:mt-0 relative z-10 pointer-events-none">
      <h3 className="text-xs font-medium uppercase text-neutral-300 z-10">
        {heading}
      </h3>
    </div>
  );
};
