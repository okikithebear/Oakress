import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CollectionsPage from "./Pages/CollectionsPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import PlaceOrder from "./Pages/PlaceOrder";
import Orders from "./Pages/Orders";
import Navbar from "./Components/Navbar";
import OurPolicy from "./Components/OurPolicy";
import Editorials from "./Components/Editorial";
import Footer from "./Components/Footer";
import ReadyToOrder from "./Components/ReadyToOrder";
import OakdressMuse from "./Pages/Oakress";
import Cart from "./Pages/Cart";
import Bespoke from "./Pages/Bespoke";
import TheWayOfBeauty from "./Pages/Beauty";
import ExploreNewTrends from "./Pages/Explore";
import ShippingPolicy from "./Pages/ShippingPolicy";
import ReturnRefundPolicy from "./Pages/ReturnTerms";
import TermsOfService from "./Pages/TermsService";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import SignIn from "./Pages/SignIn";
import Verify from "./Pages/Verify";
import Profile from "./Pages/ProfileUser";
import Gallery from "./Pages/Gallery";
import ScrollToTop from "./Components/ScrollToTop"; // ⬅ import this

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:ps-[9vw]">
      <Navbar />
      <ScrollToTop /> {/* ⬅ ensures each page starts from the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/muse" element={<OakdressMuse />} />
        <Route path="/beauty" element={<TheWayOfBeauty />} />
        <Route path="/trends" element={<ExploreNewTrends />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/returns" element={<ReturnRefundPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/edit" element={<Editorials />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bespoke" element={<Bespoke />} />
        <Route path="/readyorder" element={<ReadyToOrder />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <OurPolicy />
      <Footer />
    </div>
  );
};

export default App;
