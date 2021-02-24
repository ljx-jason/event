$.ajaxPrefilter(function(options) {
    // console.log(options);
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    if (options.url.indexOf('/my/')) {
        options.headers = {
            Authorization: localStorage.token
        }
    }
    //校验未登录直接访问后台
    options.complete = function(response) {
        const { message, status } = response.responseJSON;
        if (message === '身份认证失败！' && status === 1) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

    //面向切片编程
    // const successFunction = option.success.bind(this)
    // option.success = function(response) {
    //     successFunction(response)
    //     const { message, status } = response.responseJSON;
    //     if (message === '身份认证失败！' && status === 1) {
    //         localStorage.removeItem('token')
    //         location.href = '/login.html'
    //     }
    // }
})