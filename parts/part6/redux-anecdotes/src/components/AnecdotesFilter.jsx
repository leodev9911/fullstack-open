import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from '../store/reducers/filterReducer'

const AnecdotesFilter = () => {
    const filter = useSelector((state) => state.filter)
    const dispatch = useDispatch()
    const [containsFilter, setContainsFilter] = useState(filter)

    const handleChange = (event) => {
        const { value } = event.target

        setContainsFilter(value)
        dispatch(changeFilter(value))
    }

    return (
        <div style={{ marginBottom: 10 }}>
            <label htmlFor="anecdotes-filter">filter</label>
            <input
                id="anecdotes-filter"
                name="contains"
                type="text"
                value={containsFilter}
                onChange={handleChange}
            />
        </div>
    )
}

export default AnecdotesFilter
