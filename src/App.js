import React,{useState, useEffect} from 'react'
import { View } from './components/View';
import Alert from './components/Alert';
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

export const App = () => {

  const [title,setTitle] = useState('');
  const [price,setPrice] = useState('');
  const [list,setList] =useState(getLocalStorage());
  const [isEditing,setIsEditing]=useState(false);
  const [editID,setEditID] = useState(null);
  const [alert,setAlert] = useState({show: false , msg:'' , type:''});
  const [formError,setFormError]=useState({});


  
  const handleSubmmit = (e) => {
    let isVaild = validateForm()
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
      if(isVaild){
      setTitle('');
      setPrice('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true,'success','Item Edited');
      }
      
    }
    else {
      if (isVaild){
        showAlert(true,'success','item added to the list');
        const newItem = {id:new Date().getTime().toString(),itemTitle:title,itemPrice:price};
        setList([...list,newItem]);
        setTitle('');
        setPrice('');
      }
      
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
  
  
  const validateForm = () => {
    let err={};
    if(title.length < 3  ){
      err.title = "title is shouid be gratter than 3 character"
    }
    if(price < 1){
      err.price = "price is shouid be gratter than 1";
      setPrice(1);
    }
    

    setFormError({...err});
    
    return Object.keys(err).length < 1;
  }

  return (
    <div className='wrapper'>
      <h1>Items</h1>
      <p>Add Items</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleSubmmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
            <label htmlFor='title'>Title</label>
            <input type="text" id='title' className='form-control'  
            onChange={(e)=>setTitle(e.target.value)} value={title} label="Outlined" variant="outlined" />
            <small className="alert-danger"> {formError.title}</small>
            <br></br>
            <label htmlFor='price'>Price</label>
            <input type="number" id='price' className='form-control' 
            onChange={(e)=>setPrice(e.target.value)} value={price}   />
            <small className="alert-danger">{formError.price}</small>
            <br></br>
            {
              isEditing ? 
            <button type="submit" className='btn btn-success btn-md'>
              update
            </button> :

            <button type="submit" className='btn btn-success btn-md'>
              Add
            </button>

            }
            
          </form>
        </div>
 
        <div className='view-container'>
          {list.length>0&&<div>
            <div className='table-responsive'>
            <View items={list} removeItem={removeItem} editItem={editItem} />
              
            </div>
            <button className='btn btn-danger btn-md'
            onClick={clearList}>Remove All</button>
          </div>}
          {list.length < 1 && <div>No Items are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App
