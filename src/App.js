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

  //const [title,setTitle] = useState('');
  //const [price,setPrice] = useState('');
  const initialValues = { title: "", price: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [list,setList] =useState(getLocalStorage());
  const [isEditing,setIsEditing]=useState(false);
  const [editID,setEditID] = useState(null);
  const [alert,setAlert] = useState({show: false , msg:'' , type:''});
  const [formError,setFormError]=useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  const handleSubmmit = (e) => {
    e.preventDefault();
    let isVaild = validateForm()
    if (!(formValues.title && formValues.price)){
      // display alert
      showAlert(true,'danger','please enter value');
    }
    else if((formValues.title && formValues.price) && isEditing){
      setList(list.map((item)=>{
        if (item.id === editID){
          return {...item,itemTitle:formValues.title,itemPrice:formValues.price}
        }
        return item
      }))
      if(isVaild){
      setFormValues({title:'',price:''})
      setEditID(null);
      setIsEditing(false);
      showAlert(true,'success','Item Edited');
      }
      
    }
    else {
       if(isVaild){
        showAlert(true,'success','item added to the list');
        const newItem = {id:new Date().getTime().toString(),itemTitle:formValues.title,itemPrice:formValues.price};
        setList([...list,newItem]);
        setFormValues({title:'',price:''})

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
    setFormValues({title:specificItem.itemTitle,price:specificItem.itemPrice})


  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  // valdation error
  
  
  const validateForm = () => {
    let formError={};
    if(formValues.title.length < 3  ){
      formError.title = "title is shouid be gratter than 3 character and unique"
    }
    if(formValues.price < 1){
      formError.price = "price is shouid be gratter than 1";
      setFormValues({price:1})
    }
    if(localStorage.getItem('list').includes(formValues.title)  ){
      formError.title = "title is shouid be gratter than 3 character and unique"
    }
    

    setFormError({...formError});
    
    return Object.keys(formError).length < 1;
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
            <input name='title' type="text" id='title' className='form-control'  
            onChange={handleChange} value={formValues.title} label="Outlined" variant="outlined" />
            <small className="alert-danger">{formError.title}</small>
            <br></br>
            <label htmlFor='price'>Price</label>
            <input name='price' type="number" id='price' className='form-control' 
            onChange={handleChange} value={formValues.price}   />
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