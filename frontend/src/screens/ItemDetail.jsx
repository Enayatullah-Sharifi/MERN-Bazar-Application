import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/items/single/${id}`);
      const jsonData = await res.json();
      setItem(jsonData.data);
    };
    fetchItem();
  }, [id]);
  return (
    <div className="container my-5">
      <Link to=".." className="btn btn-secondary btn-sm my-4">
        Go back
      </Link>

      <div className="container gap-3 d-flex p-4 detail-container">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 img-container ">
          <img className="detail-img" src={`http://localhost:5000/uploads/${item.img}`} alt="" />
        </div>
        <div className="col-12 col-md-6 col-sm-12 col-lg-6">
          <ul className="list-group gap-2">
            <li className="list-group-item">
              <span className="fw-bold">Name - </span>
              {item.name}
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Price - </span>
              {item.price}
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Categpry - </span>
              {item.category}
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Quantity - </span>
              {item.qty}
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Description - </span>
              {item.description}
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Phone Number - </span>
              {item.phone_number}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
