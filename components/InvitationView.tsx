'use client'

import { useState, useEffect } from 'react'
import { formatDate, formatTime } from '@/lib/utils'

export default function InvitationView({ invitation }: any) {
  const config = invitation.config
  const colors = config.colors || {}
  const [showRSVP, setShowRSVP] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    if (!config.date) return

    const timer = setInterval(() => {
      const eventDate = new Date(config.date).getTime()
      const now = new Date().getTime()
      const distance = eventDate - now

      if (distance < 0) {
        clearInterval(timer)
        return
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [config.date])

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: colors.background || '#FFFFFF',
        color: colors.text || '#333333',
      }}
    >
      {config.musicUrl && (
        <audio autoPlay loop>
          <source src={config.musicUrl} type="audio/mpeg" />
        </audio>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in"
            style={{ color: colors.primary || '#d946ef' }}
          >
            {config.title || 'Our Special Day'}
          </h1>

          <div className="text-3xl md:text-4xl mb-12">
            {config.groomName || 'Name 1'} & {config.brideName || 'Name 2'}
          </div>

          {config.date && (
            <div className="text-xl md:text-2xl mb-4">
              {formatDate(config.date)}
            </div>
          )}

          {config.time && (
            <div className="text-lg md:text-xl opacity-80">
              {formatTime(config.time)}
            </div>
          )}
        </div>
      </section>

      {/* Countdown Section */}
      {config.date && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Counting Down</h2>
            <div className="grid grid-cols-4 gap-4 md:gap-8">
              {Object.entries(countdown).map(([unit, value]) => (
                <div key={unit} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{value}</div>
                  <div className="text-sm md:text-base uppercase opacity-80">{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Venue Section */}
      {config.venue && (
        <section className="py-20 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Venue</h2>
            <div className="text-2xl mb-4">{config.venue}</div>
            {config.venueAddress && (
              <p className="text-lg opacity-80 mb-8">{config.venueAddress}</p>
            )}
          </div>
        </section>
      )}

      {/* Story Section */}
      {config.story && (
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Story</h2>
            <p className="text-lg leading-relaxed whitespace-pre-wrap">
              {config.story}
            </p>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">RSVP</h2>
          <p className="text-lg mb-8">
            Please let us know if you can make it to our special day
          </p>
          <button
            onClick={() => setShowRSVP(true)}
            className="px-8 py-4 rounded-lg text-lg font-semibold text-white"
            style={{ backgroundColor: colors.primary || '#d946ef' }}
          >
            Respond Now
          </button>
        </div>
      </section>

      {showRSVP && (
        <RSVPModal
          invitationId={invitation.id}
          onClose={() => setShowRSVP(false)}
          primaryColor={colors.primary}
        />
      )}
    </div>
  )
}

function RSVPModal({
  invitationId,
  onClose,
  primaryColor,
}: {
  invitationId: string
  onClose: () => void
  primaryColor?: string
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guestCount: 1,
    attendance: 'YES',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, invitationId }),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => onClose(), 2000)
      }
    } catch (error) {
      alert('Failed to submit RSVP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 text-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">RSVP</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✓</div>
            <p className="text-xl font-semibold">Thank you for your response!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Number of Guests</label>
              <input
                type="number"
                min="1"
                value={formData.guestCount}
                onChange={(e) =>
                  setFormData({ ...formData, guestCount: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Will you attend?</label>
              <select
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="YES">Yes, I'll be there</option>
                <option value="NO">Sorry, can't make it</option>
                <option value="MAYBE">Maybe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message (optional)</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold"
              style={{ backgroundColor: primaryColor || '#d946ef' }}
            >
              {loading ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
