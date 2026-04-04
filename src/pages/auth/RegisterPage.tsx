import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CircleDollarSign, Building2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import PasswordMeter from '../../components/ui/PasswordMeter';// Import kiya gaya
import { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(name, email, password, role);
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary-600 rounded-md flex items-center justify-center text-white shadow-lg">
             <Building2 size={28} />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-sm text-gray-600">Join Business Nexus to connect with partners</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-md flex items-start">
              <AlertCircle size={18} className="mr-2 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am registering as a</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`py-3 px-4 border rounded-xl flex items-center justify-center transition-all ${
                    role === 'entrepreneur' ? 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-500/20' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setRole('entrepreneur')}
                >
                  <Building2 size={18} className="mr-2" /> Entrepreneur
                </button>
                <button
                  type="button"
                  className={`py-3 px-4 border rounded-xl flex items-center justify-center transition-all ${
                    role === 'investor' ? 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-500/20' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setRole('investor')}
                >
                  <CircleDollarSign size={18} className="mr-2" /> Investor
                </button>
              </div>
            </div>
            
            <Input label="Full name" type="text" value={name} onChange={(e) => setName(e.target.value)} required fullWidth startAdornment={<User size={18} />} />
            <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth startAdornment={<Mail size={18} />} />
            
            <div className="space-y-1">
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth startAdornment={<Lock size={18} />} />
              {/* Password Strength Meter yahan integrate kiya gaya hai */}
              <PasswordMeter password={password} />
            </div>
            
            <Input label="Confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required fullWidth startAdornment={<Lock size={18} />} />
            
            <div className="flex items-center">
              <input id="terms" type="checkbox" required className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the <a href="#" className="font-medium text-primary-600 hover:underline">Terms</a> and <a href="#" className="font-medium text-primary-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
            
            <Button type="submit" fullWidth isLoading={isLoading} size="lg">Create account</Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="font-bold text-primary-600 hover:text-primary-500">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};