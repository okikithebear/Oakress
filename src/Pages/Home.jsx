// import BestSeller from "../Components/BestSeller";
import Hero from "../Components/Hero";
import DesignDetails from "../Components/DesignDetails";
// import LatestCollection from "../Components/LatestCollection";
import Collections from "../Components/Collections";
import Editorials from "../Components/Editorial";
import Showcase from "../Components/Showcase";

const Home = () => {
  return (
    <div>
      <Hero />
      <DesignDetails />
      <Collections />
      <Editorials />
      {/* <LatestCollection /> */}
      {/* <BestSeller /> */}
      <Showcase />
    </div>
  );
};

export default Home;
