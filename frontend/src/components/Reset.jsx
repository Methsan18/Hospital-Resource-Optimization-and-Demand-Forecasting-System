import React from 'react'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const containerStyle = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }
const glassStyle = { padding: '2rem', width: '360px', background: 'rgba(255,255,255,0.04)', borderRadius: 12 }
const textboxStyle = { width: '100%', padding: '8px', borderRadius: 8, border: '1px solid #e5e7eb', marginBottom: 12 }
const btnStyle = { backgroundColor: '#f97316', color: '#fff', padding: '10px 16px', borderRadius: 8, cursor: 'pointer', width: '100%' }

export default function Reset() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: { email: '' },
    onSubmit: values => {
      toast.success('If an account exists, a reset link has been sent.')
      setTimeout(() => navigate('/login'), 1200)
    }
  })

  return (
    <div style={containerStyle}>
      <Toaster position="top-center" />
      <div style={glassStyle}>
        <h3 style={{ marginBottom: 8 }}>Password Reset</h3>
        <p style={{ color: '#6b7280', marginBottom: 12 }}>Enter your email to receive reset instructions.</p>

        <form onSubmit={formik.handleSubmit}>
          <input {...formik.getFieldProps('email')} style={textboxStyle} type="email" placeholder="Email" />
          <button type="submit" style={btnStyle}>Send Reset</button>
        </form>

        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <Link to="/login" style={{ color: '#ef4444' }}>Back to Login</Link>
        </div>
      </div>
    </div>
  )
}
 