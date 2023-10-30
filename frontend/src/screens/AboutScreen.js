import React from "react";
import Img from "../img/hero-banner.jpg";
const About = () => {
    return (
      <section id="about" >
        <div className="containerr">
          <h2>About Us</h2>
          <p>
            At My Travel Friend, we believe that travel is not just about visiting new places; it's about creating lasting memories, expanding horizons, and forging connections with people and cultures around the world. Our mission is to be your trusted companion on your journey to discover the wonders of the world.
          </p>
         
          <p>
            Thank you for choosing My Travel Friend as your companion in travel. We look forward to being part of your travel story and helping you create memories that will last a lifetime.
          </p>
        </div>
      </section>
    );
  };
  

  
  // Story Component
  const Story = () => {
    return (
      <section id="story">
        <div className="containerr">
          <h2>Our Story</h2>
          <p>
            Our journey began with a shared love for exploration and a burning desire to make travel more accessible, enjoyable, and meaningful for everyone. My Travel Friend was born out of our passion for discovering the beauty of the world and our dream of helping others embark on their own remarkable adventures.
          </p>
          
          <p>
            Today, My Travel Friend stands as a testament to our love for travel and our commitment to sharing its magic with the world. We're dedicated to curating the best travel content, fostering a community of adventurers, and making your travel dreams a reality. Our story continues to unfold with every journey you embark upon, and we're thrilled to be a part of it.
          </p>
        </div>
      </section>
    );
  };
  
  
  // Mission Component
  const Mission = () => {
    return (
      <section id="mission">
        <div className="containerr">
          <h2>Our Mission</h2>
          <p>
            At My Travel Friend, our mission goes beyond being just another travel website. We are passionate advocates for the transformative power of travel, and our purpose is twofold: to assist and inspire travelers in their journeys.
          </p>
          <p>
            Join us on a mission to explore, learn, and connect with the world. Let us be your travel friend, guiding you to unforgettable experiences and helping you create memories that will last a lifetime.
          </p>
        </div>
      </section>
    );
  };
  
  // Team Component
  const teamMembers = [
    {
      name: "jayesh kikani",
      role: "CEO",
      bio: "jayesh is a passionate traveler with a vision to make travel accessible to all.",
      image:Img
    },
    
    
    // Add more team members as needed
  ];
  
  const Team = () => {
    return (
      <section id="team">
        <div className="containerr">
          <h2>Meet the Team</h2>
          <div className="team-members">
            {teamMembers.map((member, index) => (
              <div className="team-member" key={index}>
                <img src={member.image} alt="travel.jpg"/>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  const App = () => {
    return (
      < div className="jk" style={{ margin: "150px 0px 0px 0px" }} >
      
        <About />
        <Story />
        <Mission />
        <Team />
        {/* Add other sections here */}
       
      </div>
    );
  };
  
  export default App;
  