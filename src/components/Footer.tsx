import { motion } from "framer-motion";
import { Instagram, Mail, Phone, MapPin, Heart } from "lucide-react";
import contactData from "../data/contact.json";
import { FooterProps } from "../types";

const Footer = ({}: FooterProps): React.JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Brand Section - Left Side */}
          <motion.div
            className="text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Al Ruh Perfumes
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Crafting exceptional fragrances that capture the essence of luxury
              and elegance. Discover your signature scent with our premium
              collection.
            </p>
          </motion.div>

          {/* Contact Info - Right Side */}
          <motion.div
            className="text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>{contactData.contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>{contactData.contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>{contactData.contactInfo.address}</span>
              </div>

              {/* Instagram Link */}
              <div className="mt-4">
                <motion.a
                  href={contactData.contactInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Instagram className="w-5 h-5" />
                  <span className="text-sm">Follow us on Instagram</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}>
          <p className="text-gray-400 text-sm">
            © {currentYear} Al Ruh Perfumes. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1 mt-2 md:mt-0">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" />{" "}
            for fragrance lovers
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
