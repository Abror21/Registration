import { useCallback, useMemo, useReducer } from "react";
import { toast } from "react-toastify";

const initialState = { value: '', touched: false, isExist: false, timer: null };

const reducer = (state, action) => {
    if (action.type === 'VALUE') {
        return { ...state, value: action.value };
    } else if (action.type === 'BLUR') {
        return { ...state, touched: true }
    } else if (action.type === 'EXIST') {
        return { ...state, isExist: true }
    } else if (action.type === 'NOTEXIST') {
        return { ...state, isExist: false }
    } else if (action.type === 'SETTIMER') {
        return { ...state, timer: action.value }
    }
    return state;
}

export const useInput = (inputValidation = () => { }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const inputChange = (e, getRequest = false) => {
        dispatch({ type: "VALUE", value: e.target.value });

        if (getRequest) {
            clearTimeout(state.timer);
            const newTimer = setTimeout(() => {
                fetch('http://localhost:8000/user/' + e.target.value)
                    .then(res => {
                        if (!res.ok) {
                            dispatch({ type: 'NOTEXIST' })
                            return;
                        }
                        return res.json()
                    })
                    .then(data => {
                        if (data && data.id) {
                            dispatch({ type: 'EXIST' })
                        } else {
                            dispatch({ type: 'NOTEXIST' })
                        }
                    })
            }, 800)
            dispatch({ type: 'SETTIMER', value: newTimer })
        }

    }
    const inputBlur = e => {
        dispatch({ type: "BLUR" });
    }
    const inputTouch = () => {
        dispatch({ type: "BLUR" })
    }

    let inputIsValid = inputValidation(state.value);
    let inputIsError = state.touched && !inputIsValid;

    return {
        inputChange,
        inputBlur,
        inputTouch,
        value: state.value,
        isExist: state.isExist,
        inputIsValid,
        inputIsError,
    }
}
