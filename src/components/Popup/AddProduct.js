import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { addProductDetails } from "../Products/productSlice";

function AddProduct({ handleClose }) {
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const initalState = {
        title: "",
		description: "",
		image: "",
		ratings: "",
		review: "",
		category: "",
		price: "",
    };
    const [productData, setProductData] = useState(initalState);
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
          });
    };

    const handleSubmit = async () => {
        try {
            let payload = Object.assign({}, productData);
            console.log("ffff",payload);
            let response = await dispatch(addProductDetails(payload)).unwrap();
            if (response.data.IsSuccess) {
              toast.success(response.data.Message);
              handleClose(false);
            } else {
              toast.error(response.data.Message);
            }
          } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong.");
          }
	}

    return (
        <div className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-50'>
            <div className="max-w-[508px] w-full  m-auto bg-white rounded-3xl shadow-shadowbox p-8">
                <div className="">
                    <h3 className="text-center text-[#111827]">Add Product</h3>
                    <div className="pt-6">
                        <form className='space-y-2'>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Title</label>
                                <input type="text" name="title" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter title here' value={productData.title} onChange={changeHandler} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Description</label>
                                <input type="text" name="description" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter description'  value={productData.description} onChange={changeHandler}  />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Image Url</label>
                                <input type="text" name="image" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter image url'  value={productData.image} onChange={changeHandler} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Ratings</label>
                                <input type="text" name="ratings" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter ratings'  value={productData.ratings} onChange={changeHandler} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Reviews</label>
                                <input type="text" name="review" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter review'  value={productData.review} onChange={changeHandler} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Category</label>
                                <input type="text" name="category" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter category'  value={productData.category} onChange={changeHandler} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Price</label>
                                <input type="text" name="price" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter price'  value={productData.price} onChange={changeHandler} />
                            </div>
                            <div className="flex space-x-5">
                                <button type="button" className="btn-gray w-full" onClick={() => handleClose(false)}>Cancel</button>
                                <button type="button" className="btn-primary w-full"  onClick={handleSubmit}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct