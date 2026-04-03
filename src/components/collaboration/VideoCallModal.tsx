import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, X, MonitorUp } from 'lucide-react';
import { Button } from '../ui/Button';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingTitle: string;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, onClose, meetingTitle }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-hidden">
      <div className="bg-gray-900 w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col h-[85vh] border border-gray-800">
        
        {/* Header */}
        <div className="p-5 flex justify-between items-center bg-gray-800/50 border-b border-gray-700 text-white">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <div>
              <h3 className="font-bold text-lg leading-none">{meetingTitle}</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Live Encryption Active</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-700 rounded-full transition-all text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Video Workspace */}
        <div className="flex-1 relative flex items-center justify-center bg-black/40">
          {/* Remote User Placeholder */}
          <div className="text-center">
             <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                JD
             </div>
             <p className="text-gray-400 font-medium tracking-wide">Waiting for investor to join...</p>
          </div>
          
          {/* Local User Preview (Small Overlay) */}
          <div className="absolute bottom-6 right-6 w-52 h-36 bg-gray-800 rounded-2xl border-2 border-primary-500 overflow-hidden shadow-2xl group transition-transform hover:scale-105">
            {isVideoOn ? (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                 <span className="text-[10px] text-primary-300 font-semibold uppercase tracking-wider">Your Camera Feed</span>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <VideoOff size={32} className="text-gray-700" />
              </div>
            )}
            <div className="absolute top-2 left-2 bg-black/50 px-2 py-0.5 rounded text-[8px] text-white font-bold uppercase">You</div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-8 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 flex justify-center items-center gap-6">
          <Button 
            variant={isMuted ? "danger" : "outline"} 
            onClick={() => setIsMuted(!isMuted)} 
            className="rounded-full w-14 h-14 flex items-center justify-center border-gray-600 text-white hover:scale-110 transition-transform"
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </Button>
          
          <Button 
            variant={!isVideoOn ? "danger" : "outline"} 
            onClick={() => setIsVideoOn(!isVideoOn)} 
            className="rounded-full w-14 h-14 flex items-center justify-center border-gray-600 text-white hover:scale-110 transition-transform"
          >
            {!isVideoOn ? <VideoOff size={24} /> : <Video size={24} />}
          </Button>

          <Button variant="outline" className="rounded-full w-14 h-14 border-gray-600 text-white hover:scale-110 transition-transform">
            <MonitorUp size={24} />
          </Button>

          <div className="h-8 w-px bg-gray-700 mx-2" />

          <Button 
            variant="danger" 
            onClick={onClose} 
            className="rounded-2xl px-10 py-4 flex gap-3 items-center h-auto font-black uppercase tracking-widest shadow-lg shadow-red-900/20 hover:scale-105 transition-all"
          >
            <PhoneOff size={24} /> End Call
          </Button>
        </div>
      </div>
    </div>
  );
};