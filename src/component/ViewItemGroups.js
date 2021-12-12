import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const INVETORYGROUPS = gql`
  query{
    inventoryGroups{
    id
    itemName
    price
    amount
    featured
    displayAmount
    updatedAt
  }
}`;


function DeleteThisGroup(item) {
  alert("delete item group: " + item.id);
}

export default function About() {
  const { data } = useQuery(INVETORYGROUPS)

  return (data ? data.inventoryGroups.map((item) =>
    <div key={item.id}>
      <b> Name: </b>
      <label>{item.itemName}</label>
      <b> Price: </b>
      <label>{item.price}</label>
      <label>$</label>
      <b> Amount in stock: </b>
      <label>{item.amount}</label>
      <b> Amount for sale: </b>
      <label>{item.displayAmount}</label>
      <b> Is featured?: </b>
      <label>{item.featured.toString()}</label>
      <button disabled type="submit" onClick={() => DeleteThisGroup(item)}>Delete Group</button>
    </div>
  ) : 'Loading...')
}