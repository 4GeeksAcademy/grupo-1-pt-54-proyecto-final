import React, { useState } from 'react'


export default function BookForm({ addBook, STATUS }) {
const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [status, setStatus] = useState(STATUS.UNREAD)


const submit = (e) => {
e.preventDefault()
if (!title.trim()) return
addBook({ title: title.trim(), author: author.trim(), status })
setTitle('')
setAuthor('')
setStatus(STATUS.UNREAD)
}


return (
<form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className="md:col-span-2 p-2 border rounded" />
<input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Autor (opcional)" className="p-2 border rounded" />
<div className="flex gap-2">
<select value={status} onChange={e => setStatus(e.target.value)} className="p-2 border rounded">
<option value={STATUS.UNREAD}>{STATUS.UNREAD}</option>
<option value={STATUS.READING}>{STATUS.READING}</option>
<option value={STATUS.READ}>{STATUS.READ}</option>
</select>
<button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">Agregar</button>
</div>
</form>
)
}