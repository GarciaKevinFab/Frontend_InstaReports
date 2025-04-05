/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ "react-toastify":
/*!*********************************!*\
  !*** external "react-toastify" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-toastify");;

/***/ }),

/***/ "./contexts/AuthContext.js":
/*!*********************************!*\
  !*** ./contexts/AuthContext.js ***!
  \*********************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuthContext: () => (/* binding */ useAuthContext)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var _services_authService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/authService */ \"./services/authService.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_services_authService__WEBPACK_IMPORTED_MODULE_3__]);\n_services_authService__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst AuthProvider = ({ children })=>{\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            const checkAuth = {\n                \"AuthProvider.useEffect.checkAuth\": async ()=>{\n                    try {\n                        const token = localStorage.getItem('token');\n                        const storedUser = localStorage.getItem('user');\n                        if (token && storedUser) {\n                            const userData = JSON.parse(storedUser);\n                            if (userData && userData.name && userData.role) {\n                                setUser(userData);\n                            } else {\n                                throw new Error('Invalid user data');\n                            }\n                        }\n                    } catch (error) {\n                        console.error('Error verifying token:', error);\n                        localStorage.removeItem('token');\n                        localStorage.removeItem('user');\n                        setUser(null);\n                    } finally{\n                        setLoading(false);\n                    }\n                }\n            }[\"AuthProvider.useEffect.checkAuth\"];\n            checkAuth();\n        }\n    }[\"AuthProvider.useEffect\"], []);\n    const handleLogin = async (email, password)=>{\n        const userData = await (0,_services_authService__WEBPACK_IMPORTED_MODULE_3__.login)(email, password);\n        setUser(userData);\n        localStorage.setItem('token', userData.token);\n        localStorage.setItem('user', JSON.stringify(userData));\n        return userData;\n    };\n    const handleLogout = ()=>{\n        setUser(null);\n        localStorage.removeItem('token');\n        localStorage.removeItem('user');\n        router.push('/login');\n    };\n    // Determinar si el usuario es técnico\n    const isTechnician = user?.role === 'technician';\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            isTechnician,\n            handleLogin,\n            handleLogout,\n            loading\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"E:\\\\InstaReports\\\\frontend\\\\contexts\\\\AuthContext.js\",\n        lineNumber: 57,\n        columnNumber: 9\n    }, undefined);\n};\nconst useAuthContext = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (!context) {\n        throw new Error('useAuthContext must be used within an AuthProvider');\n    }\n    return context;\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0cy9BdXRoQ29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQXVFO0FBQy9CO0FBQ1E7QUFFaEQsTUFBTU0sNEJBQWNOLG9EQUFhQTtBQUUxQixNQUFNTyxlQUFlLENBQUMsRUFBRUMsUUFBUSxFQUFFO0lBQ3JDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHVCwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNVLFNBQVNDLFdBQVcsR0FBR1gsK0NBQVFBLENBQUM7SUFDdkMsTUFBTVksU0FBU1Qsc0RBQVNBO0lBRXhCRCxnREFBU0E7a0NBQUM7WUFDTixNQUFNVztvREFBWTtvQkFDZCxJQUFJO3dCQUNBLE1BQU1DLFFBQVFDLGFBQWFDLE9BQU8sQ0FBQzt3QkFDbkMsTUFBTUMsYUFBYUYsYUFBYUMsT0FBTyxDQUFDO3dCQUN4QyxJQUFJRixTQUFTRyxZQUFZOzRCQUNyQixNQUFNQyxXQUFXQyxLQUFLQyxLQUFLLENBQUNIOzRCQUM1QixJQUFJQyxZQUFZQSxTQUFTRyxJQUFJLElBQUlILFNBQVNJLElBQUksRUFBRTtnQ0FDNUNiLFFBQVFTOzRCQUNaLE9BQU87Z0NBQ0gsTUFBTSxJQUFJSyxNQUFNOzRCQUNwQjt3QkFDSjtvQkFDSixFQUFFLE9BQU9DLE9BQU87d0JBQ1pDLFFBQVFELEtBQUssQ0FBQywwQkFBMEJBO3dCQUN4Q1QsYUFBYVcsVUFBVSxDQUFDO3dCQUN4QlgsYUFBYVcsVUFBVSxDQUFDO3dCQUN4QmpCLFFBQVE7b0JBQ1osU0FBVTt3QkFDTkUsV0FBVztvQkFDZjtnQkFDSjs7WUFFQUU7UUFDSjtpQ0FBRyxFQUFFO0lBRUwsTUFBTWMsY0FBYyxPQUFPQyxPQUFPQztRQUM5QixNQUFNWCxXQUFXLE1BQU1kLDREQUFLQSxDQUFDd0IsT0FBT0M7UUFDcENwQixRQUFRUztRQUNSSCxhQUFhZSxPQUFPLENBQUMsU0FBU1osU0FBU0osS0FBSztRQUM1Q0MsYUFBYWUsT0FBTyxDQUFDLFFBQVFYLEtBQUtZLFNBQVMsQ0FBQ2I7UUFDNUMsT0FBT0E7SUFDWDtJQUVBLE1BQU1jLGVBQWU7UUFDakJ2QixRQUFRO1FBQ1JNLGFBQWFXLFVBQVUsQ0FBQztRQUN4QlgsYUFBYVcsVUFBVSxDQUFDO1FBQ3hCZCxPQUFPcUIsSUFBSSxDQUFDO0lBQ2hCO0lBRUEsc0NBQXNDO0lBQ3RDLE1BQU1DLGVBQWUxQixNQUFNYyxTQUFTO0lBRXBDLHFCQUNJLDhEQUFDakIsWUFBWThCLFFBQVE7UUFBQ0MsT0FBTztZQUFFNUI7WUFBTTBCO1lBQWNQO1lBQWFLO1lBQWN0QjtRQUFRO2tCQUNqRkg7Ozs7OztBQUdiLEVBQUU7QUFFSyxNQUFNOEIsaUJBQWlCO0lBQzFCLE1BQU1DLFVBQVVyQyxpREFBVUEsQ0FBQ0k7SUFDM0IsSUFBSSxDQUFDaUMsU0FBUztRQUNWLE1BQU0sSUFBSWYsTUFBTTtJQUNwQjtJQUNBLE9BQU9lO0FBQ1gsRUFBRSIsInNvdXJjZXMiOlsiRTpcXEluc3RhUmVwb3J0c1xcZnJvbnRlbmRcXGNvbnRleHRzXFxBdXRoQ29udGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VTdGF0ZSwgdXNlQ29udGV4dCwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IHsgbG9naW4gfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoU2VydmljZSc7XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuXG5leHBvcnQgY29uc3QgQXV0aFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgY2hlY2tBdXRoID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbiAmJiBzdG9yZWRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJEYXRhID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJEYXRhICYmIHVzZXJEYXRhLm5hbWUgJiYgdXNlckRhdGEucm9sZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXNlcih1c2VyRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdXNlciBkYXRhJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHZlcmlmeWluZyB0b2tlbjonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXInKTtcbiAgICAgICAgICAgICAgICBzZXRVc2VyKG51bGwpO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjaGVja0F1dGgoKTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBoYW5kbGVMb2dpbiA9IGFzeW5jIChlbWFpbCwgcGFzc3dvcmQpID0+IHtcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCBsb2dpbihlbWFpbCwgcGFzc3dvcmQpO1xuICAgICAgICBzZXRVc2VyKHVzZXJEYXRhKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgdXNlckRhdGEudG9rZW4pO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XG4gICAgICAgIHJldHVybiB1c2VyRGF0YTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTG9nb3V0ID0gKCkgPT4ge1xuICAgICAgICBzZXRVc2VyKG51bGwpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXInKTtcbiAgICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xuICAgIH07XG5cbiAgICAvLyBEZXRlcm1pbmFyIHNpIGVsIHVzdWFyaW8gZXMgdMOpY25pY29cbiAgICBjb25zdCBpc1RlY2huaWNpYW4gPSB1c2VyPy5yb2xlID09PSAndGVjaG5pY2lhbic7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdXNlciwgaXNUZWNobmljaWFuLCBoYW5kbGVMb2dpbiwgaGFuZGxlTG9nb3V0LCBsb2FkaW5nIH19PlxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxuICAgICk7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlQXV0aENvbnRleHQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xuICAgIGlmICghY29udGV4dCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZUF1dGhDb250ZXh0IG11c3QgYmUgdXNlZCB3aXRoaW4gYW4gQXV0aFByb3ZpZGVyJyk7XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0O1xufTsiXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVJvdXRlciIsImxvZ2luIiwiQXV0aENvbnRleHQiLCJBdXRoUHJvdmlkZXIiLCJjaGlsZHJlbiIsInVzZXIiLCJzZXRVc2VyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJyb3V0ZXIiLCJjaGVja0F1dGgiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzdG9yZWRVc2VyIiwidXNlckRhdGEiLCJKU09OIiwicGFyc2UiLCJuYW1lIiwicm9sZSIsIkVycm9yIiwiZXJyb3IiLCJjb25zb2xlIiwicmVtb3ZlSXRlbSIsImhhbmRsZUxvZ2luIiwiZW1haWwiLCJwYXNzd29yZCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJoYW5kbGVMb2dvdXQiLCJwdXNoIiwiaXNUZWNobmljaWFuIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZUF1dGhDb250ZXh0IiwiY29udGV4dCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./contexts/AuthContext.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./contexts/AuthContext.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__, react_toastify__WEBPACK_IMPORTED_MODULE_3__]);\n([_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__, react_toastify__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"E:\\\\InstaReports\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 9,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_3__.ToastContainer, {\n                position: \"top-right\",\n                autoClose: 3000,\n                hideProgressBar: false,\n                newestOnTop: false,\n                closeOnClick: true,\n                rtl: false,\n                pauseOnFocusLoss: true,\n                draggable: true,\n                pauseOnHover: true,\n                theme: \"light\"\n            }, void 0, false, {\n                fileName: \"E:\\\\InstaReports\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 10,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"E:\\\\InstaReports\\\\frontend\\\\pages\\\\_app.js\",\n        lineNumber: 8,\n        columnNumber: 9\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFDd0I7QUFDUDtBQUNEO0FBRS9DLFNBQVNFLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDbkMscUJBQ0ksOERBQUNKLCtEQUFZQTs7MEJBQ1QsOERBQUNHO2dCQUFXLEdBQUdDLFNBQVM7Ozs7OzswQkFDeEIsOERBQUNILDBEQUFjQTtnQkFDWEksVUFBUztnQkFDVEMsV0FBVztnQkFDWEMsaUJBQWlCO2dCQUNqQkMsYUFBYTtnQkFDYkMsWUFBWTtnQkFDWkMsS0FBSztnQkFDTEMsZ0JBQWdCO2dCQUNoQkMsU0FBUztnQkFDVEMsWUFBWTtnQkFDWkMsT0FBTTs7Ozs7Ozs7Ozs7O0FBSXRCO0FBRUEsaUVBQWVaLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIkU6XFxJbnN0YVJlcG9ydHNcXGZyb250ZW5kXFxwYWdlc1xcX2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0cy9BdXRoQ29udGV4dCc7XG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lciB9IGZyb20gJ3JlYWN0LXRvYXN0aWZ5JztcbmltcG9ydCAncmVhY3QtdG9hc3RpZnkvZGlzdC9SZWFjdFRvYXN0aWZ5LmNzcyc7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgICAgICA8VG9hc3RDb250YWluZXJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbj1cInRvcC1yaWdodFwiXG4gICAgICAgICAgICAgICAgYXV0b0Nsb3NlPXszMDAwfVxuICAgICAgICAgICAgICAgIGhpZGVQcm9ncmVzc0Jhcj17ZmFsc2V9XG4gICAgICAgICAgICAgICAgbmV3ZXN0T25Ub3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGNsb3NlT25DbGlja1xuICAgICAgICAgICAgICAgIHJ0bD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgcGF1c2VPbkZvY3VzTG9zc1xuICAgICAgICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgICAgICAgIHBhdXNlT25Ib3ZlclxuICAgICAgICAgICAgICAgIHRoZW1lPVwibGlnaHRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9BdXRoUHJvdmlkZXI+XG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7Il0sIm5hbWVzIjpbIkF1dGhQcm92aWRlciIsIlRvYXN0Q29udGFpbmVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJwb3NpdGlvbiIsImF1dG9DbG9zZSIsImhpZGVQcm9ncmVzc0JhciIsIm5ld2VzdE9uVG9wIiwiY2xvc2VPbkNsaWNrIiwicnRsIiwicGF1c2VPbkZvY3VzTG9zcyIsImRyYWdnYWJsZSIsInBhdXNlT25Ib3ZlciIsInRoZW1lIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./services/authService.js":
/*!*********************************!*\
  !*** ./services/authService.js ***!
  \*********************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   login: () => (/* binding */ login)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst API_URL = \"http://localhost:4000/api\";\nconst login = async (email, password)=>{\n    const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(`${API_URL}/auth/login`, {\n        email,\n        password\n    });\n    return response.data;\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zZXJ2aWNlcy9hdXRoU2VydmljZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQjtBQUUxQixNQUFNQyxVQUFVQywyQkFBK0I7QUFFeEMsTUFBTUcsUUFBUSxPQUFPQyxPQUFPQztJQUMvQixNQUFNQyxXQUFXLE1BQU1SLGtEQUFVLENBQUMsR0FBR0MsUUFBUSxXQUFXLENBQUMsRUFBRTtRQUFFSztRQUFPQztJQUFTO0lBQzdFLE9BQU9DLFNBQVNFLElBQUk7QUFDeEIsRUFBRSIsInNvdXJjZXMiOlsiRTpcXEluc3RhUmVwb3J0c1xcZnJvbnRlbmRcXHNlcnZpY2VzXFxhdXRoU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCBBUElfVVJMID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTDtcblxuZXhwb3J0IGNvbnN0IGxvZ2luID0gYXN5bmMgKGVtYWlsLCBwYXNzd29yZCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChgJHtBUElfVVJMfS9hdXRoL2xvZ2luYCwgeyBlbWFpbCwgcGFzc3dvcmQgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG59OyJdLCJuYW1lcyI6WyJheGlvcyIsIkFQSV9VUkwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBJX1VSTCIsImxvZ2luIiwiZW1haWwiLCJwYXNzd29yZCIsInJlc3BvbnNlIiwicG9zdCIsImRhdGEiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./services/authService.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/react-toastify"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();