import React, { useEffect, useState } from "react";
import ".././assets/css/QueryForm.css";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import ReactLotti3 from "../loader/ReactLottie3";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function QueryForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [queryLoader, setQueryLoader] = useState(false);
  const [queryData, setQueryData] = useState({
    name: "",
    email: "",
    query: "",
  });

  const SumitData = (e) => {
    setQueryLoader(true);
    e.preventDefault();
    axios.post(`${BaseUrl}/quadra/query/`, queryData).then((res) => {
      if (res?.data?.status == "Success") {
        setQueryLoader(false);
        setQueryData({
          name: "",
          email: "",
          query: "",
        });
        handleShow();
      } else {
        setQueryLoader(false);
      }
    });
  };

  return (
    <>
      <div class="container">
        <form id="contact" onSubmit={SumitData} method="post">
          <h3 style={{ color: "black" }}>Quick Contact</h3>

          <fieldset>
            <input
              placeholder="Your name"
              type="text"
              tabindex="1"
              required
              value={queryData.name}
              onChange={(e) => {
                setQueryData({
                  ...queryData,
                  name: e.target.value,
                });
              }}
              autofocus
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Your Email Address"
              type="email"
              value={queryData.email}
              onChange={(e) => {
                setQueryData({
                  ...queryData,
                  email: e.target.value,
                });
              }}
              tabindex="2"
              required
            />
          </fieldset>

          <fieldset>
            <textarea
              placeholder="Type your Query Here...."
              tabindex="5"
              required
              value={queryData.query}
              onChange={(e) => {
                setQueryData({
                  ...queryData,
                  query: e.target.value,
                });
              }}
            ></textarea>
          </fieldset>
          <fieldset>
            <button
              name="submit"
              type="submit"
              id="contact-submit"
              data-submit="...Sending"
              disabled={queryLoader ? true : false}
            >
              {queryLoader ? <ReactLotti3 /> : "Submit"}
            </button>
          </fieldset>
        </form>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Thank you for submitting your query!</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "#01B293", border: "none" }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QueryForm;
