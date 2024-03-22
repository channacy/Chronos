'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, SetStateAction } from 'react';
import { Button } from "@/components/ui/button"
import styles from "./page.module.css";
import prisma from '@/lib/prisma';
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export default function PostDetails({ params }: { params: { slug: string } }){
    const id = params.slug;
    const router = useRouter()

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [comments, setComments] = useState<string[]>([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/ticket/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setTitle(data.title);
                setSummary(data.summary);
                setStatus(data.status);
                setPriority(data.priority);
                setComments(data.comments)
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
    
        if (id) {
            fetchPost();
        }
    }, [id]);

    const handleComment = (event: { target: { value: SetStateAction<string>; }; }) =>{
        setComment(event.target.value)
    }


    const handleCommentBtnClick = () =>{
        let commentsCopy:string[] = comments
        commentsCopy.push(comment)
        setComments(commentsCopy);
        handleSaveChange();
    }

    const handleSaveChange = async () => {
        const data = {title, summary, status, priority, comments}
        console.log(data);
        try{
            await fetch(`/api/ticket/${id}/update/`, {
                method: 'PUT', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            router.refresh()
            window.alert("Ticket Updated")
        } catch (error){
            console.error(error)
        }
  
    }
    
    return (
       <div className='m-5 p-5'>
            <Link className="underline" href={'/'}> View All</Link>
            <hr/>

            <div className="m-5 p-15">
                <p>Title: {title}</p>
                <p>Summary: {summary}</p>
                <p>Status:</p>
                <Select onValueChange={(value:string) => {setStatus(value)}}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={status} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Progress</SelectLabel>
                        <SelectItem value="complete">Complete</SelectItem>
                        <SelectItem value="incomplete">Incomplete</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <p>Priority:</p>
                <Select onValueChange={(value:string) => {setPriority(value)}}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={priority}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="meduim">Meduim</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button className="p-2 my-2" onClick={handleSaveChange}>Save Changes</Button>
            </div>
            <div className='p-5'>
                <p>Comment Section</p>
               <Textarea placeholder="Type your comment here." onChange={handleComment}/>
               <Button className="my-2" onClick={handleCommentBtnClick} >Comment</Button>
               <div>
                    {comments.map((comment, index) => (
                        <div>
                            <p key={index}>{comment}</p>
                            <Separator className="my-4" />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
