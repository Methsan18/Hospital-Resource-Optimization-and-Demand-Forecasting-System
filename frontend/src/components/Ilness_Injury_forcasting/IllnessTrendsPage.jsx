
import React, { useMemo } from 'react';
import Layout from '../Bed_demand_focasting/Layout';

/* =========================================================
   THEME
========================================================= */
const theme = {
  navy: '#0b2a5b',
  cardBg: '#fff',
  cardBorder: '#e6eef6',
  text: '#0f172a',
  heading: '#334155',
  muted: '#64748b',
  grid: '#f1f5f9',
  shadowMd: '0 8px 24px rgba(2,6,23,0.06)',
  shadowLg: '0 12px 32px rgba(2,6,23,0.08)',
};



/* =========================================================
   CHART (SVG)
========================================================= */
const TrendsLineChart = ({ series, xLabels, width = 680, height = 240 }) => {
  const paddingLeft = 56;
  const paddingRight = 18;
  const paddingTop = 14;
  const paddingBottom = 42;

  const allY = series.flatMap(s => s.data);
  const maxY = Math.max(...allY);
  const minY = Math.min(...allY, 0);
  const yMax = Math.ceil(maxY * 1.1);
  const yMin = Math.floor(minY);

  const xScale = (i) => paddingLeft + i * (width - paddingLeft - paddingRight) / (xLabels.length - 1);
  const yScale = (v) => paddingTop + (height - paddingTop - paddingBottom) * (1 - (v - yMin) / (yMax - yMin || 1));

  const yTicks = 5;
  const yValues = Array.from({ length: yTicks }, (_, k) =>
    Math.round(yMin + (k * (yMax - yMin)) / (yTicks - 1))
  );

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      {/* area border */}
      <rect
        x={paddingLeft}
        y={paddingTop}
        width={width - paddingLeft - paddingRight}
        height={height - paddingTop - paddingBottom}
        fill="none"
        stroke={theme.cardBorder}
        rx="10"
      />

      {/* horizontal grid + y labels */}
      {yValues.map((yv, i) => {
        const y = yScale(yv);
        return (
          <g key={`y-${i}`}>
            <line x1={paddingLeft} x2={width - paddingRight} y1={y} y2={y} stroke={theme.grid} />
            <text x={paddingLeft - 12} y={y + 4} fontSize="12" fill={theme.muted} textAnchor="end">
              {yv}
            </text>
          </g>
        );
      })}

      {/* x ticks + labels */}
      {xLabels.map((xl, i) => {
        const x = xScale(i);
        const baseY = height - paddingBottom;
        return (
          <g key={`x-${xl}-${i}`}>
            <line x1={x} x2={x} y1={baseY} y2={baseY + 6} stroke="#cbd5e1" />
            <text x={x} y={baseY + 22} fontSize="12" fill={theme.muted} textAnchor="middle">
              {xl}
            </text>
          </g>
        );
      })}

      {/* series paths + dots */}
      {series.map((s, idx) => {
        const points = s.data.map((v, i) => `${xScale(i)},${yScale(v)}`).join(' ');
        return (
          <g key={`series-${idx}`}>
            <polyline points={points} fill="none" stroke={s.color} strokeWidth="3" />
            {s.data.map((v, i) => (
              <circle key={`dot-${idx}-${i}`} cx={xScale(i)} cy={yScale(v)} r="4.5" fill={s.color} />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/* =========================================================
   ILLNESS TRENDS CARD
========================================================= */
const IllnessTrendsCard = () => {
  const months = ['Jan','Mar','May','Jul','Sep','Sep','Nov','Dec']; // sample X labels per mock
  const series = useMemo(() => ([
    {
      name: 'Influenza',
      color: '#1e3a8a', // blue
      data: [160, 155, 225, 165, 150, 175, 170, 180],
    },
    {
      name: 'Dengue Fever',
      color: '#f59e0b', // orange
      data: [110, 112, 138, 122, 108, 133, 138, 122],
    },
    {
      name: 'Asthma',
      color: '#10b981', // green
      data: [82, 86, 92, 84, 78, 93, 95, 99],
    },
  ]), []);

  return (
    <div style={{
      background: theme.cardBg,
      border: `1px solid ${theme.cardBorder}`,
      borderRadius: 16,
      boxShadow: theme.shadowLg,
      overflow: 'hidden'
    }}>
      {/* Navy header */}
      <div style={{
        background: theme.navy,
        color: '#fff',
        padding: '18px 22px',
        fontSize: 26,
        fontWeight: 800
      }}>
        Illness Trends
      </div>

      {/* Body */}
      <div style={{ padding: 22 }}>
        {/* Chart title + legend */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ margin: 0, color: theme.heading, fontSize: 22, fontWeight: 800 }}>Trends Over Time</h3>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {series.map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 12, height: 12, borderRadius: 999, background: s.color,
                  boxShadow: '0 0 0 2px #fff'
                }} />
                <span style={{ color: theme.heading }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: '#fff',
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: 12,
          padding: 12
        }}>
          <TrendsLineChart series={series} xLabels={months} />
        </div>

        {/* Table */}
        <div style={{ marginTop: 18 }}>
          <h3 style={{ margin: 0, color: theme.heading, fontSize: 22, fontWeight: 800 }}>Top Diseases by Growth</h3>

          <div style={{
            marginTop: 10,
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: 12,
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8fafc' }}>
                <tr>
                  {['Disease','Month','Year','Cases','MoM Change','YoY Change'].map(h => (
                    <th key={h} style={{
                      textAlign: 'left',
                      padding: '12px 14px',
                      color: theme.heading,
                      fontWeight: 800,
                      fontSize: 14,
                      borderBottom: `1px solid ${theme.cardBorder}`
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { d:'Influenza', m:'January', y:'2025', c:320, mom:'+12%', yoy:'+9%' },
                  { d:'Dengue Fever', m:'September', y:'2024', c:210, mom:'+18%', yoy:'+6%' },
                  { d:'Asthma', m:'December', y:'2025', c:130, mom:'+7%', yoy:'+4%' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${theme.cardBorder}` }}>
                    <td style={{ padding: '12px 14px' }}>{row.d}</td>
                    <td style={{ padding: '12px 14px' }}>{row.m}</td>
                    <td style={{ padding: '12px 14px' }}>{row.y}</td>
                    <td style={{ padding: '12px 14px' }}>{row.c}</td>
                    <td style={{ padding: '12px 14px', color: '#16a34a', fontWeight: 700 }}>{row.mom}</td>
                    <td style={{ padding: '12px 14px', color: '#16a34a', fontWeight: 700 }}>{row.yoy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   PAGE WRAPPER (Using Shared Layout)
========================================================= */
const IllnessTrendsPage = () => {
  return (
    <Layout activePage="Trends">
      <div style={{ padding: 28, maxWidth: 1100, margin: '24px auto' }}>
        <IllnessTrendsCard />
      </div>
    </Layout>
  );
};

export default IllnessTrendsPage;
