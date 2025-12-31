
import React, { useMemo, useState } from 'react';
import { AlertCircle, ChevronDown, Activity, HeartPulse, Thermometer } from 'lucide-react';
import Layout from '../Bed_demand_focasting/Layout';

/* ----------------------------------------------------------
   THEME (for consistent, professional look)
-----------------------------------------------------------*/
const theme = {
  cardBg: '#fff',
  cardBorder: '#e6eef6',
  shadowLg: '0 10px 28px rgba(2,6,23,0.08)',
  shadowMd: '0 8px 24px rgba(2,6,23,0.06)',
  shadowSm: '0 4px 12px rgba(2,6,23,0.06)',
  muted: '#64748b',
  text: '#0f172a',
  heading: '#334155',
  accent: '#0ea5e9',
  grid: '#f1f5f9',
  line: '#1e3a8a'
};

/* ----------------------------------------------------------
   CONSTANTS
-----------------------------------------------------------*/
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const WEEK_LABELS = ['W1','W2','W3','W4'];

// S1..S8 disease mapping
const CATEGORIES = [
  'Influenza',   // S1
  'Asthma',      // S2
  'Dengue',      // S3
  'COVID-19',    // S4
  'Malaria',     // S5
  'Pneumonia',   // S6
  'Chikungunya', // S7
  'Tuberculosis' // S8
];

const DEPARTMENTS = ['General','Pediatrics','ETU','ICU','OPD'];

/* ----------------------------------------------------------
   MOCK VALUE GENERATOR (replace with real API later)
-----------------------------------------------------------*/
function valueFor(monthIdx, weekIdx, categoryIdx, deptIdx) {
  const base = (monthIdx + 1) * 3 + (weekIdx + 1) * 5 + categoryIdx * 4 + deptIdx * 2;
  const seasonal = [1.15, 1.10, 0.95, 0.90, 0.92, 0.95, 1.00, 1.05, 1.08, 1.12, 1.18, 1.20][monthIdx];
  return Math.round(base * seasonal);
}

/* ----------------------------------------------------------
   UTILITIES
-----------------------------------------------------------*/
function normalizeGrid(grid) {
  if (!grid || grid.length === 0) return [];
  let min = Infinity, max = -Infinity;
  grid.forEach(row => row.forEach(v => { min = Math.min(min, v); max = Math.max(max, v); }));
  const range = max - min || 1;
  return grid.map(row => row.map(v => (v - min) / range));
}
function hexToRgb(hex) {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(cleaned, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}
function sLabelForDisease(disease) {
  const idx = CATEGORIES.indexOf(disease);
  return idx >= 0 ? `S${idx + 1}` : 'S?';
}

/* ----------------------------------------------------------
   REUSABLE UI
-----------------------------------------------------------*/
const Dropdown = ({ label, value, onChange, options }) => (
  <div style={{
    background: theme.cardBg,
    border: `1px solid ${theme.cardBorder}`,
    borderRadius: 12,
    padding: '12px 14px',
    boxShadow: theme.shadowSm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 12, color: theme.muted }}>{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          border: 'none',
          outline: 'none',
          fontSize: 15,
          color: theme.text,
          background: 'transparent',
          paddingRight: 18
        }}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
    <ChevronDown size={18} color="#94a3b8" />
  </div>
);

const Card = ({ title, children }) => (
  <div style={{
    background: theme.cardBg,
    padding: 16,
    borderRadius: 12,
    boxShadow: theme.shadowMd,
    border: `1px solid ${theme.cardBorder}`
  }}>
    <p style={{ margin: 0, fontWeight: 700, color: theme.heading, marginBottom: 10 }}>{title}</p>
    {children}
  </div>
);

