import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [process, setProcess] = useState('waiting')
    

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setProcess('loading')   

        try {  // вместо then и catch используем try/catch
            const response = await fetch(url, {method, headers, body}) 

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json()

            return data
        } catch(e) {
            setProcess('error')
            throw e;    
        }  
    }, [])

    const clearError = useCallback(() => {
        setProcess('waiting')
    }, [])


    return { process, setProcess, request, clearError}
}