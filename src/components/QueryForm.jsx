import React, { useEffect, useState } from "react";
import ".././assets/css/QueryForm.css";
import axios from "axios";

function QueryForm() {
  const [queryData, setQueryData] = useState({
    name: "",
    email: "",
    query: "",
  });

  const SumitData = (e) => {
    e.preventDefault();
    axios
      .post("http://13.52.16.160:8082/quadra/query/", queryData)
      .then((res) => {
        console.log(res);
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
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default QueryForm;
