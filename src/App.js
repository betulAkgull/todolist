import React from 'react'
import './App.css';

function App() {
  const [list,setlist] = React.useState([])
  const [item,setItem] = React.useState("")

  React.useEffect(()=>{
    const temp = localStorage.getItem("list")
    const loadedlist = JSON.parse(temp)

    if(loadedlist){
      setlist(loadedlist)
    }
  },[])

  React.useEffect(()=>{
    const temp = JSON.stringify(list)
    localStorage.setItem("list",temp)
  },[list])
 
 function handleSubmit(e){
  e.preventDefault()

  const newTodo={
    id: new Date().getTime(),
    text: item,
    completed:false,
  }

  setlist([...list].concat(newTodo))
  setItem("")
 }

 function deleteTodo(id){
  const updatedlist = [...list].filter((item) => item.id !== id)
  setlist(updatedlist)
 }

 function toggleComplete(id){
  const updatedlist = [...list].map((item)=>{
    if(item.id === id){
      item.completed = !item.completed
    }
    return item
  })

  setlist(updatedlist)
 }
 
 
  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setItem(e.target.value)} value = {item}/>
        <button> Add Todo </button>
      </form>
      <p>Todos</p>
      <ul>
      {list.map((item)=> 
      <li key={item.id}>
        <div>{item.text}</div>
        <button onClick={() => deleteTodo(item.id)}>Delete</button>
        <input
        type = "checkbox"
        onChange={()=>toggleComplete(item.id)}
        checked={item.completed} 
        />
      </li>)}
      </ul>
    </div>
  );
}

export default App;
