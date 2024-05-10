import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";

const AddItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: Number(0),
    phone_number: "",
    category: "",
    qty: Number(1),
    description: "",
    img: "",
  });

  const inputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const fileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      img: e.target.files[0],
    }));
  };

  const { name, price, qty, category, description, img, phone_number } =
    formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      dataToSend.append("name", name);
      dataToSend.append("price", price);
      dataToSend.append("qty", qty);
      dataToSend.append("category", category);
      dataToSend.append("phone_number", phone_number);
      dataToSend.append("description", description);
      dataToSend.append("img", img);
      const res = await fetch("/api/items", {
        method: "POST",
        body: dataToSend,
      });
      const jsonData = await res.json();

      if (!res.ok) {
        toast.error(jsonData.message);
        return;
      }

      toast.success(jsonData.message);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container">
      <Link to="/dashboard" className="btn btn-sm btn-secondary mt-3">
        Go Back
      </Link>
      <div className="container align-items-center d-flex flex-column mt-5">
        <form
          onSubmit={handleSubmit}
          className="user-form col-10 col-sm-8 col-lg-6"
        >
          <div className="form-group d-flex flex-column my-2">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="p-1"
              onChange={inputChange}
              value={name}
            />
          </div>

          <div className="form-group d-flex flex-column my-2">
            <label>Price</label>
            <input
              type="number"
              required
              name="price"
              className="p-1"
              onChange={inputChange}
              value={price}
            />
          </div>

          <div className="form-group d-flex flex-column my-2">
            <label>Category</label>
            <select
              className="select-form"
              value={category}
              name="category"
              onChange={inputChange}
            >
              <option></option>
              <option>electronics</option>
              <option>clothes</option>
              <option>technology</option>
              <option>vehicle</option>
            </select>
          </div>

          <div className="form-group d-flex flex-column my-2">
            <label>Qty</label>
            <input
              type="number"
              name="qty"
              className="p-1"
              required
              onChange={inputChange}
              value={qty}
            />
          </div>
          <div className="form-group d-flex flex-column my-2">
            <label>Phone Number</label>
            <input
              type="number"
              name="phone_number"
              className="p-1"
              required
              onChange={inputChange}
              value={phone_number}
            />
          </div>
          <div className="form-group d-flex flex-column my-2">
            <label>Description</label>
            <input
              type="text"
              name="description"
              className="p-1"
              onChange={inputChange}
              value={description}
            />
          </div>
          <div className="form-group d-flex flex-column my-2">
            <input type="file" className="p-1" required onChange={fileChange} />
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
