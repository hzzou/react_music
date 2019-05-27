

const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/kugou", {
            target: "http://m.kugou.com/", //注意
            changeOrigin: true,
            pathRewrite: { //重写目标路径(动态端口匹配，如果不写，会导致地址改变之后代理失败)
                "^/kugou" : ""
            },
        })
    );

    app.use(
        proxy("/mobilecdn", {
            target: "http://mobilecdn.kugou.com/",
            changeOrigin: true,
            pathRewrite: { //重写目标路径(动态端口匹配，如果不写，会导致地址改变之后代理失败)
                "^/mobilecdn" : ""
            },
        })
    );

    app.use(
        proxy("/yy_kugou", {
            target: "http://www.kugou.com/yy/",
            changeOrigin: true,
            pathRewrite: { //重写目标路径(动态端口匹配，如果不写，会导致地址改变之后代理失败)
                "^/yy_kugou" : ""
            },
        })
    );
};