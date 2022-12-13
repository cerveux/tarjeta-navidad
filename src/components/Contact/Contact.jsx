import { useState } from "react";
import "./contact.css";
import emailjs from '@emailjs/browser';
import Modal from "../Modal/Modal";
import { BoolHook } from "../../hooks/BoolHook"
import papaNoel from "../../assets/santa.webp"

function Contact() {

    const idioma = false;

    const [isOpenMail, openModalMail] = BoolHook(false);
    const [isOpenError, openModalError] = BoolHook(false);


    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_cerveux', 'template_cerveux', e.target, '3QYdxORYCSZdMVVqX')
            .then((result) => {
                console.log(result.text);
                openModalMail();
            }, (error) => {
                console.log(error.text);
                openModalError();
            });

        setMailito({
            name: "",
            email: "",
            subject: "",
            message: ""
        })


        
    };

    const underline = `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), linear-gradient(to left, rgba(0, 0, 0, 0), red, rgba(0, 0, 0, 0)),linear-gradient(to left, rgba(0, 0, 0, 0), red, rgba(0, 0, 0, 0))`;


    const [mailito, setMailito] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });;

    function updateMessage(event) {
        const { name, value } = event.target;
        setMailito({
            ...mailito,
            [name]: value
        })

    }
    return (
        <section className="contacto" id="contact" >
            <div className="container text-center contacto-container" style={{maxWidth: "24em"}}>
            



                <div className="card" style={{borderColor: "green"}}>
                <img src={papaNoel} className="card-img-top" alt="..." />
                
                        
                    <div className="col-10 inter contato-texto d-flex flex-column w-100">
                    <h6 className="contacto-parrafo mt-5">Vamos a escribir la carta para Papá Noel</h6>
                        <h4 className="titulo-contacto" >Papá Noel yo quiero de regalo:</h4>
                        
                    </div>

                    <div className="col-11 ms-auto me-auto mb-5">






                        <form onSubmit={sendEmail} autoComplete="off" className="inter" >

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control  input-styles"
                                    name="name" id="floatingName"
                                    placeholder="Name"
                                    style={{ background: underline }}
                                    onChange={updateMessage}
                                    value={mailito.name}
                                    required
                                />
                                <label htmlFor="floatingName">Nombre</label>
                            </div>

                            <div className="form-floating mb-3">

                                <textarea
                                    className="form-control input-styles"
                                    id="floatingMessage"
                                    rows="3"
                                    placeholder="Message"
                                    name="message"
                                    style={{ height: '150px', resize: "none", background: underline }}
                                    onChange={updateMessage}
                                    value={mailito.message}
                                />
                                <label htmlFor="floatingMessage">{idioma ? "Message" : "Mensaje"}</label>
                            </div>

                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-lg botton-submit"  style={{ borderColor: "green" }} >Ho Ho Ho!!!</button>
                            </div>
                        </form>



                    </div>

                </div>
            </div>



            <Modal isOpen={isOpenMail} closeModal={openModalMail} >
                <div className="card text-center inter" >
                    <div className="card-body ">
                        <h5 className="card-title">
                            <div className="wrapper">
                                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                </svg>
                            </div>
                        </h5>
                        <h6 className="card-subtitle mb-3" /* style={{ color: color.titulo }} */  >Gracias por la cartita!!!</h6>
                        <p className="card-text" /* style={{ color: color.texto }} */>Esperemos que los elfos terminen a tiempo!!!</p>
                        <p className="card-text" /* style={{ color: color.texto }} */>Ho Ho Ho</p>
                        <div className="d-grid gap-2">
                            <button className="btn" onClick={() => openModalMail()} >Cerrar</button>
                        </div>

                    </div>
                </div>
            </Modal>

            <Modal isOpen={isOpenError} closeModal={openModalError}  >
                <div className="card text-center inter" >
                    <div className="card-body ">
                        <h5 className="card-title">
                            <div className="wrapper">                                
                                <div className="wrapper-wrong">
                                    <img className="cog" src={require("../../assets/cog.png")} alt="" />
                                </div>
                            </div>
                        </h5>
                        <h6 className="card-subtitle mb-3"  >Estamos teniendo problemas</h6>
                        <p className="card-text" >Por favor intentá de nuevo más tarde</p>
                        <div className="d-grid gap-2">
                            <button className="btn" onClick={() => openModalError()} >Cerrar</button>
                        </div>

                    </div>
                </div>
            </Modal>
        </section>
    );
}

export default Contact;