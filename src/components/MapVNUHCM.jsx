import React, {
  useState,
  useRef,
  useCallback,
  Fragment,
  useEffect,
  useMemo,
} from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Polygon, useMap } from "react-leaflet";
import { useEventHandlers, createControlHook } from "@react-leaflet/core";
import update from "immutability-helper";
import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  LayerGroup,
  Tooltip,
  LayersControl,
  useMapEvents,
  TileLayer,
  Rectangle,
  ZoomControl,
  ScaleControl,
  SVGOverlay,
  useMapEvent,
  Map,
  GeoJSON,
} from "react-leaflet";
import { ImageOverlay } from "react-leaflet/ImageOverlay";
import L from "leaflet";
// import './leaflet.css';
import "leaflet/dist/leaflet.css";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";
import "./style.css";
import { polygon_VNUHCM, islands } from "./data/data";
import { OrderList } from 'primereact/orderlist';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { diahinh } from "./data/diahinh.js";
import CustomTimeline from "./timeline.jsx";
import c1dry_2014 from "./data/raster_realcolor/c1dry_2014.png";
import c2rain_2014 from "./data/raster_realcolor/c2rain_2014.png";
import c3dry_2015 from "./data/raster_realcolor/c3dry_2015.png";
import c4rain_2015 from "./data/raster_realcolor/c4rain_2015.png";
import c5dry_2016 from "./data/raster_realcolor/c5dry_2016.png";
import c6rain_2016 from "./data/raster_realcolor/c6rain_2016.png";
import c7dry_2017 from "./data/raster_realcolor/c7dry_2017.png";
import c8rain_2017 from "./data/raster_realcolor/c8rain_2017.png";
import c9dry_2018 from "./data/raster_realcolor/c9dry_2018.png";
import c10rain_2018 from "./data/raster_realcolor/c10rain_2018.png";
import c11dry_2019 from "./data/raster_realcolor/c11dry_2019.png";
import c12rain_2019 from "./data/raster_realcolor/c12rain_2019.png";
import c13dry_2020 from "./data/raster_realcolor/c13dry_2020.png";
import c14rain_2020 from "./data/raster_realcolor/c14rain_2020.png";
import c15dry_2021 from "./data/raster_realcolor/c15dry_2021.png";
import c16rain_2021 from "./data/raster_realcolor/c16rain_2021.png";
import c17dry_2022 from "./data/raster_realcolor/c17dry_2022.png";
import c18rain_2022 from "./data/raster_realcolor/c18rain_2022.png";
import c19dry_2023 from "./data/raster_realcolor/c19dry_2023.png";
import c20rain_2023 from "./data/raster_realcolor/c20rain_2023_4.png";
import f_c1_dry_2014 from "./data/raster_fakecolor/c1dry_2014.png";
import f_c2_rain_2014 from "./data/raster_fakecolor/c2rain_2014.png";
import f_c3_dry_2015 from "./data/raster_fakecolor/c3dry_2015.png";
import f_c4_rain_2015 from "./data/raster_fakecolor/c4rain_2015.png";
import f_c5_dry_2016 from "./data/raster_fakecolor/c5dry_2016.png";
import f_c6_rain_2016 from "./data/raster_fakecolor/c6rain_2016.png";
import f_c7_dry_2017 from "./data/raster_fakecolor/c7dry_2017.png";
import f_c8_rain_2017 from "./data/raster_fakecolor/c8rain_2017.png";
import f_c9_dry_2018 from "./data/raster_fakecolor/c9dry_2018.png";
import f_c10_rain_2018 from "./data/raster_fakecolor/c10rain_2018.png";
import f_c11_dry_2019 from "./data/raster_fakecolor/c11dry_2019.png";
import f_c12_rain_2019 from "./data/raster_fakecolor/c12rain_2019.png";
import f_c13_dry_2020 from "./data/raster_fakecolor/c13dry_2020.png";
import f_c14_rain_2020 from "./data/raster_fakecolor/c14rain_2020.png";
import f_c15_dry_2021 from "./data/raster_fakecolor/c15dry_2021.png";
import f_c16_rain_2021 from "./data/raster_fakecolor/c16rain_2021.png";
import f_c17_dry_2022 from "./data/raster_fakecolor/c17dry_2022.png";
import f_c18_rain_2022 from "./data/raster_fakecolor/c18rain_2022.png";
import f_c19_dry_2023 from "./data/raster_fakecolor/c19dry_2023.png";
import f_c20_rain_2023 from "./data/raster_fakecolor/c20rain_2023_2.png";
import t_c1dry_2014 from "./data/raster_temp/c1dry_2014Temp.png";
import t_c2rain_2014 from "./data/raster_temp/c2rain_2014Temp.png";
import t_c3dry_2015 from "./data/raster_temp/c3dry_2015Temp.png";
import t_c4rain_2015 from "./data/raster_temp/c4rain_2015Temp.png";
import t_c5dry_2016 from "./data/raster_temp/c5dry_2016Temp.png";
import t_c6rain_2016 from "./data/raster_temp/c6rain_2016Temp.png";
import t_c7dry_2017 from "./data/raster_temp/c7dry_2017Temp.png";
import t_c8rain_2017 from "./data/raster_temp/c8rain_2017Temp.png";
import t_c9dry_2018 from "./data/raster_temp/c9dry_2018Temp.png";
import t_c10rain_2018 from "./data/raster_temp/c10rain_2018Temp.png";
import t_c11dry_2019 from "./data/raster_temp/c11dry_2019Temp.png";
import t_c12rain_2019 from "./data/raster_temp/c12rain_2019Temp.png";
import t_c13dry_2020 from "./data/raster_temp/c13dry_2020Temp.png";
import t_c14rain_2020 from "./data/raster_temp/c14rain_2020Temp.png";
import t_c15dry_2021 from "./data/raster_temp/c15dry_2021Temp.png";
import t_c16rain_2021 from "./data/raster_temp/c16rain_2021Temp.png";
import t_c17dry_2022 from "./data/raster_temp/c17dry_2022Temp.png";
import t_c18rain_2022 from "./data/raster_temp/c18rain_2022Temp.png";
import t_c19dry_2023 from "./data/raster_temp/c19dry_2023Temp.png";
import t_c20rain_2023 from "./data/raster_temp/c20rain_2023Temp.png";
import n_c1dry_2014 from "./data/raster_ndvi/c1dry_2014_NDVI.png";
import n_c2rain_2014 from "./data/raster_ndvi/c2rain_2014_NDVI.png";
import n_c3dry_2015 from "./data/raster_ndvi/c3dry_2015_NDVI.png";
import n_c4rain_2015 from "./data/raster_ndvi/c4rain_2015_NDVI.png";
import n_c5dry_2016 from "./data/raster_ndvi/c5dry_2016_NDVI.png";
import n_c6rain_2016 from "./data/raster_ndvi/c6rain_2016_NDVI.png";
import n_c7dry_2017 from "./data/raster_ndvi/c7dry_2017_NDVI.png";
import n_c8rain_2017 from "./data/raster_ndvi/c8rain_2017_NDVI.png";
import n_c9dry_2018 from "./data/raster_ndvi/c9dry_2018_NDVI.png";
import n_c10rain_2018 from "./data/raster_ndvi/c10rain_2018_NDVI.png";
import n_c11dry_2019 from "./data/raster_ndvi/c11dry_2019_NDVI.png";
import n_c12rain_2019 from "./data/raster_ndvi/c12rain_2019_NDVI.png";
import n_c13dry_2020 from "./data/raster_ndvi/c13dry_2020_NDVI.png";
import n_c14rain_2020 from "./data/raster_ndvi/c14rain_2020_NDVI.png";
import n_c15dry_2021 from "./data/raster_ndvi/c15dry_2021_NDVI.png";
import n_c16rain_2021 from "./data/raster_ndvi/c16rain_2021_NDVI.png";
import n_c17dry_2022 from "./data/raster_ndvi/c17dry_2022_NDVI.png";
import n_c18rain_2022 from "./data/raster_ndvi/c18rain_2022_NDVI.png";
import n_c19dry_2023 from "./data/raster_ndvi/c19dry_2023_NDVI.png";
import n_c20rain_2023 from "./data/raster_ndvi/c20rain_2023_NDVI.png";
import c_c1dry_2014 from "./data/raster_classifer/c1dry_2014_classified.png";
import c_c2rain_2014 from "./data/raster_classifer/c2rain_2014_classified.png";
import c_c3dry_2015 from "./data/raster_classifer/c3dry_2015_classified.png";
import c_c4rain_2015 from "./data/raster_classifer/c4rain_2015_classified.png";
import c_c5dry_2016 from "./data/raster_classifer/c5dry_2016_classified.png";
import c_c6rain_2016 from "./data/raster_classifer/c6rain_2016_classified.png";
import c_c7dry_2017 from "./data/raster_classifer/c7dry_2017_classified.png";
import c_c8rain_2017 from "./data/raster_classifer/c8rain_2017_classified.png";
import c_c9dry_2018 from "./data/raster_classifer/c9dry_2018_classified.png";
import c_c10rain_2018 from "./data/raster_classifer/c10rain_2018_classified.png";
import c_c11dry_2019 from "./data/raster_classifer/c11dry_2019_classified.png";
import c_c12rain_2019 from "./data/raster_classifer/c12rain_2019_classified.png";
import c_c13dry_2020 from "./data/raster_classifer/c13dry_2020_classified.png";
import c_c14rain_2020 from "./data/raster_classifer/c14rain_2020_classified.png";
import c_c15dry_2021 from "./data/raster_classifer/c15dry_2021_classified.png";
import c_c16rain_2021 from "./data/raster_classifer/c16rain_2021_classified.png";
import c_c17dry_2022 from "./data/raster_classifer/c17dry_2022_classified.png";
import c_c18rain_2022 from "./data/raster_classifer/c18rain_2022_classified.png";
import c_c19dry_2023 from "./data/raster_classifer/c19dry_2023_classified.png";
import c_c20rain_2023 from "./data/raster_classifer/c20rain_2023_classified.png";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import img1 from "./c1dry_2014_NDVI.png";
import { Accordion, Card, Col, Container, Form, Row } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function BasicDemo() {
  const list_typeMap2 = [
    {title: "Ảnh phân loại", index: 0},
    {title: "NDVI", index: 1},
    {title: "Nhiệt độ bề mặt", index: 2},
    {title: "Tổ hợp màu giả", index: 3},
    {title: "Tổ hợp màu thật", index: 4},
  ]
  const [products, setProducts] = useState(list_typeMap2);
  


  localStorage.setItem('products', JSON.stringify(products)
);

  

  const itemTemplate = (item) => {
      return (
          <div className="flex flex-wrap align-items-center gap-3">
              <span>{item.title}</span>
          </div>
      );
  };
  // useEffect(() => {
  //   setProducts(list_typeMap2)
    
  // }, [list_typeMap2] );
  return (
      <div className="card xl:flex xl:justify-content-center">
          <OrderList dataKey="id" value={products} onChange={(e) => setProducts(e.value)} itemTemplate={itemTemplate} dragdrop />
      </div>
  )
}

