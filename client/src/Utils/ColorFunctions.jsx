import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const [currColor, setCurrColor] = useState("#e5e5e5");
const [drainColor, setDrainColor] = useState("");
const [drainHSL, setDrainHSL] = useState("");
const [colorsInPic, setColorsInPic] = useState([]);
const API_BASE_URL = "https://localhost:3001";

function ColorFunctions() {
  return <div></div>;
}

function handleSelectColor(color) {
  setCurrColor(color);
  setDrainColor(color);
  setDrainHSL(hexToHSL(color));
}

function handleColorChange(e) {
  setCurrColor(e.hex);
  setDrainColor(e.hex);
  setDrainHSL(
    "(" +
      e.hsl.h +
      ", " +
      (e.hsl.s * 100).toFixed(2) +
      ", " +
      (e.hsl.l * 100).toFixed(2) +
      ")"
  );
}

function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "(" + h + ", " + s + ", " + l + ")";
}

const extractColors = async (response1) => {
    const { photoObject } = response1;
    const { photo } = photoObject;

    try {
      const response = await axios.get(`${API_BASE_URL}/datalogs/colors`, {
        params: {
          parseLink: photo.url,
          IMAGGAAPIKEY,
          IMAGGASECRET,
        },
      });
      const result = response.data.result;
      const colors = result.colors;
      const { foreground_colors } = colors;
      const foregroundColorsInPic = [];

      {
        foreground_colors.map((foreground_color) => {
          if (
            !foregroundColorsInPic.includes(
              foreground_color.closest_palette_color_html_code
            )
          ) {
            foregroundColorsInPic.push(
              foreground_color.closest_palette_color_html_code
            );
          }
        });
        setColorsInPic(foregroundColorsInPic);
      }

      const { image_colors } = colors;
      const imageColorsInPic = [];

      {
        image_colors.map((image_color) => {
          if (
            !colorsInPic.includes(
              image_color.closest_palette_color_html_code
            ) &&
            !foregroundColorsInPic.includes(
              image_color.closest_palette_color_html_code
            )
          ) {
            imageColorsInPic.push(image_color.closest_palette_color_html_code);
          }
        });
      }
      setColorsInPic([...imageColorsInPic, ...foregroundColorsInPic]);
    } catch (err) {
      setDataLogError("Error extracting colors. Try again.");
    }
  };

export default {extractColors, handleColorChange, handleSelectColor, currColor, drainColor, drainHSL, colorsInPic, ColorFunctions};
