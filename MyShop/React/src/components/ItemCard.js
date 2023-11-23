import React from 'react';
import ReactDOM from 'react';

const ItemCard = ({ item }) => {
    // Adjust the URL as per your routing setup in React
    const detailsUrl = `/item/details/${item.itemId}`;

    return (
        <div className="col">
            <div>
                <a href={detailsUrl}>
                    <img src={item.imageUrl} className="card-img-top" style={{ height: '40vh', objectFit: 'cover' }} alt={item.name} />
                </a>
                <div className="mt-2">
                    <div className="d-flex justify-content-between">
                        <p className="text-start">
                            <a href={detailsUrl}>{item.name}</a>
                        </p>
                        <p className="text-nowrap text">
                            {`${item.price} NOK per night`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
