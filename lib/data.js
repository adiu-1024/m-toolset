"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listToObjByValue = exports.listToTree = exports.unique = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var listToObjByValue = function listToObjByValue(list, fieldName) {
  return list.reduce(function (obj, item) {
    obj[item[fieldName]] = item;
    return obj;
  }, {});
};

exports.listToObjByValue = listToObjByValue;

var unique = function unique(list, primaryKey) {
  var groupName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'options';
  var map = new Map();

  var _iterator = _createForOfIteratorHelper(list),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      var value = item[primaryKey];

      if (map.has(value)) {
        map.get(value)['options'].push(item);
      } else {
        var _map$set;

        map.set(value, (_map$set = {}, (0, _defineProperty2["default"])(_map$set, primaryKey, value), (0, _defineProperty2["default"])(_map$set, groupName, [item]), _map$set));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return (0, _toConsumableArray2["default"])(map.values());
};

exports.unique = unique;

var listToTree = function listToTree(list) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var pid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'pid';
  var map = new Map(),
      roots = [];

  var _iterator2 = _createForOfIteratorHelper(list),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var item = _step2.value;
      map.set(item[id], item);
      var parent = map.get(item[pid]);

      if (!parent) {
        roots.push(item);
      } else {
        !parent.children && (parent.children = []);
        parent.children.push(item);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return roots;
};

exports.listToTree = listToTree;