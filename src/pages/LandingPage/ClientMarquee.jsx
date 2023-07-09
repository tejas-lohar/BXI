import HorizontalScrollingList from "./HorizontalScrollingList";
import ClientBox from "./ClientBox";
import ClientLogo from "../../assets/HomePageImages/GMR-01.png";
import Della from "../../assets/HomePageImages/Della-01.png";
import Dollar from "../../assets/HomePageImages/Dollar-01.png";
import Enrich from "../../assets/HomePageImages/Enrich-01.png";
import ERIS from "../../assets/HomePageImages/ERIS-01.png";
import Finch from "../../assets/HomePageImages/Finch.png";
import Flote_House from "../../assets/HomePageImages/Flote House.png";
import Foce from "../../assets/HomePageImages/foce-01.png";
import Free_Press_Journal from "../../assets/HomePageImages/Free Press Journal-01.png";
import GCPL from "../../assets/HomePageImages/GCPL-01.png";
import GMR from "../../assets/HomePageImages/GMR-01.png";
import GO_First from "../../assets/HomePageImages/GO First-01.png";
import GO_Zero from "../../assets/HomePageImages/GO Zero-01.png";
import GTPL from "../../assets/HomePageImages/GtPL-01.png";
import Thomas_Cook from "../../assets/HomePageImages/Thomas Cook-01.png";
import Indigo_Paints from "../../assets/HomePageImages/Indigo Paints-01.png";
import Jaipan from "../../assets/HomePageImages/jaipan-01.png";
import Karibo from "../../assets/HomePageImages/KAribo.png";
import Cheesiano from "../../assets/HomePageImages/Cheesiano.png";
import Cinepolis from "../../assets/HomePageImages/Cinepolis-01.png";
import Khushi from "../../assets/HomePageImages/Khushi-01.png";
import LimeLight from "../../assets/HomePageImages/LimeLight.png";
import Bombay_Shaving from "../../assets/HomePageImages/Bombay Shaving.png";
const clients = [
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Dollar-01.png",
  },
  // { image: "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Dollar-01.png" },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Enrich-01.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/ERIS-01.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Finch.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Flote+House.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/foce-01.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Free+Press+Journal-01.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/GCPL-01.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/GMR-01.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/GO+Zero-01.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/GTPL.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Thomas+Cook-01.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Indigo+Paints-01.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/jaipan-01.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/KAribo.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Khushi-01.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/LimeLight.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Bombay+Shaving.png",
  },
  {
    image:
      "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/GO+First-01.png",
  },
];

const RandomFirstList = [...clients].sort(() => Math.random() - 0.6);
const RandomSecondList = [...clients].sort(() => Math.random() - 0.6);
const RandomThirdList = [...clients].sort(() => Math.random() - 0.6);

const ClientMarquee = (props) => {
  return (
    <HorizontalScrollingList fromRight sx={{ mt: 1 }}>
      {clients.map((client, idx) => {
        return (
          <ClientBox
            key={idx}
            image={client.image}
            directions={props.directions}
          />
        );
      })}
    </HorizontalScrollingList>
  );
};

export default ClientMarquee;
