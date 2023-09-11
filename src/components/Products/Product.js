import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductDetail } from "./productSlice";
import Modal from "../modal/Modal";
import event from "../../assets/images/credit-card.png";
import AddProduct from "../Popup/AddProduct";

const Product = () => {
  const dispatch = useDispatch();
  const [addProduct, setAddProduct] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [search, setSearch] = useState("");
  const [tpage, setTpage] = useState(0);

    let payload = {
      page:currentPage,
      limit:limit,
      search:search
    }

  const productList = async (page) => {
    try {
      const payload = {
        page,
        limit,
        search,
      };
      const response = await dispatch(getProductDetail(payload)).unwrap();
      setData(response.data.Data.docs);
      setTpage(response.data.Data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productList(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    console.log("KKKKKK");
    if (currentPage < tpage.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const pageNumbers = [];
  for (let i = 1; i <= tpage.totalPages; i++) {
    pageNumbers.push(i);
  }

  // Pagination handlers
  const changePage = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };
  const Star = ({ star }) => {
    const numberRating = Number(star);
    console.log("numberRating", numberRating);
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
      let number = index + 0.5;
      return (
        <span key={index}>
          {numberRating >= index + 1 ? (
            <i className="fa-solid fa-star"></i>
          ) : numberRating >= number ? (
            <i className="fa-regular fa-star-half-stroke"></i>
          ) : (
            <i className="fa-regular fa-star"></i>
          )}
        </span>
      );
    });
    return <div>{ratingStar}</div>;
  };
  return (
    <div >
		<div className='flex justify-between mb-1 pl-2'>
			<h2 className='block font-bold leading-[48px] text-[#0F172A]'>Products</h2>
			<button className='btn btn-primary text-[#0F172A]' onClick={() => setAddProduct(true)}>Add Product</button>
			</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-2">
        {data.map((ele) => (
          <div
            key={ele.id}
            class="group flex flex-col overflow-hidden bg-white rounded-lg shadow-md"
          >
            <a
              href="#"
              class="relative flex h-80 w-72 overflow-hidden group-hover:opacity-80"
            >
              <img
                class="absolute top-0 right-0 h-full w-full object-cover"
                src={ele.image}
                alt="product image"
              />

              <div class="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                <button class="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button class="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01
                .042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017
                3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3
                0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    />
                  </svg>
                </button>
              </div>
            </a>
            <div class="mt-4 pb-5">
              <a href="#">
                <h5 class="text-center tracking-tight text-gray-500">
                  {ele.title}
                </h5>
              </a>
              <div class="mb-5 flex justify-center">
                <p>
                  <span class="text-sm font-bold text-gray-900">
                    <Star star={ele.ratings} />
                  </span>
                  <span class="text-sm font-bold text-gray-900">
                    ${ele.price}
                  </span>
                  <span class="text-sm text-gray-400 line-through">$499</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          className="btn btn-primary text-[#0F172A] mr-2"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`btn btn-primary text-[#0F172A] mr-2 ${
              currentPage === page ? "bg-[#93abe3] text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={nextPage}
          className="btn btn-primary text-[#0F172A]"
          disabled={currentPage === data.totalPages}
        >
          Next
        </button>
      </div>
	  <Modal isOpen={addProduct}>
                 <AddProduct handleClose={setAddProduct}/>
            </Modal>
    </div>
  );
};

export default Product;
