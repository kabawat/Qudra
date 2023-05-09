import React, { useContext, useEffect, useState, useRef } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import Loader from "../../components/Loader";
import { Header2 } from "../../components/Header";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CountrySelect from "react-bootstrap-country-select";
import { MultiSelect } from "react-multi-select-component";
import OtpInput from "react-otp-input";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import $ from "jquery";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Global from "../../context/Global";
import { getCode } from "country-list";

import { useCookies } from "react-cookie";

import ReactLotti from "../../loader/ReactLotti";
const languages = [
  { label: "Albanian", value: "Albanian" },
  { label: "Bosnian", value: "Bosnian" },
  { label: "Belarusian", value: "Belarusian" },
  { label: "Bulgarian", value: "Bulgarian" },
  { label: "Croatian", value: "Croatian" },
  { label: "Czech", value: "Czech" },
  { label: "Catalan", value: "Catalan" },
  { label: "Croatian", value: "Croatian" },
  { label: "Danish", value: "Danish" },
  { label: "Deutsch", value: "Deutsch" },
  { label: "Dutch", value: "Dutch" },
  { label: "English", value: "English" },
  { label: "Estonian", value: "Estonian" },
  { label: "French", value: "French" },
  { label: "Finnish", value: "Finnish" },
  { label: "German,", value: "German," },
  { label: "Greek", value: "Greek" },
  { label: "Greenlandic", value: "Greenlandic" },
  { label: "Galician", value: "Galician" },
  { label: "Hindi", value: "Hindi" },
  { label: "Hungarian", value: "Hungarian" },
  { label: "Icelandic", value: "Icelandic" },
  { label: "Inuktitut", value: "Inuktitut" },
  { label: "Irish", value: "Irish" },
  { label: "Italian", value: "Italian" },
  { label: "Latvian", value: "Latvian" },
  { label: "Lithuanian", value: "Lithuanian" },
  { label: "Luxembourgish", value: "Luxembourgish" },
  { label: "Maltese", value: "Maltese" },
  { label: "Moldovan", value: "Moldovan" },
  { label: "Macedonian", value: "Macedonian" },
  { label: "Norwegian", value: "Norwegian" },
  { label: "Russian", value: "Russian" },
  { label: "Serbian", value: "Serbian" },
  { label: "Slovene", value: "Slovene" },
  { label: "Serbo", value: "Serbo" },
  { label: "Polish", value: "Polish" },
  { label: "Portuguese", value: "Portuguese" },
  { label: "Romanian", value: "Romanian" },
  { label: "Romansch", value: "Romansch" },
  { label: "Russian", value: "Russian" },
  { label: "Turkish", value: "Turkish" },
  { label: "Serbian", value: "Serbian" },
  { label: "Slovak", value: "Slovak" },
  { label: "Slovenian", value: "Slovenian" },
  { label: "Spanish", value: "Spanish" },
  { label: "Swedis", value: "Swedis" },
  { label: "Ukrainian", value: "Ukrainian" },
];

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

