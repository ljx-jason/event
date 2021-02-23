$.ajaxPrefilter(function(options) {
    // console.log(options);
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    if (options.url.indexOf('/my/')) {
        options.headers = {
            Authorization: localStorage.token
        }
    }
    options.complete = function(response) {
        const { message, status } = response.responseJSON;
        if (message === '身份认证失败！' && status === 1) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})