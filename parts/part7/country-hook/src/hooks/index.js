import { useEffect, useState } from 'react'
import { fetchCountryByName } from '../services/countries'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    const fetchCountry = async () => {
        try {
            const response = await fetchCountryByName(name)
            if (response.status === 200) {
                setCountry({
                    ...response,
                    found: true
                })
            } 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (name) {
            fetchCountry()
        }
    }, [name])

    return country
}