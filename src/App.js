import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App() {
  const [title,setTitle] = useState('');
  const [price,setPrice] = useState('');
  const [list,setList] =useState(getLocalStorage());
  const [isEditing,setIsEditing]=useState(false);
  const [editID,setEditID] = useState(null);
  const [alert,setAlert] = useState({show: false , msg:'' , type:''});
  
  const handleSubmmit = (e) => {
    e.preventDefault();
    if (!(title && price)){
      // display alert
      showAlert(true,'danger','please enter value');
    }
    else if((title && price) && isEditing){
      setList(list.map((item)=>{
        if (item.id === editID){
          return {...item,itemTitle:title,itemPrice:price}
        }
        return item
      }))
      setTitle('');
      setPrice('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true,'success','Item Edited');
    }
    else {
      showAlert(true,'success','item added to the list');
      const newItem = {id:new Date().getTime().toString(),itemTitle:title,itemPrice:price};
      setList([...list,newItem]);
      setTitle('');
      setPrice('');
    }
  }

  const showAlert = (show=false,type="",msg="") => {
    setAlert({show,type,msg});
  }

  const clearList =() => {
    showAlert (true,'danger' , 'empty list');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true,'danger','item removed');
    setList(list.filter((item)=> item.id !== id));
    
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setTitle(specificItem.itemTitle);
    setPrice(specificItem.itemPrice);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  // valdation error
  /*
  const [formError,setFormError]=useState({});
  const validateForm = () => {
    let err={};
    if(title.length > 20  ){
      err.title = "title is unique"
      alert("title unique")
    }
    setFormError({...err});
    
    return Object.keys(err).length < 1;
  }
  */
  return (
    <section className="section-center">
      <form className='grocery-center' onSubmit={handleSubmmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>add item</h3>
        <input
            type="text" 
            className='grocery' 
            placeholder='title'
            required='required'
            minLength='3' 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}/>
            
        <input 
            type="number" 
            className='grocery' 
            placeholder='price'
            required='required'
            value={price}
            onChange={(e)=>setPrice(e.target.value)} />
        <button type='submit' className='submit-btn'>
          { isEditing ? 'edit' : 'add' }
        </button>
      </form>
      {list.length >0 && (
        <div className='grocery-container'>
         <List items={list} removeItem={removeItem} editItem={editItem}/>
         <button className='clear-btn' onClick={clearList}>clear items</button>
        </div>
      )}
      
    </section>
    )
  ;
}

export default App
