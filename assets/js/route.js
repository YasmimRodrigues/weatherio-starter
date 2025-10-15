/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 * @modified by yasmimrbm25 <yasmimrbm25@gmail.com>
 */

'use strict';

import {updateWeather, error404} from "./app.js";
const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"; //London

const currentLocation = function() {
    window.navigator.geolocation.getCurrentPosition(res => {
        const { latitude, longitude } = res.coords;

        updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    }, err => {
        window.location.hash = defaultLocation;
    });
}

/**
 * 
 * @param {string} query Search query
 */

const searchedLocation = query => updateWeather(...query.split("&"));
// updateWeather("lat=51.5073219", "lon=-0.1276474")

const routes = new Map([
    ["/current-location", currentLocation],
    ["/weather", searchedLocation]
]);

const checkHash = () => {
    const requestURL = window.location.hash.slice(1);

    const [route, query] = requestURL.includes ? requestURL.split("?") : [requestURL];

    routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
    if (!this.window.location.hash) {
        window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
});