import React from 'react';
import slider1 from '../assets/images/slider/slider1.webp'
import slider2 from '../assets/images/slider/slider2.webp'
import slider3 from '../assets/images/slider/slider3.webp'
import slider4 from '../assets/images/slider/slider4.webp'
import slider5 from '../assets/images/slider/slider5.webp'
import slider6 from '../assets/images/slider/slider6.webp'
import IconButton from '../components/IconButton';
import Slider from '../components/Slider';

const sliderData = [
    { img: slider1, text: "Hosting my studio changed my life and gifted me with memorable experiences and people.", clientText: "Client in Milan" },
    { img: slider2, text: "Hosting my home allowed me to become an entrepreneur and laid down a path to financial freedom.", clientText: "Client in Atlanta" },
    { img: slider3, text: "We’re able to keep our culture alive by hosting our pasta-making experience.", clientText: "Client in Palombara Sabina" },
    { img: slider4, text: "Airbnb has allowed me to create my own job doing what I love – taking care of guests in our home.", clientText: "Client in Chiang Mai" },
    { img: slider5, text: "Hosting my Bedouin tent has introduced me to people around the world.", clientText: "Client in Wadi Rum" },
    { img: slider6, text: "I love hosting my eco-home so people can connect with nature and their loved ones.", clientText: "Client in Paraty" },
]

const MainPage = () => {

    return (
        <div className='overflow-hidden'>
            <h1 className='sm:text-6xl text-2xl text-left sm:text-center sm:pl-0 pl-6 '>Don’t trust us, <br /> trust our clients</h1>
            <Slider sliderData={sliderData} />
        </div>
    );
};

export default MainPage;