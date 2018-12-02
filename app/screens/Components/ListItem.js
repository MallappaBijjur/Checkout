import React from 'react';

export const ListItem =(props) => {
    return(
        <tr key={props.index}>
            <td scope="row">{props.item.name}</td>
            <td>{props.item.price}</td>
            <td>{props.item.weight}</td>
            <td>
                <div className="checkbox">
                    <input className="input" type="checkbox" id={props.item.name} name="serviceCheck" onChange={(event) => props.handleChange(event, props.item)}/>
                    <label htmlFor={props.item.name}><span></span></label>
                </div>
            </td>
        </tr>
    )
}