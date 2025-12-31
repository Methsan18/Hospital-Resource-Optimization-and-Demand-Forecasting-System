import React, { useState } from 'react';
import Layout from './Layout';
import styles from './DailyInput.module.css';

const WARDS = [
  'ICU Ward',
  'General Ward',
  'Maternity Ward',
  'Emergency Ward'
];

const DailyInput = () => {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [rows, setRows] = useState(() => WARDS.map(() => ({ admissions: 0, discharges: 0, transfersIn: 0, transfersOut: 0 })));

  const updateCell = (index, field, value) => {
    const next = rows.slice();
    next[index] = { ...next[index], [field]: Number(value || 0) };
    setRows(next);
  };

  const totals = rows.reduce((acc, r) => {
    acc.admissions += Number(r.admissions || 0);
    acc.discharges += Number(r.discharges || 0);
    acc.transfersIn += Number(r.transfersIn || 0);
    acc.transfersOut += Number(r.transfersOut || 0);
    return acc;
  }, { admissions: 0, discharges: 0, transfersIn: 0, transfersOut: 0 });

  const handleClear = () => {
    setRows(WARDS.map(() => ({ admissions: 0, discharges: 0, transfersIn: 0, transfersOut: 0 })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with real save logic
    console.log('Submitting daily census', { date, rows });
    alert('Data submitted (see console).');
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Daily Patient Census Entry</h1>
        <form onSubmit={handleSubmit} className={styles.formCard} aria-label="Daily census form">
          <div className={styles.row}>
            <label className={styles.label} htmlFor="census-date">Date:</label>
            <input id="census-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={styles.input} />
          </div>

          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Ward Name</th>
                  <th>New Admissions</th>
                  <th>Discharges</th>
                  <th>Transfers In</th>
                  <th>Transfers Out</th>
                </tr>
              </thead>
              <tbody>
                {WARDS.map((ward, i) => (
                  <tr key={ward}>
                    <td className={styles.wardName}>{ward}</td>
                    <td><input type="number" value={rows[i].admissions} onChange={(e) => updateCell(i, 'admissions', e.target.value)} className={styles.numInput} /></td>
                    <td><input type="number" value={rows[i].discharges} onChange={(e) => updateCell(i, 'discharges', e.target.value)} className={styles.numInput} /></td>
                    <td><input type="number" value={rows[i].transfersIn} onChange={(e) => updateCell(i, 'transfersIn', e.target.value)} className={styles.numInput} /></td>
                    <td><input type="number" value={rows[i].transfersOut} onChange={(e) => updateCell(i, 'transfersOut', e.target.value)} className={styles.numInput} /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className={styles.tfootRow}>
                  <td>Totals</td>
                  <td>{totals.admissions}</td>
                  <td>{totals.discharges}</td>
                  <td>{totals.transfersIn}</td>
                  <td>{totals.transfersOut}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={handleClear} className={styles.btnGhost}>Clear Form</button>
            <button type="submit" className={styles.btnPrimary}>Submit Data</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default DailyInput;