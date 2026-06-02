/* ============================================================
   PATRICK FINK PHOTOGRAPHY — App.tsx
   Design: Cinematic Dark / LA Noir
   Routes: Home, Headshots, Fine Art, Street, Merchandise
   ============================================================ */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Headshots from "./pages/Headshots";
import FineArt from "./pages/FineArt";
import Street from "./pages/Street";
import Aerial from "./pages/Aerial";
import Merchandise from "./pages/Merchandise";
import HeadshotPricing from "./pages/HeadshotPricing";
import Layout from "./components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/headshots" component={Headshots} />
        <Route path="/fine-art" component={FineArt} />
        <Route path="/street" component={Street} />
        <Route path="/aerial" component={Aerial} />
        <Route path="/merchandise" component={Merchandise} />
        <Route path="/headshot-pricing" component={HeadshotPricing} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
