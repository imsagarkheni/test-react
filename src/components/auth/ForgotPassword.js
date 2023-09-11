import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import bgImage from "../../assets/images/coding.jpg"
import logo from "../../assets/images/logo.png"
import topCircle from "../../assets/images/up.png"
import bottomCircle from "../../assets/images/down.png";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { forgotPassword } from "./authSlice";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phoneNo, setPhoneNo] = useState("");
  const sendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      if (phoneNo.length > 0 && phoneNo.length < 11) {
        let payload = {
          mobileNo: phoneNo,
        };
        const response = await dispatch(forgotPassword(payload)).unwrap();
        console.log(response);
        if (response.data?.Data !=0) {
          toast.success(response.data?.Message);
          setTimeout(() => {
            navigate(`../verificationcode/${phoneNo}/false`);
          }, 200);
        } else {
          toast.warn(response.data?.Message);
        }
      }
    } catch (error) {
      toast.error("something Went wrong.");
      console.log(error);
    }
  };

    return (
        <div className="flex h-screen">
            <div className="flex w-full flex-wrap bg-white">
                <div className="w-full relative lg:w-1/2 flex p-[60px]">
                    <div className="">
                        <div className="absolute top-0 sm:right-20 md:right-32 sm:block hidden">
                            <img src={topCircle} alt="Top Circle Shape" />
                        </div>
                        <div className="absolute bottom-0 sm:left-20 md:left-32 sm:block hidden">
                            <img src={bottomCircle} alt="Bottom Circle Shape" />
                        </div>
                    </div>
                    <Link to='' className='absolute'><img src={logo} alt="Alt Text" width={100} height={75} /></Link>
                    <div className="max-w-md w-full m-auto">
                        <h1>Forgot Password</h1>
                        <p className="text-lg text-[#64748B] font-normal sm:pt-3.5 xl:pr-8 whitespace-nowrap">Enter your email or phone number for reset password </p>
                        <div className="w-full pt-7 sm:pt-9">
                            <form className="space-y-5">
                                <div>
                                    <label htmlFor="" className="input-titel">Email or Phone</label>
                                    <input type="text" name="text" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter your phone number' 
                                    onChange={(e) => setPhoneNo(e.target.value)} required />
                                </div>
                                <button type='submit' className="btn-primary w-full py-[15px] uppercase text-base leading-7 font-extrabold" onClick={sendVerificationCode}>Reset</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full lg:w-1/2 hidden lg:block">
                    <img src={bgImage} alt="login-bg" className="w-full h-full object-cover object-bottom" />
                </div>
            </div>
            <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
        </div>
    )
}

export default ForgotPassword