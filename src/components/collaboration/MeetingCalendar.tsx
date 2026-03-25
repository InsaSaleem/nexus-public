import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const MeetingCalendar: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 meeting-calendar-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Meeting Schedule</h2>
        <span className="px-3 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
          Week 1 Milestone
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Calendar UI Customization */
        .fc .fc-button-primary {
          background-color: #4f46e5 !important; /* Indigo primary color */
          border-color: #4f46e5 !important;
          text-transform: capitalize;
          font-weight: 500;
          border-radius: 8px;
        }
        .fc .fc-button-primary:hover {
          background-color: #4338ca !important;
        }
        .fc .fc-button-primary:disabled {
          background-color: #9ca3af !important;
          border-color: #9ca3af !important;
        }
        .fc .fc-toolbar-title {
          font-size: 1.25rem !important;
          font-weight: 700 !important;
          color: #111827;
        }
        .fc th {
          background-color: #f9fafb;
          padding: 10px 0 !important;
          font-weight: 600 !important;
          color: #4b5563 !important;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }
        .fc .fc-daygrid-day.fc-day-today {
          background-color: #f5f3ff !important; /* Light purple for today */
        }
        .fc .fc-event {
          border-radius: 4px;
          padding: 2px 4px;
          font-size: 0.85rem;
          background-color: #4f46e5;
          border: none;
        }
        .fc-theme-standard td, .fc-theme-standard th {
          border: 1px solid #f3f4f6 !important;
        }
      `}} />

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
        events={[
          { title: 'Investor Meeting', date: '2026-03-28', backgroundColor: '#4f46e5' },
          { title: 'Demo Day', date: '2026-04-10', backgroundColor: '#10b981' }
        ]}
      />
    </div>
  );
};

export default MeetingCalendar;