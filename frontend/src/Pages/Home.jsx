import React from "react";

import { NavLink } from "react-router-dom";

import "../App.css";
import Navbar from "../Components/Navbar";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import OverlapImg from "../assets/Astronaute.webp";
import BgImage from "../assets/Amoled.webp";
import image1 from "../assets/img_1.webp";
import image2 from "../assets/img_2.webp";
import image3 from "../assets/img_3.webp";

const Home = () => {
  return (
    <>
      <Navbar />
      <div id="main" className="flex flex-col gap-2 ">
        <div className="w-full flex  md:flex-row flex-col gap-5  mt-5 mb-5 ">
          <div className="w-full items-start flex flex-col gap-5 p-7  md:w-1/2 ">
            <h1 class="text-4xl font-extrabold   ">
              Unleash Your Imagination with{" "}
              <span className=" font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-400 to-blue-500 ">
                GigaArt
              </span>
            </h1>
            <p className="text-md  ">
              Discover limitless creativity with{" "}
              <span className=" font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-400 to-blue-500 ">
                GigaArt.
              </span>{" "}
              From unique designs to stunning visuals, bring your boldest ideas
              to life with just a click. Start your digital art journey today!
            </p>
            <NavLink
              to="/generate"
              className="   text-white font-bold py-2 px-4 rounded transition transform text-[15px] bg-gradient-to-r from-purple-400 via-purple-400 to-blue-500 active:scale-95"
            >
              Get Started Now
            </NavLink>
          </div>

          <div className=" items-center justify-center  md:w-1/2 w-full flex  gap-5   md:relative">
            <img
              src={OverlapImg}
              alt=""
              srcset=""
              className="absolute w-[11pc] border border-gray-700 h-[pc] rounded-2xl top-2 left-[-1pc] lg:left-12 z-[4] md:flex hidden  "
            />
            <img
              src={BgImage}
              alt=""
              srcset=""
              className=" absolute z-[-1] right-0 w-[1pc] lg:w-[15pc] lg:h-[20pc]  top-0 md:flex hidden "
            />

            <Swiper
              scrollbar={{
                hide: true,
              }}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className=" w-[20pc] h-[20pc]   mt-[4pc] static  z-1 flex     "
            >
              <SwiperSlide>
                <img src={image1} alt="" className="w-[25pc] h-[25pc]  " />
              </SwiperSlide>
              <SwiperSlide>
                <img src={image2} alt="" className="w-[25pc] h-[25pc] " />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img src={image3} alt="" className="w-[25pc] h-[25pc] " />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        {/* <div className="p-8 flex flex-col gap-5">
          <h2 className=" text-2xl font-extrabold ">Daily Generation</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-auto rounded-lg"
                  src={image1}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
