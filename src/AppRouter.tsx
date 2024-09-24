import { Route, Router } from "@solidjs/router";
import { Toaster } from "./components/ui/toast";
import { lazy } from "solid-js";

const Config = lazy(() => import("./pages/Config"));
const Index = lazy(() => import("./pages/Index"));
const FolderSelect = lazy(() => import("./pages/FolderSelect"));

export default function AppRouter() {
  return (
    <>
    <Toaster />
    <Router>
      <Route path="/app" component={Index} />
      <Route path="/" component={FolderSelect} />
      <Route path="/config" component={Config} />
    </Router>
    </>
  )
}
