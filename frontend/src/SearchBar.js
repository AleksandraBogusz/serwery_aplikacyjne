import { useState } from 'react';

const style = {
    position: 'fixed'
}

export default function SearchBar(props) {
    const [value, setValue] = useState("");

    const update = props.update

    const onSubmit = (event) => {
        console.log('submit');
        event.preventDefault();
        update(value);
        window.location.replace(`http://localhost:3000?q=${value}`)
    }

    return (
        <div style={style}>
            <form onSubmit={onSubmit}>
                <input type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
            </form>
        </div>
    );
}