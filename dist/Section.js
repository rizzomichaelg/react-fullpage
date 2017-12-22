"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Section extends _react.default.Component {
  constructor() {
    super();
    this.state = {
      windowHeight: 0
    };
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() {
    this.setState({
      windowHeight: window.innerHeight
    });
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const alignVertical = this.props.verticalAlign || this.context.verticalAlign;
    const sectionStyle = {
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
      className: this.context.sectionClassName + (this.props.className ? ` ${this.props.className}` : ''),
      id: this.props.id,
      style: sectionStyle
    }, alignVertical ? this._renderVerticalAlign() : this.props.children);
  }

  _renderVerticalAlign() {
    const verticalAlignStyle = {
      display: 'table-cell',
      verticalAlign: 'middle',
      width: '100%'
    };
    return _react.default.createElement("div", {
      style: verticalAlignStyle
    }, this.props.children);
  }

}

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