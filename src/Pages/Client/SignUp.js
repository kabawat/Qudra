import React, { useEffect, useState, useContext } from "react";
import { Header2 } from "../../components/Header";
import * as Yup from "yup";
import CountrySelect from "react-bootstrap-country-select";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import axios from "axios";
import $ from "jquery";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FacebookProvider, LoginButton } from "react-facebook";
import GoogleLogin from "react-google-login";
import AppleLogin from "react-apple-login";
import CountryDropdown from "country-dropdown-with-flags-for-react";
import Global from "../../context/Global";
import ReactLotti from "../../loader/ReactLotti";
import { useCookies } from "react-cookie";

const countries = [
  {
    id: 1,
    name: "Albania",
    flag: "AL",
    alpha2: "AL",
    alpha3: "ALB",
    ioc: "ALB",
  },

  {
    id: 2,
    name: "Algeria",
    flag: "DZ",
    alpha2: "DZ",
    alpha3: "DZA",
    ioc: "DZA",
  },

  {
    id: 3,
    name: "Angola",
    flag: "AO",
    alpha2: "AO",
    alpha3: "AGO",
    ioc: "AGO",
  },

  {
    id: 4,
    name: "Antigua & Barbuda",
    flag: "AG",
    alpha2: "AG",
    alpha3: "ATG",
    ioc: "ANT",
  },

  {
    id: 5,
    name: "Argentina",
    flag: "AR",
    alpha2: "AR",
    alpha3: "ARG",
    ioc: "ARG",
  },

  {
    id: 6,
    name: "Armenia",
    flag: "AM",
    alpha2: "AM",
    alpha3: "ARM",
    ioc: "ARM",
  },

  {
    id: 7,
    name: "Australia",
    flag: "AU",
    alpha2: "AU",
    alpha3: "AUS",
    ioc: "AUS",
  },

  {
    id: 8,
    name: "Austria",
    flag: "AT",
    alpha2: "AT",
    alpha3: "AUT",
    ioc: "AUT",
  },

  {
    id: 9,
    name: "Azerbaijan",
    flag: "AZ",
    alpha2: "AZ",
    alpha3: "AZE",
    ioc: "AZE",
  },

  {
    id: 10,
    name: "Bahamas",
    flag: "BS",
    alpha2: "BS",
    alpha3: "BHS",
    ioc: "BHS",
  },

  {
    id: 11,
    name: "Bahrain",
    flag: "BH",
    alpha2: "BH",
    alpha3: "BHR",
    ioc: "BHR",
  },

  {
    id: 12,
    name: "Bangladesh",
    flag: "BD",
    alpha2: "BD",
    alpha3: "BGD",
    ioc: "BGD",
  },

  {
    id: 13,
    name: "Belgium",
    flag: "BE",
    alpha2: "BE",
    alpha3: "BEL",
    ioc: "BEL",
  },

  {
    id: 14,
    name: "Benin",
    flag: "BJ",
    alpha2: "BJ",
    alpha3: "BEN",
    ioc: "BEN",
  },

  {
    id: 15,
    name: "Bhutan",
    flag: "BT",
    alpha2: "BT",
    alpha3: "B  TN",
    ioc: "BTN",
  },

  {
    id: 16,
    name: "Bolivia",
    flag: "BO",
    alpha2: "BO",
    alpha3: "BOL",
    ioc: "BOL",
  },

  {
    id: 17,
    name: "Bosnia & Herzegovina",
    flag: "BA",
    alpha2: "BA",
    alpha3: "BIH",
    ioc: "BIH",
  },

  {
    id: 18,
    name: "Botswana",
    flag: "BW",
    alpha2: "BW",
    alpha3: "BWA",
    ioc: "BWA",
  },

  {
    id: 19,
    name: "Brunei",
    flag: "BN",
    alpha2: "BN",
    alpha3: "BRN",
    ioc: "BRU",
  },

  {
    id: 20,
    name: "Bulgaria",
    flag: "BG",
    alpha2: "BG",
    alpha3: "BGR",
    ioc: "BGR",
  },

  {
    id: 21,
    name: "Cambodia",
    flag: "KH",
    alpha2: "KH",
    alpha3: "KHM",
    ioc: "KHM",
  },

  {
    id: 22,
    name: "Canada",
    flag: "CA",
    alpha2: "CA",
    alpha3: "CAN",
    ioc: "CAN",
  },

  {
    id: 23,
    name: "Chile",
    flag: "CL",
    alpha2: "CL",
    alpha3: "CHL",
    ioc: "CHL",
  },

  {
    id: 24,
    name: "Colombia",
    flag: "CO",
    alpha2: "CO",
    alpha3: "COL",
    ioc: "COL",
  },

  {
    id: 25,
    name: "Costa Rica",
    flag: "CR",
    alpha2: "CR",
    alpha3: "CRI",
    ioc: "CRI",
  },

  {
    id: 26,
    name: "Côte d’Ivoire",
    flag: "CI",
    alpha2: "CI",
    alpha3: "CIV",
    ioc: "CIV",
  },

  {
    id: 27,
    name: "Croatia ",
    flag: "HR",
    alpha2: "HR",
    alpha3: "HRV",
    ioc: "CRO",
  },

  {
    id: 28,
    name: "Cyprus",
    flag: "CY",
    alpha2: "CY",
    alpha3: "CYP",
    ioc: "CYP",
  },

  {
    id: 29,
    name: "Czech Republic ",
    flag: "CZ",
    alpha2: "CZ",
    alpha3: "CZE",
    ioc: "CZE",
  },

  {
    id: 30,
    name: "Denmark",
    flag: "DK",
    alpha2: "DK",
    alpha3: "DNK",
    ioc: "DNK",
  },

  {
    id: 31,
    name: "Dominican Republic",
    flag: "DO",
    alpha2: "DO",
    alpha3: "DOM",
    ioc: "DOM",
  },

  {
    id: 32,
    name: "Ecuador",
    flag: "EC",
    alpha2: "EC",
    alpha3: "ECU",
    ioc: "ECU",
  },

  {
    id: 33,
    name: "Egypt",
    flag: "EG",
    alpha2: "EG",
    alpha3: "EGY",
    ioc: "EGY",
  },

  {
    id: 34,
    name: "El Salvador",
    flag: "SV",
    alpha2: "SV",
    alpha3: "SLV",
    ioc: "SLV",
  },

  {
    id: 35,
    name: "Estonia",
    flag: "EE",
    alpha2: "EE",
    alpha3: "EST",
    ioc: "EST",
  },

  {
    id: 36,
    name: "Ethiopia",
    flag: "  ET",
    alpha2: "ET",
    alpha3: "ETH",
    ioc: "ETH",
  },

  {
    id: 37,
    name: "Finland",
    flag: "FI",
    alpha2: "FI",
    alpha3: "F  IN",
    ioc: "FIN",
  },

  {
    id: 38,
    name: "France",
    flag: "FR",
    alpha2: "FR",
    alpha3: "FRA",
    ioc: "FRA",
  },

  {
    id: 39,
    name: "Gabon",
    flag: "GA",
    alpha2: "GA",
    alpha3: "GAB",
    ioc: "GAB",
  },

  {
    id: 40,
    name: "Gambia",
    flag: "GM",
    alpha2: "GM",
    alpha3: "GMB",
    ioc: "GMB",
  },

  {
    id: 41,
    name: "Germany",
    flag: "DE",
    alpha2: "DE",
    alpha3: "DEU",
    ioc: "DE  U",
  },

  {
    id: 42,
    name: "Ghana",
    flag: "GH",
    alpha2: "GH",
    alpha3: "GHA",
    ioc: "GHA",
  },

  {
    id: 43,
    name: "Greece",
    flag: "GR",
    alpha2: "GR",
    alpha3: "GRC",
    ioc: "GR",
  },
  {
    id: 44,
    name: "Guatemala",
    flag: "GT",
    alpha2: "GT",
    alpha3: "GTM",
    ioc: "GTM",
  },

  {
    id: 45,
    name: "Guyana",
    flag: "GY",
    alpha2: "GY",
    alpha3: "GUY",
    ioc: "GUY",
  },

  {
    id: 46,
    name: "Hong Kong",
    flag: "HK",
    alpha2: "HK",
    alpha3: "HKG",
    ioc: "HKG",
  },

  {
    id: 47,
    name: "Hungary",
    flag: "HU",
    alpha2: "HU",
    alpha3: "HUN",
    ioc: "HUN",
  },

  {
    id: 48,
    name: "Iceland ",
    flag: "IS",
    alpha2: "IS",
    alpha3: "ISL",
    ioc: "ISL",
  },

  {
    id: 49,
    name: "India",
    flag: "IN",
    alpha2: "IN",
    alpha3: "IND",
    ioc: "IND",
  },

  {
    id: 50,
    name: "Indone  sia",
    flag: "ID",
    alpha2: "ID",
    alpha3: "IDN",
    ioc: "IDN",
  },

  {
    id: 51,
    name: "Ireland",
    flag: "IE",
    alpha2: "IE  ",
    alpha3: "IRL",
    ioc: "IRL",
  },

  {
    id: 52,
    name: "Israel",
    flag: "IL",
    alpha2: "IL",
    alpha3: "ISR",
    ioc: "ISR",
  },

  {
    id: 53,
    name: "Italy",
    flag: "IT",
    alpha2: "IT",
    alpha3: "ITA",
    ioc: "ITA",
  },

  {
    id: 54,
    name: "Jamaica",
    flag: "JM",
    alpha2: "JM",
    alpha3: "JAM",
    ioc: "JAM",
  },

  {
    id: 55,
    name: "Japan",
    flag: "JP",
    alpha2: "JP",
    alpha3: "JPN",
    ioc: "JPN",
  },

  {
    id: 56,
    name: "Jordan",
    flag: "JO",
    alpha2: "JO",
    alpha3: "JOR",
    ioc: "JOR",
  },

  {
    id: 57,
    name: "Kenya",
    flag: "KE",
    alpha2: "KE",
    alpha3: "KEN",
    ioc: "KEN",
  },

  {
    id: 58,
    name: "Kuwait",
    flag: "KW",
    alpha2: "KW",
    alpha3: "KWT",
    ioc: "KWT",
  },

  {
    id: 59,
    name: "Laos",
    flag: "LA",
    alpha2: "LA",
    alpha3: "LAO",
    ioc: "LAO",
  },

  {
    id: 60,
    name: "Latvia",
    flag: "LV",
    alpha2: "LV",
    alpha3: "LVA",
    ioc: "LVA",
  },

  {
    id: 61,
    name: "Liechtenstein ",
    flag: "LI",
    alpha2: "LI",
    alpha3: "LIE",
    ioc: "LIE",
  },

  {
    id: 62,
    name: "Lithuania",
    flag: "LT",
    alpha2: "LT",
    alpha3: "LTU",
    ioc: "LTU",
  },

  {
    id: 63,
    name: "Luxembourg",
    flag: "LU",
    alpha2: "LU",
    alpha3: "LUX",
    ioc: "LUX",
  },

  {
    id: 64,
    name: "Macao SAR China",
    flag: "MO",
    alpha2: "MO",
    alpha3: "MAC",
    ioc: "MAC",
  },

  {
    id: 65,
    name: "Madagascar",
    flag: "MG",
    alpha2: "MG",
    alpha: "MDG",
    ioc: "MDG",
  },

  {
    id: 66,
    name: "Malaysia",
    flag: "MY",
    alpha2: "MY",
    alpha3: "MYS",
    ioc: "MYS",
  },

  {
    id: 67,
    name: "Malta",
    flag: "MT",
    alpha2: "MT",
    alpha3: "MLT",
    ioc: "MLT",
  },

  {
    id: 68,
    name: "Mauritius",
    flag: "MU",
    alpha2: "MU",
    alpha3: "MUS",
    ioc: "MUS",
  },

  {
    id: 69,
    name: "Mexico",
    flag: "MX",
    alpha2: "MX",
    alpha3: "MEX",
    ioc: "MEX",
  },

  {
    id: 70,
    name: "Moldova",
    flag: "MD",
    alpha2: "MD",
    alpha3: "MDA",
    ioc: "MDA",
  },

  {
    id: 71,
    name: "Monaco",
    flag: "MC",
    alpha2: "MC",
    alpha3: "MCO",
    ioc: "MCO",
  },

  {
    id: 72,
    name: "Mongolia",
    flag: "MN",
    alpha2: "MN",
    alpha3: "MNG",
    ioc: "MGL",
  },

  {
    id: 73,
    name: "Morocco",
    flag: "MA",
    alpha2: "MA",
    alpha3: "MAR",
    ioc: "MAR",
  },

  {
    id: 74,
    name: "Mozambique",
    flag: "MZ",
    alpha2: "MZ",
    alpha3: "MOZ",
    ioc: "MOZ",
  },

  {
    id: 75,
    name: "Namibia",
    flag: "NA",
    alpha2: "NA",
    alpha3: "NAM",
    ioc: "NAM",
  },

  {
    id: 76,
    name: "Netherlands",
    flag: "NL",
    alpha2: "NL",
    alpha3: "NLD",
    ioc: "NLD",
  },

  {
    id: 77,
    name: "New Zealand",
    flag: "NZ",
    alpha2: "NZ",
    alpha3: "NZL",
    ioc: "NZL",
  },

  {
    id: 78,
    name: "Nigeria",
    flag: "NE",
    alpha2: "NG",
    alpha3: "NGA",
    ioc: "NER",
  },

  {
    id: 79,
    name: "Nigeria",
    flag: "NG",
    alpha2: "NG",
    alpha3: "NGA",
    ioc: "NGA",
  },

  {
    id: 80,
    name: "North Macedonia",
    flag: "MK",
    alpha2: "MK",
    alpha3: "MKD",
    ioc: "MKD",
  },

  {
    id: 81,
    name: "Norway",
    flag: "ND",
    alpha2: "NO",
    alpha3: "NOR",
    ioc: "NOR",
  },

  {
    id: 82,
    name: "Oman",
    flag: "OM",
    alpha2: "OM",
    alpha3: "OMN",
    ioc: "OMN",
  },

  {
    id: 83,
    name: "Panama",
    flag: "PA",
    alpha2: "PA",
    alpha3: "PAN",
    ioc: "PAN",
  },

  {
    id: 84,
    name: "Paraguay",
    flag: "PY",
    alpha2: "PY",
    alpha3: "PRY",
    ioc: "PRY",
  },

  {
    id: 85,
    name: "Peru",
    flag: "PE",
    alpha2: "PE",
    alpha3: "PER",
    ioc: "PER",
  },

  {
    id: 86,
    name: "Philippines",
    flag: "PH",
    alpha2: "PH",
    alpha3: "PHL",
    ioc: "PHL",
  },

  {
    id: 87,
    name: "Poland",
    flag: "PL",
    alpha2: "PL",
    alpha3: "POL",
    ioc: "POL",
  },

  {
    id: 88,
    name: "Portugal",
    flag: "PT",
    alpha2: "PT",
    alpha3: "PRT",
    ioc: "PRT",
  },

  {
    id: 89,
    name: "Qatar",
    flag: "QA",
    alpha2: "QA",
    alpha3: "QAT",
    ioc: "QAT",
  },

  {
    id: 90,
    name: "Romania",
    flag: "RO",
    alpha2: "RO",
    alpha3: "ROU",
    ioc: "ROU",
  },

  {
    id: 91,
    name: "Rwanda",
    flag: "RW",
    alpha2: "RW",
    alpha3: "RWA",
    ioc: "RWA",
  },

  {
    id: 92,
    name: "San Marino",
    flag: "SM",
    alpha2: "SM",
    alpha3: "SMR",
    ioc: "SMR",
  },

  {
    id: 93,
    name: "Saudi Arabia",
    flag: "SA",
    alpha2: "SA",
    alpha3: "SAU",
    ioc: "SAU",
  },

  {
    id: 94,
    name: "Senegal",
    flag: "SN",
    alpha2: "SN",
    alpha3: "SEN",
    ioc: "SEN",
  },

  {
    id: 95,
    name: "Serbia",
    flag: "RS",
    alpha2: "RS",
    alpha3: "SRB",
    ioc: "SRB",
  },

  {
    id: 96,
    name: "Singapore",
    flag: "SG",
    alpha2: "SG",
    alpha3: "SGP",
    ioc: "SGP",
  },

  {
    id: 97,
    name: "Slovakia",
    flag: "SK",
    alpha2: "SK",
    alpha3: "SVK",
    ioc: "SVK",
  },

  {
    id: 98,
    name: "Slovenia",
    flag: "SI",
    alpha2: "SI",
    alpha3: "SVN",
    ioc: "SVN",
  },

  {
    id: 99,
    name: "South Africa",
    flag: "ZA",
    alpha2: "ZA",
    alpha3: "ZAF",
    ioc: "ZAF",
  },

  {
    id: 100,
    name: "South Korea",
    flag: "KR",
    alpha2: "KR",
    alpha3: "KR",
    ioc: "KR",
  },

  {
    id: 101,
    name: "Spain",
    flag: "ES",
    alpha2: "ES",
    alpha3: "ESP",
    ioc: "ESP",
  },

  {
    id: 102,
    name: "Sri Lanka",
    flag: "LK",
    alpha2: "LK",
    alpha3: "LKA",
    ioc: "LKA",
  },
  {
    id: 103,
    name: "Saint Lucia",
    flag: "LC",
    alpha2: "LC",
    alpha3: "LCA",
    ioc: "LCA",
  },

  {
    id: 104,
    name: "Sweden",
    flag: "SE",
    alpha2: "SE",
    alpha3: "SWE",
    ioc: "SWE",
  },

  {
    id: 105,
    name: "Switzerland ",
    flag: "CH",
    alpha2: "CH",
    alpha3: "CHE",
    ioc: "SUI",
  },

  {
    id: 106,
    name: "Taiwan",
    flag: "TW",
    alpha2: "TW",
    alpha3: "TWN",
    ioc: "TPE",
  },

  {
    id: 107,
    name: "Tanzania",
    flag: "TZ",
    alpha2: "TZ",
    alpha3: "TZA",
    ioc: "TAN",
  },

  {
    id: 108,
    name: "Thailand",
    flag: "TH",
    alpha2: "TH",
    alpha3: "THA",
    ioc: "THA",
  },

  {
    id: 109,
    name: "Trinidad & Tobago  ",
    flag: "TT",
    alpha2: "TT",
    alpha3: "TTO",
    ioc: "TRI",
  },

  {
    id: 110,
    name: "Tunisia",
    flag: "TN",
    alpha2: "TN",
    alpha3: "TUN",
    ioc: "TUN",
  },

  {
    id: 111,
    name: "Turkey",
    flag: "TR",
    alpha2: "TR",
    alpha3: "TUR",
    ioc: "TUR",
  },

  {
    id: 112,
    name: "United Arab Emirates",
    flag: "AE",
    alpha2: "AE",
    alpha3: "ARE",
    ioc: "ARE",
  },

  {
    id: 113,
    name: "United Kingdom of Great Britain",
    flag: "GB",
    alpha2: "GB",
    alpha3: "GBR",
    ioc: "GBR",
  },

  {
    id: 114,
    name: "Uruguay",
    flag: "UY",
    alpha2: "UY",
    alpha3: "URY",
    ioc: "URY",
  },

  {
    id: 115,
    name: "Uzbekistan",
    flag: "UZ",
    alpha2: "UZ",
    alpha3: "UZB",
    ioc: "UZB",
  },

  {
    id: 116,
    name: "United States of America",
    flag: "US",
    alpha2: "US",
    alpha3: "USA",
    ioc: "USA",
  },

  {
    id: 117,
    name: "Vietnam",
    flag: "VN",
    alpha2: "VN",
    alpha3: "VNM",
    ioc: "VIE",
  },
];

