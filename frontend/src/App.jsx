import { BrowserRouter, Routes, Route } from "react-router-dom";

import ParticleBackground from "./components/ParticleBackground";
import Navbar             from "./components/Navbar";
import Footer             from "./components/Footer";
import ProtectedRoute     from "./components/ProtectedRoute";

import Home              from "./pages/Home";
import Login             from "./pages/Login";
import Register          from "./pages/Register";
import Jobs              from "./pages/Jobs";
import Companies         from "./pages/Companies";
import Application       from "./pages/Application";
import SavedJobs         from "./pages/SavedJobs";
import Resume            from "./pages/Resume";
import Profile           from "./pages/Profile";
import StudentDashboard  from "./pages/StudentDashboard";
import HrDashboard       from "./pages/HrDashboard";
import AdminDashboard    from "./pages/AdminDashboard";
import JobDetails        from "./pages/JobDetails";
import ApplyJob          from "./pages/ApplyJob";
import CreateJob         from "./pages/CreateJob";
import EditJob           from "./pages/EditJob";
import Applicants        from "./pages/Applicants";
import ManageUsers       from "./pages/ManageUsers";
import Analytics         from "./pages/Analytics";
import ManageJobs        from "./pages/ManageJobs";
import ResumeUpload      from "./pages/ResumeUpload";
import AIResumeAnalyzer  from "./pages/AIResumeAnalyzer";

function App() {
  return (
    <BrowserRouter>
      <ParticleBackground />
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/"            element={<Home />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/register"    element={<Register />} />
        <Route path="/jobs"        element={<Jobs />} />
        <Route path="/companies"   element={<Companies />} />
        <Route path="/jobs/:id"    element={<JobDetails />} />

        {/* Protected */}
        <Route path="/student-dashboard"  element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/hr-dashboard"       element={<ProtectedRoute><HrDashboard /></ProtectedRoute>} />
        <Route path="/admin-dashboard"    element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/application"        element={<ProtectedRoute><Application /></ProtectedRoute>} />
        <Route path="/saved-jobs"         element={<ProtectedRoute><SavedJobs /></ProtectedRoute>} />
        <Route path="/resume"             element={<ProtectedRoute><Resume /></ProtectedRoute>} />
        <Route path="/profile"            element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/apply-job/:id"      element={<ProtectedRoute><ApplyJob /></ProtectedRoute>} />
        <Route path="/create-job"         element={<ProtectedRoute><CreateJob /></ProtectedRoute>} />
        <Route path="/edit-job/:id"       element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
        <Route path="/applicants"         element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
        <Route path="/manage-users"       element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
        <Route path="/analytics"          element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/manage-jobs"        element={<ProtectedRoute><ManageJobs /></ProtectedRoute>} />
        <Route path="/resume-upload"      element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
        <Route path="/ai-resume-analyzer" element={<ProtectedRoute><AIResumeAnalyzer /></ProtectedRoute>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
