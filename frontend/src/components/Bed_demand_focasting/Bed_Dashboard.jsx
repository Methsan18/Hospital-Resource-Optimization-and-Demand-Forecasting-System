import React from 'react';
import { Users, BedDouble, Clock, Activity } from 'lucide-react'; // Updated icons
import Layout from './Layout';

const BedDashboard = () => {

  return (
    <Layout activePage="Dashboard">
      <div style={{ padding: 28, maxWidth: 1100, margin: '24px auto', color: '#0f172a' }}>
        
        {/* Updated Title for ETU Pilot */}
        <div style={{ marginBottom: 18 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>ETU Operations Dashboard</h1>
          <p style={{ color: '#64748b', marginTop: 4 }}>Emergency Treatment Unit • Real-time Status</p>
        </div>

        {/* KPI Cards - Updated for ETU Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 22 }}>
          {/* Card 1: Fixed Capacity */}
          <StatCard 
            icon={<BedDouble size={24} color="#2563eb" />} 
            title="Total ETU Beds" 
            value="20" 
            sub="Fixed Capacity"
          />
          
          {/* Card 2: Real-time Occupancy */}
          <StatCard 
            icon={<Users size={24} color="#dc2626" />} 
            title="Current Occupancy" 
            value="90%" 
            sub="18 / 20 Beds Full"
          />
          
          {/* Card 3: Shift Forecast (Practical) */}
          <StatCard 
            icon={<Activity size={24} color="#9333ea" />} 
            title="Next Shift Forecast" 
            value="High Load" 
            sub="~12 Admissions Expected"
          />
          
          {/* Card 4: Bottlenecks (Transfers) */}
          <StatCard 
            icon={<Clock size={24} color="#ea580c" />} 
            title="Pending Transfers" 
            value="4" 
            sub="Waiting for Gen. Ward"
          />
        </div>

        {/* Real-time Zone Occupancy (Instead of Generic Wards) */}
        <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 8px 24px rgba(2,6,23,0.06)', border: '1px solid #e6eef6' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Real-time Zone Status</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            
            {/* Triage - Moderate */}
            <ProgressBar 
              label="Triage Queue" 
              percent={62} 
              color="#f59e0b" 
              note="(5 Patients Waiting)" 
            />
            
            {/* Resus - Critical */}
            <ProgressBar 
              label="Resuscitation (Resus)" 
              percent={100} 
              color="#ef4444" 
              note="(Full Capacity - Critical)" 
            />
            
            {/* Observation - Available */}
            <ProgressBar 
              label="Observation Beds" 
              percent={45} 
              color="#10b981" 
              note="(8 Beds Available)" 
            />
          </div>
        </div>

      </div>
    </Layout>
  );
};

// --- Helper Components ---

const StatCard = ({ icon, title, value, sub }) => (
  <div style={{ background: '#fff', padding: 18, borderRadius: 10, boxShadow: '0 6px 18px rgba(2,6,23,0.06)', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
    <div style={{ 
      minWidth: 52, height: 52, borderRadius: 10, 
      background: '#f8fafc', 
      display: 'flex', alignItems: 'center', justifyContent: 'center' 
    }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, color: '#64748b', fontSize: 13, fontWeight: 600 }}>{title}</p>
      <h3 style={{ margin: '4px 0', fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{value}</h3>
      {sub && <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>{sub}</p>}
    </div>
  </div>
);

const ProgressBar = ({ label, percent, color, note }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
      <span style={{ fontWeight: 600, color: '#334155', fontSize: 14 }}>{label}</span>
      <span style={{ color: '#64748b', fontSize: 13, fontWeight: 500 }}>{note}</span>
    </div>
    <div style={{ width: '100%', background: '#f1f5f9', borderRadius: 999, height: 10 }}>
      <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: 999, transition: 'width 0.5s ease' }} />
    </div>
  </div>
);

export default BedDashboard;