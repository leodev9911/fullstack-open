import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange,
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState(null)

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(baseUrl)
                setResources(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        if (!resources) {
            fetchResources()
        }
    }, [resources, baseUrl])

    const create = async (resource) => {
        try {
            const response = await axios.post(baseUrl, resource)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const service = {
        create,
    }

    return [resources, service]
}