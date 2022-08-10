import React, { useState } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { mostViewSort } from "src/lib/commonFunctions";

// images
import popularsm1 from "src/assets/images/popular/popularsm1.jpg";
import popularsm2 from "src/assets/images/popular/popularsm2.jpg";
import popularsm3 from "src/assets/images/popular/popularsm3.jpg";
import popularsm4 from "src/assets/images/popular/popularsm4.jpg";
import popularsm5 from "src/assets/images/popular/popularsm5.jpg";

import "./style.scss";

const populerPOsts = [
  {
    image: popularsm1,
    category: "TECHNOLOGY",
    title: "The property complete with a 30 seat screen room.",
  },
  {
    image: popularsm2,
    category: "TECHNOLOGY",
    title: "Cheap smartphone sensor could help you old.",
  },
  {
    image: popularsm3,
    category: "TECHNOLOGY",
    title: "Harbour amid a Slowen the down in singer city",
  },
  {
    image: popularsm4,
    category: "TECHNOLOGY",
    title: "The secret to moving this from sphinx screening",
  },
  {
    image: popularsm5,
    category: "TECHNOLOGY",
    title: "Harbour amid a Slowen the down in singer city",
  },
  {
    image: popularsm1,
    category: "TECHNOLOGY",
    title: "The property complete with a 30 seat screen room.",
  },
  {
    image: popularsm2,
    category: "TECHNOLOGY",
    title: "Cheap smartphone sensor could help you old.",
  },
  {
    image: popularsm3,
    category: "TECHNOLOGY",
    title: "Harbour amid a Slowen the down in singer city",
  },
  {
    image: popularsm4,
    category: "TECHNOLOGY",
    title: "The secret to moving this from sphinx screening",
  },
  {
    image: popularsm5,
    category: "TECHNOLOGY",
    title: "Harbour amid a Slowen the down in singer city",
  },
];

const PopularPosts = () => {
  const [swiper, setSwiper] = useState(null);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  const params = {
    loops: true,
    slidesPerView: 1,
    // slidesPerColumn: 6,
  };
  return (
    <div className="popular_carousel_area mb30 md-mt-30">
      <h2 className="widget-title">Popular Posts</h2>
      <div className="popular_carousel pt-15 multipleRowCarousel nav_style1">
        {/*CAROUSEL START*/}
        <Swiper onSwiper={(swiper) => setSwiper(swiper)} {...params}>
          {mostViewSort(populerPOsts).map((item, i) => (
            <SwiperSlide
              key={i}
              className="single_post type10 widgets_small mb15"
            >
              <div className="post_img">
                <div className="img_wrap">
                  <Link to="/">
                    <img src={item.image} alt="thubm" />
                  </Link>
                </div>
                <span className="tranding tranding_border">{item.id}</span>
              </div>
              <div className="single_post_text">
                <h4>
                  <Link to="/post1">{item.title}</Link>
                </h4>
                <div className="meta4">
                  <Link to="/">{item.category}</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="navBtns">
          <div onClick={goPrev} className="navBtn prevtBtn">
            <FontAwesome name="angle-left" />
          </div>
          <div onClick={goNext} className="navBtn nextBtn">
            <FontAwesome name="angle-right" />
          </div>
        </div>
        {/*CAROUSEL END*/}
      </div>
    </div>
  );
};

export default PopularPosts;
