import React,{useState,useEffect} from 'react';
import Modal from '../../common/Modals/Modal';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../assets/images/profile.png';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useProfileDetails, getProfileDetails,addProfileDetails } from "./profileSlice";
import ChangePassword from '../Popup/ChangePassword';

function Profile() {
    const [changePassword, setChangePassword] = useState(false);
	const initalState = {
		firstName: "",
		lastName: "",
	  };
	const [details, setDetails] = useState(initalState);
	const [profileImage, setProfileImage] = useState(null);
    const dispatch = useDispatch();
	const navigate = useNavigate();
	const getProfile = async () => {
		try {
		  let response = await dispatch(getProfileDetails()).unwrap();
		  setDetails(response.data.Data);
		} catch (error) {
		  console.log(error);
		}
	  };
	  useEffect(() => {
		getProfile();
	  }, []);
	  const changeHandler = (e) => {
		const { name, value } = e.target;
		setDetails({
		  ...details,
		  [name]: value,
		});
	  };
	  const addPersonalDetails = async () => {
		try {
		  let payload = Object.assign({}, details);
		  console.log("payload",payload);
		  let response = await dispatch(addProfileDetails(payload)).unwrap();
		  if (response.data.IsSuccess) {
			toast.success(response.data.Message);
		  } else {
			toast.error(response.data.Message);
		  }
		} catch (error) {
		  console.log(error);
		  toast.error("Something Went Wrong.");
		}
	  };
    const addProfile = async (selected) => {
		let formData = new FormData();
		formData.append("profile_pic", selected);
	}

    const photoChange = (event) => {
		const types = ["image/png", "image/jpeg", "image/jpg"];
		let selected = event.target.files[0];
		console.log(selected);
		try {
			if (selected && types.includes(selected.type)) {
				if (selected.size < 1 * 1024 * 1024) {
					setProfileImage(selected);
					addProfile(selected);
				} else {
					alert("File size is greater than 1mb");
				}
			} else {
				alert("Please select image file with jpeg/png.");
			}
		} catch (error) {
			console.log(error);
			alert("Error while selecting image")
		}
	}
    return (
        <div className="wrapper min-h-full">
            <div className="flex items-center">
            <i className="fa-solid fa-arrow-left fa-2xl"></i>
               <Link to={"/dashboard"}><button type='button' className="text-3xl font-bold text-yankeesBlue leading-8 pl-7">{details.firstName}'s Account Details</button></Link> 
            </div>
            <div className="pt-[50px]">
            <div className="flex items-center justify-center pb-[50px]">
					<div className="w-44 h-44 rounded-full border-8 border-spiroDiscoBall bg-[#E2E8F0] relative mr-9 max-[600px]:mr-0">
						<img
							src={details?.profilePic ? details.profilePic : profile}
							alt="pictures"
							className="w-full h-full object-cover rounded-full overflow-hidden"
						/>
						<div className="absolute bottom-0 right-0 flex justify-center items-center border-[2px] border-white w-10 h-10 rounded-full bg-[#E2E8F0] z-10">
							<i className="fa-solid fa-pen-to-square fa-lg flex justify-center text-center object-cover rounded-full p-1"></i>
							<input
								type="file"
								onChange={photoChange}
								className="opacity-0 absolute inset-0"
							/>
						</div>
					</div>
				</div>
                <form className="w-full flex items-center justify-between">
                    <div className="w-full">
                        <div className="w-full flex space-x-6 mb-7">
                            <div className='w-1/2'>
                                <label htmlFor="" className="input-title2">First name</label>
                                <input type="text" name="firstName" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base" onChange={changeHandler} value={details?.firstName} placeholder='' />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="" className="input-title2">Last name</label>
                                <input type="text" name="lastName" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base" onChange={changeHandler} value={details?.lastName} placeholder='' />
                            </div>
                        </div>
                        <div className="w-full flex space-x-6 mb-7">
                            <div className='w-1/2'>
                                <label htmlFor="" className="input-title2">Email</label>
                                <input type="email" name="" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base" value={details?.email} placeholder='' disabled />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="" className="input-title2">Phone number</label>
                                <input type="tel" name="" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base" value={details?.mobileNo} placeholder='' disabled />
                            </div>
                        </div>
                        <div className="w-full flex space-x-6 mb-7">
                            <div className='w-1/2'>
                                <label htmlFor="" className="input-title2">Password</label>
                                <div className="relative">
                                    <input type="password" name="" className="relative input_box2 placeholder:text-[#94A3B8] placeholder:text-base" placeholder='**** **** ****' disabled />
                                    <span onClick={() => setChangePassword(true)} className='absolute right-6 top-1/2 -translate-y-1/2 text-[#29A073] text-base font-extrabold cursor-pointer'>Change password</span>
                                </div>
                            </div>
							<div className='w-1/2'>
                                <label htmlFor="" className="input-title2">My Refer Code</label>
                                <input type="text" name="" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base" value={details?.referCode} placeholder='' disabled />
                            </div>
                        </div>
						<div className='className="w-full flex justify-end space-x-6 mb-7'>
						<button className="btn-primary small mr-3"
              				onClick={() => {
                			addPersonalDetails()}}>Save Profile	</button>
					</div>
                    </div>
					
                </form>
            </div>
            <Modal isOpen={changePassword}>
                <ChangePassword handleClose={setChangePassword}/>
            </Modal>
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

export default Profile;