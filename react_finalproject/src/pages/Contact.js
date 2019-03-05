import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';

class Contact extends Component {
  render() {
    return (
        <div>
            <div id="contact-page" className="container">
                <div className="bg">
                    <div className="row">    		
                        <div className="col-sm-12">    			   			
                            <h2 className="title text-center">Contact <strong>Us</strong></h2>    			    				    				
                            <div id="gmap" className="contact-map card-body">
                                <center>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d15865.686289292014!2d106.82014720693358!3d-6.207993834535513!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1544192597655" width="600" height="450" frameborder="0" style={{border: "0"}} allowfullscreen></iframe>
                                </center>
                            </div>
                        </div>			 		
                    </div>  
                    <br/><br/>  	
                    <div className="row">  	
                        <div className="col-sm-8">
                            <div className="contact-form">
                                <h2 className="title text-center">Get In Touch</h2>
                                <div className="status alert alert-success" style={{display: "none"}}></div>
                                <form id="main-contact-form" className="contact-form row" name="contact-form" method="post">
                                    <div className="form-group col-md-6">
                                        <input type="text" name="name" className="form-control" required="required" placeholder="Name"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input type="email" name="email" className="form-control" required="required" placeholder="Email"/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <input type="text" name="subject" className="form-control" required="required" placeholder="Subject"/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <textarea name="message" id="message" required="required" className="form-control" rows="8" placeholder="Your Message Here"></textarea>
                                    </div>                        
                                    <div className="form-group col-md-12">
                                        <input type="submit" name="submit" className="btn btn-primary pull-right" value="Submit"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="contact-info">
                                <h2 className="title text-center">Contact Info</h2>
                                <address>
                                    <p>GET-Myu Inc.</p>
                                    <p>Menara Raftel, Sudirman</p>
                                    <p>Jakarta Pusat, DKI Jakarta</p>
                                    <p>Mobile: +62 856 9763 2371</p>
                                    <p>Fax: 1-714-252-0026</p>
                                    <p>Email: info@getmyu.com</p>
                                </address>
                                <div className="social-networks">
                                    <h2 className="title text-center">Social Networking</h2>
                                    <ul>
                                        <li>
                                            <a href="#"><i className="fa fa-facebook"></i></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-twitter"></i></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-google-plus"></i></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-youtube"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>    			
                    </div>  
                </div>	
            </div>{/*/#contact-page*/}
        </div>
    );
  }
}

export default Contact;