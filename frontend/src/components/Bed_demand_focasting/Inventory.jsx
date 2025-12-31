import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal } from 'lucide-react';
import Layout from './Layout';
import styles from './Inventory.module.css';

const Inventory = () => {
  // Dummy Data
  const [beds] = useState([
    { id: 'BED-1001', ward: 'ICU', type: 'Ventilator', status: 'Occupied' },
    { id: 'BED-1002', ward: 'ICU', type: 'Standard', status: 'Available' },
    { id: 'BED-2045', ward: 'General', type: 'Standard', status: 'Maintenance' },
    { id: 'BED-2046', ward: 'General', type: 'Standard', status: 'Occupied' },
    { id: 'BED-3012', ward: 'Maternity', type: 'Electric', status: 'Available' },
    { id: 'BED-1003', ward: 'ICU', type: 'Ventilator', status: 'Occupied' },
  ]);

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header & Controls */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.title}>Bed Inventory Management</h1>
              <p className={styles.subtitle}>Track real-time status of all physical assets.</p>
            </div>
            <button className={styles.addBtn} aria-label="Add new bed">
              <Plus size={18} />
              <span>Add New Bed</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className={styles.controls} role="region" aria-label="Inventory filters">
          <div className={styles.searchWrap}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by Bed ID..."
              className={styles.searchInput}
            />
          </div>

          <div style={{display:'flex',gap:8}}>
            <select className={styles.select} aria-label="Ward filter">
              <option>All Wards</option>
              <option>ICU</option>
              <option>General</option>
            </select>
            <select className={styles.select} aria-label="Status filter">
              <option>All Statuses</option>
              <option>Available</option>
              <option>Occupied</option>
              <option>Maintenance</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <div className={styles.tableCard}>
          <table>
            <thead>
              <tr>
                <th>Bed ID</th>
                <th>Ward Location</th>
                <th>Bed Type</th>
                <th>Status</th>
                <th className={styles.actionsCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {beds.map((bed, index) => (
                <tr key={index}>
                  <td style={{fontWeight:600,color:'#0f172a'}}>{bed.id}</td>
                  <td style={{color:'#475569'}}>{bed.ward}</td>
                  <td style={{color:'#475569'}}>{bed.type}</td>
                  <td>
                    <StatusBadge status={bed.status} />
                  </td>
                  <td className={styles.actionsCell}>
                    <button className={styles.iconBtn} aria-label={`More actions for ${bed.id}`}>
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className={styles.pagination}>
            <span>Showing 6 of 500 beds</span>
            <div>
              <button className={styles.pageBtn}>Previous</button>
              <button className={styles.pageBtn} style={{marginLeft:8}}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper Component for Status Colors
const StatusBadge = ({ status }) => {
  const map = {
    Available: 'badgeAvailable',
    Occupied: 'badgeOccupied',
    Maintenance: 'badgeMaintenance'
  };

  const cls = styles[map[status] || 'badgeDefault'];
  return (
    <span className={`${styles.badge} ${cls}`}>
      {status}
    </span>
  );
};

export default Inventory;