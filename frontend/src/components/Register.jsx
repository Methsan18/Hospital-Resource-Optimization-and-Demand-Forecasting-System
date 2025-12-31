import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerValidation } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import { registerUser } from '../helper/helper'
import Navbar from './Navbar/Navbar'
import { ReactTyped } from 'react-typed'

const avatar = 'https://via.placeholder.com/80'
const containerStyle = { minHeight: '100vh', backgroundImage: "url('https://cdn.pixabay.com/photo/2017/01/09/11/30/dumbbell-1966247_1280.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }
const glassStyle = { width: '30%', height: '75%', paddingTop: '2em', paddingBottom: '1em', background: 'rgba(255,255,255,0.06)', borderRadius: 12 }
const textboxStyle = { width: '100%', padding: '8px', borderRadius: 8, border: '1px solid #e5e7eb' }
const btnStyle = { backgroundColor: '#f97316', color: '#fff', padding: '8px 16px', borderRadius: 9999, cursor: 'pointer' }

export default function Register() {
  const navigate = useNavigate()
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: { email: '', username: '', password: '', role: 'user' },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || '' })
      let registerPromise = registerUser(values)
      registerPromise.then(() => navigate('/login'))
    },
  })

  const onUpload = async (e) => { const base64 = await convertToBase64(e.target.files[0]); setFile(base64); }

  return (
    <div style={containerStyle}>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 40, marginBottom: 16 }}>
        <div style={glassStyle}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Register</h4>
            <p style={{ color: '#6b7280' }}>Happy to join you!</p>
            <ReactTyped className="text-2xl font-bold text-red-500" strings={[ 'WORKOUT','EXERCISE','GETFIT','EATHEALTHY' ]} typeSpeed={120} backSpeed={140} loop />
          </div>

          <form style={{ paddingTop: 8 }} onSubmit={formik.handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
              <label htmlFor="profile">
                <img src={file || avatar} alt="avatar" style={{ width: '80px', height: '80px', borderRadius: 9999 }} />
              </label>
              <input onChange={onUpload} type="file" id="profile" name="profile" style={{ marginLeft: 12 }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <input {...formik.getFieldProps('email')} style={textboxStyle} type="text" placeholder="Email*" />
              <input {...formik.getFieldProps('username')} style={textboxStyle} type="text" placeholder="Username*" />
              <input {...formik.getFieldProps('password')} style={textboxStyle} type="password" placeholder="Password*" />
              <button style={btnStyle} type="submit">Register</button>
            </div>

            <div style={{ textAlign: 'center', paddingTop: 12 }}>
              <span style={{ color: '#6b7280', fontSize: 14 }}>Already Registered? <Link to="/login" style={{ color: '#ef4444' }}>Login Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
 