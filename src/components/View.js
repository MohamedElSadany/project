import React from 'react'
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'
import { edit2 } from 'react-icons-kit/feather/edit2'
export const View = ({ items, removeItem, editItem }) => {


    return (
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
                {
                    items.map((item) => {
                        const { id, itemTitle, itemPrice } = item;
                        return (
                            <tr key={id}>
                                <td>{itemTitle}</td>
                                <td>{itemPrice} EGP</td>
                                <td className='delete-btn' onClick={() => removeItem(id)}>
                                    <Icon icon={trash} />
                                </td>
                                <td className='-btn' >
                                    <Icon icon={edit2} size={18} onClick={() => editItem(id)} />

                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )




}
