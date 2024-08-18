import React from 'react';
import locationIcon from '../assets/locationIcon.png';
import phoneIcon from '../assets/telephone.png';
import emailIcon from '../assets/email.png';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import twitter from '../assets/twitter.png';
import pinterest from '../assets/pinterest.png';
import linkedin from '../assets/linkedin.png';


const Footer = () => {
    return (
        <footer className="bg-darkblue text-white py-14 mt-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between mb-14">

                    {/* About Us Section */}
                    <div id='about-us' className="text-center md:ml-6 md:text-left mb-8 md:mb-0 md:w-1/2">
                        <h1 className="text-3xl font-bold mb-3">Prime Properties</h1>
                        <p className="text-lg">Your trusted partner in finding the perfect home.</p>
                        <p className="mt-4 text-lg">
                        At Prime Properties, we're dedicated to helping you find the perfect home at an unbeatable price. 
                        Whether you're looking to rent or buy, our wide selection of affordable houses ensures you'll find a property 
                        that fits your needs and budget.
                        </p>
                    </div>

                    {/* Contact Us Section */}
                    <div className="text-center md:text-left mb-8 md:ml-48 md:mb-0 md:w-1/2">
                        <h2 className="text-xl font-semibold mb-4 relative inline-block">
                            Contact Us
                            <span className="absolute bottom-0 left-0 w-full border-b-2 border-orange"></span>
                        </h2>
                        <div className="flex flex-col items-center md:items-start mb-4 space-y-3">
                            <div className="flex items-center space-x-3">
                                <img src={locationIcon} alt="Location" className="w-5 h-5 text-orange" />
                                <p className="text-lg">123 Housing Lane, Islamabad, Pakistan, 45000</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <img src={phoneIcon} alt="Phone" className="w-5 h-5 text-orange" />
                                <p className="text-lg">Phone: (123) 456-7890</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <img src={emailIcon} alt="Email" className="w-5 h-5 text-orange" />
                                <a href="mailto:contact@primeproperties.com" className="text-lg">Email: contact@primeproperties.com</a>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex justify-center md:justify-start space-x-4 mb-6">
                            <a href="#" className="hover:opacity-75 hover:text-orange transition-colors">
                                <img src={facebook} alt="Facebook" className="w-7 h-7" />
                            </a>
                            <a href="#" className="hover:opacity-75 hover:text-orange transition-colors">
                                <img src={instagram} alt="Instagram" className="w-7 h-7" />
                            </a>
                            <a href="#" className="hover:opacity-75 hover:text-orange transition-colors">
                                <img src={twitter} alt="Twitter" className="w-7 h-7" />
                            </a>
                            <a href="#" className="hover:opacity-75 hover:text-orange transition-colors">
                                <img src={pinterest} alt="Pinterest" className="w-7 h-7" />
                            </a>
                            <a href="#" className="hover:opacity-75 hover:text-orange transition-colors">
                                <img src={linkedin} alt="LinkedIn" className="w-7 h-7" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Text */}
                <div className="text-center">
                    <p>© 2024 Prime Properties. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
