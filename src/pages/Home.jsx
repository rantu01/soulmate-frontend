import Banner from "../components/Banner";
import BlogPage from "../components/Blog";
import HowItWorks from "../components/HowItWorks";
import MembershipPlans from "../components/MembershipPlans";
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
      <MembershipPlans></MembershipPlans>
      <BlogPage></BlogPage>
      
    </div>
  );
};

export default Home;
