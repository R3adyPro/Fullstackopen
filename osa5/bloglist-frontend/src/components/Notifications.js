const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if(message.includes('failed') || message.includes('wrong')){
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="succesful">
      {message}
    </div>
  )
}
export default Notification