/*
 * 电子海报验证是否来自聚否服务器
 * 在发布的时候使用，保护知识产权...
 * @author: wt 
 */
 $.ajax({
        url: "http://www.hijufou.com/rest/open/meeting/search?keyword=xxxxxx",
        dataType: "json",
        error: function() {
            document.write("   ");
        }
});