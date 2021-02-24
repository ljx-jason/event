$(function() {
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg(response.message)
                }
                layer.msg(response.message)
                    //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})