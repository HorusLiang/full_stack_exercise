import { useSelector, useDispatch } from 'react-redux'
import {changeFilterValue} from '../reducers/filterReducer'
const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
      const inputValue=event.target.value
      dispatch(changeFilterValue(inputValue))
    }
    const style = {
      marginBottom: 10
    }
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter