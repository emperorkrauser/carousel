import image1 from "../images/acoustic-guitar.jpeg";
import image2 from "../images/architectural-design.jpeg";
import image3 from "../images/balance-clothes.jpeg";

const carouselItems = [
	{
		id:1, 
    image_url: image1,
    img_description: "This is the first description",
    active: true,
	},
  {
    id:2, 
    image_url: image2,
    img_description: "This is a second description",
    active: false,
  },
  {
    id:3, 
    image_url: image3,
    img_description: "This is a third description",
    active: false,
  },
];

export default carouselItems;