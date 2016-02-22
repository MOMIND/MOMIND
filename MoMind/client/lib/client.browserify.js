/* ------------------------ */
/* ---- React Classes ----- */
/* ------------------------ */
//RRouter = require("react-router"); //For Routing
RMixIn = require("react-mixin"); //Instead of Meteor Data
//$P = require("react-prefixr"); //Prefixes CSS Strings in .jsx for Brwoser Support

/* ------------------------ */
/* --- React Components --- */
/* ------------------------ */
//ReactBootstrapXXX = require("react-bootstrap").XXX;
RBurgerMenu = require('react-burger-menu').slide;

/* ------------------------ */
/* -------- jQuery -------- */
/* ------------------------ */
var $ = $ = global.$ = require('jquery');
var jQuery = jQuery = global.jQuery = require('jquery');
require('jquery-ui');

/* ------------------------ */
/* ---- jQuery Plugins ---- */
/* ------------------------ */
//require('jquery.panzoom');

/* ------------------------ */
/* ------ Redux Tools ----- */
/* ------------------------ */
Redux = require("redux");
ConnectProvider = require("react-redux").connect;

IMap = require("immutable").Map;
IList = require("immutable").List;
ISet = require("immutable").Set;
is = require("immutable").is;
