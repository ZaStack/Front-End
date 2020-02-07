





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

}

export default App