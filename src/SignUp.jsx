import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from "axios";

const SignUp = () => {
  // const {id}=useParams();

  // Taking input
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //Storing Input
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //ON Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    validation();
  };
  // Validating input
  const validation = () => {
    let t = input.email;
    let c = input.password;

    if (t === "" && c === "") {
      alert("Fields cannot be left blank");
    } else {
      if (c.length < 4) {
        alert("Min password length is 4");
      } else {
        post();
      }
    }
  };
  // Adding Data
  const post = async () => {
    let url = "http://localhost:4000/posts";
    await axios.post(url, input);
    setInput({ email: "", password: "" });
    alert("Sign Up Successful");
    await loaduser();
  };
  console.log(input);
  // Fetching Data
  const loaduser = async () => {
    let url = "http://localhost:4000/posts";
    const res = await axios.get(url);
    console.log(res.data);
  };
  // Deleting Data
  const dele = async () => {
    let url = "http://localhost:4000/posts/";
    const res = await axios.get(url);
    const r = await res.data.length;
    await axios.delete(url + r);
    setInput({ email: "", password: "" });
    const resu = await axios.get(url);
    alert("data deleted");
    console.log(resu.data);
  };
  // Edit data
  const Edit = async () => {
    let url = "http://localhost:4000/posts/";
    const res = await axios.get(url);
    const r = await res.data.length;
    const resu = await axios.get(url + r);
    setInput(resu.data);
  };

  //Push Changes
  const update = async () => {
    let url = "http://localhost:4000/posts/";
    const res = await axios.get(url);
    const r = await res.data.length;
    const resu = await axios.get(url+r);
    // setInput({ email: res.data.email, password: res.data.password });
    setInput(resu.data)
    await axios.put(url + r, input);

    alert("value updated");
    console.log(await (await axios.get(url)).data);
  };

  // Loading data for the first time
  useEffect(() => {
    loaduser();
  }, [input]);

  return (
    <div className="container">
      <div className="row ">
        <form
          className="col-8 my-5 bg-light mx-auto p-3"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={handleInput}
              value={input.email}
              name="email"
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleInput}
              value={input.password}
              name="password"
              required
            />
             <div id="passwordHelp" className="form-text">
              Minimum 4 characters required.
            </div>
          </div>
          <div className="text-center my-5">
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-warning ms-4 mt-4"
              onClick={Edit}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-success ms-4 mt-4"
              onClick={update}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger ms-4 mt-4"
              onClick={dele}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
