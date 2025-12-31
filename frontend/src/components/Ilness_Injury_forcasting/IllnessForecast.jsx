import React from 'react';
import Layout from '../Bed_demand_focasting/Layout';

const IllnessForecast = () => {
  // Weekly forecast data
  const weeklyData = [
    { disease: 'Influenza', week: '2026-W01', forecastCases: 78, confidenceInterval: '68-89' },
    { disease: 'Influenza', week: '2026-W02', forecastCases: 84, confidenceInterval: '72-96' },
    { disease: 'Dengue Fever', week: '2026-W01', forecastCases: 52, confidenceInterval: '44-61' },
  ];

  // Chart data for forecasted cases
  const chartData = [
    { week: 'Week 1', cases: 48 },
    { week: 'Week 2', cases: 55 },
    { week: 'Week 3', cases: 68 },
    { week: 'Week 4', cases: 62 },
    { week: 'Week 5', cases: 88 },
    { week: 'Week 6', cases: 75 },
    { week: 'Week 7', cases: 95 },
  ];

  // SVG Line Chart Component
  const LineChart = ({ data, width = 700, height = 250 }) => {
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxCases = Math.max(...data.map(d => d.cases));
    const minCases = 0;

    const xScale = (i) => padding + (i * chartWidth) / (data.length - 1);
    const yScale = (cases) => height - padding - (cases / maxCases) * chartHeight;

    const points = data.map((d, i) => `${xScale(i)},${yScale(d.cases)}`).join(' ');

    return (
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ marginTop: 16 }}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((val, i) => {
          const y = height - padding - (val / 100) * chartHeight;
          return (
            <g key={`grid-${i}`}>
              <line x1={padding} x2={width - padding} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="1" />
              <text x={padding - 10} y={y + 4} fontSize="12" fill="#9ca3af" textAnchor="end">
                {(val / 100) * maxCases}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={`label-${i}`}
            x={xScale(i)}
            y={height - padding + 25}
            fontSize="12"
            fill="#6b7280"
            textAnchor="middle"
          >
            {d.week}
          </text>
        ))}

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#1e40af"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />

        {/* Dots */}
        {data.map((d, i) => (
          <circle
            key={`dot-${i}`}
            cx={xScale(i)}
            cy={yScale(d.cases)}
            r="5"
            fill="#1e40af"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}

        {/* Axes */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#d1d5db" strokeWidth="2" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#d1d5db" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <Layout activePage="Forecast">
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
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Illness Forecast</h1>
          <p style={{ margin: 0, marginTop: 6, opacity: 0.9 }}>Weekly forecast for infectious diseases</p>
        </div>

        {/* Weekly Forecast Table */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #e6eef6',
          boxShadow: '0 8px 24px rgba(2,6,23,0.06)',
          marginBottom: 28,
          overflow: 'hidden'
        }}>
          <div style={{ padding: 20, borderBottom: '1px solid #e6eef6' }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Weekly Forecast</h2>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e6eef6' }}>
                <th style={{
                  padding: '14px 20px',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#334155'
                }}>
                  Disease
                </th>
                <th style={{
                  padding: '14px 20px',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#334155'
                }}>
                  Week
                </th>
                <th style={{
                  padding: '14px 20px',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#334155'
                }}>
                  Forecast Cases
                </th>
                <th style={{
                  padding: '14px 20px',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#334155'
                }}>
                  Confidence Interval
                </th>
              </tr>
            </thead>
            <tbody>
              {weeklyData.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: idx < weeklyData.length - 1 ? '1px solid #e6eef6' : 'none',
                    background: idx % 2 === 0 ? '#fff' : '#f8fafc'
                  }}
                >
                  <td style={{ padding: '14px 20px', fontSize: 15, color: '#0f172a', fontWeight: 500 }}>
                    {row.disease}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 15, color: '#0f172a' }}>
                    {row.week}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 15, color: '#0f172a', fontWeight: 600 }}>
                    {row.forecastCases}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 15, color: '#64748b' }}>
                    {row.confidenceInterval}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Forecasted Cases Chart */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #e6eef6',
          boxShadow: '0 8px 24px rgba(2,6,23,0.06)',
          padding: 20
        }}>
          <h2 style={{ margin: '0 0 12px 0', fontSize: 20, fontWeight: 700, color: '#0f172a' }}>
            Forecasted Cases
          </h2>
          <LineChart data={chartData} />
        </div>

      </div>
    </Layout>
  );
};

export default IllnessForecast;
