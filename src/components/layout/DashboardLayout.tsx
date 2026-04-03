import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { VideoCallModal } from '../../components/collaboration/VideoCallModal';

export const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  // State to manage the video call modal globally
  const [isCallOpen, setIsCallOpen] = useState(false);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* PASSING PROPS: Navbar ko onJoinCall function pass kar rahe hain 
          taake ye button click par Layout ki state change kar sakay.
      */}
      <Navbar onJoinCall={() => setIsCallOpen(true)} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Pages like EntrepreneurDashboard or InvestorDashboard render here */}
            <Outlet />
          </div>
        </main>
      </div>

      {/* GLOBAL MODAL: Ye pura interface cover karega jab isCallOpen true hoga.
      */}
      <VideoCallModal 
        isOpen={isCallOpen} 
        onClose={() => setIsCallOpen(false)} 
        meetingTitle={`Seed Round Pitch - ${user?.name || 'Collaboration Session'}`} 
      />
    </div>
  );
};