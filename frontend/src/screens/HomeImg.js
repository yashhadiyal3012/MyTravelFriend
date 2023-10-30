import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../img/travel.jpg";
import img2 from "../img/goa.jpg";
import img3 from "../img/taj.jpg";
import img4 from "../img/jaipur.jpg";
import img5 from "../img/kerala.jpg";
import img6 from "../img/madurai.jpg";
import img7 from "../img/delhi.jpg";
import img8 from "../img/ooty.jpg";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the index to show the next image
      setIndex((prevIndex) => (prevIndex + 1) % 8); // Assuming you have 8 images
    }, 4000); // Change image every 5 seconds (5000 milliseconds)

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <div style={{ margin: "150px 0px 0px 0px" }}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img src={img1} alt="travel.jpg" />
          <Carousel.Caption>
            <h3>Ladakh</h3>
            <p className='homeimg-content'>“If you love mountains, you will never get bored, because there is always a new mountain to explore.”</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img2} alt="goa.jpg" />
          <Carousel.Caption>
            <h3>Goa , India</h3>
            <p className='homeimg-content'>"Holiday Packages in Goa for an Ideal Family Vacation"</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img3} alt="taj.jpg" />
          <Carousel.Caption>
            <h3>Taj Mahal , India</h3>
            <p className='homeimg-content'>
              “Hanging out in Agra, capturing some beautiful architecture around the city. Taj Mahal.”
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img4} alt="jaipur.jpg" />
          <Carousel.Caption>
            <h3>Jaipur , India</h3>
            <p className='homeimg-content'>
              “Jaipur is the finest jewelry ever created on earth, where king was the jeweler and bricks his gems.”
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img5} alt="kerala.jpg" />
          <Carousel.Caption>
            <h3>Alleppey , kerala</h3>
            <p className='homeimg-content'>
              “After all there is a reason why Kerala is called God's own country. From the backwaters of Kumarakom and Alleppey”
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img6} alt="madurai.jpg" />
          <Carousel.Caption>
            <h3>Madurai , Tamilnadu</h3>
            <p className='homeimg-content'>
              “ Madurai Meenakshi Temple is an architectural wonder. When one climbs to the top of the South Tower to have a bird's eye view of Madurai”
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img7} alt="delhi.jpg" />
          <Carousel.Caption>
            <h3>Delhi , India</h3>
            <p className='homeimg-content'>
              “Delhi is a city of surprises, a city where the old and the new coexist in a strange harmony.”
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img8} alt="ooty.jpg" />
          <Carousel.Caption>
            <h3>Ooty , Tamilnadu </h3>
            <p className='homeimg-content'>
              “Ooty is one of the country's most beautiful and culturally rich cities.”
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
