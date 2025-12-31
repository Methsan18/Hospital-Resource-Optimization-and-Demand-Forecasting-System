import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from './Layout';
import styles from './Trends.module.css';

// Dummy Data for the Chart
const historicalData = [
  { month: 'Jan', ICU: 40, General: 24, Maternity: 18 },
  { month: 'Feb', ICU: 30, General: 13, Maternity: 22 },
  { month: 'Mar', ICU: 20, General: 48, Maternity: 25 },
  { month: 'Apr', ICU: 27, General: 39, Maternity: 20 },
  { month: 'May', ICU: 18, General: 48, Maternity: 21 },
  { month: 'Jun', ICU: 23, General: 38, Maternity: 25 },
  { month: 'Jul', ICU: 34, General: 43, Maternity: 21 },
];

const Trends = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Historical Occupancy Trends</h1>

          <div className={styles.controls}>
            <label className={styles.label} htmlFor="time-range">Time Range:</label>
            <select id="time-range" className={styles.select} aria-label="Time Range">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
            </select>
          </div>
        </div>

        <div className={styles.rightControls}>
          <label className={styles.label} htmlFor="compare">Compare:</label>
          <select id="compare" className={styles.select} aria-label="Compare">
            <option>All Wards</option>
            <option>ICU vs General</option>
            <option>Maternity</option>
          </select>
        </div>

        <section className={styles.card}>
          <div className={styles.centerTitle}>
            <h3 className="" style={{fontSize:16,fontWeight:600,color:'#334155'}}>Historical Occupancy Trends</h3>
          </div>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 10, right: 24, left: 12, bottom: 6 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6eef6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#475569' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569' }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 6px 18px rgba(2,6,23,0.06)' }} />
                <Legend verticalAlign="top" align="right" />
                <Line type="monotone" dataKey="ICU" stroke="#ef4444" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="General" stroke="#0ea5e9" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Maternity" stroke="#10b981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className={styles.card}>
          <h4 style={{fontSize:15,fontWeight:600,color:'#334155',marginBottom:8}}>Weekly Occupancy Heatmap</h4>
          <div className={styles.heatmap}>
            <div>Heatmap visualization goes here.</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const InsightCard = ({ title, value, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <h4 className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">{title}</h4>
    <p className="text-2xl font-bold text-slate-800 mb-1">{value}</p>
    <p className="text-sm text-slate-400">{desc}</p>
  </div>
);

export default Trends;