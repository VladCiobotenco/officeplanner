import React, { useMemo, useState, useEffect } from "react";
import "./App.css";
import floorplanImg from "./floorplan.jpeg";

// Desks + rooms positions in % of image
const RESOURCES = [
  // Top row desks right (adjust x/y as needed)
  { id: "desk-t-01", type: "desk", label: "Desk T01", x: 31.5, y: 12 },
  { id: "desk-t-02", type: "desk", label: "Desk T02", x: 31.5, y: 16.5 },
  { id: "desk-t-03", type: "desk", label: "Desk T03", x: 31.5, y: 21 },

  { id: "desk-t-04", type: "desk", label: "Desk T04", x: 37, y: 12 },
  { id: "desk-t-05", type: "desk", label: "Desk T05", x: 37, y: 16.5 },
  { id: "desk-t-06", type: "desk", label: "Desk T06", x: 37, y: 21 },

  { id: "desk-t-07", type: "desk", label: "Desk T07", x: 39, y: 12 },
  { id: "desk-t-08", type: "desk", label: "Desk T08", x: 39, y: 16.5 },
  { id: "desk-t-09", type: "desk", label: "Desk T09", x: 39, y: 21 },

  { id: "desk-t-10", type: "desk", label: "Desk T10", x: 44.5, y: 12 },
  { id: "desk-t-11", type: "desk", label: "Desk T11", x: 44.5, y: 16.5 },
  { id: "desk-t-12", type: "desk", label: "Desk T12", x: 44.5, y: 21 },

  { id: "desk-t-13", type: "desk", label: "Desk T13", x: 46.5, y: 12 },
  { id: "desk-t-14", type: "desk", label: "Desk T14", x: 46.5, y: 16.5 },
  { id: "desk-t-15", type: "desk", label: "Desk T15", x: 46.5, y: 21 },

  { id: "desk-t-16", type: "desk", label: "Desk T16", x: 52.5, y: 12 },
  { id: "desk-t-17", type: "desk", label: "Desk T17", x: 52.5, y: 16.5 },
  { id: "desk-t-18", type: "desk", label: "Desk T18", x: 52.5, y: 21 },

  { id: "desk-t-19", type: "desk", label: "Desk T19", x: 54.5, y: 12 },
  { id: "desk-t-20", type: "desk", label: "Desk T20", x: 54.5, y: 16.5 },
  { id: "desk-t-21", type: "desk", label: "Desk T21", x: 54.5, y: 21 },

  { id: "desk-t-22", type: "desk", label: "Desk T22", x: 60, y: 12 },
  { id: "desk-t-23", type: "desk", label: "Desk T23", x: 60, y: 16.5 },
  { id: "desk-t-24", type: "desk", label: "Desk T24", x: 60, y: 21 },

  { id: "desk-t-25", type: "desk", label: "Desk T25", x: 62.5, y: 12 },
  { id: "desk-t-26", type: "desk", label: "Desk T26", x: 62.5, y: 16.5 },
  { id: "desk-t-27", type: "desk", label: "Desk T27", x: 62.5, y: 21 },

  { id: "desk-t-28", type: "desk", label: "Desk T28", x: 68, y: 12 },
  { id: "desk-t-29", type: "desk", label: "Desk T29", x: 68, y: 16.5 },
  { id: "desk-t-30", type: "desk", label: "Desk T30", x: 68, y: 21 },

  { id: "desk-t-31", type: "desk", label: "Desk T31", x: 70, y: 12 },
  { id: "desk-t-32", type: "desk", label: "Desk T32", x: 70, y: 16.5 },
  { id: "desk-t-33", type: "desk", label: "Desk T33", x: 70, y: 21 },

  { id: "desk-t-34", type: "desk", label: "Desk T34", x: 76, y: 12 },
  { id: "desk-t-35", type: "desk", label: "Desk T35", x: 76, y: 16.5 },
  { id: "desk-t-36", type: "desk", label: "Desk T36", x: 76, y: 21 },

  { id: "desk-t-37", type: "desk", label: "Desk T37", x: 78, y: 12 },
  { id: "desk-t-38", type: "desk", label: "Desk T38", x: 78, y: 16.5 },
  { id: "desk-t-39", type: "desk", label: "Desk T39", x: 78, y: 21 },

  { id: "desk-t-40", type: "desk", label: "Desk T40", x: 84, y: 12 },
  { id: "desk-t-41", type: "desk", label: "Desk T41", x: 84, y: 16.5 },
  { id: "desk-t-42", type: "desk", label: "Desk T42", x: 84, y: 21 },

  { id: "desk-t-43", type: "desk", label: "Desk T43", x: 85.8, y: 12 },
  { id: "desk-t-44", type: "desk", label: "Desk T44", x: 85.8, y: 16.5 },
  { id: "desk-t-45", type: "desk", label: "Desk T45", x: 85.8, y: 21 },

  { id: "desk-t-46", type: "desk", label: "Desk T46", x: 92, y: 12 },
  { id: "desk-t-47", type: "desk", label: "Desk T47", x: 92, y: 16.5 },
  { id: "desk-t-48", type: "desk", label: "Desk T48", x: 92, y: 21 },

  //top row desks left
  { id: "desk-t-49", type: "desk", label: "Desk T49", x: 103, y: 12 },
  { id: "desk-t-50", type: "desk", label: "Desk T50", x: 103, y: 16.5 },
  { id: "desk-t-51", type: "desk", label: "Desk T51", x: 103, y: 21 },

  { id: "desk-t-52", type: "desk", label: "Desk T52", x: 108, y: 12 },
  { id: "desk-t-53", type: "desk", label: "Desk T53", x: 108, y: 16.5 },
  { id: "desk-t-54", type: "desk", label: "Desk T54", x: 108, y: 21 },

  { id: "desk-t-55", type: "desk", label: "Desk T55", x: 110.5, y: 12 },
  { id: "desk-t-56", type: "desk", label: "Desk T56", x: 110.5, y: 16.5 },
  { id: "desk-t-57", type: "desk", label: "Desk T57", x: 110.5, y: 21 },

  { id: "desk-t-58", type: "desk", label: "Desk T58", x: 116, y: 12 },
  { id: "desk-t-59", type: "desk", label: "Desk T59", x: 116, y: 16.5 },
  { id: "desk-t-60", type: "desk", label: "Desk T60", x: 116, y: 21 },

  { id: "desk-t-61", type: "desk", label: "Desk T61", x: 118, y: 12 },
  { id: "desk-t-62", type: "desk", label: "Desk T62", x: 118, y: 16.5 },
  { id: "desk-t-63", type: "desk", label: "Desk T63", x: 118, y: 21 },

  { id: "desk-t-64", type: "desk", label: "Desk T64", x: 123.5, y: 12 },
  { id: "desk-t-65", type: "desk", label: "Desk T65", x: 123.5, y: 16.5 },
  { id: "desk-t-66", type: "desk", label: "Desk T66", x: 123.5, y: 21 },

  { id: "desk-t-67", type: "desk", label: "Desk T67", x: 125.5, y: 12 },
  { id: "desk-t-68", type: "desk", label: "Desk T68", x: 125.5, y: 16.5 },
  { id: "desk-t-69", type: "desk", label: "Desk T69", x: 125.5, y: 21 },

  { id: "desk-t-70", type: "desk", label: "Desk T70", x: 131.5, y: 12 },
  { id: "desk-t-71", type: "desk", label: "Desk T71", x: 131.5, y: 16.5 },
  { id: "desk-t-72", type: "desk", label: "Desk T72", x: 131.5, y: 21 },

  { id: "desk-t-73", type: "desk", label: "Desk T73", x: 134, y: 12 },
  { id: "desk-t-74", type: "desk", label: "Desk T74", x: 134, y: 16.5 },
  { id: "desk-t-75", type: "desk", label: "Desk T75", x: 134, y: 21 },

  { id: "desk-t-76", type: "desk", label: "Desk T76", x: 139, y: 12 },
  { id: "desk-t-77", type: "desk", label: "Desk T77", x: 139, y: 16.5 },
  { id: "desk-t-78", type: "desk", label: "Desk T78", x: 139, y: 21 },

  { id: "desk-t-79", type: "desk", label: "Desk T79", x: 141.5, y: 12 },
  { id: "desk-t-80", type: "desk", label: "Desk T80", x: 141.5, y: 16.5 },
  { id: "desk-t-81", type: "desk", label: "Desk T81", x: 141.5, y: 21 },

  { id: "desk-t-82", type: "desk", label: "Desk T82", x: 147.5, y: 12 },
  { id: "desk-t-83", type: "desk", label: "Desk T83", x: 147.5, y: 16.5 },
  { id: "desk-t-84", type: "desk", label: "Desk T84", x: 147.5, y: 21 },

  { id: "desk-t-85", type: "desk", label: "Desk T85", x: 149.5, y: 12 },
  { id: "desk-t-86", type: "desk", label: "Desk T86", x: 149.5, y: 16.5 },
  { id: "desk-t-87", type: "desk", label: "Desk T87", x: 149.5, y: 21 },

  { id: "desk-t-88", type: "desk", label: "Desk T88", x: 155, y: 12 },
  { id: "desk-t-89", type: "desk", label: "Desk T89", x: 155, y: 16.5 },
  { id: "desk-t-90", type: "desk", label: "Desk T90", x: 155, y: 21 },

  { id: "desk-t-91", type: "desk", label: "Desk T91", x: 157, y: 12 },
  { id: "desk-t-92", type: "desk", label: "Desk T92", x: 157, y: 16.5 },
  { id: "desk-t-93", type: "desk", label: "Desk T93", x: 157, y: 21 },

  { id: "desk-t-94", type: "desk", label: "Desk T94", x: 163, y: 12 },
  { id: "desk-t-95", type: "desk", label: "Desk T95", x: 163, y: 16.5 },
  { id: "desk-t-96", type: "desk", label: "Desk T96", x: 163, y: 21 },

  { id: "desk-t-97", type: "desk", label: "Desk T97", x: 165, y: 12 },
  { id: "desk-t-98", type: "desk", label: "Desk T98", x: 165, y: 16.5 },
  { id: "desk-t-99", type: "desk", label: "Desk T99", x: 165, y: 21 },

  { id: "desk-t-100", type: "desk", label: "Desk T100", x: 170.5, y: 12 },
  { id: "desk-t-101", type: "desk", label: "Desk T101", x: 170.5, y: 16.5 },
  { id: "desk-t-102", type: "desk", label: "Desk T102", x: 170.5, y: 21 },

  { id: "desk-t-103", type: "desk", label: "Desk T103", x: 172.5, y: 12 },
  { id: "desk-t-104", type: "desk", label: "Desk T104", x: 172.5, y: 16.5 },
  { id: "desk-t-105", type: "desk", label: "Desk T105", x: 172.5, y: 21 },

  { id: "desk-t-106", type: "desk", label: "Desk T106", x: 178.5, y: 12 },
  { id: "desk-t-107", type: "desk", label: "Desk T107", x: 178.5, y: 16.5 },
  { id: "desk-t-108", type: "desk", label: "Desk T108", x: 178.5, y: 21 },

  // Bottom row desks right
  { id: "desk-b-01", type: "desk", label: "Desk B01", x: 31.5, y: 79.5 },
  { id: "desk-b-02", type: "desk", label: "Desk B02", x: 31.5, y: 84 },
  { id: "desk-b-03", type: "desk", label: "Desk B03", x: 31.5, y: 89 },

  { id: "desk-b-04", type: "desk", label: "Desk B04", x: 37, y: 79.5 },
  { id: "desk-b-05", type: "desk", label: "Desk B05", x: 37, y: 84 },
  { id: "desk-b-06", type: "desk", label: "Desk B06", x: 37, y: 89 },

  { id: "desk-b-07", type: "desk", label: "Desk B07", x: 39, y: 79.5 },
  { id: "desk-b-08", type: "desk", label: "Desk B08", x: 39, y: 84 },
  { id: "desk-b-09", type: "desk", label: "Desk B09", x: 39, y: 89 },

  { id: "desk-b-10", type: "desk", label: "Desk B10", x: 44.5, y: 79.5 },
  { id: "desk-b-11", type: "desk", label: "Desk B11", x: 44.5, y: 84 },
  { id: "desk-b-12", type: "desk", label: "Desk B12", x: 44.5, y: 89 },

  { id: "desk-b-13", type: "desk", label: "Desk B13", x: 46.5, y: 79.5 },
  { id: "desk-b-14", type: "desk", label: "Desk B14", x: 46.5, y: 84 },
  { id: "desk-b-15", type: "desk", label: "Desk B15", x: 46.5, y: 89 },

  { id: "desk-b-16", type: "desk", label: "Desk B16", x: 52.5, y: 79.5 },
  { id: "desk-b-17", type: "desk", label: "Desk B17", x: 52.5, y: 84 },
  { id: "desk-b-18", type: "desk", label: "Desk B18", x: 52.5, y: 89 },

  { id: "desk-b-19", type: "desk", label: "Desk B19", x: 54.5, y: 79.5 },
  { id: "desk-b-20", type: "desk", label: "Desk B20", x: 54.5, y: 84 },
  { id: "desk-b-21", type: "desk", label: "Desk B21", x: 54.5, y: 89 },

  { id: "desk-b-22", type: "desk", label: "Desk B22", x: 60, y: 79.5 },
  { id: "desk-b-23", type: "desk", label: "Desk B23", x: 60, y: 84 },
  { id: "desk-b-24", type: "desk", label: "Desk B24", x: 60, y: 89 },

  { id: "desk-b-25", type: "desk", label: "Desk B25", x: 62.5, y: 79.5 },
  { id: "desk-b-26", type: "desk", label: "Desk B26", x: 62.5, y: 84 },
  { id: "desk-b-27", type: "desk", label: "Desk B27", x: 62.5, y: 89 },

  { id: "desk-b-28", type: "desk", label: "Desk B28", x: 68, y: 79.5 },
  { id: "desk-b-29", type: "desk", label: "Desk B29", x: 68, y: 84 },
  { id: "desk-b-30", type: "desk", label: "Desk B30", x: 68, y: 89 },

  { id: "desk-b-31", type: "desk", label: "Desk B31", x: 70, y: 79.5 },
  { id: "desk-b-32", type: "desk", label: "Desk B32", x: 70, y: 84 },
  { id: "desk-b-33", type: "desk", label: "Desk B33", x: 70, y: 89 },

  { id: "desk-b-34", type: "desk", label: "Desk B34", x: 76, y: 79.5 },
  { id: "desk-b-35", type: "desk", label: "Desk B35", x: 76, y: 84 },
  { id: "desk-b-36", type: "desk", label: "Desk B36", x: 76, y: 89 },

  { id: "desk-b-37", type: "desk", label: "Desk B37", x: 78, y: 79.5 },
  { id: "desk-b-38", type: "desk", label: "Desk B38", x: 78, y: 84 },
  { id: "desk-b-39", type: "desk", label: "Desk B39", x: 78, y: 89 },

  { id: "desk-b-40", type: "desk", label: "Desk B40", x: 84, y: 79.5 },
  { id: "desk-b-41", type: "desk", label: "Desk B41", x: 84, y: 84 },
  { id: "desk-b-42", type: "desk", label: "Desk B42", x: 84, y: 89 },

  { id: "desk-b-43", type: "desk", label: "Desk B43", x: 85.8, y: 79.5 },
  { id: "desk-b-44", type: "desk", label: "Desk B44", x: 85.8, y: 84 },
  { id: "desk-b-45", type: "desk", label: "Desk B45", x: 85.8, y: 89 },

  { id: "desk-b-46", type: "desk", label: "Desk B46", x: 92, y: 79.5 },
  { id: "desk-b-47", type: "desk", label: "Desk B47", x: 92, y: 84 },
  { id: "desk-b-48", type: "desk", label: "Desk B48", x: 92, y: 89 },

  { id: "desk-b-49", type: "desk", label: "Desk B49", x: 103, y: 79.5 },
  { id: "desk-b-50", type: "desk", label: "Desk B50", x: 103, y: 84 },
  { id: "desk-b-51", type: "desk", label: "Desk B51", x: 103, y: 89 },

  { id: "desk-b-52", type: "desk", label: "Desk B52", x: 108, y: 79.5 },
  { id: "desk-b-53", type: "desk", label: "Desk B53", x: 108, y: 84 },
  { id: "desk-b-54", type: "desk", label: "Desk B54", x: 108, y: 89 },

  { id: "desk-b-55", type: "desk", label: "Desk B55", x: 110.5, y: 79.5 },
  { id: "desk-b-56", type: "desk", label: "Desk B56", x: 110.5, y: 84 },
  { id: "desk-b-57", type: "desk", label: "Desk B57", x: 110.5, y: 89 },

  { id: "desk-b-58", type: "desk", label: "Desk B58", x: 116, y: 79.5 },
  { id: "desk-b-59", type: "desk", label: "Desk B59", x: 116, y: 84 },
  { id: "desk-b-60", type: "desk", label: "Desk B60", x: 116, y: 89 },

  { id: "desk-b-61", type: "desk", label: "Desk B61", x: 118, y: 79.5 },
  { id: "desk-b-62", type: "desk", label: "Desk B62", x: 118, y: 84 },
  { id: "desk-b-63", type: "desk", label: "Desk B63", x: 118, y: 89 },

  { id: "desk-b-64", type: "desk", label: "Desk B64", x: 123.5, y: 79.5 },
  { id: "desk-b-65", type: "desk", label: "Desk B65", x: 123.5, y: 84 },
  { id: "desk-b-66", type: "desk", label: "Desk B66", x: 123.5, y: 89 },

  { id: "desk-b-67", type: "desk", label: "Desk B67", x: 125.5, y: 79.5 },
  { id: "desk-b-68", type: "desk", label: "Desk B68", x: 125.5, y: 84 },
  { id: "desk-b-69", type: "desk", label: "Desk B69", x: 125.5, y: 89 },

  { id: "desk-b-70", type: "desk", label: "Desk B70", x: 131.5, y: 79.5 },
  { id: "desk-b-71", type: "desk", label: "Desk B71", x: 131.5, y: 84 },
  { id: "desk-b-72", type: "desk", label: "Desk B72", x: 131.5, y: 89 },

  { id: "desk-b-73", type: "desk", label: "Desk B73", x: 134, y: 79.5 },
  { id: "desk-b-74", type: "desk", label: "Desk B74", x: 134, y: 84 },
  { id: "desk-b-75", type: "desk", label: "Desk B75", x: 134, y: 89 },

  { id: "desk-b-76", type: "desk", label: "Desk B76", x: 139, y: 79.5 },
  { id: "desk-b-77", type: "desk", label: "Desk B77", x: 139, y: 84 },
  { id: "desk-b-78", type: "desk", label: "Desk B78", x: 139, y: 89 },

  { id: "desk-b-79", type: "desk", label: "Desk B79", x: 141.5, y: 79.5 },
  { id: "desk-b-80", type: "desk", label: "Desk B80", x: 141.5, y: 84 },
  { id: "desk-b-81", type: "desk", label: "Desk B81", x: 141.5, y: 89 },

  { id: "desk-b-82", type: "desk", label: "Desk B82", x: 147.5, y: 79.5 },
  { id: "desk-b-83", type: "desk", label: "Desk B83", x: 147.5, y: 84 },
  { id: "desk-b-84", type: "desk", label: "Desk B84", x: 147.5, y: 89 },

  { id: "desk-b-85", type: "desk", label: "Desk B85", x: 149.5, y: 79.5 },
  { id: "desk-b-86", type: "desk", label: "Desk B86", x: 149.5, y: 84 },
  { id: "desk-b-87", type: "desk", label: "Desk B87", x: 149.5, y: 89 },

  { id: "desk-b-88", type: "desk", label: "Desk B88", x: 155, y: 79.5 },
  { id: "desk-b-89", type: "desk", label: "Desk B89", x: 155, y: 84 },
  { id: "desk-b-90", type: "desk", label: "Desk B90", x: 155, y: 89 },

  { id: "desk-b-91", type: "desk", label: "Desk B91", x: 157, y: 79.5 },
  { id: "desk-b-92", type: "desk", label: "Desk B92", x: 157, y: 84 },
  { id: "desk-b-93", type: "desk", label: "Desk B93", x: 157, y: 89 },

  { id: "desk-b-94", type: "desk", label: "Desk B94", x: 163, y: 79.5 },
  { id: "desk-b-95", type: "desk", label: "Desk B95", x: 163, y: 84 },
  { id: "desk-b-96", type: "desk", label: "Desk B96", x: 163, y: 89 },

  { id: "desk-b-97", type: "desk", label: "Desk B97", x: 165, y: 79.5 },
  { id: "desk-b-98", type: "desk", label: "Desk B98", x: 165, y: 84 },
  { id: "desk-b-99", type: "desk", label: "Desk B99", x: 165, y: 89 },

  { id: "desk-b-100", type: "desk", label: "Desk B100", x: 170.5, y: 79.5 },
  { id: "desk-b-101", type: "desk", label: "Desk B101", x: 170.5, y: 84 },
  { id: "desk-b-102", type: "desk", label: "Desk B102", x: 170.5, y: 89 },

  { id: "desk-b-103", type: "desk", label: "Desk B103", x: 172.5, y: 79.5 },
  { id: "desk-b-104", type: "desk", label: "Desk B104", x: 172.5, y: 84 },
  { id: "desk-b-105", type: "desk", label: "Desk B105", x: 172.5, y: 89 },

  { id: "desk-b-106", type: "desk", label: "Desk B106", x: 178.5, y: 79.5 },
  { id: "desk-b-107", type: "desk", label: "Desk B107", x: 178.5, y: 84 },
  { id: "desk-b-108", type: "desk", label: "Desk B108", x: 178.5, y: 89 },

  //big boss rooms
  { id: "Admin-1", type: "admin", label: "Big Boss Office", x: 185, y: 17 },
  { id: "Admin-2", type: "admin", label: "Big Boss Office", x: 185, y: 77.5 },
  { id: "Admin-3", type: "admin", label: "Big Boss Office", x: 185, y: 94 },

  // Meeting rooms on the right
  { id: "Meeting-1", type: "room", label: "Meeting Room 1", x: 19, y: 11 },
  { id: "Meeting-2", type: "room", label: "Meeting Room 2", x: 19, y: 23 },
  { id: "Meeting-3", type: "room", label: "Meeting Room 3", x: 19, y: 84.5 },
  { id: "Meeting-4", type: "room", label: "Meeting Room 4", x: 19, y: 90 },
  { id: "Meeting-5", type: "room", label: "Meeting Room 5", x: 162, y: 59 },
  { id: "Meeting-6", type: "room", label: "Meeting Room 6", x: 185, y: 32 },

  //bubbles
  { id: "Bub-1", type: "bub", label: "Bubble Room 1", x: 27.5, y: 14 },
  { id: "Bub-2", type: "bub", label: "Bubble Room 2", x: 97.5, y: 22.5 },
  { id: "Bub-3", type: "bub", label: "Bubble Room 3", x: 27.5, y: 85.5 },
  { id: "Bub-4", type: "bub", label: "Bubble Room 4", x: 97.5, y: 92 },

  //wellness rooms
  { id: "Well-1", type: "wellness", label: "Wellness Room 1", x: 162, y: 40 },
  { id: "Well-2", type: "wellness", label: "Wellness Room 2", x: 32, y: 50 },

  //bigroom
  { id: "BigRoom-1", type: "bigroom", label: "Big Room 1", x: 171.5, y: 45 },
  { id: "BigRoom-2", type: "bigroom", label: "Big Room 2", x: 182.5, y: 45 },

  //beerpong
  { id: "Beerpong-1", type: "beerpong", label: "Beer Zone", x: 16.5, y: 48 },
];

