import React, { useState, useEffect } from 'react';
import { 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { BrainCircuit, Info } from 'lucide-react'; // Make sure to install lucide-react if needed
import Layout from './Layout';
import styles from './Forecast.module.css';

const Forecast = () => {
  // --- STATE MANAGEMENT ---
  const [timeframe, setTimeframe] = useState('Next Shift');
  const [selectedZone, setSelectedZone] = useState('Total ETU');
  const [model, setModel] = useState('TFT');
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  // --- MOCK DATA ENGINE (The "Brain") ---
  useEffect(() => {
    let generatedData = [];
    let generatedTable = [];
    const isResus = selectedZone === 'Resus (Critical)';
    
    // LOGIC: Adjust numbers based on Zone (Resus is small/critical, Triage is large)
    const baseValue = isResus ? 2 : 30; 
    const randomVar = isResus ? 2 : 15;

    if (timeframe === 'Next Shift') {
      // HOURLY DATA
      generatedData = [
        { name: '13:00', historical: baseValue - 1, predicted: null, range: null },
        { name: '14:00', historical: baseValue + 2, predicted: null, range: null },
        { name: '15:00', historical: baseValue, predicted: null, range: null }, // Current Time
        { name: '15:00', historical: null, predicted: baseValue, range: [baseValue-1, baseValue+1] }, // Connector
        { name: '16:00', historical: null, predicted: baseValue + 5, range: [baseValue, baseValue + 10] }, // Peak
        { name: '17:00', historical: null, predicted: baseValue + 3, range: [baseValue, baseValue + 6] },
        { name: '18:00', historical: null, predicted: baseValue - 2, range: [baseValue-5, baseValue] },
      ];
      generatedTable = [
        { label: '16:00 (Peak)', prediction: baseValue + 5, min: baseValue, max: baseValue + 10 },
        { label: '17:00', prediction: baseValue + 3, min: baseValue, max: baseValue + 6 },
        { label: '18:00', prediction: baseValue - 2, min: baseValue - 5, max: baseValue },
      ];
    } else {
      // DAILY/WEEKLY DATA
      generatedData = [
        { name: 'Mon', historical: baseValue, predicted: null, range: null },
        { name: 'Tue', historical: baseValue + 5, predicted: null, range: null },
        { name: 'Wed', historical: baseValue - 2, predicted: null, range: null },
        { name: 'Wed', historical: null, predicted: baseValue - 2, range: [baseValue-5, baseValue] }, // Connector
        { name: 'Thu', historical: null, predicted: baseValue + 8, range: [baseValue+2, baseValue+15] },
        { name: 'Fri', historical: null, predicted: baseValue + 12, range: [baseValue+5, baseValue+20] },
        { name: 'Sat', historical: null, predicted: baseValue + 4, range: [baseValue, baseValue+8] },
      ];
      generatedTable = [
        { label: 'Thursday', prediction: baseValue + 8, min: baseValue + 2, max: baseValue + 15 },
        { label: 'Friday', prediction: baseValue + 12, min: baseValue + 5, max: baseValue + 20 },
        { label: 'Saturday', prediction: baseValue + 4, min: baseValue, max: baseValue + 8 },
      ];
    }

    setChartData(generatedData);
    setTableData(generatedTable);
  }, [timeframe, selectedZone, model]);

  return (
    <Layout activePage="Forecasts">
      <div className={styles.container}>
        
        {/* --- HEADER --- */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Future Demand Forecast</h1>
            <p className={styles.subtitle}>AI-Powered prediction for ETU Zones</p>
          </div>

          <div className={styles.controls}>
            {/* 1. Zone Selector (Option B) */}
            <div className={styles.controlGroup}>
              <span className={styles.label}>Target Zone:</span>
              <select 
                className={styles.select}
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
              >
                <option>Total ETU</option>
                <option>Triage (Waiting)</option>
                <option>Resus (Critical)</option>
                <option>Observation</option>
              </select>
            </div>

            {/* 2. Timeframe Selector */}
            <div className={styles.controlGroup}>
              <span className={styles.label}>Timeframe:</span>
              <select 
                className={styles.select}
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option>Next Shift</option>
                <option>Next Day</option>
                <option>Next 2 Days</option>
                <option>Next Month</option>
              </select>
            </div>

            {/* 3. Model Selector */}
            <div className={styles.controlGroup}>
              <span className={styles.label}>Model:</span>
              <select 
                className={`${styles.select} ${styles.modelSelect}`}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option>TFT (Transformer)</option>
                <option>LSTM</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- MAIN CHART CARD --- */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>{selectedZone} Demand: {timeframe}</h3>
              <span className={styles.cardSub}>Observed vs {model} Prediction</span>
            </div>
            
            {/* Custom Legend Logic can go here if needed */}
          </div>

          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px' }}/>
                
                {/* Confidence Interval */}
                <Area 
                  type="monotone" 
                  dataKey="range" 
                  stroke="none" 
                  fill="url(#colorCi)" 
                  name="Confidence Range"
                />

                {/* History */}
                <Line 
                  type="monotone" 
                  dataKey="historical" 
                  stroke="#0ea5e9" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 0 }} 
                  activeDot={{ r: 6 }}
                  name="Observed Data" 
                />

                {/* Prediction */}
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#f97316" 
                  strokeWidth={3} 
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: '#f97316', strokeWidth: 0 }} 
                  name="AI Prediction" 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* --- ANALYSIS INSIGHT BOX --- */}
          <div className={styles.analysisBox}>
            <Info className={styles.analysisIcon} size={20} />
            <p>
              <strong>Analysis:</strong> For <strong>{selectedZone}</strong>, the <strong>{model}</strong> model predicts a 
              spike of <strong>{selectedZone.includes('Resus') ? '+2 Critical' : '+15%'}</strong> patients 
              during the {timeframe === 'Next Shift' ? 'late evening hours' : 'upcoming period'}.
            </p>
          </div>
        </section>

        {/* --- DETAILS TABLE --- */}
        <section className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Forecast Details</h3>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Shift / Time</th>
                  <th>Predicted Demand</th>
                  <th>Lower Bound</th>
                  <th>Upper Bound</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.label}</td>
                    <td className={styles.bold}>{row.prediction} Beds</td>
                    <td className={styles.subtle}>{row.min}</td>
                    <td className={styles.subtle}>{row.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Forecast;