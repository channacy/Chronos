'use client'
import styles from '@/app/page.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

export default function AddPost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const router = useRouter()

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleSubmit = async () => {
    
    try{
        await fetch('/api/add-ticket', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, summary, status, priority}) })
            
        router.refresh()
        window.alert("New Ticket Added")
    } catch (error){
        console.error(error)
    }

    setTitle('');
    setSummary('');
    setStatus('');
    setPriority('');
  };

    return (
        <main className={styles.main}>
            <Link className="underline" href={'/'}>View Tickets</Link>
        <h1>Add New Post</h1>
        <div>
          <label htmlFor="title">Title</label>
          <br/>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <br/>
        <div>
          <label htmlFor="content">Summary</label>
          <br/>
          <textarea
            id="summary"
            value={summary}
            onChange={handleSummaryChange}
            required
          />
        </div>
        <br/>
        <div>
          <label htmlFor="priority">Priority</label>
          <br/>
          <input
            type="text"
            id="priority"
            value={priority}
            onChange={handlePriorityChange}
            required
          />
        </div>
        <br/>
        <div>
          <label htmlFor="title">Status</label>
          <br/>
          <input
            type="text"
            id="status"
            value={status}
            onChange={handleStatusChange}
            required
          />
        </div>
        <br/>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
    </main>
    )
}
