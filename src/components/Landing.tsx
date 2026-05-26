import React, { useState } from 'react'
import axios from 'axios'

export default function Landing() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await axios.post('/api/signup', { name, email })
      if (res.status === 200) {
        setStatus('success')
        setMessage('Thanks! Check your download.')
        // trigger download of lead magnet (public/lead_magnet.pdf)
        const a = document.createElement('a')
        a.href = '/lead_magnet.pdf'
        a.download = 'lead_magnet.pdf'
        document.body.appendChild(a)
        a.click()
        a.remove()
        setName('')
        setEmail('')
      } else {
        throw new Error('server error')
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(err?.response?.data?.message || err.message || 'Unknown error')
    }
  }

  return (
    <section aria-labelledby="title">
      <h1 id="title" className="text-2xl font-semibold mb-3">SaaS $0→$5k Launch Pack</h1>
      <p className="text-base text-gray-700 mb-4">A lean bundle of email sequences, a one-page pitch outline, and a Notion SOP to book your first paid customers without spending on ads. Designed for SaaS founders selling to SMBs.</p>
      <ul className="list-disc pl-5 mb-4">
        <li>3 cold-email templates + LinkedIn DM variants</li>
        <li>1-page pitch-deck outline</li>
        <li>Notion SOP for outreach & tracking (export-ready CSV)</li>
        <li>Landing page copy + launch texts</li>
      </ul>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input required aria-label="Name" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} className="border rounded px-3 py-2 flex-1" />
          <input required aria-label="Email" placeholder="you@company.com" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="border rounded px-3 py-2 flex-1" />
        </div>
        <div>
          <button type="submit" className="cta" disabled={status==='loading'}>
            {status==='loading' ? 'Submitting...' : 'Get the Launch Pack'}
          </button>
        </div>
      </form>

      {status === 'success' && <p className="muted">{message}</p>}
      {status === 'error' && <p className="muted text-red-600">{message}</p>}

      <p className="muted">First 20 founders: free sample lead magnet. Paid pack: $29 (example). Replace payment link with Gumroad/Stripe.</p>
    </section>
  )
}
