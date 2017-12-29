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

var SectionsContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SectionsContainer, _React$Component);

  function SectionsContainer(props) {
    var _this;

    _classCallCheck(this, SectionsContainer);

    _this = _possibleConstructorReturn(this, (SectionsContainer.__proto__ || Object.getPrototypeOf(SectionsContainer)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "_resetScrollTimer", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(_assertThisInitialized(_this), "_childrenLength", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    _this.state = {
      activeSection: props.activeSection,
      scrollingStarted: false,
      sectionScrolledPosition: 0,
      windowHeight: 0
    };
    _this._handleMouseWheel = _this._handleMouseWheel.bind(_assertThisInitialized(_this));
    _this._handleAnchor = _this._handleAnchor.bind(_assertThisInitialized(_this));
    _this._handleResize = _this._handleResize.bind(_assertThisInitialized(_this));
    _this._handleArrowKeys = _this._handleArrowKeys.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SectionsContainer, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        verticalAlign: this.props.verticalAlign,
        sectionClassName: this.props.sectionClassName,
        sectionPaddingTop: this.props.sectionPaddingTop,
        sectionPaddingBottom: this.props.sectionPaddingBottom
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._clearResetScrollTimer();

      this._removeDefaultEventListeners();

      this._removeMouseWheelEventHandlers();

      this._removeOverflowFromBody();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._childrenLength = this.props.children.length;

      this._handleResize();

      window.addEventListener('resize', this._handleResize);

      if (!this.props.scrollBar) {
        this._addCSS3Scroll();

        this._handleAnchor(); //Go to anchor in case we found it in the URL


        window.addEventListener('hashchange', this._handleAnchor, false); //Add an event to watch the url hash changes

        if (this.props.arrowNavigation) {
          window.addEventListener('keydown', this._handleArrowKeys);
        }

        if (this.props.touchNavigation) {
          this._handleTouchNav();
        }
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.activeSection !== nextProps.activeSection) {
        this.setState({
          activeSection: nextProps.activeSection
        });

        this._setAnchor(nextProps.activeSection);

        this._handleSectionTransition(nextProps.activeSection);

        this._addActiveClass();
      }
    }
  }, {
    key: "_removeDefaultEventListeners",
    value: function _removeDefaultEventListeners() {
      window.removeEventListener('resize', this._handleResize);
      window.removeEventListener('hashchange', this._handleAnchor);

      if (this.props.arrowNavigation) {
        window.removeEventListener('keydown', this._handleArrowKeys);
      }
    }
  }, {
    key: "_addCSS3Scroll",
    value: function _addCSS3Scroll() {
      this._addOverflowToBody();

      this._addMouseWheelEventHandlers();
    }
  }, {
    key: "_addActiveClass",
    value: function _addActiveClass() {
      this._removeActiveClass();

      var hash = window.location.hash.substring(1);
      var activeLinks = document.querySelectorAll("a[href=\"#".concat(hash, "\"]"));

      for (var i = 0; i < activeLinks.length; i++) {
        activeLinks[i].className = activeLinks[i].className + (activeLinks[i].className.length > 0 ? ' ' : '') + "".concat(this.props.activeClass);
      }
    }
  }, {
    key: "_removeActiveClass",
    value: function _removeActiveClass() {
      var activeLinks = document.querySelectorAll("a:not([href=\"#".concat(this.props.anchors[this.state.activeSection], "\"])"));

      for (var i = 0; i < activeLinks.length; i++) {
        activeLinks[i].className = activeLinks[i].className.replace(/\b ?active/g, '');
      }
    }
  }, {
    key: "_addChildrenWithAnchorId",
    value: function _addChildrenWithAnchorId() {
      var _this2 = this;

      var index = 0;
      return _react.default.Children.map(this.props.children, function (child) {
        var id = _this2.props.anchors[index];
        index++;

        if (id) {
          return _react.default.cloneElement(child, {
            id: id
          });
        } else {
          return child;
        }
      });
    }
  }, {
    key: "_addOverflowToBody",
    value: function _addOverflowToBody() {
      document.querySelector('body').style.overflow = 'hidden';
    }
  }, {
    key: "_removeOverflowFromBody",
    value: function _removeOverflowFromBody() {
      document.querySelector('body').style.overflow = 'initial';
    }
  }, {
    key: "_addMouseWheelEventHandlers",
    value: function _addMouseWheelEventHandlers() {
      window.addEventListener('mousewheel', this._handleMouseWheel, false);
      window.addEventListener('DOMMouseScroll', this._handleMouseWheel, false);
    }
  }, {
    key: "_removeMouseWheelEventHandlers",
    value: function _removeMouseWheelEventHandlers() {
      window.removeEventListener('mousewheel', this._handleMouseWheel);
      window.removeEventListener('DOMMouseScroll', this._handleMouseWheel);
    }
  }, {
    key: "_handleMouseWheel",
    value: function _handleMouseWheel(event) {
      var e = window.event || event; // old IE support

      var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      var activeSection = this.state.activeSection - delta;

      if (this.state.scrollingStarted || activeSection < 0 || this._childrenLength === activeSection) {
        return false;
      }

      this._setAnchor(activeSection);

      this._handleSectionTransition(activeSection);

      this._addActiveClass();
    }
  }, {
    key: "_handleResize",
    value: function _handleResize() {
      var position = 0 - this.state.activeSection * window.innerHeight;
      this.setState({
        scrollingStarted: true,
        windowHeight: window.innerHeight,
        sectionScrolledPosition: position
      });

      this._resetScroll();
    }
  }, {
    key: "_handleSectionTransition",
    value: function _handleSectionTransition(index) {
      var position = 0 - index * this.state.windowHeight;

      if (!this.props.anchors.length || index === -1 || index >= this.props.anchors.length) {
        return false;
      }

      this.setState({
        scrollingStarted: true,
        activeSection: index,
        sectionScrolledPosition: position
      });

      this._resetScroll();

      this._handleScrollCallback();
    }
  }, {
    key: "_handleArrowKeys",
    value: function _handleArrowKeys(e) {
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault(); // Prevent unwanted scrolling on Firefox
      }

      var event = window.event ? window.event : e;
      var activeSection = event.keyCode === 38 || event.keyCode === 37 ? this.state.activeSection - 1 : event.keyCode === 40 || event.keyCode === 39 ? this.state.activeSection + 1 : -1;

      if (this.state.scrollingStarted || activeSection < 0 || this._childrenLength === activeSection) {
        return false;
      }

      this._setAnchor(activeSection);

      this._handleSectionTransition(activeSection);

      this._addActiveClass();
    }
  }, {
    key: "_handleTouchNav",
    value: function _handleTouchNav() {
      var that = this;

      var touchsurface = document.querySelector("." + this.props.className),
          swipedir,
          startX,
          startY,
          dist,
          distX,
          distY,
          threshold = 50,
          //required min distance traveled to be considered swipe
      restraint = 100,
          // maximum distance allowed at the same time in perpendicular direction
      allowedTime = 1000,
          // maximum time allowed to travel that distance
      elapsedTime,
          startTime,
          handleswipe = function handleswipe(swipedir) {
        console.log(swipedir);
      };

      touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        // e.preventDefault()
      }, false);
      touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault(); // prevent scrolling when inside DIV
      }, false);
      touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface

        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface

        elapsedTime = new Date().getTime() - startTime; // get time elapsed

        if (elapsedTime <= allowedTime) {
          // first condition for awipe met
          if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
            // 2nd condition for vertical swipe met
            swipedir = distY < 0 ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe

            var direction = swipedir === 'down' ? that.state.activeSection - 1 : swipedir === 'up' ? that.state.activeSection + 1 : -1;
            var hash = that.props.anchors[direction];

            if (!that.props.anchors.length || hash) {
              window.location.hash = '#' + hash;
            }

            that._handleSectionTransition(direction);
          }
        }

        handleswipe(swipedir); // e.preventDefault()
      }, false);
    }
  }, {
    key: "_handleAnchor",
    value: function _handleAnchor() {
      var _this3 = this;

      var hash = window.location.hash.substring(1);
      var activeSection = this.props.anchors.indexOf(hash);

      if (this.state.activeSection !== activeSection) {
        setTimeout(function () {
          _this3._handleSectionTransition(activeSection);

          _this3._addActiveClass();
        });
      }
    }
  }, {
    key: "_setAnchor",
    value: function _setAnchor(index) {
      var hash = this.props.anchors[index];

      if (!this.props.anchors.length || hash) {
        window.location.hash = '#' + hash;
      }
    }
  }, {
    key: "_handleScrollCallback",
    value: function _handleScrollCallback() {
      var _this4 = this;

      if (this.props.scrollCallback) {
        setTimeout(function () {
          return _this4.props.scrollCallback(_this4.state);
        }, 0);
      }
    }
  }, {
    key: "_resetScroll",
    value: function _resetScroll() {
      var _this5 = this;

      this._clearResetScrollTimer();

      this._resetScrollTimer = setTimeout(function () {
        _this5.setState({
          scrollingStarted: false
        });
      }, this.props.delay + 300);
    }
  }, {
    key: "_clearResetScrollTimer",
    value: function _clearResetScrollTimer() {
      if (this._resetScrollTimer) {
        clearTimeout(this._resetScrollTimer);
      }
    }
  }, {
    key: "renderNavigation",
    value: function renderNavigation() {
      var _this6 = this;

      var navigationStyle = {
        position: 'fixed',
        zIndex: '10',
        right: '20px',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      };
      var anchors = this.props.anchors.map(function (link, index) {
        var anchorStyle = {
          display: 'block',
          margin: '10px',
          borderRadius: '100%',
          backgroundColor: '#556270',
          padding: '5px',
          transition: 'all 0.2s',
          transform: _this6.state.activeSection === index ? 'scale(1.3)' : 'none'
        };
        return _react.default.createElement("a", {
          href: "#".concat(link),
          key: index,
          className: _this6.props.navigationAnchorClass || 'Navigation-Anchor',
          style: _this6.props.navigationAnchorClass ? null : anchorStyle
        });
      });
      return _react.default.createElement("div", {
        className: this.props.navigationClass || 'Navigation',
        style: this.props.navigationClass ? null : navigationStyle
      }, anchors);
    }
  }, {
    key: "render",
    value: function render() {
      var containerStyle = {
        height: '100%',
        width: '100%',
        position: 'relative',
        transform: "translate3d(0px, ".concat(this.state.sectionScrolledPosition, "px, 0px)"),
        transition: "all ".concat(this.props.delay, "ms ease")
      };
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: this.props.className,
        style: containerStyle
      }, this.props.scrollBar ? this._addChildrenWithAnchorId() : this.props.children), this.props.navigation && !this.props.scrollBar ? this.renderNavigation() : null);
    }
  }]);

  return SectionsContainer;
}(_react.default.Component);

