"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var styled_components_1 = require("styled-components");
var Logout_1 = require("../components/Blocks/Logout");
var Icon_1 = require("../components/Elements/Icon");
var GlobalStyles_1 = require("../components/GlobalStyles");
var helper_1 = require("../store/helper");
var storeContent_1 = require("../store/storeContent");
var Grid = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  display: grid;\n  grid-template-columns: max-content 1fr max-content;\n  width: 100%;\n"], ["\n  background-color: ", ";\n  display: grid;\n  grid-template-columns: max-content 1fr max-content;\n  width: 100%;\n"])), GlobalStyles_1.theme.color.primaryLight);
var RouterComponent = function (props) {
    helper_1.useFetchLocation(props.contentRequest);
    var content = props.content, status = props.status;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Icon_1.H1, { src: "person" }, "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442"),
        react_1["default"].createElement("main", { className: "start" },
            JSON.stringify(props.content),
            react_1["default"].createElement(Grid, null,
                react_1["default"].createElement("div", null),
                react_1["default"].createElement(Logout_1["default"], null)))));
};
var connected1 = react_redux_1.connect(helper_1.mapContent, storeContent_1.actionsContent)(RouterComponent);
exports["default"] = connected1;
var templateObject_1;
