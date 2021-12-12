import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql, useQuery, useMutation } from '@apollo/client';

export const ADDITEM = gql`
mutation createInventoryItem($itemBarCode: Int!, $itemNote: String!, $itemGroup: Int!, $itemTime: DateTime!){
  createInventoryItem(uBarcode: $itemBarCode, note: $itemNote, inventoryGroupId: $itemGroup, arrivedAt: $itemTime)
  {
    uBarcode
  }
}`;

export const INGROUPS = gql`
query{
  inventoryGroups{
    id
    itemName
}
}`;

function Contact (){
  const  [addItem, {newUser, loading, error}] = useMutation(ADDITEM);
    const { data } = useQuery(INGROUPS)

    const [uBarcode, setuBarcode] = useState("");
    const [note, setNote] = useState("");
    const [inventoryGroup, setInventoryGroupId] = useState("");
  
    return (
      <div>
      
        <label> uBarcode: 
          <input 
            type="text" 
            value={uBarcode}
            onChange={(e) => setuBarcode(e.target.value)}
          />
        </label>
        <label> note: 
          <input 
            type="text" 
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <button type="submit" onClick={async() => await addItem({variables: {itemBarCode: parseInt(uBarcode), itemNote: note, itemGroup: parseInt(inventoryGroup), itemTime: "2001-02-21T23:00:00.000Z"}}).then((res) => window.location.reload(true))}>Submit</button>
        {(data ? data.inventoryGroups.map((d, i) => <div key={d.id}>{d.itemName}
              <input type="checkbox" value={d.checked} onChange={() => setInventoryGroupId(d.id)}/>
            </div>) : '')}   
      </div>
    )
}

function addItemToDb(item, itemGroupId){
  //remember to both add item and update item group with +1 for the amount
}

export default Contact;