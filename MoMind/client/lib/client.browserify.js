/* ------------------------ */
/* ---- React Classes ----- */
/* ------------------------ */
RRouter = require("react-router"); //For Routing
RMixIn = require("react-mixin"); //Instead of Meteor Data
$P = require("react-prefixr"); //Prefixes CSS Strings in .jsx for Brwoser Support

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
require('jquery.panzoom');

/* ------------------------ */
/* ------ Redux Tools ----- */
/* ------------------------ */
Redux = require("redux");
CreateReduxStore = require("redux").createStore;
CombineReduxReducers = require("redux").combineReducers;

ReduxProvider = require("react-redux").Provider;
ConnectProvider = require("react-redux").connect;

IMap = require("immutable").Map;
IList = require("immutable").List;
is = require("immutable").is;
