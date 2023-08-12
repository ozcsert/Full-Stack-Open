import { useDispatch } from "react-redux"
import { filterChanger } from "../reducers/filterReducer"


const SearchFilter = () => {
    const dispatch = useDispatch()

    const style = {
      marginBottom: 10,
      marginTop: 40,
      backgroundColor: 'grey',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
    }

    const ChangeFilter = (a) => {
      console.log(a.target.value)
     dispatch(filterChanger(a.target.value))
    }

    return (
        <div style={style}>
            filter <input name="filter" onChange={ChangeFilter}/>
        </div>
      )
}



export default SearchFilter