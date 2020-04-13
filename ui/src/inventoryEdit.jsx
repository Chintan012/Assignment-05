import React from 'react';

import { Link } from 'react-router-dom';

import NumInput from './NumInput.jsx';

import TextInput from './TextInput.jsx';



export default class InventoryEdit extends React.Component {

  constructor() {

    super();

    this.state = {
        products : []
    };

    this.onChange = this.onChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }



  componentDidMount() {

    this.loadData();

  }



  componentDidUpdate(prevProps) {

    const { match: { params: { id: prevId } } } = prevProps;

    const { match: { params: { id } } } = this.props;

    if (id !== prevId) {

      this.loadData();

    }

  }



  onChange(event, naturalValue) {

    const { name, value: textValue } = event.target;

    const value = naturalValue === undefined ? textValue : naturalValue;

    this.setState(prevState => ({

      products: { ...prevState.products, [name]: value },

    }));

  }

  async handleSubmit(e) {

    e.preventDefault();

    const { products, invalidFields } = this.state;

    const query = `mutation inventoryUpdate(

      $id: Int!

      $changes: InventoryUpdateInputs!

    ) {

      inventoryeUpdate(

        id: $id

        changes: $changes

      ) {
        product_category product_name product_price product_image
      }

    }`;



    const { id, ...changes } = products;

    const data = { id, changes };

    await fetch(window.ENV.UI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, data }),
      });
      alert('Product updated Successfully');
      this.loadData();

  }

  async loadData() {

    const query = `query products($id: Int!) {

      products(id: $id) {
        product_category product_name product_price product_image
      }

    }`;

    const { match: { params: { id } } } = this.props;

    const data = {id};

    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, data }),
      });
      const result = await response.json();
      this.setState({ products: result.data.product });

  }



  render() {

    const { products: { id } } = this.state;

    const { match: { params: { id: propsId } } } = this.props;

    if (id == null) {

      if (propsId != null) {

        return <h3>{`Product with ID ${propsId} not found.`}</h3>;

      }

      return null;

    }

    const { products: { Category, Price } } = this.state;

    const { issue: { Name, Image } } = this.state;

    return (
        <form onSubmit={this.handleSubmit}>
          <h3>{`Editing product: ${id}`}</h3>
          <table>
            <tbody>
              <tr>
                <td>Category:</td>
                <td>
                  <select name="Category" value={Category} onChange={this.onChange}>
                    <option value="shirt">Shirt</option>
                    <option value="jeans">Jeans</option>
                    <option value="jacket">Sweater</option>
                    <option value="sweater">Jacket</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>
                  <NumInput name="Price" value={Price} onChange={this.onChange} key={id} />
                </td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>
                  <TextInput name="Name" value={Name} onChange={this.onChange} key={id} />
                </td>
              </tr>
              <tr>
                <td>Image:</td>
                <td>
                  <TextInput name="Image" value={Image} onChange={this.onChange} key={id} />
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <button type="submit">Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      );
    }
  }