const getReserves = async () => {
    try {
        const response = await fetch(`http://localhost:3002/reservasAtivas`, {
            method: 'GET', headers: {
                'X-Powered-By': 'Express',
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Keep-Alive': 'timeout=5',
            }
        })
        const result = await response.json()
        return result.data
    } catch (error) {
        console.error(`get reserves failed ${error}`)
        return
    }
}

export default getReserves