import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-lightPink text-black py-10 px-6 border-t-4 border-darkPink">
            <div className="container mx-auto flex flex-col space-y-10 md:space-y-0 md:flex-row md:justify-between">

                <div className="flex flex-col items-center md:w-1/3 space-y-4">
                    <h1 className="font-primary text-4xl text-darkPink">Rushop</h1>
                    <p className="text-sm text-gray-600 w-2/3 text-center">
                        Redefining your style with the latest trends in fashion. Shop with confidence and elegance.
                    </p>
                </div>

                <div className="flex flex-col items-center md:w-1/3 space-y-4">
                    <h2 className="font-secondary text-lg font-bold text-black">Contact Us</h2>
                    <p className="text-sm text-gray-600">Feel free to reach out to us via:</p>
                    <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                            <FaEnvelope className="text-darkPink w-5 h-5" />
                            <span>support@rushop.com</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <FaInstagram className="text-darkPink w-5 h-5" />
                            <span>@rushop_official</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col items-center md:w-1/3 space-y-4">
                    <h2 className="font-secondary text-lg font-bold text-black">Follow Us</h2>
                    <div className="flex space-x-6">
                        <a
                            href="https://github.com/BlezZy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-darkPink hover:text-gray-600 transition-transform duration-300 hover:scale-110"
                        >
                            <FaGithub className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/jakub-fahl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-darkPink hover:text-gray-600 transition-transform duration-300 hover:scale-110"
                        >
                            <FaLinkedin className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-darkPink hover:text-gray-600 transition-transform duration-300 hover:scale-110"
                        >
                            <FaInstagram className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-darkPink pt-4 text-center text-sm text-gray-600">
                © {new Date().getFullYear()} Rushop. Style starts here.
            </div>
        </footer>
    );
}
