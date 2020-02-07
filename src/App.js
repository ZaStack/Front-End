import logo from "./logo.svg";
import React, { useState, Fragment } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import "./App.css";
import UserTable from './tables/UserTable'
import AddUserForm from './forms/AddUserForm.js'
import EditUserForm from './forms/EditUserForm.js'





const App = () => {
  const usersData = [
    { id: 1, name: 'D&D night', username: 'Dragon Pug, FL', height: 'Firday Night 9pm' },
    { id: 2, name: 'Movie Night', username: 'My house, CA', height: 'Saturday Night 8pm' },
    { id: 3, name: 'Taco Tuesday', username: 'TacoPlace, TX', height: 'Tuesday 1:30pm' },
  ]


  const [users, setUsers] = useState(usersData)

  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
    
  }

  const editRow = user => {
    setEditing(true)
  
    setCurrentUser({ id: user.id, name: user.name, username: user.username, height: user.height})
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)
  
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }
  

  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', username: '', height: ''}
  const [currentUser, setCurrentUser] = useState(initialFormState)


  
  return (

    <div className="container">
			<h1>BlockClubCalander</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App