// --- STATIC DEPARTMENT BOOKINGS (3 employees per department) ---
const DEPARTMENT_BOOKINGS = {
  Finance: [
    { employee: "Ana F.", deskId: "desk-t-01", start: "09:00", end: "11:00" },
    { employee: "Mihai F.", deskId: "desk-t-02", start: "11:00", end: "13:00" },
    { employee: "Ioana F.", deskId: "desk-t-03", start: "14:00", end: "17:00" },
  ],
  Commercial: [
    { employee: "Andrei C.", deskId: "desk-t-04", start: "09:00", end: "12:00" },
    { employee: "Bianca C.", deskId: "desk-t-05", start: "12:00", end: "15:00" },
    { employee: "Radu C.", deskId: "desk-t-06", start: "15:00", end: "18:00" },
  ],
  HR: [
    { employee: "Alexandra H.", deskId: "desk-t-07", start: "08:30", end: "11:30" },
    { employee: "George H.", deskId: "desk-t-08", start: "11:30", end: "14:30" },
    { employee: "Laura H.", deskId: "desk-t-09", start: "14:30", end: "17:30" },
  ],
  IT: [
    { employee: "Vlad I.", deskId: "desk-t-10", start: "09:00", end: "13:00" },
    { employee: "Daria I.", deskId: "desk-t-11", start: "10:00", end: "16:00" },
    { employee: "Tudor I.", deskId: "desk-t-12", start: "13:00", end: "18:00" },
  ],
  "Marketing&Strategy": [
    { employee: "Maria M.", deskId: "desk-t-13", start: "09:30", end: "12:30" },
    { employee: "Oana M.", deskId: "desk-t-14", start: "12:30", end: "15:30" },
    { employee: "Paul M.", deskId: "desk-t-15", start: "15:30", end: "18:00" },
  ],
  "Sales and Commercial": [
    { employee: "Iris S.", deskId: "desk-t-16", start: "08:00", end: "11:00" },
    { employee: "Cristi S.", deskId: "desk-t-17", start: "11:00", end: "14:00" },
    { employee: "Teodora S.", deskId: "desk-t-18", start: "14:00", end: "17:00" },
  ],
};

