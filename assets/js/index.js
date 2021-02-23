$(function() {
    getUserInfo()

    const layer = layui.layer
        //退出
    $('#btnLogOut').on('click', function() {
        //弹出提示框
        layer.confirm('确认退出吗？', { icon: 3, title: '提示' }, function(index) {
            //清空本地存储
            localStorage.removeItem('token')
                //重新跳转到登陆页面
            location.href = '/login.html'
            layer.close(index)
        })
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        headers: { Authorization: localStorage.token },
        success: function(response) {
            // console.log(response);
            if (response.status !== 0) {
                return layer.msg(response.message)
            }
            renderAvatar(response.data)
        },
        error() {},
        // complete: function(response) {
        //     const { message, status } = response.responseJSON;
        //     if (message === '身份认证失败！' && status === 1) {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })

    function renderAvatar(user) {
        const username = user.nickname || user.username
        $('#welcome').html(username)

        if (user.user_pic) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            const firstName = username[0].toUpperCase()
            $('.text-avatar').html(firstName).show()
        }
    }
}