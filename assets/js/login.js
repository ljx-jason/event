$(function() {
    $("#link_reg").on("click", function(e) {
        $(".reg-box").show();
        $('.login-box').hide();
    })
    $("#link_login").on("click", function(e) {
        $(".reg-box").hide();
        $('.login-box').show();
    })

    //密码校验规则
    const form = layui.form
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6~12位，且不能出现空格'],
            repwd: function(value) {
                const password = $('.reg-box [name="password"]').val()
                if (password !== value) {
                    return '两次输出不一致！'
                }
            }

        })
        //提示信息并转到登陆按钮
    const layer = layui.layer


    //注册发起Ajax请求
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            $.ajax({
                url: '/api/reguser',
                type: 'POST',
                data: {
                    username: $('.reg-box [name=username]').val(),
                    password: $('.reg-box [name=password]').val()
                },
                success(response) {
                    if (response.status !== 0) {
                        return layer.msg(response.message);
                    }
                    layer.msg('登录成功，请登录！')
                    $('#link_login').click()
                }

            })
        })
        //登录发起Ajax请求
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success(response) {
                if (response.status !== 0) {
                    return layer.msg(response.message)
                }
                localStorage.setItem('token', response.token)
                location.href = '/index.html'
            }
        })
    })
})