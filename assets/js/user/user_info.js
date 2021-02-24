$(function() {
    const form = layui.form
        //校验表单
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度不能大于6位'
            }
        }
    })

    initUserInfo()

    //渲染表单数据
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg(response.message)
                }
                // console.log(response);
                form.val('userInfo', response.data)
            }
        })
    }
    //重置渲染
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    //提交修改
    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })

})