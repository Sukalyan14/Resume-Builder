const conf = {
    server:{
        SERVER_URL : String(import.meta.env.VITE_SERVER_URL), 
        SERVER_PORT : String(import.meta.env.VITE_SERVER_PORT), 
    },
    countDown:{
        COUNTDOWN_INTERVAL : import.meta.env.VITE_COUNTDOWN_INTERVAL,
        COUNTDOWN_START : import.meta.env.VITE_COUNTDOWN_START
    }
}

export default conf