const KpiCard = ({ icon, title, value, sub }) => (
  <div style={{
    background: theme.cardBg,
    padding: 18,
    borderRadius: 12,
    boxShadow: theme.shadowMd,
    border: `1px solid ${theme.cardBorder}`,
    display: 'flex',
    alignItems: 'center',
    gap: 14
  }}>
    <div style={{
      minWidth: 54,
      height: 54,
      borderRadius: 12,
      background: '#eef2ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, color: theme.muted, fontSize: 13, fontWeight: 600 }}>{title}</p>
      <h3 style={{ margin: '2px 0', fontSize: 28, fontWeight: 800, color: theme.text }}>{value}</h3>
      <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>{sub}</p>
    </div>
  </div>
);

const AlertCard = () => (
  <div style={{
    background: theme.cardBg,
    padding: 18,
    borderRadius: 12,
    boxShadow: theme.shadowMd,
    border: `1px solid ${theme.cardBorder}`
  }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <div style={{
        minWidth: 36,
        height: 36,
        borderRadius: 8,
        background: '#fee2e2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AlertCircle size={18} color="#b91c1c" />
      </div>
      <div>
        <p style={{ margin: 0, color: theme.heading, fontWeight: 700 }}>Alerts</p>
        <div style={{
          marginTop: 6,
          background: '#fff7f7',
          border: '1px solid #ffe4e6',
          borderRadius: 10,
          padding: 10
        }}>
          <p style={{ margin: 0, color: '#991b1b', fontSize: 13 }}>
            Filters switch weekly/monthly views. Staff rosters should align with forecast.
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ----------------- LineChart (axes + dynamic xLabels) ----------------- */
const LineChart = ({
  data,
  xLabels,               // ['Jan',...,'Dec'] or ['W1','W2','W3','W4']
  width = 540,
  height = 280,
  color = theme.line,
  yLabel = 'Cases',
  xAxisTitle = 'Month'
}) => {
  const paddingLeft = 56;
  const paddingBottom = 50;
  const paddingTop = 20;
  const paddingRight = 16;

  const maxY = Math.max(...data);
  const minY = Math.min(...data);

  const xScale = (i) =>
    paddingLeft + (i * (width - paddingLeft - paddingRight)) / (data.length - 1);
  const yScale = (val) =>
    paddingTop + (height - paddingTop - paddingBottom) * (1 - (val - minY) / (maxY - minY || 1));

  const points = data.map((y, i) => `${xScale(i)},${yScale(y)}`).join(' ');

  const yTicks = 5;
  const yValues = Array.from({ length: yTicks }, (_, k) =>
    Math.round(minY + (k * (maxY - minY)) / (yTicks - 1))
  );

  const axisBottomY = height - paddingBottom;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      {/* area border */}
      <rect
        x={paddingLeft}
        y={paddingTop}
        width={width - paddingLeft - paddingRight}
        height={height - paddingTop - paddingBottom}
        fill="none"
        stroke="#e5e7eb"
        rx="10"
      />

      {/* horizontal grid + Y labels */}
      {yValues.map((yv, idx) => {
        const y = yScale(yv);
        return (
          <g key={`y-${idx}`}>
            <line x1={paddingLeft} x2={width - paddingRight} y1={y} y2={y} stroke={theme.grid} />
            <text x={paddingLeft - 12} y={y + 4} fontSize="12" fill={theme.muted} textAnchor="end">
              {yv}
            </text>
          </g>
        );
      })}

      {/* X ticks + labels */}
      {xLabels.map((m, i) => {
        const x = xScale(i);
        return (
          <g key={`x-${m}-${i}`}>
            <line x1={x} x2={x} y1={axisBottomY} y2={axisBottomY + 6} stroke="#cbd5e1" />
            <text x={x} y={axisBottomY + 22} fontSize="12" fill={theme.muted} textAnchor="middle">
              {m}
            </text>
          </g>
        );
      })}

      {/* axis titles */}
      <text
        x={paddingLeft - 40}
        y={paddingTop + 12}
        fontSize="12"
        fill={theme.heading}
        textAnchor="start"
        transform={`rotate(-90 ${paddingLeft - 40},${paddingTop + 12})`}
      >
        {yLabel}
      </text>
      <text
        x={(paddingLeft + width - paddingRight) / 2}
        y={height - 10}
        fontSize="12"
        fill={theme.heading}
        textAnchor="middle"
      >
        {xAxisTitle}
      </text>

      {/* line + dots */}
      <polyline points={points} fill="none" stroke={color} strokeWidth="3" />
      {data.map((y, i) => (
        <circle key={`dot-${i}`} cx={xScale(i)} cy={yScale(y)} r="4.5" fill={color} />
      ))}
    </svg>
  );
};

/* ----------------- Heatmap (tight, professional) ----------------- */
const Heatmap = ({
  data,               // matrix normalized 0..1
  rowLabels,          // ['Jan','Feb',...] OR ['W1'..'W4']
  colHeadersS,        // ['S1','S2',...]
  cellSize = 18,
  gap = 4
}) => {
  const rows = data.length;
  const cols = data[0]?.length || 0;

  const leftLabelW = 44;
  const topHeaderH = 22;
  const width = leftLabelW + cols * (cellSize + gap) - gap;
  const height = topHeaderH + rows * (cellSize + gap) - gap;

  const startColor = '#c7d2fe';
  const endColor = '#0b2a5b';
  const lerpColor = (t) => {
    const sc = hexToRgb(startColor);
    const ec = hexToRgb(endColor);
    const r = Math.round(sc.r + (ec.r - sc.r) * t);
    const g = Math.round(sc.g + (ec.g - sc.g) * t);
    const b = Math.round(sc.b + (ec.b - sc.b) * t);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg
        width="100%"
        style={{ maxWidth: Math.min(520, 80 + cols * (cellSize + gap)) }}
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* Column headers: S labels only */}
        {Array.from({ length: cols }, (_, c) => {
          const x = leftLabelW + c * (cellSize + gap) + cellSize / 2;
          const label = colHeadersS[c] ?? `S${c + 1}`;
          return (
            <text
              key={`col-${c}`}
              x={x}
              y={topHeaderH - 6}
              fontSize="12"
              fill={theme.heading}
              textAnchor="middle"
              fontWeight="800"
            >
              {label}
            </text>
          );
        })}

        {/* Grid cells + row labels */}
        {data.map((row, r) =>
          row.map((v, c) => {
            const x = leftLabelW + c * (cellSize + gap);
            const y = topHeaderH + r * (cellSize + gap);
            return (
              <g key={`${r}-${c}`}>
                {c === 0 && (
                  <text
                    x={leftLabelW - 10}
                    y={y + cellSize / 2 + 4}
                    fontSize="12"
                    fill={theme.muted}
                    textAnchor="end"
                    fontWeight="600"
                  >
                    {rowLabels[r]}
                  </text>
                )}
                <rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  rx="5"
                  fill={lerpColor(v)}
                  stroke={theme.cardBorder}
                />
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
};

/* ----------------- SingleCategoryTrend (compact, clear) ----------------- */
const SingleCategoryTrend = ({
  sLabel,        // e.g., 'S2'
  rowLabels,     // months or weeks
  values         // raw numeric values per row
}) => {
  const max = Math.max(...values, 1);
  return (
    <div style={{
      paddingTop: 4
    }}>
      {/* S label header (compact) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <div style={{
          padding: '4px 10px',
          borderRadius: 999,
          border: `1px solid ${theme.cardBorder}`,
          background: '#f8fafc',
          color: theme.heading,
          fontWeight: 800
        }}>
          {sLabel}
        </div>
      </div>

      {/* Bars */}
      <div style={{ display: 'grid', gap: 10 }}>
        {rowLabels.map((label, i) => {
          const pct = Math.round((values[i] / max) * 100);
          return (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '64px 1fr 56px', alignItems: 'center', gap: 10 }}>
              <div style={{ color: theme.heading, fontWeight: 700, textAlign: 'right' }}>{label}</div>
              <div style={{
                height: 14,
                borderRadius: 999,
                background: theme.grid,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: theme.shadowSm
              }}>
                <div style={{
                  width: `${pct}%`,
                  height: '100%',
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, #c7d2fe, #0b2a5b)'
                }} />
              </div>
              <div style={{ color: theme.muted, fontSize: 12, textAlign: 'right' }}>{values[i]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ----------------- Modern S Chips ----------------- */
const SChips = ({ activeDisease }) => {
  const palette = ['#1d4ed8','#0ea5e9','#10b981','#f59e0b','#ef4444','#a855f7','#22c55e','#2563eb'];
  return (
    <div style={{
      marginTop: 12,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10
    }}>
      {CATEGORIES.map((cat, idx) => {
        const sLabel = `S${idx + 1}`;
        const active = !activeDisease || activeDisease === cat;
        return (
          <div
            key={cat}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              borderRadius: 999,
              border: `1px solid ${active ? theme.cardBorder : '#e5e7eb'}`,
              background: active ? '#f8fafc' : '#f9fafb',
              boxShadow: active ? theme.shadowSm : 'none',
              color: active ? theme.heading : '#94a3b8',
              fontSize: 12,
              fontWeight: 700
            }}
          >
            <span style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: palette[idx % palette.length],
              boxShadow: '0 0 0 2px #fff'
            }} />
            <span>{sLabel}</span>
            <span style={{ fontWeight: 600, color: active ? theme.muted : '#a3aab7' }}>→ {cat}</span>
          </div>
        );
      })}
    </div>
  );
};

/* ----------------------------------------------------------
   METRICS (reactive to filters)
-----------------------------------------------------------*/
function computeMetrics(filters) {
  const { month, disease, department } = filters;
  const isMonthlyView = month === 'All';

  const activeCategories = disease === 'All' ? CATEGORIES : [disease];
  const deptList = department === 'All' ? DEPARTMENTS : [department];

  const xLabels = isMonthlyView ? MONTHS.map(m => m.slice(0,3)) : WEEK_LABELS;
  const xLen = xLabels.length;

  // Line series: total cases per X bucket (month or week)
  const lineData = Array.from({ length: xLen }, (_, i) => {
    let sum = 0;

    if (isMonthlyView) {
      const monthIdx = i;
      for (let w = 0; w < WEEK_LABELS.length; w++) {
        for (const cat of activeCategories) {
          const cIdx = CATEGORIES.indexOf(cat);
          for (const dpt of deptList) {
            const dIdx = DEPARTMENTS.indexOf(dpt);
            sum += valueFor(monthIdx, w, cIdx, dIdx);
          }
        }
      }
    } else {
      const monthIdx = MONTHS.indexOf(month);
      const weekIdx = i;
      for (const cat of activeCategories) {
        const cIdx = CATEGORIES.indexOf(cat);
        for (const dpt of deptList) {
          const dIdx = DEPARTMENTS.indexOf(dpt);
          sum += valueFor(monthIdx, weekIdx, cIdx, dIdx);
        }
      }
    }
    return sum;
  });

  // Heatmap data: rows = months or weeks; cols = active categories
  const rowLabels = isMonthlyView ? MONTHS.map(m => m.slice(0,3)) : WEEK_LABELS;
  const rows = rowLabels.length;
  const cols = activeCategories.length;

  const heatmapRaw = Array.from({ length: rows }, (_, r) => {
    return Array.from({ length: cols }, (_, c) => {
      let sum = 0;
      if (isMonthlyView) {
        const monthIdx = r;
        const catIdx = CATEGORIES.indexOf(activeCategories[c]);
        for (let w = 0; w < WEEK_LABELS.length; w++) {
          for (const dpt of deptList) {
            const dIdx = DEPARTMENTS.indexOf(dpt);
            sum += valueFor(monthIdx, w, catIdx, dIdx);
          }
        }
      } else {
        const monthIdx = MONTHS.indexOf(month);
        const weekIdx = r;
        const catIdx = CATEGORIES.indexOf(activeCategories[c]);
        for (const dpt of deptList) {
          const dIdx = DEPARTMENTS.indexOf(dpt);
          sum += valueFor(monthIdx, weekIdx, catIdx, dIdx);
        }
      }
      return sum;
    });
  });

  // KPIs (example selection)
  const kpi = {
    influenza: {
      value: approxCategoryTotal('Influenza', filters),
      sub: isMonthlyView ? 'Year-to-date' : `Weekly in ${month}`
    },
    dengue: {
      value: approxCategoryTotal('Dengue', filters),
      sub: isMonthlyView ? 'Year-to-date' : `Weekly in ${month}`
    },
    asthma: {
      value: approxCategoryTotal('Asthma', filters),
      sub: isMonthlyView ? 'Year-to-date' : `Weekly in ${month}`
    },
  };

  // Column headers show S labels (not disease names)
  const colHeadersS = activeCategories.map(cat => sLabelForDisease(cat));

  return {
    xLabels,
    lineData,
    heatmapRaw,
    heatmapData: normalizeGrid(heatmapRaw),
    colHeadersS,
    rowLabels,
    kpi,
    isMonthlyView,
    activeCategories
  };
}

function approxCategoryTotal(categoryName, { month, disease, department }) {
  const deptList = department === 'All' ? DEPARTMENTS : [department];
  const includeCat = disease === 'All' || disease === categoryName;
  if (!includeCat) return 0;

  let total = 0;
  if (month === 'All') {
    for (let m = 0; m < MONTHS.length; m++) {
      for (let w = 0; w < WEEK_LABELS.length; w++) {
        for (const dpt of deptList) {
          const dIdx = DEPARTMENTS.indexOf(dpt);
          const cIdx = CATEGORIES.indexOf(categoryName);
          total += valueFor(m, w, cIdx, dIdx);
        }
      }
    }
  } else {
    const mIdx = MONTHS.indexOf(month);
    for (let w = 0; w < WEEK_LABELS.length; w++) {
      for (const dpt of deptList) {
        const dIdx = DEPARTMENTS.indexOf(dpt);
        const cIdx = CATEGORIES.indexOf(categoryName);
        total += valueFor(mIdx, w, cIdx, dIdx);
      }
    }
  }
  return total;
}

/* ----------------------------------------------------------
   MAIN DASHBOARD
-----------------------------------------------------------*/
const Ilness_InjuryDashboard = () => {
  const [month, setMonth] = useState('All');       // 'All' or 'January'
  const [disease, setDisease] = useState('All');   // 'All' or one of CATEGORIES
  const [department, setDepartment] = useState('All'); // 'All' or one of DEPARTMENTS

  const { xLabels, lineData, heatmapData, heatmapRaw, colHeadersS, rowLabels, kpi } = useMemo(() => {
    return computeMetrics({ month, disease, department });
  }, [month, disease, department]);

  const subtitle = month === 'All'
    ? 'Year view • Monthly totals'
    : `Weekly view for ${month}`;

  const activeDisease = disease === 'All' ? null : disease;

  // If single disease is selected, prepare series for the compact view
  const singleValues = (colHeadersS.length === 1)
    ? heatmapRaw.map(row => row[0])
    : null;

  return (
    <Layout activePage="Dashboard">
      <div style={{ padding: 28, maxWidth: 1200, margin: '24px auto', color: theme.text }}>

        {/* Header */}
        <div style={{
          background: '#0b2a5b',
          color: '#fff',
          padding: 20,
          borderRadius: 14,
          boxShadow: theme.shadowLg
        }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Ilness_Injury Dashboard</h1>
          <p style={{ margin: 0, marginTop: 6, opacity: 0.9 }}>{subtitle}</p>
        </div>

        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 18 }}>
          <KpiCard
            icon={<Thermometer size={24} color="#1e3a8a" />}
            title="Influenza Cases"
            value={kpi.influenza.value}
            sub={kpi.influenza.sub}
          />
          <KpiCard
            icon={<Activity size={24} color="#0ea5e9" />}
            title="Dengue Cases"
            value={kpi.dengue.value}
            sub={kpi.dengue.sub}
          />
          <KpiCard
            icon={<HeartPulse size={24} color="#1d4ed8" />}
            title="Asthma Incidents"
            value={kpi.asthma.value}
            sub={kpi.asthma.sub}
          />
          <AlertCard />
        </div>

        {/* Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 16, marginBottom: 8 }}>
          <Dropdown
            label="Month"
            value={month}
            onChange={setMonth}
            options={['All', ...MONTHS]}
          />
          <Dropdown
            label="Disease"
            value={disease}
            onChange={setDisease}
            options={['All', ...CATEGORIES]}
          />
          <Dropdown
            label="Department"
            value={department}
            onChange={setDepartment}
            options={['All', ...DEPARTMENTS]}
          />
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 12 }}>
          {/* Forecasted Cases */}
          <Card title="Forecasted Cases">
            <LineChart
              data={lineData}
              xLabels={xLabels}                    // months or weeks
              yLabel="Cases"
              xAxisTitle={month === 'All' ? 'Month' : 'Week'}
            />
            {/* Modern S chips (clean, compact) */}
            <SChips activeDisease={activeDisease} />
          </Card>

          {/* Monthly Trends */}
          <Card title="Monthly Trends">
            {colHeadersS.length === 1 && singleValues
              ? (
                <SingleCategoryTrend
                  sLabel={colHeadersS[0]}       // show S label only
                  rowLabels={rowLabels}         // months or weeks
                  values={singleValues}         // raw numbers
                />
              )
              : (
                <Heatmap
                  data={heatmapData}            // normalized 0..1
                  rowLabels={rowLabels}
                  colHeadersS={colHeadersS}     // S labels only
                />
              )
            }
            <HeatLegend />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

/* HeatLegend component */
const HeatLegend = () => (
  <div style={{ marginTop: 8 }}>
    <div style={{ height: 12, borderRadius: 999, overflow: 'hidden', background: '#c7d2fe' }}>
      <div style={{ height: '100%', background: 'linear-gradient(to right, #c7d2fe, #0b2a5b)' }} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, color: '#64748b', fontSize: 12 }}>
      <span>Low</span>
      <span>High</span>
    </div>
  </div>
);

export default Ilness_InjuryDashboard;
