import BestSeller from "../Components/BestSeller"
import Hero from "../Components/Hero"
import DesignDetails from "../Components/DesignDetails"
import LatestCollection from "../Components/LatestCollection"
import Collections from "../Components/Collections"
import Footer from "../Components/Footer"


const Home = () => {
  return (
    <div>
      
      <Hero/>
      <DesignDetails/>
      <Collections/>
      <LatestCollection/>
      <BestSeller/>
      <Footer/>
    </div>
  )
}

export default Home
