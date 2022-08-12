import React, { Fragment } from "react";
import PostCarousel from "../../../components/UserComponents/PostCarousel";
import PostGallery from "../../../components/UserComponents/PostGallery";
import FeatureNews from "../../../components/UserComponents/FeatureNews";
import TrendingNews from "../../../components/UserComponents/TrendingNews";
import FollowUs from "../../../components/UserComponents/FollowUs";
import MixCarousel from "../../../components/UserComponents/MixCarousel";
import EntertainmentNews from "../../../components/UserComponents/EntertainmentNews";
import { Link } from "react-router-dom";
import BusinessNews from "../../../components/UserComponents/BusinessNews";
import UpcomingMatches from "../../../components/UserComponents/UpcomingMatches";
import CategoriesWidget from "../../../components/UserComponents/CategoriesWidget";

// images
import banner1 from "../../../assets/images/bg/banner1.png";
import banner2 from "../../../assets/images/bg/sidebar-1.png";
import business1 from "../../../assets/images/business/business1.jpg";
import business2 from "../../../assets/images/business/business2.jpg";
import business3 from "../../../assets/images/business/business3.jpg";
import enter1 from "../../../assets/images/entertrainment/enter1.jpg";
import enter2 from "../../../assets/images/entertrainment/enter2.jpg";
import enter3 from "../../../assets/images/entertrainment/enter3.jpg";
import enter4 from "../../../assets/images/entertrainment/enter4.jpg";

const entertainments = [
  {
    image: enter1,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "There may be no consoles in the future ea exec says",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
  },
  {
    image: enter2,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "There may be no consoles in the future ea exec says",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
  },
  {
    image: enter3,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "There may be no consoles in the future ea exec says",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
  },
  {
    image: enter4,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "There may be no consoles in the future ea exec says",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
  },
];

const businessNews = [
  {
    image: business1,
    category: "uiux.subash",
    date: "March 26, 2020",
    title: "Copa America: Luis Suarez from devastated US",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…",
  },
  {
    image: business2,
    category: "uiux.subash",
    date: "March 26, 2020",
    title: "Copa America: Luis Suarez from devastated US",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…",
  },
  {
    image: business3,
    category: "uiux.subash",
    date: "March 26, 2020",
    title: "Copa America: Luis Suarez from devastated US",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…",
  },
];

const HomePage = (props) => {
  return (
    <Fragment>
      <PostCarousel className="fifth_bg" />
      <PostGallery className="fifth_bg" />
      <FeatureNews />
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <TrendingNews />
          </div>
          <div className="col-md-12 col-lg-4">
            <FollowUs title="Follow Us" />
            <UpcomingMatches />
          </div>
        </div>
      </div>
      <MixCarousel className="half_bg1" />
      <div className="space-70" />
      <div className="entertrainments">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-12">
                  <div className="heading">
                    <h2 className="widget-title">Entertrainment News</h2>
                  </div>
                </div>
              </div>
              {/*CAROUSEL START*/}
              <div className="entertrainment_carousel mb30">
                <div className="entertrainment_item">
                  <div className="row justify-content-center">
                    <EntertainmentNews entertainments={entertainments} />
                  </div>
                </div>
              </div>
              {/*CAROUSEL END*/}
              <div className="banner_area mt50 mb60 xs-mt60">
                <Link to="/">
                  <img src={banner1} alt="banner1" />
                </Link>
              </div>
              <BusinessNews businessNews={businessNews} />
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <UpcomingMatches />
                </div>
                <div className="col-lg-12">
                  <CategoriesWidget />
                </div>
                <div className="col-lg-12">
                  <div className="banner2 mb30">
                    <Link to="/">
                      <img src={banner2} alt="thumb" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
    </Fragment>
  );
};

export default HomePage;
