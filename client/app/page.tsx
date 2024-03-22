import styles from "./page.module.css";
import DataTable from "./components/Datatable"
import { ProfileAvatar } from "./components/Avatar";
import prisma from "@/lib/prisma"

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
      </div>
      
      <DataTable initialData={data}/>
     
    
    </main>
  );
}
