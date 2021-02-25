$(function() {
    const form = layui.form
    const layer = layui.layer
        //渲染从后台拿到的列表数据
    initArticleList();

    function initArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(response) {
                if (response.status !== 0) { return layer.msg(response.message) }
                //调用template模板引擎渲染html结构
                const htmlStr = template('tpl-table', response)
                $('tbody').html(htmlStr)
            }
        })
    }

    //弹出添加类别信息框
    let indexAdd = null
    $('#btnAddType').on('click', function(e) {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html(),
            })
        })
        //提交新增类别信息
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(response) {
                    if (response.status !== 0) { return layer.msg(response.message) }
                    layer.msg(response.message)
                    initArticleList()
                    layer.close(indexAdd)
                }
            })
        })
        //弹出修改类别信息框
    let indexEdit = null
    $('tbody').on('click', '#btn-edit', function(e) {
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-edit').html(),
            })

            const id = $(this).data('id')
                // 发起请求获取对应分类的数据
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    form.val('form-edit', res.data)
                }
            })
        })
        //更新文章分类的数据
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArticleList();
            }
        })
    })

    //删除文章分类
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArticleList();
                }
            })
        })
    })

})