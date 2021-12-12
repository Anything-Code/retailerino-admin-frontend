import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql, useQuery, useMutation } from '@apollo/client';

export const ROLES = gql`
  query{
    roles{
    id
    name
  }
}`;

export const USERS = gql`
query{
  users{
  cuid
  firstname
  lastname
  phoneNumber
  email
  roleId
  role{name}
}
}`;

const DELETEUSER = gql`
mutation deleteUser($userIdPass: String!)
  {
  deleteUser(cuid: $userIdPass)
  {
    cuid
  }
}
`

const CHANGEROLE = gql`
mutation changeRole($userIdPass: String!, $newRolePass: Int!) {
  changeRole(userCuid: $userIdPass, role: $newRolePass) {
    roleId
  }
}
`

export default function DeleteUser () {
  const { data } = useQuery(USERS)
  const  [makeAdmin, {newUser, loading, error}] = useMutation(CHANGEROLE);
  const  [deleteUser, {newDelete, loadingDelete, }] = useMutation(DELETEUSER);

  ;
    //======================================================

    return (data ? data.users.map((user) => <div>
    <b> Firstname: </b>
    <label>{user.firstname}</label>
    <b> Lastname: </b>
    <label>{user.lastname}</label>
    <b> Phone Number: </b>
    <label>{user.phoneNumber}</label>
    <b> Email: </b>
    <label>{user.email}</label>
    <b> Role: </b>
    <label>{user.role.name}</label>
    <button disabled type="submit" onClick={async() => await deleteUser({variables: {userIdPass: user.cuid}}).then((res) => window.location.reload(true))}>Delete User</button>
    <button type="submit" onClick={async() => await makeAdmin({variables: {userIdPass: user.cuid, newRolePass: ChangeThisUserRole(user.roleId)}}).then((res) => window.location.reload(true))}>Change role</button>
    
    </div>): 'Loading...')

}

function ChangeThisUserRole(Role){
  if(Role === 1){
    return 2
  }
  else{
    return 1
  }
}
