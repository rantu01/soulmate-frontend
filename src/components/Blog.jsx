import { FaSearch, FaCalendarAlt, FaTags, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogPage = () => {
  // Sample blog data
  const featuredPost = {
    id: 1,
    title: "10 Tips for a Successful First Meeting with Your Match",
    excerpt: "Learn how to make a great impression and ask the right questions on your first meeting.",
    date: "May 15, 2024",
    category: "Dating Advice",
    image: "https://i.ibb.co.com/zV3G4X7Y/57582.jpg",
  };

  const blogPosts = [
    {
      id: 2,
      title: "How to Create an Attractive Matrimony Profile",
      excerpt: "Your profile is your first impression. Here’s how to make it stand out.",
      date: "April 28, 2024",
      category: "Profile Tips",
    },
    {
      id: 3,
      title: "Traditional Wedding Customs Across India",
      excerpt: "Explore beautiful rituals from different cultures.",
      date: "April 10, 2024",
      category: "Culture",
    },
    {
      id: 4,
      title: "Balancing Family Expectations in Marriage",
      excerpt: "How to navigate family pressures while choosing a partner.",
      date: "March 22, 2024",
      category: "Relationships",
    },
  ];

  const categories = [
    { name: "Dating Advice", count: 8 },
    { name: "Profile Tips", count: 5 },
    { name: "Wedding Planning", count: 3 },
    { name: "Relationships", count: 12 },
    { name: "Success Stories", count: 7 },
  ];

  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">Matrimony Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice, success stories, and wedding inspiration to guide your journey.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm rounded-full mb-4">
                  {featuredPost.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center text-gray-500 mb-6">
                  <FaCalendarAlt className="mr-2" />
                  <span>{featuredPost.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="">
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm rounded-full mb-4">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500">
                        <FaCalendarAlt className="mr-2" />
                        <span className="text-sm">{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default BlogPage;