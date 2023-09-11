import React, { useEffect, useState } from 'react';
import { Link, useNavigate,useParams } from "react-router-dom";
import bgImage from "../../assets/images/coding.jpg"
import logo from "../../assets/images/logo.png"
import topCircle from "../../assets/images/up.png"
import bottomCircle from "../../assets/images/down.png";
import { ToastContainer, toast } from 'react-toastify';
import { newPassword } from "./authSlice";
import { useDispatch } from "react-redux";


function ResetPassword() {
	const dispatch = useDispatch()
	const parmas = useParams();
	const mobileNo = parmas.mobileNo;
	const navigate = useNavigate();
	const [pass, setPass] = useState("");
	const [cpass, setCpass] = useState("");
	const [isVisible, setIsVisible] = useState(false);

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const payload = {
			mobileNo: mobileNo,
			password: pass,
		}
		if (cpass !== pass) {
			toast.warn("confirm password and password is not matching");
			return
		}
		try {
			const response = await dispatch(newPassword(payload)).unwrap()
			if (response.data?.IsSuccess) {
				toast.success(response.data?.Message);
				setTimeout(() => {
					navigate("../login");
				}, 200);
			} else {
				toast.error(response.data?.Message);
			}
		} catch (err) {
			toast.error("Error while resetting password");
			console.log(err);
		}
	}
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
						<h1>Reset Password</h1>
						<p className="text-lg text-[#64748B] font-normal sm:pt-3.5 xl:pr-8 whitespace-nowrap">Enter your New Password</p>
						<div className="w-full pt-7 sm:pt-9">
							<form className="space-y-5">
								<div>
									<label htmlFor="" className="input-titel">Enter New Password</label>
									<input type="Password" name="password" placeholder='Enter new password' className="input_box placeholder:text-[#94A3B8] placeholder:text-base" onChange={(e) => setPass(e.target.value)} type="password" required />
								</div>
								<div className='relative align-center'>
									<label htmlFor="" className="input-titel">Confirm New Password</label>
									<input type="Password" name="password2" placeholder='Enter confirm password' className="input_box placeholder:text-[#94A3B8] placeholder:text-base" onChange={(e) => setCpass(e.target.value)} type={isVisible ? "text" : "password"}  required />
									<span className={isVisible ?
										"fa-solid fa-eye text-xl opacity-50 cursor-pointer right-3 top-1/2 transform -translate-y-1/2 mt-2 absolute" :
										"fa-solid fa-eye-slash text-xl opacity-50 cursor-pointer right-3 top-1/2 transform -translate-y-1/2 mt-2 absolute"}
										onClick={() => setIsVisible(!isVisible)}>
									</span>
								</div>
								<button type='submit' className="btn-primary w-full py-[15px] uppercase text-base leading-7 font-extrabold" onClick={onSubmitHandler}>Submit a new password</button>
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

export default ResetPassword