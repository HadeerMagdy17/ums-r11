import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

interface LoginFormInpts{
  username:string;
  password:string
}
interface authContextType{
  saveUserData:()=>void
}
export default function Login() {
let{saveUserData}=useContext(AuthContext) as authContextType;

  let navigate=useNavigate();
  
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInpts>();

  let onSubmit =async (data:LoginFormInpts) => {
    //api integration
    try {
      let response=await axios.post('https://dummyjson.com/auth/login',data)
       localStorage.setItem('userToken',response?.data?.accessToken)
       saveUserData()
        toast.success("Wow so easy!logged successfully!!!!!!!!")
       navigate('/dashboard')
    } catch (error) {
      console.log(error)
        toast.error('sorry try again !')
    }
  };

  return (
    <>
      <div className="container-fluid login-container">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white p-4 rounded">
            <div className="title text-center">
              <h3>User Management System</h3>
              <h4> SIGN IN</h4>
              <small>Enter your credentials to access your account</small>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>UserName</label>
              <input
                className="form-control my-2"
                type="text"
                placeholder="enter userName"
                {...register('username',{required:'username is required!!!!!!!!'})}
              />
      {/* //true */}
        {errors.username && <span className="text-danger">{errors.username.message}</span>}

              <label>Password</label>
              <input
                className="form-control"
                type="text"
                placeholder="enter password"
                  {...register('password',{required:'pass is required!!!!!!!!'})}
              />
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
              <div className="btn-cont text-center my-4">
                <button className="btn btn-warning text-white w-100">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
