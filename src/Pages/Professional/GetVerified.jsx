import { Form,Formik,ErrorMessage,Field } from 'formik';
import React from 'react'
import { phoneVerification } from '../../components/images'
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Header2} from '../../components/Header';
const LoginSchema = Yup.object().shape({
    phone: Yup.number().required("Required"),
    email: Yup.string().email("Please enter a valid email").required("Required"),
  });

const GetVerified = () => {

    let navigate = useNavigate();
  return (
    <>
       <div className="create-account">
    
        <Header2/>
        <main className="create-account-main">
            <div className="container">
            <Formik
              initialValues={{ email: "", phone: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                // axios.post("",values).then((res) => {
                  navigate('/professionaldashboard')

                  // if (!res.message === "success") {
                  //   navigate('/dashboard')
                  // } else {
                    
                  // }
                // });
              }}
            >
              {({ isSubmitting }) => (
                <Form  className="d-flex align-items-center justify-content-center flex-column">
                    <h1>Get Verified</h1>
                    <h3 className="py-md-4">You’re on your way to connecting with great talent!</h3>
                    <div className="row w-100">
                        <div className="col-md my-md-3 my-1">
                            <div className="create-account-input"> <Field type="email" className="form-control" id="email" placeholder="Enter Your Mail" name="email"/><i className="fa-regular fa-envelope"></i></div>
                            <ErrorMessage
                          name="email"
                          component="div"
                          className="m-2 text-danger"
                        />
                        </div>
                        <div className="col-md my-md-3 my-1">
                           
                            <div className="create-account-input"> <Field type="text" className="form-control" id="" placeholder="Phone Verification" name="phone"/><img src={phoneVerification} alt=""/></div>
                            <ErrorMessage
                          name="phone"
                          component="div"
                          className="m-2 text-danger"
                        />                       
                        </div>
                    </div>

                    <div className="d-md-flex align-items-center justify-content-center my-md-5 my-2">
                        <button type='submit' className="create-account-btn px-md-5"><span className="ps-5">Last Step</span><i className="fa-solid  fa-arrow-right-long ms-3 me-5"></i></button>
                    </div>

                </Form>
                  )}
                  </Formik>
            </div>
        </main>

    </div>
    </>
  )
}

export default GetVerified
