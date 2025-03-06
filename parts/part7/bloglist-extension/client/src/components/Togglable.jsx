import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

export const Togglable = forwardRef(({ children, buttonLabel }, refs) => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev)
    }

    useImperativeHandle(refs, () => ({
        toggleVisibility
    }))

    return (
        <>
            {!isVisible ? (
                <Button variant='outlined' onClick={toggleVisibility}>{buttonLabel}</Button>
            ) : (
                <>
                    {children}
                    <Button variant='outlined' onClick={toggleVisibility}>Cancel</Button>
                </>
            )}
        </>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}