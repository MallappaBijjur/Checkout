import React, {PropTypes} from 'react';

const ListItem =(props) => {
    return(
      <tr key={props.item.name}>
        <td>{props.item.name}</td>
        <td>{props.item.price}</td>
        <td>{props.item.weight}</td>
        <td>
          <div className="checkbox">
            <input
              className="input"
              type="checkbox"
              id={props.item.name}
              name="serviceCheck"
              onChange={(event) => props.handleChange(event, props.item)} 
            />
            <label htmlFor={props.item.name}><span /></label>
          </div>
        </td>
      </tr>
    )
}

ListItem.propTypes = {
    item: PropTypes.object,
    handleChange: PropTypes.func
}

export default ListItem;
