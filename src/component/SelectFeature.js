import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql, useQuery,useMutation } from '@apollo/client';


const UPDATEFLAG = gql`
mutation updateInventoryGroup($idPass: Int!){
  updateInventoryGroup(id: $idPass, featured: true){id}}
`
const UPDATEFLAGBAD = gql`
mutation updateInventoryGroup($idPass: Int!){
  updateInventoryGroup(id: $idPass, featured: false){id}}
`

export const INVETORYGROUPS = gql`
  query{
    inventoryGroups{
    id
    itemName
    featured
  }
}`;

export default function Home (){
  const  [featureThis, {newUser, loading, error}] = useMutation(UPDATEFLAG);
  const  [unfeatureThis, {newUser2, loading2, error2}] = useMutation(UPDATEFLAGBAD);
  const { data } = useQuery(INVETORYGROUPS)
  
  function chooseTheRightButton(item){
    if(item.featured){
      return <button type="submit" onClick={async() => await unfeatureThis({variables: {idPass: item.id}}).then((res) => window.location.reload(true))}>Unfeature Item</button>
    }
    else{
      return <button type="submit" onClick={async() => await featureThis({variables: {idPass: item.id}}).then((res) => window.location.reload(true))}>Feature Item</button>
    }
  }

  return (data ? data.inventoryGroups.map((item) =><div>
  <label>{item.itemName}</label>
{chooseTheRightButton(item)}
</div>)
  : 'Loading...');
}
 
function featureThisItem(item){
  alert("feture item: " + item);
  window.location.reload(false);
}

function unfeatureThisItem(item){
  alert("unfeture item: " + item);
  window.location.reload(false);
}
