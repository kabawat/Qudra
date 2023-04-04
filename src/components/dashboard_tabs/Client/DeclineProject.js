import React, { useState, useEffect, useContext } from "react";
import Global from "../../../context/Global";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Footer";
import { HeaderDashboard } from "../../Header";
import ClientDashboardAside from "../../ClientDashboardAside";
import Loader from "../../Loader";
import { useCookies } from "react-cookie";
import { BsSearch } from "react-icons/bs";


const DeclineProject = () => {
    const navigate = useNavigate();
    const [ cookies ] = useCookies()
    const contextData = useContext( Global );
    const [ completedProject, setCompletedProject ] = useState( [] );
    const [ noResult, setNoResult ] = useState( false );
    const [ searchActiveProject, setSearchActiveProject ] = useState();
    const [ completedProjectPageId, setCompletedProjectPageId ] = useState( {
        page: 1,
        page_size: 5,
    } );

    const [ isRender, setIsReander ] = useState( false )
    useEffect( () => {
        if ( cookies?.user_data ) {
            if ( cookies?.user_data?.category_selected ) {
                if ( cookies?.user_data?.role === "client" ) {
                    setIsReander( true )
                } else {
                    navigate( '/professionaldashboard' )
                }
            } else {
                if ( cookies?.user_data?.role === "client" ) {
                    navigate( '/client-architechture' )
                } else {
                    navigate( '/categoryArchitecture' )
                }
            }
        } else {
            navigate( '/select-sign-in' )
        }
    }, [] )

    useEffect( () => {
        axios
            .post( "http://13.52.16.160:8082/identity/filter_projects", {
                user_id: cookies?.user_data?.user_id,
                user_token: cookies?.user_data?.user_token,
                role: cookies?.user_data?.role,
                project_status: "declined",
                ...completedProjectPageId,
            } )
            .then( ( res ) => {
                if ( res?.data?.status === "Success" ) {
                    setCompletedProject( res?.data?.data );
                }
            } );
    }, [] );

    const completedProjectArray = [];
    for (
        let i = 0;
        i < completedProject?.total_data / completedProjectPageId?.page_size;
        i++
    ) {
        completedProjectArray.push( i + 1 );
    }
    const handleProjectNameClick = ( client_id, project_id ) => {
        axios
            .post( "http://13.52.16.160:8082/client/particular_project_milestones", {
                user_token: cookies?.user_data?.user_token,
                role: cookies?.user_data?.role,
                client_id: cookies?.user_data?.user_id,
                project_id: project_id,
            } )
            .then( ( res ) => {
                if ( res?.data?.status === "Success" ) {
                    navigate( "/project-details", {
                        state: { isFromDashboard: true, milesStoneData: res?.data?.data },
                    } );
                }
            } );
    };
    const handleFilterProject = ( e ) => {
        e.preventDefault()
        axios.post( "http://13.52.16.160:8082/identity/search_projects", {
            user_id: cookies?.user_data?.user_id,
            user_token: cookies?.user_data?.user_token,
            role: cookies?.user_data?.role,
            search_status: "declined",
            search: searchActiveProject || "",
            ...completedProjectPageId,
        } ).then( ( res ) => {
            if ( res?.data?.status === "Failed" ) {
                setNoResult( true )

            } else {
                setCompletedProject( res?.data?.data );
            }
        } );
    };
    const searchData = () => {
        axios
            .post( "http://13.52.16.160:8082/identity/filter_projects", {
                user_id: cookies?.user_data?.user_id,
                user_token: cookies?.user_data?.user_token,
                role: cookies?.user_data?.role,
                project_status: "declined",
                ...completedProjectPageId,
            } )
            .then( ( res ) => {
                if ( res?.data?.status === "Success" ) {
                    setCompletedProject( res?.data?.data );
                }
            } );
    }
    return (
        <>
            <div className="dashboard">
                <div className="container-fluid h-100">
                    <div className="row h-100 dashboard-theme-color">
                        <div className="col-xxl-2 col-md-3 px-0 dashboard-theme-color">
                            <ClientDashboardAside />
                        </div>
                        <div className="col-xxl-10 col-md-9 custom-border-radius-one dashboard-theme-skyblue px-0 dashboard-right-section">
                            <HeaderDashboard />
                            {
                                isRender ? (
                                    <main className="dashboard-main">
                                        <div id="myactivity" className="container-fluid  myProjectTable">
                                            <h2 className="ps-5">Declined Projects</h2>

                                            <div className="m-5 shadow">
                                                { completedProject?.final_data?.length ? (
                                                    <div className="row align-items-center MyProjectDisplayRow">
                                                        <div className="searchActiveProject col-8 ms-auto">
                                                            <form onSubmit={ handleFilterProject } >
                                                                <input
                                                                    type="text"
                                                                    value={ searchActiveProject }
                                                                    onChange={ ( e ) => {
                                                                        setSearchActiveProject( e?.target?.value )
                                                                        setNoResult( false );
                                                                        if ( e.target.value === "" ) {
                                                                            searchData()
                                                                        }
                                                                    } }
                                                                    placeholder="Search..."
                                                                />
                                                                <button type="submit">
                                                                    <BsSearch />
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={ { minHeight: "600px" } }
                                                        className="d-flex justify-content-center align-items-center"
                                                    >
                                                        <span className="h4">No Project Data To Show</span>
                                                    </div>
                                                ) }
                                                { noResult ? (
                                                    <div
                                                        style={ { minHeight: "600px" } }
                                                        className="d-flex justify-content-center "
                                                    >
                                                        <span className="h4">No Result Found</span>
                                                    </div>
                                                ) : ( completedProject?.final_data?.length ? (
                                                    completedProject?.final_data.map( ( res, index ) => (
                                                        <div className="row MyProjectDisplayRow" key={ index }>
                                                            <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                                                                <img
                                                                    onClick={ () => {
                                                                        navigate( `/professionalprofile/${ res?.professional_id }` );
                                                                    } }
                                                                    src={ res?.professional_image }
                                                                    className="img-fluid rounded-circle"
                                                                    style={ { width: "70px", height: "70px", cursor: "pointer" } }
                                                                    alt={ res?.professional_name }
                                                                />
                                                                <div className="ps-3">
                                                                    <h4
                                                                        className="underline_hover"
                                                                        onClick={ () => {
                                                                            navigate(
                                                                                `/professionalprofile/${ res?.professional_id }`
                                                                            );
                                                                        } }
                                                                    >
                                                                        { res?.professional_name }
                                                                    </h4>
                                                                    <h6>
                                                                        <CiLocationOn />
                                                                        { res?.location }
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                                                <div>
                                                                    <h5>Project Name</h5>
                                                                    <h4>{ res?.project_name }</h4>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-6 ">
                                                                <div className="row">
                                                                    <div className="col-md d-flex flex-column align-items-center justify-content-center">
                                                                        <div>
                                                                            <h5>Status</h5>
                                                                            <h4>{ res?.project_status }</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md d-flex flex-column align-items-center justify-content-center">
                                                                        <div>
                                                                            <h5>Total Budget</h5>
                                                                            <h4>${ res?.project_cost }</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                                                <div>
                                                                    <h5>Area</h5>
                                                                    <h4>{ res?.area } square meter</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) )
                                                ) : (
                                                    <div
                                                        style={ { minHeight: "600px" } }
                                                        className="d-flex justify-content-center align-items-center"
                                                    >
                                                        <span className="h4">No Declined Projects To Show</span>
                                                    </div>
                                                ) ) }
                                            </div>
                                            { completedProject?.final_data?.length ? (
                                                completedProject?.final_data?.length >5 ?
                                             (   <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                                                    <Pagination.First
                                                        onClick={ () => {
                                                            setCompletedProjectPageId( {
                                                                page: 1,
                                                                page_size: 5,
                                                            } );
                                                        } }
                                                    />
                                                    <Pagination.Prev
                                                        onClick={ () => {
                                                            setCompletedProjectPageId( ( prev ) => ( {
                                                                ...prev,
                                                                page:
                                                                    completedProjectPageId?.page !== 1
                                                                        ? completedProjectPageId?.page - 1
                                                                        : 1,
                                                            } ) );
                                                        } }
                                                    />
                                                    { completedProjectArray?.map( ( res, key ) => (
                                                        <Pagination.Item
                                                            key={ key }
                                                            active={ completedProjectPageId?.page === res }
                                                            onClick={ () => {
                                                                setCompletedProjectPageId( ( prev ) => ( {
                                                                    ...prev,
                                                                    page: res,
                                                                } ) );
                                                            } }
                                                        >
                                                            { res }
                                                        </Pagination.Item>
                                                    ) ) }
                                                    <Pagination.Next
                                                        onClick={ () => {
                                                            setCompletedProjectPageId( ( prev ) => ( {
                                                                ...prev,
                                                                page:
                                                                    completedProjectArray?.length !==
                                                                        completedProjectPageId?.page
                                                                        ? completedProjectPageId?.page + 1
                                                                        : completedProjectPageId?.page,
                                                            } ) );
                                                        } }
                                                    />
                                                    <Pagination.Last
                                                        onClick={ () => {
                                                            setCompletedProjectPageId( ( prev ) => ( {
                                                                ...prev,
                                                                page: completedProjectArray?.length,
                                                            } ) );
                                                        } }
                                                    />
                                                </Pagination>) :null
                                            ) : (
                                                ""
                                            ) }
                                        </div>
                                        <ToastContainer
                                            position="top-center"
                                            autoClose={ 3000 }
                                            hideProgressBar={ true }
                                            newestOnTop={ false }
                                            closeOnClick
                                            rtl={ false }
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                            theme="colored"
                                            toastStyle={ { backgroundColor: "red", color: "white" } }
                                        />
                                    </main>
                                ) : <Loader />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default React.memo( DeclineProject );
