"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Header extends _react.default.Component {
  render() {
    const headerStyle = {
      position: 'fixed',
      width: '100%',
      zIndex: '1',
      top: '0'
    };
    return _react.default.createElement("header", {
      style: headerStyle
    }, this.props.children);
  }

}

var _default = Header;
exports.default = _default;