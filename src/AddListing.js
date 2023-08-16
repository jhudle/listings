import { useState } from 'react';

const AddListing = () => {
    const [ post_title, set_postTitle] = useState('');
    const [ location, set_location] = useState('');
    const [ price, set_price] = useState('');
    const [ land_area, set_landArea] = useState('');
    const [ floor_area, set_floorArea] = useState('');

    const submitListing = (e) => {
        e.preventDefault();

        const listing = { post_title, location, price, land_area, floor_area };

        const base64Credentials = btoa(process.env.REACT_APP_USERNAME + ':' + process.env.REACT_APP_PASSWORD);

        const requestOptions = {
            method: 'POST', 
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            },
            body: JSON.stringify(listing)
        };

        fetch('https://houselisting.jhdlcn.com/wp-json/house-listing/add', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    return (
        <div className="add-listing">
            <h2 className="heading-center">Add a New Listing</h2>
            <form onSubmit={submitListing}>
                <div className="single-row">
                    <div className="form-block">
                        <label htmlFor="post_title" className="form-label">Listing Name</label>
                        <input type="text" name="post_title" id="post_title" placeholder="Listing Name" className="form-input"
                        value = { post_title } onChange={(e) => set_postTitle(e.target.value)} required/>
                    </div>
                </div>
                <div className="dual-row">
                    <div className="form-block">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" name="location" id="location" placeholder="Location" className="form-input"
                        value = { location } onChange={(e) => set_location(e.target.value)} required/>
                    </div>
                    <div className="form-block">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" min="1" step="0.01" name="price" id="price" placeholder="Price" className="form-input"
                        value = { price } onChange={(e) => set_price(e.target.value)} required/>
                    </div>
                </div>
                <div className="dual-row">
                    <div className="form-block">
                        <label htmlFor="land_area" className="form-label">Land Area</label>
                        <input type="number" min="1" step="1" name="land_area" id="land_area" placeholder="Land Area" className="form-input"
                        value = { land_area } onChange={(e) => set_landArea(e.target.value)} required/>
                    </div>
                    <div className="form-block">
                        <label htmlFor="floor_area" className="form-label">Floor Area</label>
                        <input type="number" min="1" step="1" name="floor_area" id="floor_area" placeholder="Floor Area" className="form-input"
                        value = { floor_area } onChange={(e) => set_floorArea(e.target.value)} required/>
                    </div>
                </div>
                <div className="single-row">
                    <button type="submit" className="submit-listing">Submit</button>
                </div>
            </form>
        </div>
    );
}
 
export default AddListing;