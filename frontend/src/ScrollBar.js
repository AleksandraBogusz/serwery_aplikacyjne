import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const URL = 'http://localhost:8080/app/photos/search';

export default function ScrollBar(props) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [firstRender] = useState();

    const fetchPhotos = () => {
        console.log(`App::fetchPhotos has been called. data: ${data.length} page: ${page}`);

        const options = {
            method: "GET",
        }

        fetch(`${URL}?query=${props.searchTerm}&page=${page}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Status not ok: ${response.status}`)
                }
                return response;
            })
            .then(response => response.json())
            .then(json => {
                const urls = json.results.map(result => result.urls.small);
                console.log(urls);

                setData(data.concat(urls));
                setPage(page + 1);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        console.log('test');
        fetchPhotos();
    }, [firstRender])

    return (
        <InfiniteScroll
            dataLength={data.length}
            next={fetchPhotos}
            hasMore={true}
            loader={<h2>Loading...</h2>}
            endMessage={<p>The end</p>}
        >
            {data.map(elem => {
                return (<div key={elem}>
                    <img src={elem} />
                </div>);
            })}
        </InfiniteScroll>
    );

}
