import React, {Component} from 'react';
import itemProd from '../../../assets/data';
import List from '../Components/ListItem';
import PackageList from '../Components/Package';

//Function to determine each package items
export const buy = (items) =>{
  const packages = [];
  items.forEach(item => {
      const pac = packages.find(function(pack){
              return pack.price + item.price <= 250;
          });
      if (packages.length && pac) {
          if (pac){
              pac.price += item.price;
              pac.weight += item.weight;
              pac.items.push(item);
          }
      } else {
          packages.push({
              price: item.price,
              weight: item.weight,
              items:[item]
          }); 
      }
  });

  const mean = packages.reduce((tot, curr) => tot + curr.weight, 0)/packages.length;
  packages.forEach((cPack, j) => {
    let ct = cPack.weight;
    cPack.items.forEach((cItem, i) => {

      if(ct > mean){
        const packToInsert = packages.find(p => p.weight < mean && p.price + cItem.price <= 250);
       if(packToInsert) {
        packages[j].weight -= cItem.weight;
        packages[j].price -= cItem.price;
        packages[j].items.splice(i, 1);

        packages[packages.indexOf(packToInsert)].weight += cItem.weight;
        packages[packages.indexOf(packToInsert)].price += cItem.price;
        packages[packages.indexOf(packToInsert)].items.push(cItem);
       }
       ct = ct - cItem.weight;
      }
    })
  });
  return packages;
};

// We can use redux for all the state management but this application which involves 2-3 actions
// For this app not required to import whole redux libraries
// So i am using local state for all the state management 
export default class Home extends Component {
  state = {
    item: itemProd, //  Items stored in '/assets/data' where we can update the item
    added: [],
    packages: []
  };

  // Function to capture selected item for Placing order
  handleChange = (event, actionItem)=> {
    if(event.target.checked) {
      this.setState(prevState => ({
        added: [...prevState.added, actionItem]
    }));
    } else {
      this.setState((prevState) => {
       prevState.added.splice(prevState.added.indexOf(actionItem),1);
        return { added: prevState.added };
      });
    }
  }

  placeOrder = () => {
    const pack = buy(this.state.added);
    this.setState({ packages: pack });
    window.scroll(0,0); // For User experience scrolling to top
  }

  render() {
    return (
      <div>
        <section className="container">
          <div className="content">
            <table className="table left table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Price($)</th>
                  <th scope="col">Weight(g)</th> 
                </tr>
              </thead>
              <tbody>
                {this.state.item.map((prod) =>
                  <List 
                    key={prod.name}
                    handleChange={this.handleChange}
                    item={prod}
                  />
                )}
                <tr>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.placeOrder}
                    >
                      Place Order
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="right">
              {<PackageList packages={this.state.packages} />}
            </div>
          </div>
        </section>
        
      </div>
    );
  }
}