const DEPARTMENTS = Object.keys(DEPARTMENT_BOOKINGS);

const USERS_KEY = "officePlannerUsers";
const CURRENT_USER_KEY = "officePlannerCurrentUser";

// key is resource+date
function makeBookingKey(resourceId, dateStr) {
  return `${resourceId}_${dateStr}`;
}

// time helpers
function parseTimeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function intervalsOverlap(s1, e1, s2, e2) {
  return s1 < e2 && s2 < e1;
}

// department bookings as "virtual" bookings for a given resource
function getDeptBookingsForResource(resourceId) {
  const result = [];
  for (const [dept, items] of Object.entries(DEPARTMENT_BOOKINGS)) {
    for (const b of items) {
      if (b.deskId === resourceId) {
        result.push({
          resourceId,
          start: b.start,
          end: b.end,
          user: b.employee,
          department: dept,
          isDept: true,
        });
      }
    }
  }
  return result;
}

function App() {
  // -------- AUTH STATE --------
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authRole, setAuthRole] = useState("employee"); // "employee" | "admin"

  // LOAD USER FROM LOCALSTORAGE ON MOUNT
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) {
          setCurrentUser(parsed);
        }
      }
    } catch (e) {
      console.error("Error loading current user", e);
    }
  }, []);

  const currentUserLabel =
    currentUser?.name || currentUser?.email || "You";

  // AUTH HELPERS
  const getStoredUsers = () => {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!authName.trim() || !authEmail.trim() || !authPassword.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const users = getStoredUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === authEmail.trim().toLowerCase()
    );
    if (exists) {
      alert("An account with this email already exists.");
      return;
    }

    const newUser = {
      name: authName.trim(),
      email: authEmail.trim(),
      password: authPassword, // demo only
      role: authRole === "admin" ? "admin" : "employee",
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setCurrentUser(newUser);

    setAuthPassword("");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!authEmail.trim() || !authPassword.trim()) {
      alert("Please enter email and password.");
      return;
    }

    const users = getStoredUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === authEmail.trim().toLowerCase() &&
        u.password === authPassword
    );

    if (!found) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
    setCurrentUser(found);

    setAuthPassword("");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  // -------- BOOKING STATE --------
  const [selectedResourceId, setSelectedResourceId] = useState(
    RESOURCES[0]?.id || null
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("20:00");
  const [zoom, setZoom] = useState(1);

  // department "view" filter
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // user-created bookings: { key: [ { id, resourceId, date, start, end, user, isRequest, status } ] }
  const [bookings, setBookings] = useState({});

  const selectedResource = useMemo(
    () => RESOURCES.find((r) => r.id === selectedResourceId),
    [selectedResourceId]
  );

  const isAdminUser = currentUser?.role === "admin";

  // base request types are room/wellness/admin/bub
  const baseRequestType =
    selectedResource &&
    ["room", "wellness", "admin", "bub"].includes(selectedResource.type);

  // Only employees treat these as "requests". Admins always do normal bookings.
  const isRequestType = baseRequestType && !isAdminUser;

  // treat admin/management types as protected for employees
  const isManagementResource =
    selectedResource &&
    (selectedResource.type === "admin" || selectedResource.type === "management");

  const isBookingBlockedByRole = !isAdminUser && isManagementResource;

  const primaryButtonLabel = isRequestType ? "Request" : "Book interval";

  const bookingKeyForSelected = useMemo(() => {
    if (!selectedResource) return null;
    return makeBookingKey(selectedResource.id, selectedDate);
  }, [selectedResource, selectedDate]);

  const userBookingsForSelected = useMemo(() => {
    if (!bookingKeyForSelected) return [];
    return bookings[bookingKeyForSelected] || [];
  }, [bookings, bookingKeyForSelected]);

  const deptBookingsForSelected = useMemo(() => {
    if (!selectedResource) return [];
    return getDeptBookingsForResource(selectedResource.id);
  }, [selectedResource]);

  const bookingsForSelected = useMemo(
    () => [...userBookingsForSelected, ...deptBookingsForSelected],
    [userBookingsForSelected, deptBookingsForSelected]
  );

  const hasValidInterval =
    startTime &&
    endTime &&
    parseTimeToMinutes(endTime) > parseTimeToMinutes(startTime);

  // is there something booked overlapping the selected interval
  const isSelectedBooked = useMemo(() => {
    if (!hasValidInterval) {
      return bookingsForSelected.length > 0;
    }

    const s = parseTimeToMinutes(startTime);
    const e = parseTimeToMinutes(endTime);

    return bookingsForSelected.some((b) =>
      intervalsOverlap(
        s,
        e,
        parseTimeToMinutes(b.start),
        parseTimeToMinutes(b.end)
      )
    );
  }, [bookingsForSelected, hasValidInterval, startTime, endTime]);

  const canBook =
    !!selectedResource &&
    !!selectedDate &&
    hasValidInterval &&
    !isSelectedBooked &&
    !isBookingBlockedByRole;

  const handleBook = () => {
    if (!currentUser) {
      alert("Please log in to book.");
      return;
    }

    if (isBookingBlockedByRole) {
      alert("You don't have permission to book or request management resources.");
      return;
    }

    if (!selectedResource || !selectedDate) return;
    if (!startTime || !endTime) {
      alert("Please choose start and end time.");
      return;
    }

    const startMinutes = parseTimeToMinutes(startTime);
    const endMinutes = parseTimeToMinutes(endTime);

    if (endMinutes <= startMinutes) {
      alert("End time must be after start time.");
      return;
    }

    const key = makeBookingKey(selectedResource.id, selectedDate);
    const existingUserBookings = bookings[key] || [];
    const deptBookingsForRes = getDeptBookingsForResource(selectedResource.id);

    const allExisting = [...existingUserBookings, ...deptBookingsForRes];

    const hasOverlap = allExisting.some((b) =>
      intervalsOverlap(
        startMinutes,
        endMinutes,
        parseTimeToMinutes(b.start),
        parseTimeToMinutes(b.end)
      )
    );

    if (hasOverlap) {
      alert("This resource is already booked in that time interval.");
      return;
    }

    const userName = currentUserLabel;
    const isReq = isRequestType; // false for admins, true for employees on request-types
    const id =
      Date.now().toString() + Math.random().toString(16).slice(2);

    setBookings((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] || []),
        {
          id,
          resourceId: selectedResource.id,
          date: selectedDate,
          start: startTime,
          end: endTime,
          user: userName,
          isRequest: isReq,
          status: isReq ? "pending" : "confirmed",
        },
      ],
    }));
  };

  const handleCancel = () => {
    if (!currentUser) {
      alert("Please log in to cancel your bookings.");
      return;
    }
    if (!selectedResource || !selectedDate) return;
    const key = makeBookingKey(selectedResource.id, selectedDate);
    const existing = bookings[key] || [];

    const userName = currentUserLabel;
    const filtered = existing.filter(
      (b) => !(b.start === startTime && b.end === endTime && b.user === userName)
    );

    if (filtered.length === existing.length) {
      alert("No booking with this exact interval to cancel.");
      return;
    }

    setBookings((prev) => {
      const copy = { ...prev };
      if (filtered.length > 0) {
        copy[key] = filtered;
      } else {
        delete copy[key];
      }
      return copy;
    });
  };

  const handleZoomChange = (delta) => {
    setZoom((z) => {
      const next = Math.min(2.5, Math.max(0.7, z + delta));
      return Number(next.toFixed(2));
    });
  };

  // department view data for highlighting and list
  const departmentBookings = useMemo(() => {
    if (!selectedDepartment) return [];
    return DEPARTMENT_BOOKINGS[selectedDepartment] || [];
  }, [selectedDepartment]);

  const departmentDeskIds = useMemo(
    () => departmentBookings.map((b) => b.deskId),
    [departmentBookings]
  );

  // pending requests for admin (isRequest && status === "pending")
  const pendingRequests = useMemo(() => {
    const list = [];
    for (const arr of Object.values(bookings)) {
      for (const b of arr) {
        if (b.isRequest && b.status === "pending") {
          list.push(b);
        }
      }
    }
    list.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      if (a.start < b.start) return -1;
      if (a.start > b.start) return 1;
      return 0;
    });
    return list;
  }, [bookings]);

  const handleApproveRequest = (req) => {
    const key = makeBookingKey(req.resourceId, req.date);
    setBookings((prev) => {
      const arr = prev[key] || [];
      const newArr = arr.map((b) =>
        b.id === req.id ? { ...b, status: "approved" } : b
      );
      return { ...prev, [key]: newArr };
    });
  };

  const handleDenyRequest = (req) => {
    const key = makeBookingKey(req.resourceId, req.date);
    setBookings((prev) => {
      const arr = prev[key] || [];
      const newArr = arr.filter((b) => b.id !== req.id);
      const copy = { ...prev };
      if (newArr.length > 0) {
        copy[key] = newArr;
      } else {
        delete copy[key];
      }
      return copy;
    });
  };

  // ------------- AUTH SCREEN -------------
  if (!currentUser) {
    return (
      <div className="app">
        <div className="map-wrapper">
          <h1 className="map-title">Office Planner</h1>

          <div className="auth-card">
            <div className="auth-toggle">
              <button
                type="button"
                className={
                  "auth-toggle-btn " +
                  (authMode === "login" ? "auth-toggle-btn--active" : "")
                }
                onClick={() => setAuthMode("login")}
              >
                Log in
              </button>
              <button
                type="button"
                className={
                  "auth-toggle-btn " +
                  (authMode === "signup" ? "auth-toggle-btn--active" : "")
                }
                onClick={() => setAuthMode("signup")}
              >
                Create account
              </button>
            </div>

            <form
              className="auth-form"
              onSubmit={
                authMode === "login" ? handleLoginSubmit : handleSignupSubmit
              }
            >
              {authMode === "signup" && (
                <div className="auth-field">
                  <label htmlFor="auth-name">Name</label>
                  <input
                    id="auth-name"
                    type="text"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">Email</label>
                <input
                  id="auth-email"
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="auth-password">Password</label>
                <input
                  id="auth-password"
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              {authMode === "signup" && (
                <div className="auth-field auth-role-field">
                  <span className="auth-role-label">Role</span>
                  <label className="auth-role-option">
                    <input
                      type="radio"
                      name="role"
                      value="employee"
                      checked={authRole === "employee"}
                      onChange={() => setAuthRole("employee")}
                    />
                    <span>Employee</span>
                  </label>
                  <label className="auth-role-option">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={authRole === "admin"}
                      onChange={() => setAuthRole("admin")}
                    />
                    <span>Admin</span>
                  </label>
                </div>
              )}

              <button type="submit" className="auth-submit">
                {authMode === "login" ? "Enter office" : "Create account"}
              </button>

            
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ------------- MAIN APP (LOGGED IN) -------------
  return (
    <div className="app">
      <div className="map-wrapper">
        <h1 className="map-title">Office Planner</h1>

        <div className="user-bar">
          <div className="user-bar-info">
            <span className="user-bar-name">
              {currentUser.name || currentUser.email}
            </span>
            <span className="user-bar-role">
              {currentUser.role === "admin" ? "Admin" : "Employee"}
            </span>
          </div>
          <button className="user-bar-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>

        <div className="layout">
          {/* LEFT – MAP */}
          <div className="map-card">
            <div className="map-toolbar">
              <span className="toolbar-label">Zoom</span>
              <button onClick={() => handleZoomChange(-0.1)}>-</button>
              <span className="zoom-label">{Math.round(zoom * 100)}%</span>
              <button onClick={() => handleZoomChange(0.1)}>+</button>
            </div>

            <div className="map-viewport">
              <div
                className={
                  "map-inner" +
                  (selectedDepartment ? " map-inner--dept-filter" : "")
                }
                style={{ transform: `scale(${zoom})` }}
              >
                <img
                  src={floorplanImg}
                  alt="Office floorplan"
                  className="map-image"
                />

                {RESOURCES.map((res) => {
                  const key = makeBookingKey(res.id, selectedDate);
                  const userIntervals = bookings[key] || [];
                  const deptIntervalsForRes = getDeptBookingsForResource(res.id);

                  // booked for this interval?
                  let isBookedForInterval = false;
                  let hasRequestBookingForInterval = false;

                  if (hasValidInterval) {
                    const s = parseTimeToMinutes(startTime);
                    const e = parseTimeToMinutes(endTime);

                    // dept bookings + user bookings for availability
                    const allForInterval = [
                      ...deptIntervalsForRes,
                      ...userIntervals,
                    ];

                    isBookedForInterval = allForInterval.some((b) =>
                      intervalsOverlap(
                        s,
                        e,
                        parseTimeToMinutes(b.start),
                        parseTimeToMinutes(b.end)
                      )
                    );

                    // only user bookings can be requests
                    hasRequestBookingForInterval = userIntervals.some(
                      (b) =>
                        b.isRequest &&
                        intervalsOverlap(
                          s,
                          e,
                          parseTimeToMinutes(b.start),
                          parseTimeToMinutes(b.end)
                        )
                    );
                  }

                  const hasAnyBookingThisDay =
                    deptIntervalsForRes.length + userIntervals.length > 0;

                  const hasAnyRequestThisDay = userIntervals.some(
                    (b) => b.isRequest
                  );

                  const isBooked = hasValidInterval
                    ? isBookedForInterval
                    : hasAnyBookingThisDay;

                  const isRequestBooked = hasValidInterval
                    ? hasRequestBookingForInterval
                    : hasAnyRequestThisDay;

                  const isSelected = res.id === selectedResourceId;

                  const isDeptHighlighted =
                    selectedDepartment && departmentDeskIds.includes(res.id);

                  let availabilityClass = "resource-free";
                  if (isBooked && isRequestBooked) {
                    availabilityClass = "resource-booked-request";
                  } else if (isBooked) {
                    availabilityClass = "resource-booked";
                  }

                  return (
                    <button
                      key={res.id}
                      className={[
                        "resource-pin",
                        `resource-${res.type}`,
                        availabilityClass,
                        isSelected ? "resource-selected" : "",
                        isDeptHighlighted ? "resource-dept-highlight" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={{
                        left: `${res.x}%`,
                        top: `${res.y}%`,
                      }}
                      onClick={() => setSelectedResourceId(res.id)}
                      title={`${res.label} • ${
                        hasValidInterval
                          ? isBooked
                            ? "Not available in this interval"
                            : "Available in this interval"
                          : isBooked
                          ? "Has bookings this day"
                          : "No bookings this day"
                      }`}
                    >
                      <span className="resource-pin-label">
                        {res.type === "desk"
                          ? "D"
                          : res.type === "room"
                          ? "R"
                          : res.type === "admin"
                          ? "A"
                          : res.type === "bub"
                          ? "B"
                          : res.type === "wellness"
                          ? "W"
                          : res.type === "bigroom"
                          ? "B"
                          : res.type === "beerpong"
                          ? "BZ"
                          : "."}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT – BOOKING PANEL */}
          <aside className="booking-card">
            <h2>Booking</h2>

            {selectedResource ? (
              <>
                <div className="booking-section">
                  <p className="booking-label">Selected</p>
                  <p className="booking-value">
                    <strong>{selectedResource.label}</strong>{" "}
                    <span className="badge">
                      {selectedResource.type === "desk"
                        ? "Desk"
                        : selectedResource.type === "room"
                        ? "Meeting Room"
                        : selectedResource.type}
                    </span>
                  </p>
                </div>

                <div className="booking-section">
                  <label className="booking-label" htmlFor="date">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                {/* Time interval inputs */}
                <div className="booking-section booking-times">
                  <div className="booking-times-header">
                    <span className="booking-label">Time interval</span>
                  </div>

                  <div className="time-row">
                    <div className="time-field">
                      <label htmlFor="startTime">Start</label>
                      <input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>

                    <span className="time-separator">to</span>

                    <div className="time-field">
                      <label htmlFor="endTime">End</label>
                      <input
                        id="endTime"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Department view */}
                <div className="booking-section">
                  <label className="booking-label" htmlFor="department">
                    Department view
                  </label>
                  <select
                    id="department"
                    className="booking-select"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="">All departments</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>

                  {selectedDepartment && (
                    <>
                      <p className="booking-subtitle">
                        Showing bookings for {selectedDepartment}
                      </p>
                      <ul className="dept-booking-list">
                        {departmentBookings.map((b, idx) => {
                          const desk = RESOURCES.find(
                            (r) => r.id === b.deskId
                          );
                          return (
                            <li key={idx}>
                              <span className="dept-employee">{b.employee}</span>
                              <span className="dept-desk">
                                {desk ? desk.label : b.deskId}
                              </span>
                              <span className="dept-time">
                                {b.start} – {b.end}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </div>

                <div className="booking-section">
                  <p className="booking-label">Status</p>
                  <p
                    className={
                      "booking-status " +
                      (isSelectedBooked ? "status-booked" : "status-free")
                    }
                  >
                    {hasValidInterval
                      ? isSelectedBooked
                        ? "Booked in this time interval"
                        : "Available in this time interval"
                      : isSelectedBooked
                      ? "Has bookings for this date"
                      : "No bookings for this date"}
                  </p>

                  {bookingsForSelected.length > 0 && (
                    <ul className="booking-list">
                      {bookingsForSelected.map((b, idx) => {
                        const isRequestBooking = b.isRequest;
                        let label = `${b.start}-${b.end}`;

                        if (isRequestBooking) {
                          if (b.status === "pending") {
                            // XX:XX-XX:XX Request (You)
                            label += " Request";
                          } else if (b.status === "approved") {
                            label += " Request approved";
                          }
                        }

                        return (
                          <li key={b.id || idx}>
                            {label} ({b.user}
                            {b.department ? `, ${b.department}` : ""})
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <div className="booking-actions">
                  <button
                    className={[
                      "primary-btn",
                      isRequestType ? "primary-btn--request" : "",
                      !canBook ? "primary-btn--blocked" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={handleBook}
                    disabled={!canBook}
                  >
                    {primaryButtonLabel}
                  </button>
                  <button className="secondary-btn" onClick={handleCancel}>
                    Cancel this interval
                  </button>
                </div>

                {isBookingBlockedByRole && (
                  <p className="hint hint--warning">
                    Employees cannot book or request management resources. Please
                    ask an admin to handle these bookings.
                  </p>
                )}

                {isAdminUser && (
                  <div className="booking-section admin-requests">
                    <p className="booking-label">Pending room requests</p>
                    {pendingRequests.length === 0 ? (
                      <p className="admin-requests-empty">No pending requests.</p>
                    ) : (
                      <ul className="admin-requests-list">
                        {pendingRequests.map((req) => {
                          const res = RESOURCES.find(
                            (r) => r.id === req.resourceId
                          );
                          return (
                            <li key={req.id} className="admin-request-item">
                              <div className="admin-request-main">
                                <span className="admin-request-room">
                                  {res ? res.label : req.resourceId}
                                </span>
                                <span className="admin-request-time">
                                  {req.date} • {req.start}-{req.end}
                                </span>
                                <span className="admin-request-user">
                                  {req.user}
                                </span>
                              </div>
                              <div className="admin-request-actions">
                                <button
                                  className="admin-approve-btn"
                                  onClick={() => handleApproveRequest(req)}
                                >
                                  Approve
                                </button>
                                <button
                                  className="admin-deny-btn"
                                  onClick={() => handleDenyRequest(req)}
                                >
                                  Deny
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}

                <p className="hint">
                  Pick a date and time interval (e.g. 18:00–20:00). Pins turn
                  green if they’re free and red if booked. If there is a pending
                  or approved request, they glow yellow. Selecting a department
                  highlights that team’s desks.
                </p>
              </>
            ) : (
              <p>Select a desk or room on the map.</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
