import Link from 'next/link';
import Image from 'next/image';
import DarkClouds from '../../assets/FooterCloud';

const Footer = () => {
    return (
        <>
        
           
       
        <footer className="bg-gray-900 text-white/90">
            
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <Image
                                src="/logo.png"
                                alt="FlightSearch Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                            <span className="text-xl font-heading text-white">FlightSearch</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your trusted partner for finding the best flight deals worldwide. Compare, book, and travel with confidence.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/search" className="text-gray-400 hover:text-white transition-colors">
                                    Search Flights
                                </Link>
                            </li>
                            <li>
                                <Link href="/deals" className="text-gray-400 hover:text-white transition-colors">
                                    Special Deals
                                </Link>
                            </li>
                            <li>
                                <Link href="/destinations" className="text-gray-400 hover:text-white transition-colors">
                                    Popular Destinations
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Subscribe to our newsletter for the latest deals and updates.
                        </p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 mt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} FlightSearch. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    );
};

export default Footer;