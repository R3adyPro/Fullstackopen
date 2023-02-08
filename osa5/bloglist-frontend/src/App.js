import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'
import NewBlogForm from './components/newBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState([])

  useEffect(() => {
    const islogged = window.localStorage.getItem('loggedNoteappUser')
    if (islogged) {
      const user = JSON.parse(islogged)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes)),
    )
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes)),
    )
  }, [message])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('login was succesful')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exceptions) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    console.log('login in with', username, password)
  }

  const createBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({
        title,
        author,
        url
      })
      setMessage(`new blog ${title} creation was succesful`)
      setBlogs(blogs.concat(blog))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exceptions) {
      setMessage('blog creation failed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const sendLike = async (id, blogData) => {
    try {
      const response = await blogService.update({ blogData, id })
      setMessage('blog liked')
      setBlogs(blogs.map(blog => blog.id === response.id ? response : blog))
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
    catch (exceptions) {
      setMessage('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove({ id })
      const testi = blogs.filter(blog => blog.id !== id)
      console.log(testi)
      setBlogs(testi)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
    catch (exceptions) {
      setMessage('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser('')
    setMessage('logout was succesfull')
    setTimeout(() => {
    }, 5000)
    window.location.reload()
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}/>
        <form onSubmit={handleLogin}>
          <div>
              username:
            <input
              id='username'
              type={'text'}
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
              password:
            <input
              id='password'
              type={'text'}
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message}/>
      <p>{user.name} is logged in</p><button onClick={logout}>log out</button>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} sendLike={sendLike} deleteBlog={deleteBlog}/>
      )}
      <br></br>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm createBlog={createBlog}/>
      </Togglable>
    </div>
  )
}

export default App