import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {Link} from 'react-router-dom'

const Card = (props) => {
  return (
    <>
      <div className="card item-card p-1 col-6 col-md-4 col-lg-3 mb-2">
    <Link to={`/item-detail/${props._id}`}>
        <img
          className="rounded card-img-top card-img "
          src={`http://localhost:5000/uploads/${props.img}`}
          alt="Title"
        />
    </Link>
        <div className="card-body d-flex flex-column">
          <b className="card-title product-name">{props.name}</b>
          <div className="d-flex justify-content-between">
            <b className="card-text price">${props.price}</b>
            <span className="item-date">
              {formatDistanceToNow(new Date(props.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
