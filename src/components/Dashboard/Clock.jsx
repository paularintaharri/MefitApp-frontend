import { useEffect, useState } from 'react';

function Clock() {

    let date = new Date();
    const [time, setTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(
                new Intl.DateTimeFormat('en-GB', {
                    dateStyle: 'full', timeStyle: 'medium'
                }).format(date));
        }, 1000);
        return () => clearInterval(interval);
    }, [date])

    return (
        <div>
            <h4>{time}</h4>
        </div>
    )
}

export default Clock


