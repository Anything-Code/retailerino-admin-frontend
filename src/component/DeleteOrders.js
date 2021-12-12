import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const CONFIRMORDER = gql`
mutation updateOrder($orderId: Int!)
  {
    updateOrder(id: $orderId, confirmed: true)
  {
    id
  }
}
`

export const ORDERIS = gql`
query{
  orderIs{
    id
    confirmed
    user{firstname, lastname}
    address{country, city, zip, street}
    deliveryServiceProvicer{name}
    createdAt
}
}`;

function DeleteOrders() {
  const { data } = useQuery(ORDERIS)
  const [confirmOrder, { newUser, loading, error }] = useMutation(CONFIRMORDER);

  //const listWithCheck = 
  //console.log("==============================================");
  //console.log(productsReturned[0]);
  const [deleteThisOrder, setDeleteThisOrder] = useState("");
  const [confirmThisOrder, setConfirmedThisOrder] = useState("");

  function chooseIfbutton(item) {
    if (!item.confirmed) {
      return <button type="submit" onClick={async () => await confirmOrder({ variables: { orderId: item.id } }).then((res) => window.location.reload(true))}>Confirm Order</button>
    }
    else {
      return
    }
  }



  return <div>
    <b>Are you sure you wish to delete order: </b>
    <b>{deleteThisOrder} </b>
    <button type="submit" onClick={() => deleteThis(deleteThisOrder)}>Confirm Delete</button>
    <div>
      {(data ? data.orderIs.map((item) => <div>
        <b> Order Id: </b>
        <label>{item.id}</label>
        <b> Ordered by: </b>
        <label>{item.user.firstname + ' ' + item.user.lastname}</label>
        <b> Is Confirmed: </b>
        <label>{item.confirmed.toString()}</label>
        <b> Address is: </b>
        <label>{item.address.country + ' '
          + item.address.city + ' '
          + item.address.zip + ' '
          + item.address.street + ' '
        }
          <b> Dilvery By: </b>
          <label>{item.deliveryServiceProvicer.name}</label>
        </label>
        <b> Created At: </b>
        <label>{item.createdAt}</label>
        <button disabled type="submit" onClick={() => setDeleteThisOrder(item.id)}>Select Order To Delete</button>
        <div>{chooseIfbutton(item)}</div>
        <div>==============================================================</div>
      </div>
      ) : '')}
    </div>
  </div>
}

function fetchOrderedItems(itemIds) {
  let userName;
  //users.data.users.map((user) => {if(userId === user.cuid){userName = user.firstname + " " + user.lastname}})
  return userName;
}

function deleteThis(item) {
  alert("deleted item: " + item);
}
function confirmThis(item) {
  alert("confirmed item: " + item);
}

export default DeleteOrders;