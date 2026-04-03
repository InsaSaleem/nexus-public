import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';

// Components
import { MeetingCalendar } from '../../components/collaboration/MeetingCalendar';

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  
  // Stats State (Inhein humne dynamic kar diya hai)
  const [profileViews, setProfileViews] = useState(24);
  const [upcomingMeetings, setUpcomingMeetings] = useState(2);
  
  const [recommendedInvestors] = useState(investors.slice(0, 3));
  
  useEffect(() => {
    if (user) {
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }
  }, [user]);
  
  // STEP 3: Logic for Accept/Decline
  const handleRequestStatusUpdate = (requestId: string, status: 'accepted' | 'rejected') => {
    setCollaborationRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId ? { ...req, status } : req
      )
    );

    // Agar accept ho jaye to aik chota sa notification/feedback
    if (status === 'accepted') {
        console.log("Request accepted, connection count will auto-update");
    }
  };
  
  if (!user) return null;
  
  // Filtring requests for stats
  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');
  const acceptedRequests = collaborationRequests.filter(req => req.status === 'accepted');
  
  return (
    <div className="space-y-6 animate-fade-in relative pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-600">Here's what's happening with your startup today</p>
        </div>
        
        <div className="flex gap-3">
          <Link to="/investors">
            <Button 
              leftIcon={<PlusCircle size={18} />}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              Find Investors
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-l-4 border-l-primary-500 hover:shadow-md transition-all">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-50 rounded-lg mr-4">
                <Bell size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Pending Requests</p>
                <h3 className="text-xl font-bold text-gray-900">{pendingRequests.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-white border-l-4 border-l-secondary-500 hover:shadow-md transition-all">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-50 rounded-lg mr-4">
                <Users size={20} className="text-secondary-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Total Connections</p>
                <h3 className="text-xl font-bold text-gray-900">{acceptedRequests.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-white border-l-4 border-l-accent-500 hover:shadow-md transition-all">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-50 rounded-lg mr-4">
                <Calendar size={20} className="text-accent-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Upcoming Meetings</p>
                <h3 className="text-xl font-bold text-gray-900">{upcomingMeetings}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-white border-l-4 border-l-green-500 hover:shadow-md transition-all">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg mr-4">
                <TrendingUp size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Profile Views</p>
                <h3 className="text-xl font-bold text-gray-900">{profileViews}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-none shadow-sm">
            <CardHeader className="bg-white border-b border-gray-100 flex justify-between items-center py-4">
              <h2 className="text-lg font-semibold text-gray-800">Collaboration Requests</h2>
              {pendingRequests.length > 0 && (
                <Badge variant="primary" className="px-3 py-1">{pendingRequests.length} New</Badge>
              )}
            </CardHeader>
            <CardBody className="p-0">
              {pendingRequests.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {pendingRequests.map(request => (
                    <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <CollaborationRequestCard
                        request={request}
                        onStatusUpdate={handleRequestStatusUpdate}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                    <AlertCircle size={28} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">No pending requests</p>
                  <p className="text-sm text-gray-400">All caught up! New requests will appear here.</p>
                </div>
              )}
            </CardBody>
          </Card>

          {/* STEP 4: Calendar Component */}
          <Card className="border-none shadow-sm overflow-hidden">
             <CardHeader className="bg-white border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Meeting Schedule</h2>
             </CardHeader>
             <CardBody className="p-4">
                <MeetingCalendar />
             </CardBody>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-100 flex justify-between items-center py-4">
              <h2 className="text-lg font-semibold text-gray-800">Recommended Investors</h2>
              <Link to="/investors" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </CardHeader>
            <CardBody className="space-y-4 p-4">
              {recommendedInvestors.map(investor => (
                <div key={investor.id} className="transform hover:scale-[1.02] transition-transform">
                  <InvestorCard investor={investor} showActions={false} />
                </div>
              ))}
            </CardBody>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white border-none shadow-lg">
            <CardBody className="p-6">
              <h3 className="font-bold text-lg mb-2">Pro Tip! 💡</h3>
              <p className="text-primary-50 text-sm leading-relaxed">
                Complete your startup profile to increase your chances of getting noticed by top investors by up to 40%.
              </p>
              <Button variant="ghost" className="mt-4 text-white hover:bg-primary-500 w-full border border-primary-400">
                Update Profile
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};