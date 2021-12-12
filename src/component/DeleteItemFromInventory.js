import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql, useQuery, useMutation } from '@apollo/client';

const DELETEORDER = gql`
mutation deleteOrder($orderId: Int!)
  {
    deleteOrder(uBarcode: $orderId)
  {
    uBarcode
  }
}
`

  export const INITEMS = gql`
  query{
    inventoryItems{
      uBarcode
      note
  }
  }`;

function Home (){
  const  [deleteOrder, {newUser, loading, error}] = useMutation(DELETEORDER);
  const { data } = useQuery(INITEMS)

  const [deleteThisItem, setDeleteThisItem] = useState("");

return <div>
  <b>Are you sure you wish to delete item: </b>
  <b>{deleteThisItem} </b>
  <button type="submit" onClick={async() => await deleteOrder({variables: {orderId: deleteThisItem}}).then((res) => window.location.reload(true))}>Confirm</button>
<div>
{(data ? data.inventoryItems.map((item) => <div>
  <b> Name: </b>
  <label>{item.uBarcode}</label>
  <b> Note: </b>
  <label>{item.note}</label>
  <button type="submit" onClick={() => setDeleteThisItem(item.uBarcode)}>Select</button>
  </div>): 'Loading...')}
</div>
</div>
}
 
function deleteThis(item){
  alert("bye bye item: " + item);
}

export default Home;