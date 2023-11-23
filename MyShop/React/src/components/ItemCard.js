import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
    const formattedPrice = `${item.price} NOK per night`;
    const detailsUrl = `/item/details/${item.itemId}`;

    return (
        <div className="col">
            <div>
                <Link to={detailsUrl}>
                    <img
                        src={item.imageUrl}
                        className="card-img-top"
                        style={{ height: '40vh', objectFit: 'cover' }}
                        alt={item.name}
                    />
                </Link>
                <div className="mt-2">
                    <div className="d-flex justify-content-between">
                        <p className="text-start">
                            <Link to={detailsUrl}>{item.name}</Link>
                        </p>
                        <p className="text-nowrap text">
                            {formattedPrice}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
