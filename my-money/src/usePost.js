import { useReducer } from 'react'
import axios from 'axios'
import { reducer, initialState } from './utils/reducer'

const usePost = url => {
    const [data, dispatch] = useReducer(reducer, initialState)

    const post = data => {
        dispatch({ type: 'REQUEST' })
        axios.post(url, data)
            .then(res => {
                dispatch({
                    type: 'SUCCESS',
                    loading: false,
                    data: res.data
                })
            })
    }
    return [data, post]
}

export default usePost