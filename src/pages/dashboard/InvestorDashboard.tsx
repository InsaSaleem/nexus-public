import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Search, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';
import { MeetingCalendar } from '../../components/collaboration/MeetingCalendar';

// Week 3 Payments & Security Imports
import WalletCard from '../../components/payment/WalletCard';
import TransactionHistory from '../../components/payment/TransactionHistory';
import { OTPModal } from '../../components/ui/OTPModal';

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  
  // --- NEW REAL LOGIC STATES ---
  const [balance, setBalance] = useState(48250.00); // Initial Balance
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'add' | 'transfer' | null>(null);

  if (!user) return null;
  
  const sentRequests = getRequestsFromInvestor(user.id);
  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));
  
  // OTP Verify Hone ke baad ki logic
  const handleVerifyOTP = () => {
    if (pendingAction === 'add') {
      setBalance(prev => prev + 1000); // $1000 add kar diye
      alert("Success! $1,000.00 added to your wallet.");
    } else if (pendingAction === 'transfer') {
      setBalance(prev => prev - 500); // $500 transfer kar diye
      alert("Success! $500.00 transferred successfully.");
    }
    
    setIsOTPOpen(false);
    setPendingAction(null);
  };

  // Buttons ke functions
  const triggerAddFunds = () => {
    setPendingAction('add');
    setIsOTPOpen(true);
  };

  const triggerTransfer = () => {
    setPendingAction('transfer');
    setIsOTPOpen(true);
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(i => i !== industry) 
        : [...prev, industry]
    );
  };

  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    const matchesSearch = searchQuery === '' || 
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.includes(entrepreneur.industry);
    
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Startups</h1>
          <p className="text-gray-600">Find and connect with promising entrepreneurs</p>
        </div>
        <Link to="/entrepreneurs">
          <Button leftIcon={<PlusCircle size={18} />}>View All Startups</Button>
        </Link>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search startups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} />}
          />
        </div>
        <div className="w-full md:w-1/3 flex items-center gap-2 overflow-x-auto pb-2">
            {industries.map(industry => (
                <Badge
                    key={industry}
                    variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}
                    className="cursor-pointer whitespace-nowrap"
                    rounded={true}
                    onClick={() => toggleIndustry(industry)}
                >
                    {industry}
                </Badge>
            ))}
        </div>
      </div>
      
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Users size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">Total Startups</p>
                <h3 className="text-xl font-semibold text-primary-900">{entrepreneurs.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-full mr-4">
                <PieChart size={20} className="text-secondary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700">Industries</p>
                <h3 className="text-xl font-semibold text-secondary-900">{industries.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-accent-50 border border-accent-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4">
                <Users size={20} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-700">Your Connections</p>
                <h3 className="text-xl font-semibold text-accent-900">
                  {sentRequests.filter(req => req.status === 'accepted').length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* WEEK 3: PAYMENT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        <div className="lg:col-span-7">
            {/* Balance pass kiya WalletCard ko aur click handlers diye */}
            <WalletCard 
              balance={balance} 
              onAddFunds={triggerAddFunds} 
              onTransfer={triggerTransfer} 
            />
        </div>
        <div className="lg:col-span-5">
            <TransactionHistory />
        </div>
      </div>

      {/* Calendar Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Meeting Schedule</h2>
        <MeetingCalendar />
      </div>

      {/* Featured Startups Section */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Featured Startups</h2>
          </CardHeader>
          <CardBody>
            {filteredEntrepreneurs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntrepreneurs.map(entrepreneur => (
                  <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600">
                No startups match your filters.
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Security Verification Modal */}
      <OTPModal 
        isOpen={isOTPOpen} 
        onClose={() => setIsOTPOpen(false)} 
        onVerify={handleVerifyOTP} 
      />
    </div>
  );
};