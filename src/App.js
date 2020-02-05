import logo from "./logo.svg";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import "./App.css";
import UserTable from './tables/UserTable'
import React, { useState } from 'react'
import AddUserForm from './forms/AddUserForm.js'

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
  

  return (
    <div className="container">
      <h1>BlockClubCalendar</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add Event</h2>
          <AddUserForm addUser={addUser} />
        </div>
        <div className="flex-large">
          <h2>View Events</h2>
          <UserTable users={users} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export default App
