import './App.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import SelectFeature from './component/SelectFeature';
import AddItem from './component/AddItem';
import DeleteUser from './component/DeleteUser';
import ViewTable from './component/ViewTable';
import DeleteOrders from './component/DeleteOrders';
import ViewItemGroups from './component/ViewItemGroups.js';
import DeleteItemFromInventory from './component/DeleteItemFromInventory'
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

export default function Home() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <h1>Admin tool</h1>
                <button type="submit" onClick={async (e) => {
                    localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImN1aWQiOiJja3d3NzQybXQwMDAwNjh1dzA5eXhlaWQxIn0sImlhdCI6MTYzODg5MTgzNCwiZXhwIjoxNjM4OTc4MjM0fQ.Yc-vVuck9x0xsX2bwS6Ui07sVu7tR3ySBha2rzfX7i0');
                }}>Login</button>
                <div>
                    <b>  Item Manegement: </b>
                    <label>  <Link to="/AddItem"> Add Item To Inventory </Link></label>
                    <label> |_| </label>
                    <label>  <Link to="/DeleteItemFromInventory"> Delete Item From Inventory </Link></label>
                </div>
                <div>
                    <b>  Item Group Manegement: </b>
                    <label>  <Link to="/ViewItemGroups"> View And Delete Item Groups </Link></label>
                    <label> |_| </label>
                    <label>  <Link to="/SelectFeature"> Select Item Group To Feature </Link></label>
                </div>
                <div>
                    <b>  User Manegement: </b>
                    <label>  <Link to="/DeleteUsers"> View And Delete Users </Link></label>
                </div>
                <div>
                    <b>  Order Manegement: </b>
                    <label>  <Link to="/DeleteOrders"> View And Delete Orders </Link></label>
                </div>
                <div>
                </div>
                <div>
                    <Switch>
                        <Route exact path="/SelectFeature">
                            <SelectFeature />
                        </Route>
                        <Route exact path="/AddItem">
                            <AddItem />
                        </Route>
                        <Route exact path="/ViewItemGroups">
                            <ViewItemGroups />
                        </Route>
                        <Route exact path="/DeleteItemFromInventory">
                            <DeleteItemFromInventory />
                        </Route>
                        <Route exact path="/ViewTable">
                            <ViewTable />
                        </Route>
                        <Route exact path="/DeleteUsers">
                            <DeleteUser />
                        </Route>
                        <Route exact path="/DeleteOrders">
                            <DeleteOrders />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
