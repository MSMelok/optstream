import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import TopNav from "@/components/TopNav";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Guide from "@/pages/Guide";
import OnDemand from "@/pages/OnDemand";
import Sports from "@/pages/Sports";
import DVR from "@/pages/DVR";
import Apps from "@/pages/Apps";

function Router() {
  return (
    <>
      <TopNav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/guide" component={Guide} />
        <Route path="/on-demand" component={OnDemand} />
        <Route path="/sports" component={Sports} />
        <Route path="/dvr" component={DVR} />
        <Route path="/apps" component={Apps} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