export const MapVNUHCM = () => {
  const [zoom, setZoom] = useState(calculateZoom());
  const [map, setMap] = useState(null);
  const [indexCheck, setIndexCheck] = useState(0);
  const [mapCheck, setMapCheck] = useState(0);
  const [opacity_real, setOpacity_real] = useState(0);
  const [opacity_fake, setOpacity_fake] = useState(0);
  const [opacity_temp, setOpacity_temp] = useState(0);
  const [opacity_ndvi, setOpacity_ndvi] = useState(0);
  const [opacity_classifer, setOpacity_classifer] = useState(1);
  const [opacityTopo, setOpacityTopo] = useState(0);

  function calculateZoom() {
    var screenWidth = window.innerWidth;
    if (screenWidth < 1000) {
      return 13;
    } else if (screenWidth < 1537) {
      return 13;
    } else {
      return 14;
    }
  }

  const center = [10.87930902553062, 106.79516177623837];

  const [zoomLevel, setZoomLevel] = useState(calculateZoom()); // initial zoom level provided for MapContainer

  const checkAllRef = useRef(null);

  function Legend({ map, pos, text }) {
    useEffect(() => {
      if (map) {
        const legend = L.control({ position: pos });

        legend.onAdd = () => {
          const div = L.DomUtil.create("div", "info2 legend2");
          div.innerHTML = text;
          return div;
        };

        legend.addTo(map);

        // Cleanup function to remove the control when component unmounts
        return () => {
          legend.remove();
        };
      }
    }, [map, pos, text]); // Only run the effect when the relevant props change
  }

  const getColor = (gridcode) => {
    const palette = [
      "#00FFC5", // Blue
      "#00FF9A", // Light Blue
      "#00FF6E", // Medium Light Blue
      "#00FF43", // Medium Blue
      "#00FF17", // Medium Dark Blue
      "#33FF00", // Medium Green
      "#66FF00", // Medium Light Green
      "#99FF00", // Light Green
      "#CCFF00", // Very Light Green
      "#FFFF00", // Yellow
      "#FFD200", // Light Orange
      "#FFA600", // Orange
      "#FF7A00", // Medium Orange
      "#FF4E00", // Dark Orange
      "#FF2200", // Red Orange
      "#FF0000", // Red
      "#FF004C", // Medium Dark Red
      "#FF0098", // Medium Red
      "#FF00E4", // Medium Light Red
      "#9900ff", // 
    ];
    const index = Math.floor((gridcode + 6) / 2.7); // Chia khoảng từ -6 đến 46 thành 20 phần
    return palette[index];
  };

  const styleFunction = (feature) => {
    const { gridcode } = feature.properties;
    return {
      fillColor: getColor(gridcode),
      weight: 0,
      color: "white",
      dashArray: "0",
      fillOpacity: opacityTopo,
    };
  };

  const list_layer = [
    [
      "Tổ hợp màu thật",
      [
        [1, 1, 2014, "Mùa khô", c1dry_2014],
        [1, 2, 2014, "Mùa mưa", c2rain_2014],
        [1, 3, 2015, "Mùa khô", c3dry_2015],
        [1, 4, 2015, "Mùa mưa", c4rain_2015],
        [1, 5, 2016, "Mùa khô", c5dry_2016],
        [1, 6, 2016, "Mùa mưa", c6rain_2016],
        [1, 7, 2017, "Mùa khô", c7dry_2017],
        [1, 8, 2017, "Mùa mưa", c8rain_2017],
        [1, 9, 2018, "Mùa khô", c9dry_2018],
        [1, 10, 2018, "Mùa mưa", c10rain_2018],
        [1, 11, 2019, "Mùa khô", c11dry_2019],
        [1, 12, 2019, "Mùa mưa", c12rain_2019],
        [1, 13, 2020, "Mùa khô", c13dry_2020],
        [1, 14, 2020, "Mùa mưa", c14rain_2020],
        [1, 15, 2021, "Mùa khô", c15dry_2021],
        [1, 16, 2021, "Mùa mưa", c16rain_2021],
        [1, 17, 2022, "Mùa khô", c17dry_2022],
        [1, 18, 2022, "Mùa mưa", c18rain_2022],
        [1, 19, 2023, "Mùa khô", c19dry_2023],
        [1, 20, 2023, "Mùa mưa", c20rain_2023],
      ],
    ],
    [
      "Tổ hợp màu giả",
      [
        [1, 1, 2014, "Mùa khô", f_c1_dry_2014],
        [1, 2, 2014, "Mùa mưa", f_c2_rain_2014],
        [1, 3, 2015, "Mùa khô", f_c3_dry_2015],
        [1, 4, 2015, "Mùa mưa", f_c4_rain_2015],
        [1, 5, 2016, "Mùa khô", f_c5_dry_2016],
        [1, 6, 2016, "Mùa mưa", f_c6_rain_2016],
        [1, 7, 2017, "Mùa khô", f_c7_dry_2017],
        [1, 8, 2017, "Mùa mưa", f_c8_rain_2017],
        [1, 9, 2018, "Mùa khô", f_c9_dry_2018],
        [1, 10, 2018, "Mùa mưa", f_c10_rain_2018],
        [1, 11, 2019, "Mùa khô", f_c11_dry_2019],
        [1, 12, 2019, "Mùa mưa", f_c12_rain_2019],
        [1, 13, 2020, "Mùa khô", f_c13_dry_2020],
        [1, 14, 2020, "Mùa mưa", f_c14_rain_2020],
        [1, 15, 2021, "Mùa khô", f_c15_dry_2021],
        [1, 16, 2021, "Mùa mưa", f_c16_rain_2021],
        [1, 17, 2022, "Mùa khô", f_c17_dry_2022],
        [1, 18, 2022, "Mùa mưa", f_c18_rain_2022],
        [1, 19, 2023, "Mùa khô", f_c19_dry_2023],
        [1, 20, 2023, "Mùa mưa", f_c20_rain_2023],
      ],
    ],
    [
      "Nhiệt độ",
      [
        [1, 1, 2014, "Mùa khô", t_c1dry_2014],
        [1, 2, 2014, "Mùa mưa", t_c2rain_2014],
        [1, 3, 2015, "Mùa khô", t_c3dry_2015],
        [1, 4, 2015, "Mùa mưa", t_c4rain_2015],
        [1, 5, 2016, "Mùa khô", t_c5dry_2016],
        [1, 6, 2016, "Mùa mưa", t_c6rain_2016],
        [1, 7, 2017, "Mùa khô", t_c7dry_2017],
        [1, 8, 2017, "Mùa mưa", t_c8rain_2017],
        [1, 9, 2018, "Mùa khô", t_c9dry_2018],
        [1, 10, 2018, "Mùa mưa", t_c10rain_2018],
        [1, 11, 2019, "Mùa khô", t_c11dry_2019],
        [1, 12, 2019, "Mùa mưa", t_c12rain_2019],
        [1, 13, 2020, "Mùa khô", t_c13dry_2020],
        [1, 14, 2020, "Mùa mưa", t_c14rain_2020],
        [1, 15, 2021, "Mùa khô", t_c15dry_2021],
        [1, 16, 2021, "Mùa mưa", t_c16rain_2021],
        [1, 17, 2022, "Mùa khô", t_c17dry_2022],
        [1, 18, 2022, "Mùa mưa", t_c18rain_2022],
        [1, 19, 2023, "Mùa khô", t_c19dry_2023],
        [1, 20, 2023, "Mùa mưa", t_c20rain_2023],
      ],
    ],
    [
      "NDVI",
      [
        [1, 1, 2014, "Mùa khô", n_c1dry_2014],
        [1, 2, 2014, "Mùa mưa", n_c2rain_2014],
        [1, 3, 2015, "Mùa khô", n_c3dry_2015],
        [1, 4, 2015, "Mùa mưa", n_c4rain_2015],
        [1, 5, 2016, "Mùa khô", n_c5dry_2016],
        [1, 6, 2016, "Mùa mưa", n_c6rain_2016],
        [1, 7, 2017, "Mùa khô", n_c7dry_2017],
        [1, 8, 2017, "Mùa mưa", n_c8rain_2017],
        [1, 9, 2018, "Mùa khô", n_c9dry_2018],
        [1, 10, 2018, "Mùa mưa", n_c10rain_2018],
        [1, 11, 2019, "Mùa khô", n_c11dry_2019],
        [1, 12, 2019, "Mùa mưa", n_c12rain_2019],
        [1, 13, 2020, "Mùa khô", n_c13dry_2020],
        [1, 14, 2020, "Mùa mưa", n_c14rain_2020],
        [1, 15, 2021, "Mùa khô", n_c15dry_2021],
        [1, 16, 2021, "Mùa mưa", n_c16rain_2021],
        [1, 17, 2022, "Mùa khô", n_c17dry_2022],
        [1, 18, 2022, "Mùa mưa", n_c18rain_2022],
        [1, 19, 2023, "Mùa khô", n_c19dry_2023],
        [1, 20, 2023, "Mùa mưa", n_c20rain_2023],
      ],
    ],
    [
      "Ảnh sau phân loại",
      [
        [1, 1, 2014, "Mùa khô", c_c1dry_2014],
        [1, 2, 2014, "Mùa mưa", c_c2rain_2014],
        [1, 3, 2015, "Mùa khô", c_c3dry_2015],
        [1, 4, 2015, "Mùa mưa", c_c4rain_2015],
        [1, 5, 2016, "Mùa khô", c_c5dry_2016],
        [1, 6, 2016, "Mùa mưa", c_c6rain_2016],
        [1, 7, 2017, "Mùa khô", c_c7dry_2017],
        [1, 8, 2017, "Mùa mưa", c_c8rain_2017],
        [1, 9, 2018, "Mùa khô", c_c9dry_2018],
        [1, 10, 2018, "Mùa mưa", c_c10rain_2018],
        [1, 11, 2019, "Mùa khô", c_c11dry_2019],
        [1, 12, 2019, "Mùa mưa", c_c12rain_2019],
        [1, 13, 2020, "Mùa khô", c_c13dry_2020],
        [1, 14, 2020, "Mùa mưa", c_c14rain_2020],
        [1, 15, 2021, "Mùa khô", c_c15dry_2021],
        [1, 16, 2021, "Mùa mưa", c_c16rain_2021],
        [1, 17, 2022, "Mùa khô", c_c17dry_2022],
        [1, 18, 2022, "Mùa mưa", c_c18rain_2022],
        [1, 19, 2023, "Mùa khô", c_c19dry_2023],
        [1, 20, 2023, "Mùa mưa", c_c20rain_2023],
      ],
    ],
  ];

  const list_layer2 = [
    [
      1,
      2014,
      "Mùa khô",
      [c1dry_2014, f_c1_dry_2014, t_c1dry_2014, n_c1dry_2014, c_c1dry_2014],
    ],
    [
      2,
      2014,
      "Mùa mưa",
      [
        c2rain_2014,
        f_c2_rain_2014,
        t_c2rain_2014,
        n_c2rain_2014,
        c_c2rain_2014,
      ],
    ],
    [
      3,
      2015,
      "Mùa khô",
      [c3dry_2015, f_c3_dry_2015, t_c3dry_2015, n_c3dry_2015, c_c3dry_2015],
    ],
    [
      4,
      2015,
      "Mùa mưa",
      [
        c4rain_2015,
        f_c4_rain_2015,
        t_c4rain_2015,
        n_c4rain_2015,
        c_c4rain_2015,
      ],
    ],
    [
      5,
      2016,
      "Mùa khô",
      [c5dry_2016, f_c5_dry_2016, t_c5dry_2016, n_c5dry_2016, c_c5dry_2016],
    ],
    [
      6,
      2016,
      "Mùa mưa",
      [
        c6rain_2016,
        f_c6_rain_2016,
        t_c6rain_2016,
        n_c6rain_2016,
        c_c6rain_2016,
      ],
    ],
    [
      7,
      2017,
      "Mùa khô",
      [c7dry_2017, f_c7_dry_2017, t_c7dry_2017, n_c7dry_2017, c_c7dry_2017],
    ],
    [
      8,
      2017,
      "Mùa mưa",
      [
        c8rain_2017,
        f_c8_rain_2017,
        t_c8rain_2017,
        n_c8rain_2017,
        c_c8rain_2017,
      ],
    ],
    [
      9,
      2018,
      "Mùa khô",
      [c9dry_2018, f_c9_dry_2018, t_c9dry_2018, n_c9dry_2018, c_c9dry_2018],
    ],
    [
      10,
      2018,
      "Mùa mưa",
      [
        c10rain_2018,
        f_c10_rain_2018,
        t_c10rain_2018,
        n_c10rain_2018,
        c_c10rain_2018,
      ],
    ],
    [
      11,
      2019,
      "Mùa khô",
      [
        c11dry_2019,
        f_c11_dry_2019,
        t_c11dry_2019,
        n_c11dry_2019,
        c_c11dry_2019,
      ],
    ],
    [
      12,
      2019,
      "Mùa mưa",
      [
        c12rain_2019,
        f_c12_rain_2019,
        t_c12rain_2019,
        n_c12rain_2019,
        c_c12rain_2019,
      ],
    ],
    [
      13,
      2020,
      "Mùa khô",
      [
        c13dry_2020,
        f_c13_dry_2020,
        t_c13dry_2020,
        n_c13dry_2020,
        c_c13dry_2020,
      ],
    ],
    [
      14,
      2020,
      "Mùa mưa",
      [
        c14rain_2020,
        f_c14_rain_2020,
        t_c14rain_2020,
        n_c14rain_2020,
        c_c14rain_2020,
      ],
    ],
    [
      15,
      2021,
      "Mùa khô",
      [
        c15dry_2021,
        f_c15_dry_2021,
        t_c15dry_2021,
        n_c15dry_2021,
        c_c15dry_2021,
      ],
    ],
    [
      16,
      2021,
      "Mùa mưa",
      [
        c16rain_2021,
        f_c16_rain_2021,
        t_c16rain_2021,
        n_c16rain_2021,
        c_c16rain_2021,
      ],
    ],
    [
      17,
      2022,
      "Mùa khô",
      [
        c17dry_2022,
        f_c17_dry_2022,
        t_c17dry_2022,
        n_c17dry_2022,
        c_c17dry_2022,
      ],
    ],
    [
      18,
      2022,
      "Mùa mưa",
      [
        c18rain_2022,
        f_c18_rain_2022,
        t_c18rain_2022,
        n_c18rain_2022,
        c_c18rain_2022,
      ],
    ],
    [
      19,
      2023,
      "Mùa khô",
      [
        c19dry_2023,
        f_c19_dry_2023,
        t_c19dry_2023,
        n_c19dry_2023,
        c_c19dry_2023,
      ],
    ],
    [
      20,
      2023,
      "Mùa mưa",
      [
        c20rain_2023,
        f_c20_rain_2023,
        t_c20rain_2023,
        n_c20rain_2023,
        c_c20rain_2023,
      ],
    ],
  ];
  function layerControlData() {
    return (
      <Fragment>
        {list_layer2.map((item, index) => {
          return (
            <Fragment key={index}>
              <LayersControl.BaseLayer
                key={index}
                name={item[0]}
                checked={indexCheck - 1 === index ? true : false}
              >
                <LayerGroup>
                  <ImageOverlay
                    url={item[3][0]}
                    bounds={polygon_VNUHCM}
                    opacity={opacity_real}
                  />
                  <ImageOverlay
                    url={item[3][1]}
                    bounds={polygon_VNUHCM}
                    opacity={opacity_fake}
                  />
                  <ImageOverlay
                    url={item[3][2]}
                    bounds={polygon_VNUHCM}
                    opacity={opacity_temp}
                  />
                  <ImageOverlay
                    url={item[3][3]}
                    bounds={polygon_VNUHCM}
                    opacity={opacity_ndvi}
                  />
                  <ImageOverlay
                    url={item[3][4]}
                    bounds={polygon_VNUHCM}
                    opacity={opacity_classifer}
                  />
                </LayerGroup>
              </LayersControl.BaseLayer>
            </Fragment>
          );
        })}

        <LayersControl.Overlay name={`Địa hình`} checked >
          <LayerGroup>
            {diahinh.features.map((feature, i) => {
              return (
                <GeoJSON 
                key={i} 
                data={feature} 
                style={styleFunction}
                
                >
                  <Tooltip sticky>
                   <strong>{feature.properties.gridcode}m</strong>
                  </Tooltip>
                </GeoJSON>
              );
            })}
          </LayerGroup>
        </LayersControl.Overlay>
      </Fragment>
    );
  }

  const list_map = ["Navigation", "Topographic", "Imagery"];

  const Base_map = () => {
    return (
      <Fragment>
        <LayersControl position="topright" collapsed={true}>
          {list_map.map((item, index) => {
            return (
              <LayersControl.Overlay
                key={index}
                name={item}
                checked={mapCheck === index ? true : false}
              >
                <VectorBasemapLayer
                  apiKey="AAPKc84180eb554748db8f9c5610ea258426GjMeZS-ZZoTcACKRfs7uvF3tG2wQHkLPDjqlq2KXIYiqwdOADtwgFlq4g72h0mBn"
                  name={`ArcGIS:${item}`}
                  token=""
                />
              </LayersControl.Overlay>
            );
          })}
        </LayersControl>
      </Fragment>
    );
  };

  // Classes used by Leaflet to position controls
  const POSITION_CLASSES = {
    bottomleft: "leaflet-bottom leaflet-left",
    bottomright: "leaflet-bottom leaflet-right",
    topleft: "leaflet-top leaflet-left",
    topright: "leaflet-top leaflet-right",
  };

  const BOUNDS_STYLE = { weight: 1 };

  function MinimapBounds({ parentMap, zoom }) {
    const minimap = useMap();

    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
      (e) => {
        parentMap.setView(e.latlng, parentMap.getZoom());
      },
      [parentMap]
    );
    useMapEvent("click", onClick);

    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds());
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds());
      // Update the minimap's view to match the parent map's center and zoom
      minimap.setView(parentMap.getCenter(), zoom);
    }, [minimap, parentMap, zoom]);

    // Listen to events on the parent map
    const handlers = useMemo(
      () => ({ move: onChange, zoom: onChange }),
      [onChange]
    );
    useEventHandlers({ instance: parentMap }, handlers);

    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
  }

  function MinimapControl({ position, zoom }) {
    const parentMap = useMap();
    const mapZoom = zoom || 6;

    // Memoize the minimap so it's not affected by position changes
    const minimap = useMemo(
      () => (
        <MapContainer
          style={{
            height: window.innerWidth < 1000 ? 80 : 120,
            width: window.innerWidth < 1000 ? 80 : 120,
          }}
          center={parentMap.getCenter()}
          zoom={zoom}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >
                <VectorBasemapLayer
                  apiKey="AAPKc84180eb554748db8f9c5610ea258426GjMeZS-ZZoTcACKRfs7uvF3tG2wQHkLPDjqlq2KXIYiqwdOADtwgFlq4g72h0mBn"
                  name={`ArcGIS:Topographic`}
                  token=""
                />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      [parentMap, mapZoom]
    );

    const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
    return (
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{minimap}</div>
      </div>
    );
  }

  function add_text(re_zoom, { data }) {
    if (re_zoom > 4) {
      return (
        <>
          {data.map((item) => (
            <Marker
              key={item.name}
              position={item.coords}
              icon={L.divIcon({
                className: "my-div-icon",
                html: `${item.name}`,
                iconSize: [120, 40],
              })}
            />
          ))}
        </>
      );
    }
  }

  function Map() {
    return (
      <div>
        <MapContainer
          center={center}
          zoom={zoom}
          minZoom={calculateZoom()}
          maxZoom={16}
          //   step={1}
          //scrollWheelZoom={true}
          maxBounds={
            polygon_VNUHCM
          }
          ref={setMap}
          zoomControl={false}
        >
          <ZoomControl position={window.innerWidth < window.innerHeight ? "bottomleft" : "topleft"} />
          {Base_map()}

          <LayersControl position={"topright"} collapsed={false}>
            {layerControlData()}
          </LayersControl>

          <MinimapControl position={window.innerWidth < window.innerHeight ? "topleft" : "bottomright"}  zoom={calculateZoom()-5}/>
          <ScaleControl position={window.innerWidth < window.innerHeight ? "bottomright" : "bottomleft"} />
          {add_text(zoomLevel, { data: islands })}
        </MapContainer>
        {/* <DisplayPosition1 map={map} /> */}
        {/* <div className="cc" style={{ display: "flex", position: "absolute" }}>
          <DisplayPosition1 map={map} />
          <DisplayPosition2 map={map} />
          <DisplayPosition3 map={map} />
        </div> */}
      </div>
    );
  }

  function toggleInfo(mode) {
    var info = document.getElementById("info");
    if (mode === "close") {
      info.classList.remove("active");
    } else {
      info.classList.toggle("active");
    }
  }
  // const [currentFrame, setCurrentFrame] = useState(1);
  const handleCurrentFrameChange = (frame) => {
    setIndexCheck(frame);
  };

  const handleCurrentMapChange = (map) => {
    setMapCheck(map);
  };

  useEffect(() => {
    // console.log(localStorage.getItem("currentFrame"));
    // document.addEventListener("contextmenu", function (event) {
    //   event.preventDefault();
    // });
    window.addEventListener("keydown", function (event) {
      if (event.keyCode === 123) {
        // 123 là mã phím của F12
        event.preventDefault();
        return false;
      }
    });
    window.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.keyCode === 85) {
        // 85 là mã phím của U
        event.preventDefault();
        return false;
      }
    });
    window.addEventListener("keydown", function (event) {
      if (
        (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ngăn chặn Ctrl + Shift + I
        (event.ctrlKey && event.shiftKey && event.keyCode === 74)
      ) {
        // Ngăn chặn Ctrl + Shift + J
        event.preventDefault();
      }
    });
  }, [map]);

  const [show, setShow] = useState(true);

  const toggleShow = () => setShow((s) => !s);

  const list_typeMap = [
    ["Ảnh phân loại", opacity_classifer, setOpacity_classifer,0],
    ["NDVI", opacity_ndvi, setOpacity_ndvi,1],
    ["Nhiệt độ bề mặt", opacity_temp, setOpacity_temp, 2],
    ["Tổ hợp màu giả", opacity_fake, setOpacity_fake, 3],
    ["Tổ hợp màu thật", opacity_real, setOpacity_real, 4],
  ];



 

  
  
  return (
    <div className="MAP">
          <Button variant="primary" onClick={toggleShow} className="button_new">
            <FontAwesomeIcon icon={faSlidersH} />
          </Button>
      <div className="main">
        <div className="background">
          <Offcanvas
            show={show}
            onHide={toggleShow}
            placement={"end"}
            scroll={true}
            backdropClassName="backdrop"
            
            bsPrefix="offcanvas"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Timelapse Map VNUHCM <br/> 2014 - 2023</Offcanvas.Title>
              
            </Offcanvas.Header>
            <Offcanvas.Body className="over-flow-auto">
              <Container>
              <Row className="mb-1 user-select-none">
              <Accordion defaultActiveKey="0" className="m-0 p-0">
                    <Accordion.Item>
                      <Accordion.Header>Thông tin chi tiết</Accordion.Header>
                      <Accordion.Body style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                      <strong style={{textAlign: 'center'}}>TRƯỜNG ĐẠI HỌC KHOA HỌC XÃ HỘI VÀ NHÂN VĂN, ĐHQG-HCM</strong>
                      <br/>
                        <strong style={{textAlign: 'center'}}>Đề tài nghiên cứu khoa học sinh viên cấp trường năm 2024</strong>
                        <Card.Text>
                        <br/>
                          Sản phẩm của đề tài:
                           <strong> Ứng dụng GIS, viễn thám trong phân tích biến động mảng xanh đô thị và nhiệt độ đô thị bề mặt khu đô thị ĐHQG-HCM giai đoạn 2014-2023.</strong>
                          <br/>
                          Nhóm nghiên cứu: <br/><strong>(1) Mai Thư Lâm (chủ nhiệm) <br/>(2) Nguyễn Thuận Phong (thành viên)</strong> 
                        </Card.Text>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
              </Row>
                <Row className="mb-1 user-select-none">
                  <Card>
                    <Card.Body>
                      <Card.Title>Chọn bản đồ nền</Card.Title>
                      <Form>
                        <Form.Group
                        
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check
                            type="radio"
                            label={`Street`}
                            onChange={() => handleCurrentMapChange(0)}
                            name="formHorizontalRadios"
                            checked={mapCheck === 0 ? true : false}
                            id="formHorizontalRadios1"
                          />
                          <Form.Check
                            type="radio"
                            label={`Topographic`}
                            onChange={() => handleCurrentMapChange(1)}
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                          />
                          <Form.Check
                            type="radio"
                            label={`Imagery`}
                            onChange={() => handleCurrentMapChange(2)}
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                          />

                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </Row>
                
                <Row className="mb-1 user-select-none">
                  <Card>
                    <Card.Body>
                      <Card.Title>Chọn loại bản đồ</Card.Title>
                      <Form>
                        <Form.Group
                          className="mb-1"
                          controlId="formHorizontalCa"
                        >
                        <Row>
                          <Col xs={7} sm={6} md={6} lg={6} className="p-0" >
                            <Form.Check
                              type="checkbox"
                              label={`Địa hình`}
                              onChange={() =>
                                setOpacityTopo(opacityTopo === 1 ? 0 : 1)
                              }
                              name="formHorizontalC"
                              checked={opacityTopo > 0 ? true : false}
                              id={`formHorizontalCa`}
                              className="cursor-pointer"
                            />
                          </Col>
                          <Col xs={4} sm={4} md={4} lg={4} >
                            <Form.Range
                              value={opacityTopo}
                              onChange={(e) => setOpacityTopo(e.target.value)}
                              step={0.1}
                              min={0}
                              max={1}
                            />
                          </Col>
                          <Col xs={1} sm={2} md={2} lg={2} className="p-0">
                            <Form.Text>{(opacityTopo*100).toFixed()}</Form.Text>
                          </Col>
                          </Row>
                          <Row>
                          {list_typeMap.map((item, index) => {
                            return (
                              <Fragment key={index}>
                                <Col xs={7} sm={6} md={6} lg={6} key={index} className="p-0">
                                  <Form.Check
                                    type="checkbox"
                                    label={`${item[0]}`}
                                    onChange={() =>
                                      item[2](item[1] === 1 ? 0 : 1)
                                    }
                                    name="formHorizontalC"
                                    checked={item[1] > 0 ? true : false}
                                    id={`formHorizontalC${index}`}
                                  />
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} >
                                  <Form.Range
                                    value={item[1]}
                                    onChange={(e) => item[2](e.target.value)}
                                    step={0.01}
                                    min={0}
                                    max={1}
                                  />
                                </Col>
                                <Col xs={1} sm={2} md={2} lg={2} className="p-0">
                                  <Form.Text>{(item[1]*100).toFixed()}%</Form.Text>
                                </Col>  
                              </Fragment>
                            );
                          })}
                              {/* <Row className="abc">
                                  {BasicDemo()}
                              </Row> */}
                          </Row>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </Row>
                <Row className="mb-1 user-select-none">
                  <Card>
                    <Card.Body>
                      <Card.Title>Chú giải</Card.Title>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="formHorizontalCa"
                        >
                          <Row>
                            <Col>
                              <Card.Text
                                style={{ fontWeight: "bold"}}
                                className="mb-1"
                              >Địa hình (m)</Card.Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={2} sm={2} md={2} lg={2}>
                              <div style={{ fontSize: '0.8rem'}}>0m</div>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8}  className="topo" style={{ borderWidth: '1px', borderStyle: 'solid'}}>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}  >
                              <div style={{ fontSize: '0.8rem'}}>46m</div>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col>
                              <Card.Text
                                style={{ fontWeight: "bold"}}
                                className="mb-1"
                              >Phân loại</Card.Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4} sm={4} md={4} lg={4}>
                              <div >Đất trống</div>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}  style={{backgroundColor: '#895A44', borderWidth: '1px', borderStyle: 'solid'}}>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4}>
                              <div >Thực vật</div>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} style={{backgroundColor: '#38A800', borderWidth: '1px', borderStyle: 'solid'}}>
                            </Col>
                          </Row>
                          <Row className="mt-1">
                            <Col xs={4} sm={4} md={4} lg={4}>
                              <div >Mặt nước</div>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}  style={{backgroundColor: '#00C5FF', borderWidth: '1px', borderStyle: 'solid'}}>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4}>
                              <div >CTXD</div>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}  style={{backgroundColor: '#FF5500', borderWidth: '1px', borderStyle: 'solid'}} >
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col>
                              <Card.Text
                                style={{ fontWeight: "bold"}}
                                className="mb-1"
                              >Chỉ số NDVI</Card.Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={2} sm={2} md={2} lg={2}>
                              <div style={{ fontSize: '0.8rem'}}>-1</div>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8}  className="topo2" style={{ borderWidth: '1px', borderStyle: 'solid'}}>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                              <div style={{ fontSize: '0.8rem'}}>1</div>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col>
                              <Card.Text
                                style={{ fontWeight: "bold"}}
                                className="mb-1"
                              >Nhiệt độ bề mặt</Card.Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={2} sm={2} md={2} lg={2}>
                              <div style={{ fontSize: '0.8rem'}}>30</div>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8}  className="topo3"style={{ borderWidth: '1px', borderStyle: 'solid'}}>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                              <div style={{ fontSize: '0.8rem'}}>60+</div>
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </Row>

              </Container>
            </Offcanvas.Body>
          </Offcanvas>
          {/* <div id="title">
            <h1 className="hh1">DEMO BẢN ĐỒ NCKH</h1>
          </div> */}
        </div>
        <div className="m">{Map()}</div>
        <CustomTimeline onCurrentFrameChange={handleCurrentFrameChange} />
        {/* <div className="line" /> */}
      </div>
    </div>
  );
};
