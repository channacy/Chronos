
export default function Post({title, summary}){
    return(
        <div style={{border: '1px solid white', padding: '15px'}}>
            <h3>{summary}</h3>
            <h4>{title}</h4>
      
        </div>
    )
}