import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Button } from '../components/atoms/Button'
import { ExportAction } from '../components/molecules/ExportAction'
import { fetchUsers } from '../features/reporting/api'
import { allUsersWorkbook, userWorkbook } from '../features/reporting/excel'
import type { User } from '../features/reporting/types'

export function ReportingPlaygroundPage() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    setError('')
    try { setUsers(await fetchUsers()) }
    catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Could not load users') }
    finally { setLoading(false) }
  }

  useEffect(() => {
    let active = true
    void fetchUsers()
      .then((loadedUsers) => { if (active) setUsers(loadedUsers) })
      .catch((requestError: unknown) => { if (active) setError(requestError instanceof Error ? requestError.message : 'Could not load users') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const cityData = useMemo(() => Object.entries(users.reduce<Record<string, number>>((counts, user) => { counts[user.address.city] = (counts[user.address.city] ?? 0) + 1; return counts }, {})).map(([city, count]) => ({ city, users: count })), [users])

  return <article className="lesson report">
    <p className="eyebrow">Final project</p><h1>Reporting playground</h1>
    <p className="lead">Data is loaded from a free public mock API. Download one profile from any row, or create the complete multi-sheet report.</p>
    {loading && <div className="state">Loading mock users…</div>}
    {error && <div className="state error"><strong>Could not load mock data.</strong> {error}<Button onClick={() => void load()}>Retry</Button></div>}
    {!loading && !error && <>
      <section className="stats"><div><b>{users.length}</b><span>mock users</span></div><div><b>{new Set(users.map((user) => user.address.city)).size}</b><span>cities</span></div><div><b>{new Set(users.map((user) => user.company.name)).size}</b><span>companies</span></div></section>
      <section className="report-toolbar"><div><h2>User directory</h2><p>Each profile is generated on demand in the browser. The full workbook includes an embedded city chart and editable chart source data.</p></div><ExportAction label="Download all users .xlsx" onExport={() => allUsersWorkbook(users)}/></section>
      <div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>City</th><th>Company</th><th>Report</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td><strong>{user.name}</strong><small>@{user.username}</small></td><td>{user.email}</td><td>{user.address.city}</td><td>{user.company.name}</td><td><ExportAction label="Download .xlsx" onExport={() => userWorkbook(user)}/></td></tr>)}</tbody></table></div>
      <section className="chart-card"><div><p className="eyebrow">React chart</p><h2>Users by city</h2><p>The interactive chart is rendered with Recharts. The complete Excel download embeds the same city chart as an image and includes the source table for creating an editable native Excel chart.</p></div><div className="chart"><ResponsiveContainer width="100%" height={280}><BarChart data={cityData} margin={{top:10,right:10,left:-20,bottom:55}}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="city" angle={-35} textAnchor="end" interval={0}/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="users" fill="#0f766e" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></section>
    </>}
  </article>
}
