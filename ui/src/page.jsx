import React from 'react';
import { NavLink } from 'react-router-dom';
import Contents from './contents.jsx';

function NavBar() {
  return (
    <nav>
      <NavLink exact to="/home">Home</NavLink>
      {' | '}
      <NavLink to="/myProducts">Product List</NavLink>
    </nav>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}