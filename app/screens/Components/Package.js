import React from 'react';
const calculateTotal = weight => {
	let tempWeight = weight;
	let totalPrice = 0;
	if(tempWeight >= 1000){
		totalPrice = 20;
		tempWeight = tempWeight - 1000;
	} else if(tempWeight >= 500) {
		totalPrice = totalPrice+ 15;
		tempWeight = tempWeight - 500;
	} else if(tempWeight >= 200) {
		totalPrice = totalPrice+ 10;
		tempWeight = tempWeight - 200;
	} else {
		totalPrice = totalPrice+ 5;
	}
	return totalPrice;
}

export const Package = (props) => (
	<div>
		<h4>This order has following packages</h4>
		<table className="table left table-striped">
			<tbody>
				
				<tr className="d-flex">
						<th className="col-1">Package Name</th>
						<th className="col-1">Total weight</th>
						<th className="col-1">Total price</th>
						<th className="col-1">Courier price</th>
						<th className="col-3">Items</th>
				</tr>
						{
							props.packages && props.packages.map((item, index) => {
								return (
									<tr key={index} className="d-flex">
										<td className="col-1">{`Package ${index + 1}`}</td>
										<td className="col-1">{item.weight}</td>
										<td className="col-1">${item.price}</td>
										<td className="col-1">${calculateTotal(item.weight)}</td>
										<td className="col-3">
											<ul>{item.items.map((packItmem, index, all) => <li key={index}>{`${packItmem.name}`}{index >= all.length-1 ? '': ','}</li>)}</ul>
										</td>
									</tr>
								)
								})
						}
				</tbody>
			</table>
		</div>
    );