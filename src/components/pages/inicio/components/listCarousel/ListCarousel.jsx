import { ArrowBack } from "@/components/icons/ArrowBack";
import { ArrowForward } from "@/components/icons/ArrowForward";
import Slider from "react-slick";
import "./ListCarousel.css";
import { ItemCard } from "@/components/ui/itemCard/ItemCard";

/**
 * @param {{
 * cards?: array,
 * basePath?: URL
 * }} params
 * @returns
 */

export const ListCarousel = ({ cards = undefined, basePath = "" }) => {
  if (!cards || !Array.isArray(cards)) return console.error(`Se necesita pasar un array para el carousel. Cada item del array debe de ser: {title: "", quantity: "", imgURL: URL , to: URL}`);

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} nextArrow`} onClick={onClick}>
        <ArrowForward />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} prevArrow`} onClick={onClick}>
        <ArrowBack />
      </div>
    );
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 370,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {cards.map((card, i) => (
        <ItemCard title={card.title} quantity={card.quantity} imgURL={card.imgURL} to={`${basePath}/${encodeURIComponent(card.title)}--id${card.id}`} key={i} />
      ))}
    </Slider>
  );
};
