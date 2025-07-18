import { ArrowBack } from "@/components/icons/ArrowBack";
import { ArrowForward } from "@/components/icons/ArrowForward";
import Slider from "react-slick";
import "./ListCarousel.css";
import { ItemCard } from "@/components/ui/itemCard/ItemCard";

export const ListCarousel = ({ cards = undefined }) => {
  if (!cards || !Array.isArray(cards)) return console.error(`Se necesita pasar un array para el carousel. Cada item del array debe de ser: {title: "", quantity: "", img: URL , to: URL}`);

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
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      {cards.map((card, i) => (
        <ItemCard title={card.title} quantity={card.quantity} img={card.img} to={card.to} key={i} />
      ))}
    </Slider>
  );
};
