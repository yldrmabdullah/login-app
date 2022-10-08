import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SignImg from "../SignImg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const history = useNavigate();

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    date: "",
    password: "",
  });

  const [data, setData] = useState([]);
  console.log(inpval);

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();

    const { name, email, date, password } = inpval;

    if (name === "") {
      toast.error(" Ad alanı zorunludur!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("e-posta alanı zorunludur", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error("lütfen geçerli e-posta adreslerini girin", {
        position: "top-center",
      });
    } else if (date === "") {
      toast.error("tarih alanı zorunludur", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("şifre alanı zorunludur", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error("şifre uzunluğu beşten büyük olmalı", {
        position: "top-center",
      });
    } else {
      console.log("başarıyla eklendi");
      history("/login");
      localStorage.setItem("userahmet", JSON.stringify([...data, inpval]));
    }
  };

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Kayıt Ol</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={getdata}
                  placeholder="Adınızı Giriniz"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  placeholder="Mail Adresinizi Giriniz"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control onChange={getdata} name="date" type="date" />
              </Form.Group>

              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  placeholder="Şifrenizi Giriniz"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="col-lg-6"
                onClick={addData}
                style={{ background: "rgb(67, 185, 127)" }}
                type="submit"
              >
                Kayıt Ol
              </Button>
            </Form>
            <p className="mt-3">
              Hazırda bir hesabınız var mı{" "}
              <span>
                <NavLink to="/login">Giriş Yap</NavLink>
              </span>{" "}
            </p>
          </div>
          <SignImg />
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
