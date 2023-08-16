import AllListing from "./AllListing";
import HouseList from "./HouseList";

const Home = () => {
    
    const { data: listings, isPending, error } = AllListing('http://houselisting.jhdlcn.com/wp-json/house-listing/all',{
        method: 'GET'
    })
    return (
        <div className="home-container">
            <div className="filter-container">

            </div>
            <div className="listing-container">
                {error && <div>{error}</div>}
                {isPending && <div>Loading....</div>}
                {listings && <HouseList listing={ listings } />}
            </div>
        </div>
    );
}
 
export default Home;