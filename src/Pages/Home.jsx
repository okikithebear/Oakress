import BestSeller from "../Components/BestSeller";
import Hero from "../Components/Hero";
import DesignDetails from "../Components/DesignDetails";
// import LatestCollection from "../Components/LatestCollection";
import Collections from "../Components/Collections";
import Editorials from "../Components/Editorial";

const Home = () => {
  return (
    <div>
      <Hero />
      <DesignDetails />
      <Collections />
      <Editorials />
      {/* <LatestCollection /> */}
      <BestSeller />
    </div>
  );
};

export default Home;
