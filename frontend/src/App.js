import { useState } from 'react';
import SearchBar from './SearchBar.js';
import Scrollbar from './ScrollBar.js';


export default function App() {

    const getQueryParam = () => {
        const params = new URL(window.location.href).searchParams;
        const search = new URLSearchParams(params);
        const param = search.get('q');
        if (!param) {
            return "cat";
        }
        return param;
    }

    const [searchTerm, setSearchTerm] = useState(getQueryParam());

    return (
        <div>
            <SearchBar update={setSearchTerm}/>
            <Scrollbar searchTerm={searchTerm}/>
        </div>
    )
}