//     id: 1,
//     name: "Australia",
//     flag: "🇦🇺",
//     alpha2: "AU",
//     alpha3: "AUS",
//     ioc: "AUS",
//   },
//   {
//     id: 2,
//     name: "Austria",
//     flag: "🇦🇹",
//     alpha2: "AT",
//     alpha3: "AUT",
//     ioc: "AUT",
//   },
//   {
//     id: 3,
//     name: "Belgium",
//     flag: "🇧🇪",
//     alpha2: "BE",
//     alpha3: "BEL",
//     ioc: "BEL",
//   },
//   {
//     id: 4,
//     name: "Bulgaria",
//     flag: "🇧🇬",
//     alpha2: "BG",
//     alpha3: "BGR",
//     ioc: "BUL",
//   },
//   {
//     id: 5,
//     name: "Canada",
//     flag: "🇨🇦",
//     alpha2: "CA",
//     alpha3: "CAN",
//     ioc: "CAN",
//   },
//   {
//     id: 6,
//     name: "Cyprus",
//     flag: "🇨🇾",
//     alpha2: "CY",
//     alpha3: "CYP",
//     ioc: "CYP",
//   },
//   {
//     id: 7,
//     name: "Czech Republic",
//     flag: "🇨🇿",
//     alpha2: "CZ",
//     alpha3: "CZE",
//     ioc: "CZE",
//   },
//   {
//     id: 8,
//     name: "Denmark",
//     flag: "🇩🇰",
//     alpha2: "DK",
//     alpha3: "DNK",
//     ioc: "DEN",
//   },
//   {
//     id: 9,
//     name: "Estonia",
//     flag: "🇪🇪",
//     alpha2: "EE",
//     alpha3: "EST",
//     ioc: "EST",
//   },
//   {
//     id: 10,
//     name: "Finland",
//     flag: "🇫🇮",
//     alpha2: "FI",
//     alpha3: "FIN",
//     ioc: "FIN",
//   },
//   {
//     id: 11,
//     name: "France",
//     flag: "🇫🇷",
//     alpha2: "FR",
//     alpha3: "FRA",
//     ioc: "FRA",
//   },
//   {
//     id: 12,
//     name: "Germany",
//     flag: "🇩🇪",
//     alpha2: "DE",
//     alpha3: "DEU",
//     ioc: "GER",
//   },
//   {
//     id: 13,
//     name: "Greece",
//     flag: "🇬🇷",
//     alpha2: "GR",
//     alpha3: "GRC",
//     ioc: "GRE",
//   },
//   {
//     id: 14,
//     name: "Hong Kong",
//     flag: "🇭🇰",
//     alpha2: "HK",
//   },
//   {
//     id: 15,
//     name: "Hungary",
//     flag: "🇭🇺",
//     alpha2: "HU",
//     alpha3: "HUN",
//     ioc: "HUN",
//   },
//   {
//     id: 16,
//     name: "Ireland",
//     flag: "🇮🇪",
//     alpha2: "IE",
//     alpha3: "IRL",
//     ioc: "IRL",
//   },
//   {
//     id: 17,
//     name: "Italy",
//     flag: "🇮🇹",
//     alpha2: "IT",
//     alpha3: "ITA",
//     ioc: "ITA",
//   },
//   {
//     id: 18,
//     name: "Japan",
//     flag: "🇯🇵",
//     alpha2: "JP",
//     alpha3: "JPN",
//     ioc: "JPN",
//   },
//   {
//     id: 19,
//     name: "Latvia",
//     flag: "🇱🇻",
//     alpha2: "LV",
//     alpha3: "LVA",
//     ioc: "LAT",
//   },
//   {
//     id: 20,
//     name: "Lithuania",
//     flag: "🇱🇹",
//     alpha2: "LT",
//     alpha3: "LTU",
//     ioc: "LTU",
//   },
//   {
//     id: 21,
//     name: "Luxembourg",
//     flag: "🇱🇺",
//     alpha2: "LU",
//     alpha3: "LUX",
//     ioc: "LUX",
//   },
//   {
//     id: 22,
//     name: "Malta",
//     flag: "🇲🇹",
//     alpha2: "MT",
//     alpha3: "MLT",
//     ioc: "MLT",
//   },
//   {
//     id: 23,
//     name: "Netherlands",
//     flag: "🇳🇱",
//     alpha2: "NL",
//     alpha3: "NLD",
//     ioc: "NED",
//   },
//   {
//     id: 24,
//     name: "New Zealand",
//     flag: "🇳🇿",
//     alpha2: "NZ",
//     alpha3: "NZL",
//     ioc: "NZL",
//   },
//   {
//     id: 25,
//     name: "Norway",
//     flag: "🇳🇴",
//     alpha2: "NO",
//     alpha3: "NOR",
//     ioc: "NOR",
//   },
//   {
//     id: 26,
//     name: "Poland",
//     flag: "🇵🇱",
//     alpha2: "PL",
//     alpha3: "POL",
//     ioc: "POL",
//   },
//   {
//     id: 27,
//     name: "Portugal",
//     flag: "🇵🇹",
//     alpha2: "PT",
//     alpha3: "PRT",
//     ioc: "POR",
//   },
//   {
//     id: 28,
//     name: "Romania",
//     flag: "🇷🇴",
//     alpha2: "RO",
//     alpha3: "ROU",
//     ioc: "ROU",
//   },
//   {
//     id: 29,
//     name: "Singapore",
//     flag: "🇸🇬",
//     alpha2: "SG",
//     alpha3: "SGP",
//     ioc: "SGP",
//   },
//   {
//     id: 30,
//     name: "Slovakia",
//     flag: "🇸🇰",
//     alpha2: "SK",
//     alpha3: "SVK",
//     ioc: "SVK",
//   },
//   {
//     id: 31,
//     name: "Slovenia",
//     flag: "🇸🇮",
//     alpha2: "SI",
//     alpha3: "SVN",
//     ioc: "SLO",
//   },
//   {
//     id: 32,
//     name: "Spain",
//     flag: "🇪🇸",
//     alpha2: "ES",
//     alpha3: "ESP",
//     ioc: "ESP",
//   },
//   {
//     id: 33,
//     name: "Sweden",
//     flag: "🇸🇪",
//     alpha2: "SE",
//     alpha3: "SWE",
//     ioc: "SWE",
//   },
//   {
//     id: 34,
//     name: "Switzerland",
//     flag: "🇨🇭",
//     alpha2: "ch",
//     alpha3: "CHE",
//     ioc: "SUI",
//   },
//   {
//     id: 35,
//     name: "United Kingdom of Great Britain and Northern Ireland",
//     flag: "🇬🇧",
//     alpha2: "gb",
//     alpha3: "GBR",
//     ioc: "GBR",
//   },
//   {
//     id: 36,
//     name: "United States of America",
//     flag: "🇺🇸",
//     alpha2: "us",
//     alpha3: "USA",
//     ioc: "USA",
//   },
// ];
const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be aleast 8 characters long!")
    .max(30, "Password is too long!")
    .required("Password required"),
  email: Yup.string().email("Enter a valid email").required("Email Required"),
  last_name: Yup.string()
    .min(3, "Enter your last name")
    .required("Last name required"),
  nation: Yup.string().required("Country name required"),
  mobile_no: Yup.string()
    // .min(12, "Enter valid mobile number")
    .required("Mobile number required"),
  first_name: Yup.string()
    .min(3, "Minium 3 characters required")
    .required("First name required"),
  agreedTerms: Yup.bool().oneOf(
    [true],
    "Accept Terms & Conditions is required"
  ),
});

