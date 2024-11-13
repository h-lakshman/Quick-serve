import '../assets/styles/Home.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import 'swiper/css/effect-fade';

import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';


import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CardSection from './CardSection';
import { useSelector } from 'react-redux';

export default function Home() {
  const isLoginOpen = useSelector((state) => state.reducer.openLoginForm);
  const isSignupOpen = useSelector((state) => state.reducer.openSignUpForm);

  const services = [{
    name: 'Plumbers',
    description: 'Fixing Leaks, Building Trust',
    src: "https://static.vecteezy.com/system/resources/previews/039/896/808/large_2x/ai-generated-a-plumber-is-fixing-the-drain-in-the-bathroom-generated-by-artificial-intelligence-free-photo.jpg"

  }, {
    name: 'Home Services',
    description: 'Dial up the comfort',
    src: "https://images.pexels.com/photos/7464491/pexels-photo-7464491.jpeg"

  }, {
    name: 'Home Cleaners',
    description: 'The gift of a clean home',
    src: "https://s3-media0.fl.yelpcdn.com/educatorphoto/qCeYjXM6N03MTsfQF6LREg/o.jpg"
  }, {
    name: 'Home Tutors',
    description: 'Where Learning Meets Excellence, Right at Home!',
    src: "https://images.pexels.com/photos/5303660/pexels-photo-5303660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }, {
    name: 'Electricians',
    description: 'Powering Your Home,One Connection at a Time!',
    src: "https://images.pexels.com/photos/8853525/pexels-photo-8853525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }];

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <div>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          effect={'fade'}

          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}

          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          {services.map((service, index) =>
            <SwiperSlide >
              <div style={{
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${service.src})`,
                backgroundSize: 'cover',
                display: 'flex',
                padding: '0px 50px',

              }}>
                <div style={{
                  display: "flex", flexDirection: 'column', justifyContent: 'center',
                  alignItems: 'flex-start', height: '100%', width: '50%',
                }}>
                  <h1 style={{
                    fontFamily: "Roboto",
                    fontSize: '50px',
                    fontWeight: '900',
                    letterSpacing: '-0.8px',
                    lineHeight: '60px',
                    color: 'rgba(255,255,255, 1)',
                    marginBottom: '15px'
                  }}>
                    {service.description}
                  </h1>
                  <Button
                    sx={{
                      color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(215, 22, 22, 1)',
                      border: '1px solid transparent',
                      fontFamily: 'Poppins, Helvetica Neue, Helvetica, Arial, sans-serif',
                      fontSize: '16px',
                      width: 'fit-content',
                      fontWeight: '740',
                      lineHeight: '24px',
                      padding: '0px 5px',
                    }}>
                    <SearchIcon />
                    <p style={{ marginLeft: '5px' }}>{service.name}</p></Button>
                </div>
              </div >
            </SwiperSlide>
          )}
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
        <div style={{ top: '100vh', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: '30px',
            fontWeight: '900',
            letterSpacing: '-0.8px',
            lineHeight: '38px',
            color: 'rgba(0,0,0, 1)',
            textAlign: 'center',
            marginTop: '25px',
            zIndex: '1',
          }}>
            Categories
          </h1>
          <CardSection />
        </div>
      </div >

      {isLoginOpen ? <SignInForm /> : ""
      }
      {isSignupOpen ? <SignUpForm /> : ""}
    </>
  );
}

