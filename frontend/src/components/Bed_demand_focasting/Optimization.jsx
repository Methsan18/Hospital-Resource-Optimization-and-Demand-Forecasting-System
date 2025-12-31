import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Layout from './Layout';
import styles from './Optimization.module.css';

const Optimization = () => {
  const [beds, setBeds] = useState(5);
  const [ward, setWard] = useState('ICU');

  // Simple mock: each bed reduces risk by ~3% up to a cap
  const reduction = Math.min(50, Math.round(beds * 3));

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Resource Optimization Recommendations</h1>

        <div className={styles.banner} role="region" aria-label="Critical alert">
          <div className={styles.bannerInner}>
            <div className={styles.bannerLeft}>
              <div className={styles.alertIcon} aria-hidden>
                <AlertTriangle color="#991b1b" />
              </div>
              <div>
                <div className={styles.alertTitle}>CRITICAL ALERT: ICU Capacity at Risk in 48 Hours.</div>
                <div className={styles.alertDesc}>Action: Convert 4 General Ward beds to ICU immediately.</div>
              </div>
            </div>

            <div className={styles.bannerActions}>
              <button className={styles.btnPrimary}>Approve Transfer</button>
              <button className={styles.btnGhost}>Ignore Alert</button>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <div style={{width:44,height:44,borderRadius:10,background:'#fffbeb',display:'flex',alignItems:'center',justifyContent:'center'}}>👥</div>
              <div>
                <h3>Staffing Suggestion</h3>
                <p>Increase night shift nursing staff in Emergency Ward for the weekend.</p>
                <div className="cardActions">
                  <button className={styles.btnPrimary}>Acknowledge</button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <div style={{width:44,height:44,borderRadius:10,background:'#ecfdf5',display:'flex',alignItems:'center',justifyContent:'center'}}>🛏️</div>
              <div>
                <h3>Bed Allocation</h3>
                <p>Maternity Ward has 10 excess beds. Consider reallocating to General Ward.</p>
                <div className="cardActions">
                  <button className={styles.btnPrimary}>Reallocate</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card} style={{marginTop:14}}>
          <h4 style={{fontSize:16,fontWeight:600}}>Simulation</h4>
          <p style={{color:'#6b7280',marginTop:8}}>Test your scenarios to see impact on predicted risk.</p>
          <div className={styles.simRow} style={{marginTop:12}}>
            <div className={styles.simControl}>
              <label className={styles.simLabel} htmlFor="beds-input">What if we add</label>
              <input id="beds-input" type="number" min={0} value={beds} onChange={(e) => setBeds(Number(e.target.value))} className={styles.input} />
            </div>

            <div className={styles.simControl}>
              <label className={styles.simLabel} htmlFor="ward-select">beds to</label>
              <select id="ward-select" value={ward} onChange={(e) => setWard(e.target.value)} className={styles.select}>
                <option>ICU</option>
                <option>General</option>
                <option>Maternity</option>
              </select>
            </div>

            <div className={styles.resultText} aria-live="polite">? → <span style={{fontWeight:700,color:'var(--success)'}}>Risk reduced by {reduction}%</span></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Optimization;