import Banner from "../components/Banner";
import HowItWorks from "../components/HowItWorks";
import PremiumCard from "../components/PremiumMembersSection";
import SuccessCounter from "../components/SuccessCounter";
import SuccessStorySection from "../components/SuccessStorySection";


const Home = () => {
  return (
    <div>
        
      <Banner />
      <PremiumCard></PremiumCard>
      <HowItWorks></HowItWorks>
      <SuccessCounter></SuccessCounter>
      <SuccessStorySection></SuccessStorySection>
      
    </div>
  );
};

export default Home;
