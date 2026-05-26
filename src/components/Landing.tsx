import { useState, type FormEvent } from 'react'
import axios from 'axios'

export default function Landing() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await axios.post('/api/signup', { name, email })
      if (res.status === 200) {
        setStatus('success')
        setMessage('Thanks — your download will start shortly.')
        // trigger download of lead magnet in public directory
        const a = document.createElement('a')
        a.href = '/lead_magnet.pdf'
        a.download = 'lead_magnet.pdf'
        document.body.appendChild(a)
        a.click()
        a.remove()
        setName('')
        setEmail('')
      } else {
        throw new Error('An unexpected server response')
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(err?.response?.data?.message || err?.message || 'Unable to submit. Please try again later.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-700 via-brand to-brand-cyan flex items-center justify-center p-6">
      <section className="max-w-3xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-12" aria-labelledby="landing-title">
        <header className="mb-6">
          <h1 id="landing-title" className="text-2xl sm:text-3xl font-extrabold text-gray-900">SaaS Launch Pack</h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">A practical bundle of outreach templates, a one-page pitch outline, and an operational playbook to help early-stage SaaS teams acquire their first customers — no ad spend required.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">What's included</h2>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex gap-2 items-start"><span className="inline-block w-2 h-2 rounded-full bg-brand-500 mt-2" aria-hidden></span>Targeted email sequences (cold + follow-up)</li>
              <li className="flex gap-2 items-start"><span className="inline-block w-2 h-2 rounded-full bg-brand-500 mt-2" aria-hidden></span>One-page pitch outline for calls & landing pages</li>
              <li className="flex gap-2 items-start"><span className="inline-block w-2 h-2 rounded-full bg-brand-500 mt-2" aria-hidden></span>Operational playbook (Notion-ready SOP and CSV export)</li>
              <li className="flex gap-2 items-start"><span className="inline-block w-2 h-2 rounded-full bg-brand-500 mt-2" aria-hidden></span>Landing page copy snippets and outreach scripts</li>
            </ul>

            <p className="mt-4 text-sm text-gray-600">Download the lead magnet to try the templates and SOP immediately.</p>
          </div>

          <aside className="bg-gray-50 p-4 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Signup form">
              <div>
                <label className="sr-only" htmlFor="name">Name</label>
                <input id="name" type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div>
                <label className="sr-only" htmlFor="email">Email address</label>
                <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div>
                <button type="submit" disabled={status === 'loading'} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-brand-700 to-brand-cyan text-white font-semibold px-4 py-2 shadow hover:opacity-95 disabled:opacity-60">
                  {status === 'loading' ? 'Submitting…' : 'Download the lead magnet'}
                </button>
              </div>

              <div aria-live="polite" className="min-h-[1.25rem]">
                {status === 'success' && <p className="text-sm text-green-700">{message}</p>}
                {status === 'error' && <p className="text-sm text-red-600">{message}</p>}
              </div>

              <p className="text-xs text-gray-500">We respect your privacy — we only use this to send the download link.</p>
            </form>
          </aside>
        </div>

      </section>
    </main>
  )
}
