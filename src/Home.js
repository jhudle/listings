import { useEffect, useState } from 'react';
import AllListing from "./AllListing";
import HouseList from "./HouseList";

const Home = () => {
    const [locations, setLocations] = useState(null);
    const [filteredListings, setFilteredListing] = useState(null);
    const { data: listings, isPending, error } = AllListing('https://houselisting.jhdlcn.com/wp-json/house-listing/all', {
        method: 'GET'
    });
    
    const handleFilter = (location) => {
        if(location === 'All'){
            setFilteredListing(listings)
        }else{
            const newListings = listings.filter(listing => listing.province === location);
            setFilteredListing(newListings);
        }
    }

    useEffect(() => {
        fetch('https://houselisting.jhdlcn.com/wp-json/house-listing/locations', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                if (typeof data === 'object' && data !== null) {
                    setLocations(Object.values(data));
                }
            })
            .catch(error => {
                console.error("Error fetching locations:", error);
            });
    }, []);

    return (
        <div className="home-container">
            <div className="filter-container">
                <div className="checkbox-container">
                    <input type="radio" name="location" id="all" value="All" onClick={() => handleFilter('All') }/>
                    <label className='location-label' htmlFor="all">All</label>
                </div>
                {locations &&
                    locations.map(location => (
                        <div className="checkbox-container" key={location.term_id}>
                            <input type="radio" name="location" onClick={() => handleFilter(location.name) } id={location.name} value={location.name} />
                            <label className='location-label' htmlFor={location.name}>{location.name}</label>
                        </div>
                    ))
                }
            </div>
            <div className="listing-container">
                {error && <div>{error}</div>}
                {isPending && <div>Loading....</div>}
                {filteredListings ? (
                    <HouseList listing={filteredListings} />
                ) : (
                    listings && <HouseList listing={listings} />
                )}
            </div>
        </div>
    );
};

export default Home;