const style = {
  color: "#01a78a",
  textDecoration: "none",
};

const SignIn = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);
  const [verifyTextExist, setVerifyTextExist] = useState();
  const contextData = useContext(Global);
  const [isLoading, setLoading] = useState(false);
  const [errdisplay, seterrdisplay] = useState("none");
  const [OtpResponse, setOtpResponse] = useState("Verify");
  const [optdisplay, setoptdisplay] = useState("none");
  let navigate = useNavigate();
  const [imgcode, setimgcode] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  const [cookies, setCookie] = useCookies();
  const [isRender, setIsRender] = useState(false);
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies?.user_data?.role === "client") {
          navigate("/clientdashboard");
        } else {
          navigate("/professionaldashboard");
        }
      } else {
        if (cookies?.user_data?.role === "professional") {
          navigate("/categoryArchitecture");
        } else {
          navigate("/client-architechture");
        }
      }
    } else {
      setIsRender(true);
    }
  }, []);

  const verifyRequestButton = () => {
    let email = $("#EmailInputSignUpForm").val();
    setLoadingActive(true);

    axios
      .post("http://13.52.16.160:8082/identity/verify-email", {
        email: email,
      })
      .then((res) => {
        if (res?.data?.status === "Failed") {
          setShow(false);
          setLoadingActive(false);
          setExistingEmail(true);
          setOtpResponse("Verify");
        }
        if (res?.data?.status === "Success") {
          setShow(true);
          setLoadingActive(false);
          setExistingEmail(false);
        }
      });
  };
  const [validateOTP, setValidateOTP] = useState(false);

  const [otp, handleOTP] = useState("");
  var otp̥Length = otp.length;

  const handleOTPSubmit = (e) => {
    let email = $("#EmailInputSignUpForm").val();

    e.preventDefault();
    axios
      .put("http://13.52.16.160:8082/identity/verify-email", {
        email: email,
        otp: otp,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setOtpResponse("Verified");
          handleOTP("");
          setShow(false);
          setoptdisplay("none");
        } else {
          setOtpResponse("Verify");
          handleOTP("");
          setValidateOTP(true);
        }
        if (res?.data?.message !== "Otp expired") {
          // setOtpResponse("verify");
          handleOTP("");
        } else {
          setValidateOTP(true);
          handleOTP("");
          setOtpResponse("verify");
        }
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setOtpResponse("Verify");
    setoptdisplay("block");
    handleOTP("");
    setValidateOTP(false);
  };
  const [existingEmail, setExistingEmail] = useState(false);
  const handleEmailFocus = () => {
    setExistingEmail(false);
    setOtpResponse("Verify");
  };

  useEffect(() => {
    setVerifyTextExist($(".emailVerifyBtnProfessional").text());
  }, []);
  const [filePic, setFilePic] = useState("");
  const photoChange = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    setFilePic(file);

    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        $(" #imgPreview").attr("src", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [value, setValue] = useState({});

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  return (
    <>
      {isLoading && !isRender ? (
        <Loader />
      ) : (
        <div className="create-account">
          <Header2 />
          <main className="create-account-main">
            <div className="container">
              <Formik
                enableReinitialize
                initialValues={{
                  email: "",
                  password: "",
                  first_name: "",
                  last_name: "",
                  email_verify: true,
                  agreedTerms: true,
                  nation: "",
                  mobile_no: "",
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setLoading(true);
                  axios
                    .post(
                      "http://13.52.16.160:8082/identity/signup_client",
                      values
                    )
                    .then((res) => {
                      if (res?.data?.status !== "Success") {
                        setOtpResponse("Please try Again");
                        navigate("/client-sign-up");
                        setLoading(false);
                        localStorage.clear();
                      }

                      const signupuser = new FormData();
                      signupuser.append("image", filePic);
                      signupuser.append("user_id", res?.data?.data?.user_id);
                      signupuser.append(
                        "user_token",
                        res?.data?.data.user_token
                      );
                      signupuser.append("role", res?.data?.data.role);

                      if (res?.data?.status === "Success") {
                        axios
                          .post(
                            "http://13.52.16.160:8082/identity/client_profile",
                            signupuser
                          )
                          .then((respo) => {
                            if (respo.data?.status === "Success") {
                              axios
                                .post(
                                  "http://13.52.16.160:8082/identity/get_dashboard_profile/",
                                  {
                                    user_id: res?.data?.data?.user_id,
                                    user_token: res?.data?.data?.user_token,
                                    role: res?.data?.data?.role,
                                  }
                                )
                                .then((response) => {
                                  contextData?.dispatch({
                                    type: "FETCH_PROFILE_DATA",
                                    value: response?.data?.data,
                                  });
                                  contextData?.setShowDisclamer(true);
                                });
                              navigate("/client-architechture", {
                                replace: true,
                              });
                            } else {
                              navigate("/client-sign-up");
                              setLoading(false);
                              localStorage.clear();
                            }
                          });
                        contextData?.dispatch({
                          type: "FETCH_USER_DATA",
                          value: res?.data?.data,
                        });
                        setCookie("user_data", {
                          ...res?.data?.data,
                          category_selected: false,
                        });
                        setEmailExists(false);
                      }
                    });
                }}
              >
                {({ setFieldValue }) => (
                  <Form onKeyDown={onKeyDown}>
                    <h1>Create Account</h1>
                    <h3>You’re on your way to connecting with great talent!</h3>
                    <div className="row">
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <Field
                            type="text"
                            name="first_name"
                            className="form-control"
                            placeholder="First Name"
                          />

                          <i className="fa-regular fa-user"></i>
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <Field
                            type="text"
                            name="last_name"
                            className="form-control"
                            placeholder="Last Name"
                          />
                          <i className="fa-regular fa-user"></i>
                          <ErrorMessage
                            name="last_name"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input create-account-email-input">
                          <Field
                            type="email"
                            className="form-control"
                            id="EmailInputSignUpForm"
                            placeholder="Enter Your Mail"
                            name="email"
                            onInput={handleEmailFocus}
                          />
                          <button
                            onClick={verifyRequestButton}
                            type="button"
                            className={
                              loadingActive
                                ? "emailVerifyBtnProfessional loadingOuter"
                                : "emailVerifyBtnProfessional "
                            }
                            style={
                              $("#EmailInputSignUpForm").val()
                                ? { pointerEvents: "all" }
                                : { pointerEvents: "none" }
                            }
                          >
                            {loadingActive ? <ReactLotti /> : OtpResponse}
                          </button>
                          <Modal
                            show={show}
                            className="OtpInputModal"
                            onHide={handleClose}
                            size="sm"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Enter your OTP</Modal.Title>
                            </Modal.Header>
                            <div
                              className="otp-box-Main"
                              onSubmit={handleOTPSubmit}
                            >
                              <div className="col">
                                <OtpInput
                                  value={otp}
                                  onChange={handleOTP}
                                  numInputs={6}
                                  separator={<span>-</span>}
                                  className="w-100 justify-content-around"
                                />
                              </div>
                              {validateOTP ? (
                                <p className="text-danger m-auto mt-1">
                                  Please Enter a valid OTP !
                                </p>
                              ) : (
                                ""
                              )}
                              <button
                                variant="secondary"
                                type="button"
                                className="otpSubmitButton"
                                onClick={handleOTPSubmit}
                                style={
                                  otp̥Length === 6
                                    ? { pointerEvents: "all" }
                                    : { pointerEvents: "none" }
                                }
                              >
                                Submit
                              </button>
                            </div>
                          </Modal>
                          <i className="fa-regular fa-envelope"></i>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        {existingEmail ? (
                          <p className="text-danger">
                            Email is already registered !
                          </p>
                        ) : (
                          ""
                        )}
                        <div className={optdisplay}>
                          <span className="text-danger">Enter otp again</span>
                          <button
                            type="button"
                            style={{
                              border: "0",
                              background: "0",
                              margin: "0 10px",
                              textDecoration: "underline",
                            }}
                            onClick={() => {
                              setShow("block");
                            }}
                          >
                            click
                          </button>
                        </div>
                      </div>
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <Field
                            type={viewPassword ? "text" : "password"}
                            className="form-control"
                            id="pwd"
                            placeholder="Password"
                            name="password"
                          />
                          <div className="viewPasswordIcons">
                            {viewPassword ? (
                              <RiEyeCloseLine
                                onClick={() => {
                                  setViewPassword(false);
                                }}
                              />
                            ) : (
                              <RiEyeLine
                                onClick={() => {
                                  setViewPassword(true);
                                }}
                              />
                            )}
                          </div>
                          <img src="./static/images/LockIcon.png" alt="" />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      {emailExists ? (
                        <div className="m-2 text-danger">
                          Email is already registered
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row my-md-3 my-1">
                      <div className="col-md my-md-3 my-1">
                        {/* <CountryDropdown
                          preferredCountries={["in", "us"]}
                          handleChange={(e) => {
                            let c = e.target.value;
                            let countryName = c.slice(
                              0,
                              c.indexOf("(") == -1
                                ? c.length + 1
                                : c.indexOf("(") - 1
                            );
                            setFieldValue("nation", countryName);
                          }}
                        ></CountryDropdown> */}
                        {/* <img
                          style={{
                            top: "37%",
                            position: "absolute",
                            // top:'34px',
                            left: "5%",
                            width: "18px",
                            zIndex: "4545",
                          }}
                          alt="United States"
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${imgcode}.svg`}
                        /> */}
                        <CountrySelect
                          countries={countries}
                          value={value}
                          onChange={(val) => {
                            setValue(val);
                            // console.log(val);
                            // let id = val.id;
                            // setimgcode( id.toLocaleUpperCase() );
                            setFieldValue("nation", val?.name);
                          }}
                          flags={false}
                          placeholder="select a country"
                          name="nation"
                        />
                        <ErrorMessage
                          name="nation"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md my-md-3 my-1">
                        <PhoneInput
                          disableDropdown
                          placeholder="Enter phone number"
                          enableAreaCodes
                          country={value?.alpha2?.toLocaleLowerCase()}
                          name="mobile_no"
                          onChange={(pho, country) =>
                            setFieldValue(
                              "mobile_no",
                              `+${country.dialCode}${pho}`
                            )
                          }
                          inputStyle={{
                            padding: "26px",
                            width: "100%",
                            borderRadius: "50px",
                            paddingLeft: "45px",
                          }}
                        />
                        {/* <PhoneInput
                          placeholder="Enter phone number"
                          country={value?.alpha2}
                          enableAreaCodes
                          name="mobile_no"
                          onChange={(pho, country) =>
                            setFieldValue(
                              "mobile_no",
                              `+${country.dialCode}${pho}`
                            )
                          }
                          inputStyle={{
                            padding: "26px",
                            width: "100%",
                            borderRadius: "50px",
                            paddingLeft: "45px",
                          }}
                        /> */}
                        <ErrorMessage
                          name="mobile_no"
                          component="div"
                          className="m-2 text-danger"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 col-xl-2 my-md-3 my-1">
                        <div>
                          <div
                            className="form-image-input"
                            onClick={() => {
                              document.getElementById("photo").click();
                            }}
                          >
                            <img
                              id="imgPreview"
                              src="/static/images/ImageInput.png"
                              alt="pic"
                            />

                            <div className="plus-image-overlay">
                              <i className="fa fa-plus"></i>
                            </div>
                          </div>
                          <input
                            type="file"
                            name="photograph"
                            id="photo"
                            accept="image/*"
                            onChange={(event) => {
                              seterrdisplay("none");
                              photoChange(event);
                            }}
                          />
                          <span className="mt-3">Profile Image</span>
                          <span className={`${errdisplay} text-danger mt-3`}>
                            Profile picture required
                          </span>
                        </div>
                      </div>
                      <div className="col-9">
                        <div className="form-check my-3">
                          <Field
                            type="checkbox"
                            name="email_verify"
                            className="form-check-input check"
                          />
                          <label className="form-check-label ms-2">
                            Send me emails with helpful tips to find talent that
                            fits my needs.
                          </label>
                          <ErrorMessage
                            name="email_verify"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="form-check my-3">
                          <Field
                            type="checkbox"
                            name="agreedTerms"
                            className="form-check-input check"
                          />
                          <label className="form-check-label ms-2">
                            Yes, I understand and agree to the
                            <a
                              href="#"
                              className="theme-text-color text-decoration-none"
                            >
                              {" "}
                              Quadra Terms of Service User Agreement Privacy
                              Policy
                            </a>
                          </label>
                          <ErrorMessage
                            name="agreedTerms"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      {!filePic && (
                        <div
                          className="m-2 text-danger imageValidationError"
                          style={{ display: "none" }}
                        >
                          Image Is Required
                        </div>
                      )}
                    </div>
                    <div className="d-md-flex align-items-center justify-content-center my-md-5 my-2">
                      {OtpResponse === "Verified" ? (
                        <button
                          type="submit"
                          className="create-account-btn"
                          style={{ pointerEvents: "all" }}
                          onClick={() => {
                            if (!filePic) {
                              seterrdisplay("block");
                            }
                          }}
                        >
                          Create My Account
                          <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="create-account-btn"
                          onClick={() => {
                            toast.error("Must Email verify ", {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });
                          }}
                        >
                          Create My Account
                          <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                        </button>
                      )}
                      {/* <button type="button" className="logInbtn">
                        <Link to="/login" style={style}>
                          Log In
                          <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                        </Link>
                      </button> */}
                    </div>
                    <div className="d-flex align-items-center my-3 justify-content-center">
                      <div className="horizontal-line"></div>
                      <p className="m-0 mx-2">Login With</p>
                      <div className="horizontal-line"></div>
                    </div>
                    <div className="d-flex justify-content-center mb-5">
                      <FacebookProvider appId="123456789">
                        <LoginButton
                          className="facebook_login_button"
                          scope="email"
                        >
                          <img src="./static/images/facebook.png" alt="" />
                        </LoginButton>
                      </FacebookProvider>
                      <GoogleLogin
                        clientId="889083018428-n0vk7cnh54u5ftft61icv01pf08mgnnh.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <img
                            src="./static/images/google.png"
                            style={{ cursor: "pointer" }}
                            onClick={renderProps.onClick}
                            className="mx-3"
                            alt=""
                          />
                        )}
                      />
                      <AppleLogin
                        clientId="com.react.apple.login"
                        render={(r) => (
                          <img
                            src="./static/images/apple.png"
                            style={{ cursor: "pointer" }}
                            onClick={r.onClick}
                            alt=""
                          />
                        )}
                        redirectURI="https://redirectUrl.com"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      )}
    </>
  );
};

export default SignIn;
