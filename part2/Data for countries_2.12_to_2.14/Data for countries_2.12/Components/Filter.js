const Filter = ({newFilter,setNewFilter}) => {
    const on_change=(event)=>{
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }

    return (
        <>  
            find countries <input value={newFilter} onChange={on_change}/>
        </>
    )
}
export default Filter
