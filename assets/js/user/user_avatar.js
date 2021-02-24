// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
    // 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

//点击上传按钮
$('#btnImgChoose').on('click', function(e) {
        $("#chooseImg").click()
    })
    //选择更换头像
    // 为文件选择框绑定 change 事件
$('#chooseImg').on('change', function(e) {
    // 获取用户选择的文件
    // console.log(this === e.target);
    const fileList = this.files
    if (fileList.length === 0) {
        return layer.msg('请选择照片！')
    }

    const fileImg = fileList[0]
    const newFileUrl = URL.createObjectURL(fileImg)
        // 3. 重新初始化裁剪区域
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newFileUrl) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

//提交头像并渲染
$('#uploadBtn').on('click', function(e) {
    const dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')


    const layer = layui.layer
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function(response) {
            if (response.status !== 0) {
                return layer.msg(response.message)
            }
            layer.msg(response.message)
            window.parent.getUserInfo()

        }
    })
})