const HouseList = ({ listing }) => {
    return ( 
        <div className="house-list">
            {listing.map((list) => (
                <div className="listing-preview" key={list.post_id}>
                    <div className="featured-image">
                        <img src={ list.featured_image } alt={ list.post_title } />
                    </div>
                    <div className="listing-info">
                        <h3>{ list.post_title }</h3>
                        <p>
                            Location: { 
                                list.city !== null ? 
                                (list.city !== '' ? list.city + ', ' + list.province : list.province) :
                                list.province
                            }
                        </p>
                        <p>
                            Floor Area: { list.floor_area } m<sup>2</sup>
                        </p>
                        <p>
                            Land Size: { list.land_size } m<sup>2</sup>
                        </p>
                        <p>
                            Price: ₱ { Number(list.price).toLocaleString(navigator.language, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }) }
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default HouseList;