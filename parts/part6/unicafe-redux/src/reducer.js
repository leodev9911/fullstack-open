const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (state = initialState, action) => {
    let stateCopy = structuredClone(state)

    switch (action.type) {
        case 'GOOD':
            stateCopy.good = stateCopy.good + 1
            return stateCopy
        case 'OK':
            stateCopy.ok = stateCopy.ok + 1
            return stateCopy
        case 'BAD':
            stateCopy.bad = stateCopy.bad + 1
            return stateCopy
        case 'ZERO':
            return stateCopy = {
                good: 0,
                ok: 0,
                bad: 0
            }
        default: return state
    }
}

export default counterReducer
