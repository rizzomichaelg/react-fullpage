"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Section =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Section, _React$Component);

  function Section() {
    var _this;

    _classCallCheck(this, Section);

    _this = _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).call(this));
    _this.state = {
      windowHeight: 0
    };
    _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Section, [{
    key: "handleResize",
    value: function handleResize() {
      this.setState({
        windowHeight: window.innerHeight
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }
  }, {
    key: "render",
    value: function render() {
      var alignVertical = this.props.verticalAlign || this.context.verticalAlign;
      var sectionStyle = {
        width: '100%',
        display: alignVertical ? 'table' : 'block',
        height: this.state.windowHeight,
        maxHeight: this.state.windowHeight,
        overflow: 'auto',
        backgroundColor: this.props.color,
        paddingTop: this.context.sectionPaddingTop,
        paddingBottom: this.context.sectionPaddingBottom
      };
      return _react.default.createElement("div", {
        className: this.context.sectionClassName + (this.props.className ? " ".concat(this.props.className) : ''),
        id: this.props.id,
        style: sectionStyle
      }, alignVertical ? this._renderVerticalAlign() : this.props.children);
    }
  }, {
    key: "_renderVerticalAlign",
    value: function _renderVerticalAlign() {
      var verticalAlignStyle = {
        display: 'table-cell',
        verticalAlign: 'middle',
        width: '100%'
      };
      return _react.default.createElement("div", {
        style: verticalAlignStyle
      }, this.props.children);
    }
  }]);

  return Section;
}(_react.default.Component);

Section.propTypes = {
  color: _propTypes.default.string
};
Section.contextTypes = {
  verticalAlign: _propTypes.default.bool,
  sectionClassName: _propTypes.default.string,
  sectionPaddingTop: _propTypes.default.string,
  sectionPaddingBottom: _propTypes.default.string
};
var _default = Section;
exports.default = _default;