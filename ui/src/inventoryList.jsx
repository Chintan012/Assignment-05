import React from 'react';

import ProductTable from './inventoryTable.jsx';

import ProductAdd from './inventoryAdd.jsx';

import graphQLFetch from './graphQLFetch.js';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { myProducts: [] };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
        productList {
          id product_category product_name product_price product_image
        }
      }`;

    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    }).then(response => {
      response.json().then(result => {
        this.setState({ myProducts: result.data.productList });
      })
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });


  }

  async createProduct(myProduct) {
    const query = `mutation productAdd($myProduct: productInputs!) {
    productAdd(product: $myProduct) {
      _id
    }
  }`;
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { myProduct } })
    }).then(response => {
      this.loadData()
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
  }

  // async deleteProduct(id) {
  //     const query = `mutation productDelete($id: Int!) {
  //       productDelete(id: $id)
  //     }`;
  //     await fetch(window.ENV.UI_API_ENDPOINT, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ query,  id  }),
  //     });
  //     alert('Product deleted product successfully!');
  //     this.loadData();
  // }


  async deleteProduct(index) {

    const query = `mutation productDelete($id: Int!) {

      productDelete(id: $id)

    }`;

    const { myProducts } = this.state;

    const { location: { pathname, search }, history } = this.props;

    const { id } = myProducts[index--];

    const data = await graphQLFetch(query, { id });

    if (data && data.productDelete) {

      this.setState((prevState) => {

        const newList = [...prevState.myProducts];

        if (pathname === `/myProducts/${id}`) {

          history.push({ pathname: '/myProducts', search });

        }

        newList.splice(index, 1);

        return { myProducts: newList };

      });

    } else {

      this.loadData();

    }
  }

    render() {
      const { myProducts } = this.state
      return (
        <div title="Inner Div">
          <h1 className="headerClass"> My Company Inventory </h1>
          <h2 className="headerClass"> Showing all available products </h2>
          <hr />
          <ProductTable myProducts={myProducts} deleteProduct={this.deleteProduct} />
          <h2>Add a new product to the inventory</h2>
          <hr />
          <ProductAdd createProduct={this.createProduct} />
        </div>
      );
    }
  }