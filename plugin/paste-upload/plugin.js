/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var plugin = function plugin(editor) {
  var loadingImage = '<img id="loadingImg" src="http://cos.qdqcwy.cn/group1/M00/00/00/rBHIsFtz4TSAJ1P0AAAUUF6elKk222.gif" alt="" />';
  editor.on("Paste", function (e) {
    var image = void 0,
        pasteEvent = void 0;
    pasteEvent = e;
    if (pasteEvent.clipboardData && pasteEvent.clipboardData.items) {
      image = isImage(pasteEvent);
      if (image) {
        e.preventDefault();
        editor.execCommand('mceInsertContent', false, loadingImage);
        return uploadFile(image.getAsFile(), getFilename(pasteEvent));
      }
    }
  });

  function isImage(data) {
    var i = void 0,
        item = void 0;
    i = 0;
    while (i < data.clipboardData.items.length) {
      item = data.clipboardData.items[i];
      if (item.type.indexOf("image") !== -1) {
        return item;
      }
      i++;
    }
    return false;
  }

  function uploadFile(file, filename) {
    var xhr = void 0,
        formData = void 0;
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    var pasteUploadConfig = editor.settings.pasteUploadConfig;
    xhr.open('POST', pasteUploadConfig.url);
    if (pasteUploadConfig.headers && pasteUploadConfig.headers.length > 0) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = pasteUploadConfig.headers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var header = _step.value;

          xhr.setRequestHeader(header.name, header.value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    xhr.onload = function () {
      var json = void 0;
      json = JSON.parse(xhr.responseText);
      if (xhr.status !== 200) {
        alert('上传失败');
        replaceLoading(filename);
        return;
      } else {
        if (pasteUploadConfig.diyExtractUrl) {
          var imgUrl = pasteUploadConfig.extractUrlFun(json);
          insertIntoTinymce(imgUrl);
        } else {
          insertIntoTinymce(json.data.fullUrl);
        }
      }
    };
    formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
  }

  function insertIntoTinymce(url) {
    var content = editor.getContent();
    content = content.replace(loadingImage, '<img src="' + url + '">');
    editor.setContent(content);
    editor.selection.select(editor.getBody(), true);
    editor.selection.collapse(false);
  }

  function replaceLoading(filename) {
    var content = editor.getContent();
    content = content.replace(loadingImage, filename);
    editor.setContent(content);
    editor.selection.select(editor.getBody(), true);
    editor.selection.collapse(false);
  }

  function getFilename(e) {
    var value = void 0;
    if (window.clipboardData && window.clipboardData.getData) {
      value = window.clipboardData.getData("Text");
    } else if (e.clipboardData && e.clipboardData.getData) {
      value = e.clipboardData.getData("text/plain");
    }
    value = value.split("\r");
    return value[0];
  }
};

exports.default = plugin;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _plugin = __webpack_require__(0);

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

tinymce.PluginManager.add('paste-upload', _plugin2.default);

/***/ })
/******/ ]);