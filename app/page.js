'use client'

import { useState, useRef } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import styles from './page.module.css'

export default function Home() {
  const [formData, setFormData] = useState({name: "", message:""})
  const [btnStatus, setBtnStatus] = useState(false)

  const recaptchaRef = useRef(null)

  const handleDataChange = e => {
    setFormData(prev => ({...prev, [`${e.target.id}`] : e.target.value }))
  }
  
  const handleSubmit = async e => {
    e.preventDefault()
    setBtnStatus(false)
    const token = recaptchaRef.current.getValue();

    const response = await axios.post("/api/", {formData, token})
     
    recaptchaRef.current.reset()
    console.log(response.data)
  }

  const onChange = e => {
    if(e) setBtnStatus(true)
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit}>
        <h2>Feedback Form</h2>
        <div className={styles.form_group}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={handleDataChange} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="7" onChange={handleDataChange} />
        </div>

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
          onChange={onChange}
          ref={recaptchaRef}
        />

        <div className={styles.submit}>
          <button disabled={!btnStatus}>Submit</button>
        </div>
      </form>
    </main>
  )
}
