import React from 'react';
import Layout from '../Bed_demand_focasting/Layout';
import { AlertCircle } from 'lucide-react';

const IllnessAlerts = () => {
  const alertsData = [
    {
      alert: 'Dengue',
      description: 'Increase in cases projected next month',
      priority: 'High',
      actions: 'Prepare control measures'
    },
    {
      alert: 'Respiratory Infections',
      description: 'Cases rising above average for two weeks',
      priority: 'High',
      actions: 'Increase patient monitoring'
    },
    {
      alert: 'Asthma',
      description: 'Spike detected in children last week',
      priority: 'Moderate',
      actions: 'Issue public health advisory'
    },
    {
      alert: 'Fall-Related Injuries',
      description: 'Month-to-date cases higher than usual',
      priority: 'Moderate',
      actions: 'Review safety protocols'
    },
  ];

  const getPriorityColor = (priority) => {
    if (priority === 'High') return '#dc2626';
    if (priority === 'Moderate') return '#ea580c';
    return '#10b981';
  };

  const getPriorityBgColor = (priority) => {
    if (priority === 'High') return '#fee2e2';
    if (priority === 'Moderate') return '#fef3c7';
    return '#f0fdf4';
  };

  return (
    <Layout activePage="Alerts">
      <div style={{ padding: 28, maxWidth: 1100, margin: '24px auto', color: '#0f172a' }}>
        
        {/* Header */}
        <div style={{
          background: '#0b2a5b',
          color: '#fff',
          padding: 20,
          borderRadius: 14,
          marginBottom: 28,
          boxShadow: '0 10px 28px rgba(2,6,23,0.08)'
        }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Illness & Injury Alerts</h1>
          <p style={{ margin: 0, marginTop: 6, opacity: 0.9 }}>Active alerts and recommended actions</p>
        </div>

        {/* Alerts Table */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #e6eef6',
          boxShadow: '0 8px 24px rgba(2,6,23,0.06)',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e6eef6' }}>
                <th style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#334155'
                }}>
                  Alert
                </th>
                <th style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#334155'
                }}>
                  Description
                </th>
                <th style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#334155'
                }}>
                  Priority
                </th>
                <th style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#334155'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {alertsData.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: idx < alertsData.length - 1 ? '1px solid #e6eef6' : 'none',
                    background: idx % 2 === 0 ? '#fff' : '#f8fafc'
                  }}
                >
                  <td style={{
                    padding: '16px 20px',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#0f172a'
                  }}>
                    {row.alert}
                  </td>
                  <td style={{
                    padding: '16px 20px',
                    fontSize: 15,
                    color: '#475569',
                    maxWidth: 300
                  }}>
                    {row.description}
                  </td>
                  <td style={{
                    padding: '16px 20px',
                    fontSize: 15,
                    fontWeight: 600
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      borderRadius: 6,
                      background: getPriorityBgColor(row.priority),
                      color: getPriorityColor(row.priority),
                      fontWeight: 700
                    }}>
                      {row.priority}
                    </span>
                  </td>
                  <td style={{
                    padding: '16px 20px',
                    fontSize: 15,
                    color: '#0b2a5b',
                    fontWeight: 500
                  }}>
                    {row.actions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info Box */}
        <div style={{
          marginTop: 24,
          padding: 16,
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: 12,
          display: 'flex',
          gap: 12
        }}>
          <AlertCircle size={20} color="#1e40af" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e40af' }}>Alert Management</p>
            <p style={{ margin: '6px 0 0 0', fontSize: 13, color: '#1e3a8a' }}>
              Review alerts regularly and implement recommended actions to prevent disease outbreaks and manage patient safety.
            </p>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default IllnessAlerts;
