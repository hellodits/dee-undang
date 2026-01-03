'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'

export default function RSVPListPage({ params }: { params: { id: string } }) {
  const { status } = useSession()
  const router = useRouter()
  const [invitation, setInvitation] = useState<any>(null)
  const [rsvps, setRsvps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData()
    }
  }, [status])

  const fetchData = async () => {
    try {
      const [invRes, rsvpRes] = await Promise.all([
        fetch(`/api/invitations/${params.id}`),
        fetch(`/api/rsvp/${params.id}`),
      ])

      const invData = await invRes.json()
      const rsvpData = await rsvpRes.json()

      setInvitation(invData)
      setRsvps(rsvpData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Guests', 'Attendance', 'Message', 'Date']
    const rows = filteredRsvps.map((rsvp) => [
      rsvp.name,
      rsvp.email || '',
      rsvp.phone || '',
      rsvp.guestCount,
      rsvp.attendance,
      rsvp.message || '',
      new Date(rsvp.createdAt).toLocaleDateString(),
    ])

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rsvps-${invitation?.slug}.csv`
    a.click()
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  const filteredRsvps =
    filter === 'ALL' ? rsvps : rsvps.filter((r) => r.attendance === filter)

  const stats = {
    total: rsvps.length,
    yes: rsvps.filter((r) => r.attendance === 'YES').length,
    no: rsvps.filter((r) => r.attendance === 'NO').length,
    maybe: rsvps.filter((r) => r.attendance === 'MAYBE').length,
    totalGuests: rsvps.reduce((sum, r) => sum + r.guestCount, 0),
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          RSVPs for {invitation?.title}
        </h1>
      </div>

      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Total Responses</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Attending</div>
          <div className="text-2xl font-bold text-green-600">{stats.yes}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Not Attending</div>
          <div className="text-2xl font-bold text-red-600">{stats.no}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Maybe</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.maybe}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Total Guests</div>
          <div className="text-2xl font-bold text-primary-600">
            {stats.totalGuests}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {['ALL', 'YES', 'NO', 'MAYBE'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg ${
                  filter === f
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Contact</th>
                <th className="text-left py-3 px-4">Guests</th>
                <th className="text-left py-3 px-4">Attendance</th>
                <th className="text-left py-3 px-4">Message</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRsvps.map((rsvp) => (
                <tr key={rsvp.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{rsvp.name}</td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {rsvp.email && <div>{rsvp.email}</div>}
                      {rsvp.phone && <div>{rsvp.phone}</div>}
                    </div>
                  </td>
                  <td className="py-3 px-4">{rsvp.guestCount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        rsvp.attendance === 'YES'
                          ? 'bg-green-100 text-green-700'
                          : rsvp.attendance === 'NO'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {rsvp.attendance}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate">
                    {rsvp.message || '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(rsvp.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRsvps.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              No RSVPs found
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
