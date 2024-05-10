import Header from "../components/Header";
import { useState } from "react";
import Card from "../components/Card";
import { useEffect } from "react";
import {
  getItemStart,
  getItemSuccess,
  getItemFailure,
} from "../redux/features/itemSlice";
import Slider from "../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ReactPaginate from "react-paginate";
import Footer from "../components/Footer";

const Home = () => {
  const { isLoading, error } = useSelector((state) => state.item);
  const { category, searchParams } = useSelector((state) => state.item);

  // pagination
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const images = items.map((item) => item.img);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getItemStart());
        const res = await fetch(
          `/api/items?page=${currentPage}&category=${category}&search=${searchParams}`
        );
        const jsonData = await res.json();

        if (!res.ok) {
          dispatch(getItemFailure(jsonData.message));
          return;
        }
        dispatch(getItemSuccess(jsonData.data));
        setItems(jsonData.data);
        setPageCount(Math.ceil(jsonData.count / 10));
      } catch (err) {
        dispatch(getItemFailure(err.message));
      }
    };

    fetchData();
  }, [currentPage, category, searchParams]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <>
      {/* Header */}
      <Header />

      <div className="pt-5 slider-container">
        <Slider images={images} />
      </div>

      <main className="container my-4 d-flex p-2  flex-wrap ">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <h1>Error</h1>
        ) : (
          items && items.map((item) => <Card key={item._id} {...item} />)
        )}
      </main>

      <div className="d-flex align-items-center justify-content-center">
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>

      <Footer />
    </>
  );
};

export default Home;
