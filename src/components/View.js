import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'
import{edit2} from 'react-icons-kit/feather/edit2'
export const View = ({items,deleteItem,updateItem}) => {
    
    return items.map(item=>(
        
        <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td className='delete-btn' onClick={()=>deleteItem(item.id)}>
                <Icon icon={trash}/>
            </td>
            <td className='-btn' >
                <Icon icon={edit2} size={18} onClick={()=>updateItem(item.id)}/>

            </td>           
        </tr>            
    
))
}
