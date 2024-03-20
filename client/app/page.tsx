import styles from "./page.module.css";
import DataTable from "./components/Datatable"
import { ProfileAvatar } from "./components/Avatar";
import prisma from "@/lib/prisma"
import Post from "@/app/components/Post"
import Link from 'next/link'

async function getPosts(){
  const data = await prisma.task.findMany({
    where: {published: true}, 
  })
  return data;
}

export default async function Home() {
  const data = await getPosts();

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Chronos</h1>
        <ProfileAvatar/>
        <Link href={'/pages/add-ticket'}>Add Post</Link>
      </div>
      <DataTable initialData={data}/>
     
    
    </main>
  );
}
