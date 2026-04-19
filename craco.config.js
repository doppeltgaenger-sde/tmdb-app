const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@data": path.resolve(__dirname, "src/data"),
      "@services": path.resolve(__dirname, "src/services"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@actions": path.resolve(__dirname, "src/redux/actions"),
      "@reducers": path.resolve(__dirname, "src/redux/reducers"),
      "@store": path.resolve(__dirname, "src/redux/store"),
      "@thunk": path.resolve(__dirname, "src/thunk"),
      "@shared": path.resolve(__dirname, "src/components/shared"),
      "@layout": path.resolve(__dirname, "src/components/layout"),
      "@base": path.resolve(__dirname, "src/components/base"),
      "@blocks": path.resolve(__dirname, "src/components/blocks"),
      "@pages": path.resolve(__dirname, "src/components/pages"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
};
