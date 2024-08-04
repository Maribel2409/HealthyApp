import { FaFish } from "react-icons/fa6";
import { GiPotato } from "react-icons/gi";
import { PiAvocado } from "react-icons/pi";
import { TbCheese } from "react-icons/tb";
import { GiSteak } from "react-icons/gi";
import { TbEggs } from "react-icons/tb";
import { GiCannedFish } from "react-icons/gi";
import { GiNoodles } from "react-icons/gi";
//import { GiSlicedBread } from "react-icons/gi";
import { GiGrain } from "react-icons/gi";
import { GiAlmond } from "react-icons/gi";
import { GiOlive } from "react-icons/gi";
import { GiChocolateBar } from "react-icons/gi";
import { LuSalad } from "react-icons/lu";
import { GiTomato } from "react-icons/gi";
import { LuCarrot } from "react-icons/lu";
import { GiAubergine } from "react-icons/gi";
import { SiCucumber } from "react-icons/si";

export const INGREDIENTS_VALUES = [
  {
    text: "Pollo",
    value: "pollo",
    icon: "fa-drumstick-bite",
  },
  {
    text: "Pescado",
    value: "pescado",
    iconComponent: FaFish,
  },

  {
    text: "Cerdo",
    value: "cerdo",
    iconComponent: GiSteak,
  },
  {
    text: "Atun",
    value: "atun",
    iconComponent: GiCannedFish,
  },
  {
    text: "Huevos",
    value: "huevo",
    iconComponent: TbEggs,
  },
  {
    text: "Arroz",
    value: "arroz",
    icon: "fa-bowl-rice",
  },
  {
    text: "Patata",
    value: "patata",
    iconComponent: GiPotato,
  },
  {
    text: "Pasta",
    value: "pasta",
    iconComponent: GiNoodles,
  },
  // {
  //   text: "Pan",
  //   value: "pan",
  //   iconComponent: GiSlicedBread,
  // },
  {
    text: "Cereales",
    value: "cereales",
    iconComponent: GiGrain,
  },

  {
    text: "Aguacate",
    value: "aguacate",
    iconComponent: PiAvocado,
  },
  {
    text: "Queso",
    value: "queso",
    iconComponent: TbCheese,
  },
  {
    text: "Almendras",
    value: "almendras",
    iconComponent: GiAlmond,
  },
  {
    text: "Aceitunas",
    value: "aceitunas",
    iconComponent: GiOlive,
  },
  {
    text: "Chocolate",
    value: "chocolate",
    iconComponent: GiChocolateBar,
  },
  {
    text: "Lechuga",
    value: "lechuga",
    iconComponent: LuSalad,
  },
  {
    text: "Tomate",
    value: "tomate",
    iconComponent: GiTomato,
  },
  {
    text: "Zanahoria",
    value: "zanahoria",
    iconComponent: LuCarrot,
  },
  {
    text: "Berenjena",
    value: "berenjena",
    iconComponent: GiAubergine,
  },
  {
    text: "Pepino",
    value: "pepino",
    iconComponent: SiCucumber,
  },
];
