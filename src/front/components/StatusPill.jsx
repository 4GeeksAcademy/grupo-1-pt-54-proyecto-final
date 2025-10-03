import React from 'react'


export default function StatusPill({ status, onClick }) {
let cls = 'status-pill '
if (status === 'Leído') cls += 'read'
else if (status === 'En progreso') cls += 'reading'
else cls += 'unread'


return <div onClick={onClick} className={cls}>{status}</div>
}