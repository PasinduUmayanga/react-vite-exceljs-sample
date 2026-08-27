import { useState } from 'react'
import { Button } from '../atoms/Button'
export function ExportAction({ label, onExport }: { label: string; onExport: () => Promise<void> }) { const [busy, setBusy] = useState(false); return <Button disabled={busy} onClick={async () => { setBusy(true); try { await onExport() } finally { setBusy(false) } }}>{busy ? 'Preparing file…' : label}</Button> }
