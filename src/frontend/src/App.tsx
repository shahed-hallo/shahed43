import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import PinkCursor from "./components/PinkCursor";
import RightProgressBar from "./components/RightProgressBar";
import HomePage from "./pages/HomePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

function ScrollBrightnessDim() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // At top: opacity 0 (full brightness). At bottom: opacity 0.28 (gentle dim, still readable).
  const dimOpacity = progress * 0.28;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        pointerEvents: "none",
        background: "oklch(0.06 0.015 280)",
        opacity: dimOpacity,
        transition: "opacity 0.12s linear",
      }}
    />
  );
}

function RootLayout() {
  return (
    <>
      <PinkCursor />
      <RightProgressBar />
      <ScrollBrightnessDim />
      <div>
        <Outlet />
        <Toaster position="bottom-right" />
      </div>
    </>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darker-bg text-near-white">
      <h1 className="font-playfair text-6xl mb-4 text-gradient-pink">404</h1>
      <p className="font-syne text-xl mb-8 text-near-white/70">
        Page not found
      </p>
      <Link to="/" className="text-primary hover:underline font-syne">
        ← Back to Home
      </Link>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, privacyRoute, termsRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
