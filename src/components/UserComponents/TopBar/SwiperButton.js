import { useSwiper } from "swiper/react";

const SwiperButton = (props) => {
  const swiper = useSwiper();
  return (
    <button
      onClick={() => (props?.next ? swiper.slideNext() : swiper.slidePrev())}
      className={props.className}
    >
      {props?.icon}
    </button>
  );
};

export default SwiperButton;
