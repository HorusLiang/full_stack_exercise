

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    const styles = {
      backgroundColor: "red",
      padding: "10px",
      border: "1px solid black"
    }
  
    return (
      <div className="error" style={styles}>
        {message}
      </div>
    )
  }
  
  export default Notification