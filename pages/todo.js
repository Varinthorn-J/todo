import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Todo.module.css'
 
const Todo = ( {avatar_url, login}) => {
 
   const [cats, setCats] = useState([])
       // { id: 1, name: 'Do homework' },
       // { id: 2, name: 'Read book' }])
 
   const [name, setName] = useState('')
   const [age, setAge] = useState('')
 
   const [idEdit, setIdEdit] = useState(0)
 
   useEffect( async () => {
       let ts = await getCats();

       console.log(ts)
       setCats(ts) 
   }, [] )
 
 
   const renderCats = () => {
       if (cats && cats.length)
           return cats.map((cat, index) => (
               <li key={index} className={styles.listItem}>
                   {cat.id})
                   {(idEdit !== cat.id) ?
                       cat.name :
                       (<input
                           className={styles.text}
                           type="text"
                           name="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                       />)
                   }
                   {(idEdit !== cat.id) ?
                       cat.age :
                       (<input
                           className={styles.text}
                           type="text"
                           name="name"
                           value={age}
                           onChange={(e) => setAge(e.target.value)}
                       />)
                   }
                   <div className={styles.buttonContainer}>
                       <button
                           className={`${styles.button} ${styles.btnEdit}`}
                           onClick={() => editCat(cat.id)}>
                           Edit
                       </button>
                       <button
                           className={`${styles.button} ${styles.btnDelete}`}
                           onClick={() => deleteCat(cat.id)}>
                           Delete
                       </button>
                   </div>
               </li>))
   }
   
 
   const editCat = (id) => {
       setIdEdit(id)
       let t = cats.find((cat) => +cat.id === +id)
       setName(t.name)
       setAge(t.age)
       if (+idEdit === +id) { //Press Edit again
           let newCats = cats.map((cat, index) => {
            if (+cat.id === +id){
                cats[index].name = name
                cats[index].age = age
            

            }
            return cat    
           }
           
           )
       
           setCats(newCats)
           setIdEdit(0)
       }
   }
 
   const deleteCat = (id) => {
       console.log('delete id: ', id)
       let newCats = cats.filter((cat) => cat.id !== +id)
       setCats(newCats)
   }
 
   const addCat = (name) => {
       setCats([...cats, { id: cats[cats.length - 1].id + 1, name }])
       console.log(cats)
   }
 
   return (
       <div className={styles.container}>
           <div className={styles.topRight}>
                <Link href="/"><a>Home</a></Link>
           </div>
           <h1 className={styles.title}>
 
               <img src={avatar_url} width="80" />
            Todo test <span>{login} </span>
              
           </h1>
 
           <div className="addContainer">
               <input
                   className={styles.text}
                   type="text"
                   name="addCat"
                   onChange={(e) => (setName(e.target.value))}
               />
               <input
                   className={styles.text}
                   type="text"
                   name="addCat"
                   onChange={(e) => (setAge(e.target.value))}
               />
               <button
                   className={`${styles.button} ${styles.btnAdd}`}
                   onClick={() => addCat(name)}>Add</button>
           </div>
           <ul className={styles.list}>
               {renderCats()}
           </ul>
       </div>
   )
}
 
const getCats = async () => {
   const res = await fetch('http://localhost:8000/')
   const json = await res.json()
   console.log(json)
   return json;
}
 
Todo.getInitialProps = async (ctx) => {
   const res = await fetch('https://api.github.com/users/wwarodom')
   const json = await res.json()
   return { login: json.login, avatar_url: json.avatar_url }
}
 
export default Todo