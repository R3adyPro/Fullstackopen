import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleCreation = async (event) => {
    event.preventDefault()
    createBlog(newBlog.title, newBlog.author, newBlog.url)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleChange = (event) => {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    setNewBlog((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  return(
    <div>
      <h1>create new blog</h1>
      <form onSubmit={handleCreation}>
        <div>
          title:
          <input
            id='title'
            type={'text'}
            value={newBlog.title}
            name='title'
            onChange={handleChange}
          />
          <br></br>
          author:
          <input
            id='author'
            type={'text'}
            value={newBlog.author}
            name='author'
            onChange={handleChange}
          />
          <br></br>
          url:
          <input
            id='url'
            type={'text'}
            value={newBlog.url}
            name='url'
            onChange={handleChange}
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}
export default NewBlogForm