const SetUp = () => {
  const [cookies, setCookies] = useCookies();
  const contextData = useContext(Global);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState({});

  const isCookies = () => {
    if (cookies?.user_data?.category_selected) {
      if (cookies.user_data.role === "professional") {
        navigate("/professionaldashboard");
      } else {
        navigate("/clientdashboard");
      }
    } else {
      if (cookies.user_data.role === "professional") {
        navigate("/categoryArchitecture");
      } else {
        navigate("/client-architechture");
      }
    }
  };

  useEffect(() => {
    if (cookies?.user_data) {
      isCookies();
    }
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // event.preventDefault();
    }
  };

  const [certificate, setCertificate] = useState("");
  const certificateChange = (e) => {
    const file = e.target.files[0];
    setCertificate(file);
  };

  const fileref = useRef();
  //  const [certificate, setCertificate] = useState("");
  const removeCertificate = () => {
    setCertificate("");
    fileref.current.value = null;
  };

  const [disply, setdisply] = useState("none");

  const [otpdisplay, setotpdisplay] = useState("none");
  const [imgcode, setimgcode] = useState("in");
  const [viewPassword, setViewPassword] = useState(false);
  const SetUpSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be aleast 8 characters long!")
      .max(30, "Password is too long!")
      .required("Password required"),
    email: Yup.string().email(" Enter  valid email").required("Email required"),
    mobile_no: Yup.string()
      .required("Phone number required")
      .min(10, "Enter valid mobile number"),
    last_name: Yup.string()
      .min(3, "Minimum 3 character required")
      .required("Last name required"),
    first_name: Yup.string()
      .min(3, "Minimum 3 character required")
      .required("First name required"),
    experience: Yup.string().required("Experience required"),
    languages: Yup.array().required("Languages required"),
    education: Yup.string().required("Education  required"),
    skills: Yup.array().required("Skills required "),
    job_description: Yup.string()
      .min(100, "Minimum 100 character required")
      .required("Job description  required"),
    bio: Yup.string()
      .min(100, "Minimum 100 charecter required")
      .max(500)
      .required("About required"),
    nation: Yup.string().required("Country name required"),
    price_range: Yup.string().required("Price Range required"),
  });
  const [filePic, setFilePic] = useState("");
  const photoChange = (e) => {
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

  const [filePic2, setFilePic2] = useState("");
  const photoChange2 = (e) => {
    const file = e.target.files[0];
    setFilePic2(file);

    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        $(" #imgPreview2").attr("src", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function onKeyDown(keyEvent) {
    if (
      (keyEvent.charCode || keyEvent.keyCode) === 13 &&
      keyEvent.target !==
        document.getElementById("exampleFormControlTextarea1") &&
      keyEvent.target !== document.getElementById("exampleFormControlTextarea2")
    ) {
      keyEvent.preventDefault();
    }
  }

  const rows = [];
  for (let i = 0; i < 45; i++) {
    rows.push(i);
  }
  const [cerErr, setCerErr] = useState("none");
  const [eduErr, setEduErr] = useState(false);
  const [backImgErr, setBackImgErr] = useState("none");

  const [profileerr, setprofileerr] = useState("none");
  const [educationSelect, setEducationSelect] = useState("");
  const [educationInput, setEducationInput] = useState("");
  const [language, setLanguage] = useState([]);
  const [skills, setSkill] = useState([]);
  const [existingEmail, setExistingEmail] = useState(true);
  const [resData, setResData] = useState();
  const verifyRequestButton = () => {
    let email = $("#EmailInputSignUpForm").val();
    setLoadingActive(true);
    axios
      .post("http://13.52.16.160:8082/identity/verify-email", { email })
      .then((res) => {
        if (res?.data?.status === "Failed") {
          setResData(res.data);
          setShow(false);
          setExistingEmail(false);
          handleOTP("");
          setLoadingActive(false);
          setVerifyButtonText("Verify ");
        } else {
          setShow(true);
          setLoadingActive(false);
          setExistingEmail(true);
        }
      });
  };

  const [otp, handleOTP] = useState("");
  var otp̥Length = otp.length;
  const [verifyButtonText, setVerifyButtonText] = useState("verify");
  const [loadingActive, setLoadingActive] = useState(false);

  const [show, setShow] = useState(false);
  const [OtpResponse, setOtpResponse] = useState(false);

  const handleClose = () => {
    setShow(false);
    setotpdisplay("block");
    handleOTP("");
    setOtpResponse(false);
  };

  const handleEmailFocus = () => {
    setExistingEmail(true);
    setVerifyButtonText("Verify");
    setOtpResponse(false);
  };

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
          setShow(false);
          setotpdisplay("none");
          setVerifyButtonText("Verified");
          $(".emailVerifyBtnProfessional").css("pointer-events", "none");
          handleOTP("");
        } else {
          handleOTP("");
          setOtpResponse(true);
        }
      });
  };

  if (cookies?.u0ser_data) {
    isCookies();
  } else {
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="create-account">
            <Header2 />
            <main className="create-account-main">
              <div className="container mb-5">
                <Formik
                  initialValues={{
                    first_name: "",
                    last_name: "",
                    email: "",
                    email_verify: "True",
                    nation: "",
                    mobile_no: "",
                    bio: "",
                    job_description: "",
                    password: "",
                    languages: "",
                    education: "",
                    skills: "",
                    mobile_verify: "True",
                    experience: "",
                    price_range: "",
                  }}
                  validationSchema={SetUpSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    if (!filePic) {
                      setprofileerr("block");
                      // return false;
                    }
                    if (!filePic2) {
                      setBackImgErr("block");
                      // return false;
                    }
                    if (!certificate) {
                      setCerErr("block");
                      // return false;
                    } else if (!filePic || !filePic2 || !certificate) {
                      return false;
                    } else {
                      setLoading(true);
                      axios
                        .post(
                          "http://13.52.16.160:8082/identity/signup_professional",
                          values
                        )
                        .then((res) => {
                          if (res?.data?.status === "Success") {
                            const signupuser = new FormData();
                            signupuser.append("image", filePic);
                            signupuser.append("background_image", filePic2);
                            signupuser.append(
                              "user_id",
                              res?.data?.data.user_id
                            );
                            signupuser.append(
                              "user_token",
                              res?.data?.data.user_token
                            );
                            signupuser.append("role", res?.data?.data.role);

                            signupuser &&
                              axios
                                .post(
                                  "http://13.52.16.160:8082/identity/professional_profile",
                                  signupuser
                                )
                                .then((respo) => {
                                  const getcookies = {
                                    user_id: res?.data?.data?.user_id,
                                    user_token: res?.data?.data?.user_token,
                                    role: res?.data?.data?.role,
                                  };

                                  const userCertificate = new FormData();
                                  userCertificate.append(
                                    "user_id",
                                    res?.data?.data.user_id
                                  );
                                  userCertificate.append(
                                    "user_token",
                                    res?.data?.data.user_token
                                  );
                                  userCertificate.append(
                                    "role",
                                    res?.data?.data.role
                                  );
                                  userCertificate.append(
                                    "certificate",
                                    certificate
                                  );

                                  axios.post(
                                    "http://13.52.16.160:8082/identity/professional_certificate",
                                    userCertificate
                                  );
                                  // .then((res) => console.log(""))
                                  // .catch((err) => console.log(err));

                                  if (respo?.data?.status === "Success") {
                                    contextData?.dispatch({
                                      type: "FETCH_USER_DATA",
                                      value: res?.data?.data,
                                    });
                                    setCookies("user_data", {
                                      ...res?.data?.data,
                                      category_selected: false,
                                    });

                                    setLoading(false);
                                    navigate("/categoryArchitecture", {
                                      replace: true,
                                    });
                                    contextData.setShowDisclamer(true);
                                    if (!contextData?.profileData) {
                                      axios
                                        .post(
                                          "http://13.52.16.160:8082/identity/get_dashboard_profile/",
                                          {
                                            user_id: res?.data?.data?.user_id,
                                            user_token:
                                              res?.data?.data?.user_token,
                                            role: res?.data?.data?.role,
                                          }
                                        )
                                        .then((response) => {
                                          contextData?.dispatch({
                                            type: "FETCH_PROFILE_DATA",
                                            value: response?.data?.data,
                                          });
                                        });
                                    }
                                  }
                                });
                          } else {
                            localStorage.clear();

                            navigate("/setup");
                            setLoading(false);
                          }
                        });
                    }
                  }}
                >
                  {({
                    isSubmitting,
                    setFieldValue,
                    validateForm,
                    validateField,
                    values,
                  }) => (
                    <Form onKeyDown={onKeyDown}>
                      <h1>Lets Set Up like A Pro</h1>

                      <div className="row">
                        <div className="col-md my-md-3 my-1">
                          <div className="create-account-input">
                            <Field
                              name="first_name"
                              type="text"
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
                              name="last_name"
                              type="text"
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
                          <div className="create-account-input create-account-email-input ">
                            <Field
                              id="EmailInputSignUpForm"
                              type="email"
                              className="form-control"
                              placeholder="Enter Your Email"
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
                              {loadingActive ? (
                                <ReactLotti />
                              ) : (
                                verifyButtonText
                              )}
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
                                {OtpResponse ? (
                                  <p className="text-danger m-auto">
                                    Please retry with valid OTP
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
                            {!existingEmail ? (
                              <p className="text-danger">
                                {resData.message}
                                {/* Email is already registered ! */}
                              </p>
                            ) : (
                              ""
                            )}
                            {verifyButtonText === "Verify" ? (
                              <span style={{ color: "red" }}>
                                Please verify Email
                              </span>
                            ) : null}
                          </div>
                          <div className={otpdisplay}>
                            <span style={{ color: "red" }}>
                              Please enter valid otp
                            </span>
                            <button
                              type="button"
                              style={{
                                border: "0",
                                background: "0",
                                margin: "0 10px",
                                textDecoration: "underline",
                              }}
                              onClick={() => {
                                setShow(true);
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
                              className="m-2 text-danger"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div
                          className="col-md my-md-3 my-1"
                          style={{
                            position: "relative",
                            // left:'10px',
                          }}
                        >
                          {/* <img
                          className={disply}
                          style={{
                            top: "37%",
                            position: "absolute",
                            // top:'34px',
                            left: "5%",
                            width: "18px",
                            zIndex: "4545",
                          }}
                          alt="img"
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${imgcode}.svg`}
                        /> */}
                          <CountrySelect
                            countries={countries}
                            value={value}
                            onChange={(val) => {
                              setValue(val);
                              setFieldValue("nation", val?.name);

                              setdisply("block");
                            }}
                            flags={false}
                            placeholder="Select country"
                            name="nation"
                          />
                          <ErrorMessage
                            name="nation"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>

                        <div className="col-md my-md-3 my-1">
                          <div className="form-group">
                            <PhoneInput
                              disableDropdown
                              placeholder="Enter phone number"
                              country={value?.alpha2?.toLocaleLowerCase()}
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
                            />
                          </div>
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
                                accept="images/*"
                              />
                              <div className="plus-image-overlay">
                                <i className="fa fa-plus"></i>
                              </div>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              name="photograph"
                              id="photo"
                              onChange={(event) => {
                                photoChange(event);
                                setprofileerr("none");
                              }}
                            />
                            <span className="mt-1" style={{ color: "#505050" }}>
                              Profile Picture
                            </span>
                            <span
                              style={{ marginTop: "10px" }}
                              className={`${profileerr} text-danger `}
                            >
                              Profile image required
                            </span>
                            <ErrorMessage
                              name="photograph"
                              component="div"
                              className="m-2 text-danger"
                            />
                          </div>
                        </div>
                        <div
                          className="col-md-9 col-xl-10  my-md-3 my-1"
                          style={{ position: "relative" }}
                        >
                          <Field
                            as="textarea"
                            maxLength="500"
                            className="form-control h-100"
                            id="exampleFormControlTextarea1"
                            rows="9"
                            name="bio"
                            placeholder="About"
                            onKeyPress={handleKeyPress}
                          ></Field>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "-4%",
                              left: "4%",
                            }}
                          >
                            <p>{values.bio.length}/500</p>
                          </div>
                          <ErrorMessage
                            name="bio"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-md-3 col-xl-2 my-md-3 my-1">
                          <div>
                            <div
                              className="form-image-input"
                              onClick={() => {
                                document.getElementById("photo2").click();
                              }}
                            >
                              <img
                                id="imgPreview2"
                                src="/static/images/ImageInput.png"
                                alt="pic"
                                accept="images/*"
                              />
                              <div className="plus-image-overlay">
                                <i className="fa fa-plus"></i>
                              </div>
                            </div>
                            <input
                              style={{ display: "none" }}
                              type="file"
                              accept="image/*"
                              name="photograph_bg"
                              id="photo2"
                              onChange={(event) => {
                                photoChange2(event);
                                setBackImgErr("none");
                              }}
                            />
                            <span style={{ color: "#505050" }}>
                              Cover Image
                            </span>
                            <span
                              style={{ marginTop: "10px" }}
                              className={`${backImgErr} text-danger `}
                            >
                              Cover image required
                            </span>
                            <ErrorMessage
                              name="photograph"
                              component="div"
                              className="m-2 text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-md-9 col-xl-10  my-md-3 my-1">
                          <Field
                            as="textarea"
                            className="form-control"
                            name="job_description"
                            id="exampleFormControlTextarea2"
                            rows="9"
                            placeholder="Job Description"
                          ></Field>

                          <ErrorMessage
                            name="job_description"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md my-md-3 my-1">
                          <div className="create-account-input">
                            <img
                              src="/static/images/LanguagesIcon.png"
                              alt=""
                            />
                            <MultiSelect
                              options={languages}
                              value={language}
                              onChange={(language) => {
                                setFieldValue(
                                  "languages",
                                  language.map((val) => val?.value)
                                );
                                setLanguage(language);
                              }}
                              labelledBy="Select"
                              name="languages"
                            />
                            <ErrorMessage
                              name="languages"
                              component="div"
                              className="m-2 text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-md my-md-3 my-1">
                          <div className="create-account-input">
                            <img
                              src="/static/images/EducationIcon.png"
                              alt=""
                            />
                            <Field
                              id="educationSelect"
                              as="select"
                              value={educationSelect}
                              className="form-select form-education-select"
                              onChange={(e) => {
                                setCertificate("");
                                setEducationSelect(e.target.value);
                                if (e.target.value !== "Other") {
                                  setFieldValue("education", e.target.value);
                                  setEducationInput("");
                                }
                                fileref.current.value = null;
                              }}
                            >
                              <option value="" disabled>
                                Education
                              </option>
                              <option value="Student"> Student</option>
                              <option value="Bachelors"> Bachelors</option>
                              <option value="Masters"> Masters</option>
                              <option value="Other">Other</option>
                            </Field>

                            <ErrorMessage
                              name="education"
                              component="div"
                              className="m-2 text-danger"
                            />

                            <div className="d-flex justify-content-sm-between">
                              <div className="certificate-other">
                                {educationSelect ? (
                                  <div>
                                    <div
                                      onClick={() => {
                                        document
                                          .getElementById("certificate")
                                          .click();
                                      }}
                                    >
                                      <button
                                        type="button"
                                        id="custom-button"
                                        style={{ borderRadius: " 30px" }}
                                      >
                                        Upload Certificate
                                      </button>
                                      <span id="custom-text">
                                        {certificate
                                          ? `${
                                              certificate.name.length > 15
                                                ? certificate.name.slice(
                                                    0,
                                                    15
                                                  ) + certificate.name.slice(-4)
                                                : certificate.name
                                            }`
                                          : " No file chosen, yet."}
                                      </span>
                                    </div>
                                    <input
                                      type="file"
                                      ref={fileref}
                                      name="certificate"
                                      id="certificate"
                                      accept=".jpg, .jpeg, .png, .doc, .docx, .pdf"
                                      onChange={(event) => {
                                        certificateChange(event);
                                        setCerErr("none");
                                      }}
                                    />
                                    <span
                                      style={{ marginTop: "10px" }}
                                      className={`${cerErr} text-danger `}
                                    >
                                      Certificate required
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                              {certificate && (
                                <span
                                  className="d-flex justify-content-center align-items-center"
                                  onClick={removeCertificate}
                                  style={{
                                    zIndex: "88888",
                                  }}
                                >
                                  <AiOutlineCloseCircle />
                                </span>
                              )}
                              <div className="other-education">
                                {educationSelect === "Other" ? (
                                  <input
                                    style={{ padding: "15px 30px" }}
                                    type="text"
                                    className="mt-2"
                                    placeholder="Enter Your Education"
                                    value={educationInput}
                                    onChange={(e) => {
                                      setEducationInput(e.target.value);
                                      setFieldValue(
                                        "education",
                                        e.target.value
                                      );
                                      setEduErr(false);
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="my-md-3 col-md-6  my-1">
                          <div className="create-account-input">
                            <img src="./static/images/SkillsIcon.png" alt="" />

                            <MultiSelect
                              options={contextData.skillsOpt}
                              value={skills}
                              onChange={(skills) => {
                                setFieldValue(
                                  "skills",
                                  skills.map((val) => val?.value)
                                );
                                setSkill(skills);
                              }}
                              labelledBy="Select Skills"
                              name={skills}
                            />

                            <ErrorMessage
                              name="skills"
                              component="div"
                              className="m-2 text-danger"
                            />
                          </div>
                        </div>
                        <div className="my-md-3 col-md-6  my-1">
                          <div className="create-account-input">
                            <img src="./static/images/SkillsIcon.png" alt="" />
                            <Field
                              as="select"
                              name="experience"
                              className="form-select"
                              style={{ cursor: "pointer" }}
                            >
                              <option value="" disabled>
                                Experience
                              </option>
                              {rows.map((years, index) => (
                                <option key={index} value={years}>
                                  {years} Years
                                </option>
                              ))}
                              <option value={45}>45 Years</option>
                            </Field>
                            <ErrorMessage
                              name="experience"
                              component="div"
                              className="m-2 text-danger"
                            />
                          </div>
                        </div>
                      </div>
                      {/* d********************************************************************** */}
                      <div className="row justify-content-center">
                        <div className="col-md my-md-3 my-1">
                          {/* <label htmlFor="price_range"> Minimum Rate Per Square Meter </label> */}
                          <div className="create-account-input">
                            <Field
                              name="price_range"
                              type="number"
                              className="form-control"
                              placeholder="Enter Minimum Rate Per Square Meter in $"
                            />
                            <i class="fa-solid fa-tag"></i>
                            <ErrorMessage
                              name="price_range"
                              component="div"
                              className="m-2 text-danger"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-md-flex align-items-center justify-content-center mt-md-5 my-2">
                        <button
                          type="submit"
                          className="create-account-btn"
                          onClick={() => {
                            if (!filePic) {
                              setprofileerr("block");
                              // return false;
                            }
                            if (!filePic2) {
                              setBackImgErr("block");
                              // return false;
                            }
                            if (!certificate) {
                              setCerErr("block");
                              // return false;
                            }
                          }}
                        >
                          Continue
                          <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                        </button>
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
  }
};

export default SetUp;