exports.default = SectionsContainer;
SectionsContainer.defaultProps = {
  scrollCallback: null,
  delay: 1000,
  verticalAlign: false,
  scrollBar: false,
  navigation: true,
  className: 'SectionContainer',
  sectionClassName: 'Section',
  anchors: [],
  activeClass: 'active',
  sectionPaddingTop: '0',
  sectionPaddingBottom: '0',
  arrowNavigation: true,
  activeSection: 0,
  touchNavigation: true
};
SectionsContainer.propTypes = {
  scrollCallback: _propTypes.default.func,
  delay: _propTypes.default.number,
  verticalAlign: _propTypes.default.bool,
  scrollBar: _propTypes.default.bool,
  navigation: _propTypes.default.bool,
  className: _propTypes.default.string,
  sectionClassName: _propTypes.default.string,
  navigationClass: _propTypes.default.string,
  navigationAnchorClass: _propTypes.default.string,
  activeClass: _propTypes.default.string,
  sectionPaddingTop: _propTypes.default.string,
  sectionPaddingBottom: _propTypes.default.string,
  arrowNavigation: _propTypes.default.bool,
  activeSection: _propTypes.default.number,
  touchNavigation: _propTypes.default.bool
};
SectionsContainer.childContextTypes = {
  verticalAlign: _propTypes.default.bool,
  sectionClassName: _propTypes.default.string,
  sectionPaddingTop: _propTypes.default.string,
  sectionPaddingBottom: _propTypes.default.string
};