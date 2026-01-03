'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditorPage({ params }: { params: { id: string } }) {
  const { status } = useSession()
  const router = useRouter()
  const [invitation, setInvitation] = useState<any>(null)
  const [config, setConfig] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchInvitation()
    }
  }, [status])

  const fetchInvitation = async () => {
    try {
      const res = await fetch(`/api/invitations/${params.id}`)
      const data = await res.json()
      setInvitation(data)
      setConfig(data.config)
    } catch (error) {
      console.error('Error fetching invitation:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch(`/api/invitations/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config }),
      })
      alert('Saved successfully!')
    } catch (error) {
      alert('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    setSaving(true)
    try {
      await fetch(`/api/invitations/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, isPublished: true }),
      })
      alert('Published successfully!')
      fetchInvitation()
    } catch (error) {
      alert('Failed to publish')
    } finally {
      setSaving(false)
    }
  }

  const updateConfig = (key: string, value: any) => {
    setConfig({ ...config, [key]: value })
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Save Draft
              </button>
              <button
                onClick={handlePublish}
                disabled={saving}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                Publish
              </button>
              {invitation?.isPublished && (
                <Link
                  href={`/invite/${invitation.slug}`}
                  target="_blank"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  View Live
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Edit Invitation</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={config.title || ''}
                  onChange={(e) => updateConfig('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Groom/Host Name
                  </label>
                  <input
                    type="text"
                    value={config.groomName || ''}
                    onChange={(e) => updateConfig('groomName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bride/Partner Name
                  </label>
                  <input
                    type="text"
                    value={config.brideName || ''}
                    onChange={(e) => updateConfig('brideName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={config.date || ''}
                    onChange={(e) => updateConfig('date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={config.time || ''}
                    onChange={(e) => updateConfig('time', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Name
                </label>
                <input
                  type="text"
                  value={config.venue || ''}
                  onChange={(e) => updateConfig('venue', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Address
                </label>
                <textarea
                  value={config.venueAddress || ''}
                  onChange={(e) => updateConfig('venueAddress', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Our Story
                </label>
                <textarea
                  value={config.story || ''}
                  onChange={(e) => updateConfig('story', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={5}
                  placeholder="Tell your story..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={config.colors?.primary || '#d946ef'}
                  onChange={(e) =>
                    updateConfig('colors', {
                      ...config.colors,
                      primary: e.target.value,
                    })
                  }
                  className="w-full h-12 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Music URL (optional)
                </label>
                <input
                  type="url"
                  value={config.musicUrl || ''}
                  onChange={(e) => updateConfig('musicUrl', e.target.value)}
                  placeholder="https://example.com/music.mp3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Preview</h2>
            <div className="border rounded-lg overflow-hidden">
              <InvitationPreview config={config} template={invitation?.template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InvitationPreview({ config, template }: any) {
  const colors = config.colors || template?.config?.colors || {}

  return (
    <div
      className="min-h-[600px] p-8"
      style={{
        backgroundColor: colors.background || '#FFFFFF',
        color: colors.text || '#333333',
      }}
    >
      <div className="text-center space-y-6">
        <h1
          className="text-4xl font-bold"
          style={{ color: colors.primary || '#d946ef' }}
        >
          {config.title || 'Your Event Title'}
        </h1>

        <div className="text-2xl">
          {config.groomName || 'Name 1'} & {config.brideName || 'Name 2'}
        </div>

        {config.date && (
          <div className="text-lg">
            {new Date(config.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        )}

        {config.time && <div className="text-lg">{config.time}</div>}

        {config.venue && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Venue</h3>
            <p>{config.venue}</p>
            {config.venueAddress && (
              <p className="text-sm mt-1">{config.venueAddress}</p>
            )}
          </div>
        )}

        {config.story && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Our Story</h3>
            <p className="text-sm whitespace-pre-wrap">{config.story}</p>
          </div>
        )}
      </div>
    </div>
  )
}
