"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Footer extends _react.default.Component {
  render() {
    const footerStyle = {
      position: 'fixed',
      width: '100%',
      zIndex: '1',
      bottom: '0'
    };
    return _react.default.createElement("footer", {
      style: footerStyle
    }, this.props.children);
  }

}

var _default = Footer;
exports.default = _default;