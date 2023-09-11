import React, { useEffect, useState } from 'react';
import { baseurl } from '../../api/baseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { changepass } from "../auth/authSlice";
import { useDispatch,useSelector } from "react-redux";

function ChangePassword({ handleClose }) {
    // const user = useSelector((state) => state.profileSlice.profileDetails);
    const profileData = JSON.parse(localStorage.getItem('Profile'));
    console.log("user",profileData);
    const dispatch = useDispatch()
	const navigate = useNavigate();
	const [oldpass, setOldpass] = useState("");
	const [pass, setPass] = useState("");
	const [cpass, setCpass] = useState("");

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const payload = {
			mobileNo: profileData.mobileNo,
            oldpassword:oldpass,
			password: pass,
		}
		if (cpass !== pass) {
			toast.warn("confirm password and password is not matching");
			return
		}
		try {
			const response = await dispatch(changepass(payload)).unwrap()
			if (response.data?.Data!=0) {
				toast.success(response.data?.Message);
                handleClose(false)
			} else {
				toast.error(response.data?.Message);
			}
		} catch (err) {
			toast.error("Error while resetting password");
			console.log(err);
		}
	}

    return (
        <div className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-50'>
            <div className="max-w-[508px] w-full  m-auto bg-white rounded-3xl shadow-shadowbox p-8">
                <div className="">
                    <h3 className="text-center text-[#111827]">Change password</h3>
                    <div className="pt-6">
                        <form className='space-y-4'>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Current Password</label>
                                <input type="password" name="old_password" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter current password'  onChange={(e) => setOldpass(e.target.value)} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">New Password</label>
                                <input type="password" name="password" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter new password'  onChange={(e) => setPass(e.target.value)}  />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className="input-titel">Confirm Password</label>
                                <input type="password" name="password2" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter confirm password'  onChange={(e) => setCpass(e.target.value)} />
                            </div>
                            <div className="flex space-x-5">
                                <button type="button" className="btn-gray w-full" onClick={() => handleClose(false)}>Cancel</button>
                                <button type="submit" className="btn-primary w-full"  onClick={onSubmitHandler}>Change</button>
                            </div>
                        </form>
                    </div>
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

export default ChangePassword