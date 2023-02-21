import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('items');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  // main array of objects state || items state || items array of objects
  const [items, setitems]=useState(getDatafromLS());

  // input field states
  const [title, setTitle]=useState('');
  const [price, setPrice]=useState('');

  const [toggleSubmit,setToggleSubmit]=useState(true);
  const [isEditItem,setIsEditItem]=useState(null);

  
  // form submit event
  const handleAddItemSubmit=(e)=>{
    if(!(title&&price)){
      alert("plz fill Data");
    }else if(!(title&&price) && !toggleSubmit){
        setitems(
          items.map((elem) =>{
            if (elem.id ===isEditItem){
              return{...elem,title:title,price:price}
            }
            return elem;
          })
           
        )
          setToggleSubmit(true);
          setTitle('');
          setPrice('');
          setIsEditItem(null);
    }else{
      e.preventDefault();
      // creating an object
      const item={
        id:new Date().getTime().toString(),
        title,
        price
        
      }
      
      let isVaild = validateForm()
       if(isVaild){
        setitems([...items,item]);
        setTitle('');
        setPrice('');
        alert('added');
       }else{
        alert('in vaild form')
       }
      
    }
    
  }
  // valdation error
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

  // delete item from LS
  const deleteItem=(id)=>{
    const filteredItems=items.filter((element,index)=>{
      return element.id !== id
    })
    setitems(filteredItems);
  }

   
  // update item from LS
  const updateItem=(id)=>{
    const newUpdateEtiem=items.find((element)=>{
      return element.id === id
    })
    setToggleSubmit(false);
    setTitle(newUpdateEtiem.title);
    setPrice(newUpdateEtiem.price);
    setIsEditItem(id);
    
  } 

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('items',JSON.stringify(items));
  },[items])

  return (
    <div className='wrapper'>
      <h1>Items</h1>
      <p>Add Items</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddItemSubmit}>
            <label htmlFor='title'>Title</label>
            <input type="text" id='title' className='form-control'  minLength= "3" required="required"
            onChange={(e)=>setTitle(e.target.value)} value={title} label="Outlined" variant="outlined" />
            <br></br>
            <label htmlFor='price'>Price</label>
            <input type="number" id='price' className='form-control' required="required"
            onChange={(e)=>setPrice(e.target.value)} value={price} />
            <br></br>
            {
            toggleSubmit ?
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button> :

            <button type="submit" className='btn btn-success btn-md'>
              update
            </button>

            }
            
          </form>
        </div>

        <div className='view-container'>
          {items.length>0&&<div>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    
                    <th>Title</th>
                    <th>Price</th>
                    <th>Delete</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  <View items={items} deleteItem={deleteItem} updateItem={updateItem} />
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>setitems([])}>Remove All</button>
          </div>}
          {items.length < 1 && <div>No Items are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App
