import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const ProductRow = withRouter(({ product, deleteProduct, index }) => (
  <tr>
    <td>{product.product_name}</td>
    <td>
      $
      {product.product_price}
    </td>
    <td>{product.Category}</td>
    <td><Link to={`/img/${product.product_image}`}>View</Link></td>
    <td><Link to={`/edit/${product.id}`}>Edit</Link></td>
    <td><button type="button" onClick={() => { deleteProduct(index); }}>Delete</button></td>
  </tr>
));

export default function ProductTable({myProducts, deleteProduct}) {
    const productRows = myProducts.map((product) =>
        <ProductRow key={product.id} product={myProducts} deleteProduct={deleteProduct} index={product.id} />
    );
  
    return (
        <div >
            <table className="bordered-table" >
                <thead>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </table>
        </div>
    );
  }