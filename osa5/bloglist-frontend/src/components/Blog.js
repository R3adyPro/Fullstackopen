import { useState } from 'react'

const Blog = ({ blog, sendLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const blogData = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    sendLike(blog.id, blogData)
  }

  const handleRemove = () => {
    if(window.confirm(`do you want to delete ${blog.title} By ${blog.author}`)){
      deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle} className='blogData'>
      <div>
        <span className='title'>{blog.title}</span>
        <span className='author'> {blog.author}</span>

      </div>
      <div>
        <span className='url'>{blog.url}</span>
        <button id='visi-button' onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div>
        <span className='like'>{blog.likes}</span>
        <button id='like-button' onClick={handleLike}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div>
        <button onClick={handleRemove}>delete</button>
      </div>
    </div>
  )
}

export default Blog