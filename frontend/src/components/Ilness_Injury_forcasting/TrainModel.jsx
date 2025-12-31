import React, { useState } from 'react';
import Layout from '../Bed_demand_focasting/Layout';
import { AlertCircle, CheckCircle } from 'lucide-react';

const TrainModel = () => {
  const [formData, setFormData] = useState({
    disease: '',
    symptoms: '',
    month: '',
    year: new Date().getFullYear().toString(),
    department: '',
    cases: ''
  });

  const [isTraining, setIsTraining] = useState(false);
  const [trainResult, setTrainResult] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const departments = [
    'General Ward',
    'Pediatrics',
    'Emergency Treatment Unit',
    'ICU',
    'Outpatient Department',
    'Isolation Ward'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTrainModel = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.disease || !formData.symptoms || !formData.month || !formData.year || !formData.department || !formData.cases) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate training
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setTrainResult({
        success: true,
        accuracy: (85 + Math.random() * 12).toFixed(2),
        timestamp: new Date().toLocaleString()
      });
    }, 2000);
  };

  return (
    <Layout activePage="Training">
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
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Train Illness & Injury Prediction Model</h1>
          <p style={{ margin: 0, marginTop: 6, opacity: 0.9 }}>Train ML models with your hospital data</p>
        </div>

        {/* Main Form Card */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #e6eef6',
          boxShadow: '0 8px 24px rgba(2,6,23,0.06)',
          padding: 32,
          marginBottom: 28
        }}>
          <h2 style={{ margin: '0 0 24px 0', fontSize: 24, fontWeight: 700, color: '#0f172a' }}>
            Input Data
          </h2>

          <form onSubmit={handleTrainModel}>
            <div style={{ display: 'grid', gap: 20 }}>
              
              {/* Disease */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: 8
                }}>
                  Disease
                </label>
                <input
                  type="text"
                  name="disease"
                  value={formData.disease}
                  onChange={handleInputChange}
                  placeholder="e.g., Influenza, Dengue Fever"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #cbd5e1',
                    borderRadius: 8,
                    fontSize: 15,
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0b2a5b'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>

              {/* Symptoms */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: 8
                }}>
                  Symptoms
                </label>
                <input
                  type="text"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  placeholder="e.g., Fever, Cough, Body Ache"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #cbd5e1',
                    borderRadius: 8,
                    fontSize: 15,
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0b2a5b'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>

              {/* Month and Year Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* Month */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: 8
                  }}>
                    Month
                  </label>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      fontSize: 15,
                      outline: 'none',
                      cursor: 'pointer',
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      paddingRight: 36,
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Select Month</option>
                    {months.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: 8
                  }}>
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="2020"
                    max={new Date().getFullYear()}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      fontSize: 15,
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0b2a5b'}
                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: 8
                }}>
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #cbd5e1',
                    borderRadius: 8,
                    fontSize: 15,
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: 36,
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select Department</option>
                  {departments.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Cases */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: 8
                }}>
                  Cases
                </label>
                <input
                  type="number"
                  name="cases"
                  value={formData.cases}
                  onChange={handleInputChange}
                  placeholder="e.g., 150"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #cbd5e1',
                    borderRadius: 8,
                    fontSize: 15,
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0b2a5b'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>

              {/* Train Model Button */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                <button
                  type="submit"
                  disabled={isTraining}
                  style={{
                    background: isTraining ? '#94a3b8' : '#0b2a5b',
                    color: '#fff',
                    padding: '14px 40px',
                    borderRadius: 8,
                    border: 'none',
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: isTraining ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: isTraining ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isTraining) {
                      e.target.style.background = '#1e3a8a';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isTraining) {
                      e.target.style.background = '#0b2a5b';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {isTraining ? 'Training...' : 'Train Model'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Training Result */}
        {trainResult && (
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #86efac',
            borderRadius: 12,
            padding: 20,
            display: 'flex',
            gap: 16,
            alignItems: 'flex-start'
          }}>
            <CheckCircle size={24} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#166534' }}>
                Model Training Completed Successfully
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: 14, color: '#15803d' }}>
                Model Accuracy: <strong>{trainResult.accuracy}%</strong> • Trained on: {trainResult.timestamp}
              </p>
              <p style={{ margin: '6px 0 0 0', fontSize: 13, color: '#166534' }}>
                Your illness prediction model has been trained and is ready for inference. Use the forecast page to generate predictions.
              </p>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default TrainModel;
