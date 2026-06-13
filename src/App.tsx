import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import HomeLayout from "./components/HomeLayout";
import Dashboard from "./pages/Dashboard";
import SemesterMapping from "./pages/SemesterMapping";
import ATSResume from "./pages/ATSResume";
import RoleFit from "./pages/RoleFit";
import CareerRoadmap from "./pages/CareerRoadmap";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomeLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="semester" element={<SemesterMapping />} />
            <Route path="resume" element={<ATSResume />} />
            <Route path="role-fit" element={<RoleFit />} />
            <Route path="roadmap" element={<CareerRoadmap />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
