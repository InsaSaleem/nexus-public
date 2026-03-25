import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Note: Agar aapka calendar sahi nazar nahi aa raha, toh ye CSS lines check karein
// import '@fullcalendar/core/main.css'; 
// import '@fullcalendar/daygrid/main.css';

const MeetingCalendar: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Meeting Schedule</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        height="auto"
        selectable={true}
        editable={true}
        // Aap yahan events bhi add kar sakti hain
        events={[
          { title: 'Investor Meeting', date: '2026-03-28' },
          { title: 'Demo Day', date: '2026-04-10' }
        ]}
      />
    </div>
  );
};

export default MeetingCalendar;