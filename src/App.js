import './App.css';
import React, { useState, useMemo } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import SelectFeature from './component/SelectFeature';
import AddItem from './component/AddItem';
import DeleteUser from './component/DeleteUser';
import DeleteOrders from './component/DeleteOrders';
import ViewItemGroups from './component/ViewItemGroups.js';
import DeleteItemFromInventory from './component/DeleteItemFromInventory'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!)  {
    login(email: $email, password: $password)
  }
`

export default function App() {
  const [authToken, setAuthToken] = useState(null);
  const isAdmin = useMemo(() => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
    if (token == null) {
      return false
    }
    return true;
  }, [authToken]);
  const history = useHistory();
  const [email, setEmail] = useState('Hester.Douglas@hotmail.com');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const doLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ variables: { email, password } })
      const token = res.data.login.authToken;
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      history.push('/home');
    } catch (error) {
    }
  }

  if (isAdmin) {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <h1>Admin tool</h1>
          <button onClick={async (e) => {
            localStorage.removeItem('authToken');
            setAuthToken(null);
          }}>Logout</button>
          <div style={{ margin: '2rem 0' }}>
            <table style={{ margin: '0 auto' }}>
              <tbody>
                <tr>
                  <td>Item Manegement:</td>
                  <td className="center"><Link to="/AddItem">Add Item To Inventory</Link></td>
                  <td className="right"><Link to="/DeleteItemFromInventory">Delete Item From Inventory</Link></td>
                </tr>
                <tr>
                  <td>Item Group Manegement:</td>
                  <td className="center"><Link to="/ViewItemGroups">View And Delete Item Groups</Link></td>
                  <td className="right"><Link to="/SelectFeature">Select Item Group To Feature</Link></td>
                </tr>
                <tr>
                  <td>User Manegement:</td>
                  <td className="center"></td>
                  <td className="right"><Link to="/DeleteUsers">View And Delete Users</Link></td>
                </tr>
                <tr>
                  <td>Order Manegement:</td>
                  <td className="center"></td>
                  <td className="right"><Link to="/DeleteOrders">View And Delete Orders</Link></td>
                </tr>
              </tbody>
            </table>
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
              <Route exact path="/App">
                <App />
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
    )
  } else {
    return (
      <div>
        <div className="v-center" style={{ width: '300px', margin: '0 auto' }}>
          <form onSubmit={async (e) => doLogin(e)}>
            <input value={email} placeholder="Email" className="w-100" type="text" onChange={(ev) => {
              ev.preventDefault();
              setEmail(ev.target.value)
            }
            } />
            <input value={password} placeholder="Password" className="w-100" type="password" onChange={(ev) => {
              ev.preventDefault();
              setPassword(ev.target.value)
            }
            } />
            <button className="w-100" type="submit" onClick={async (e) => doLogin(e)}>Sign in</button>
            <div>{error && 'Yo done fucked up m8.'}</div>
          </form>
        </div>
      </div>
    )
  }
}