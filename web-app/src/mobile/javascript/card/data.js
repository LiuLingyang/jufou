(function () {
    var Data = window.Data || {};
    Data.guest = [];
    Data.add = [];
    Data.color = ['#2add2a', '#0ed692', '#3db6d1', '#3d97d1', '#a77da9', '#7e57b9', '#2c64a8', '#2c8ca8', '#2c40a8', '#596dd5'];
    var guest = Data.guest;
    var add = Data.add;
    
    guest.push({ name: '熊晓鸽', src: 'img/guest-5.png', video: 'http://player.youku.com/embed/XNjk0OTUzODky', ps: ['IDG全球常务副总裁兼亚洲区总裁', 'IDG资本创始合伙人'] });
    guest.push({ name: '马云', src: 'img/guest-2.png', video: 'http://player.youku.com/embed/XNjk0OTUzNjg0', ps: ['阿里巴巴集团董事局主席', ''] });
    guest.push({ name: '黎瑞刚', src: 'img/guest-1.png', video: '',img:'img/lrg.jpg', ps: ['上海文广新闻传媒集团总裁', '上海第一财经传媒有限公司董事长'] });
    guest.push({ name: '沈南鹏', src: 'img/guest-3.png', video: 'http://player.youku.com/embed/XNjk0OTUzNDM2', ps: ['红杉资本中国基金创始人', '红杉资本中国基金执行合伙人'] });
    guest.push({ name: '徐小平', src: 'img/guest-4.png', video: 'http://player.youku.com/embed/XNjk0OTUzOTk2', ps: ['真格基金创始人', '著名天使投资人'] });
    //guest.push({ name: '雷  军', src: 'img/guest-4.png', video: '', ps: ['小米科技创始人', '小米科技董事长兼首席执行官'] });

    add.push({ name: '杭州', time: '2014年4月', ps: ['时间：2014年4月', '地点：杭州', '主办方：浙报集团', '联合承办：传媒梦工场、恒生科技园', '协办方：B座12楼'] });
    add.push({ name: '厦门', time: '2014年5月', ps: ['时间：2014年5月', '地点：厦门', '主办方：浙报集团', '联合承办：传媒梦工场、爱特咖啡、小鱼网、赢时代', '指定媒体合作伙伴：东南网'] });
    add.push({ name: '成都', time: '2014年5月', ps: ['时间：2014年5月', '地点：成都', '主办方：浙报集团', '联合承办：传媒梦工场'] });
    add.push({ name: '上海', time: '2014年6月', ps: ['时间：2014年6月', '地点：上海', '主办方：浙报集团', '联合承办：传媒梦工场、一财网', '协办方：飞马旅'] });
   // add.push({ name: '安徽', time: '2014年6月', ps: ['时间：2014年6月', '地点：合肥', '主办方：浙报集团', '联合承办：传媒梦工场、安徽省青年创业者协会、安徽网、合肥海聚互动'] });
    add.push({ name: '武汉', time: '2014年7月', ps: ['时间：2014年7月', '地点：武汉', '主办方：浙报集团', '联合承办：传媒梦工场、长江日报传播研究院'] });
    add.push({ name: '北京', time: '2014年7月', ps: ['时间：2014年7月', '地点：北京', '主办方：浙报集团', '联合承办：传媒梦工场、华商传媒'] });
    add.push({ name: '青岛', time: '2014年8月 ', ps: ['时间：2014年8月', '地点：青岛', '主办方：浙报集团', '联合承办：传媒梦工场、青岛报业传媒集团、青岛掌控传媒有限公司'] });
    add.push({ name: '深圳', time: '2014年8月', ps: ['时间：2014年8月', '地点：深圳', '主办方：浙报集团', '联合承办：传媒梦工场、深圳晚报'] });
    add.push({ name: '苏州', time: '2014年9月', ps: ['时间：2014年9月', '地点：苏州', '主办方：浙报集团、苏州市人社局', '联合承办：传媒梦工场、苏州市劳动就业管理服务中心', '协办方：苏州市吴中区人社局、金枫创投'] });

    window.Data = Data;
})();

$(document).ready(function () {
    var guest_list = $('.guest-list');
   
    for (var i = 0; i < window.Data.guest.length; i++) {
        var guest_d = window.Data.guest[i];
        var ps = '';
        $(guest_d.ps).each(function (i, v) {
            ps += '<p>' + v + '</p>';
        });
        var h = '<li class="guest" data-img="'+guest_d.img+'" data-video=\'' + guest_d.video + '\' data-ps="' + ps + '" data-name="' + guest_d.name + '"><div class="guest-img">' +
                       ' <img src="' + guest_d.src+ '" style="" />' +
                        '<p class="guest-name">'+guest_d.name+'</p>' +
                   ' </div>' +
               ' </li>';

        if (i < window.Data.guest.length / 2) {
            guest_list.eq(0).append(h);
        } else {
            guest_list.eq(1).append(h);
        }
        //guest_list.eq(0).append()
    }

    var add_list = $('.add-list');

    for (var i = 0; i < window.Data.add.length; i++) {
        var add_d = window.Data.add[i];
        var ps = '';
        $(add_d.ps).each(function(i,v){
            ps += '<p>' + v + '</p>';
        });
        var h = '<li class="add" data-ps="'+ps+'" data-add="'+add_d.name+'"><div class="add-wapper"><p class=""><span class="add-time">' + add_d.time +
            '</span><span class="add-name" style="color:'+Data.color[i]+'">' + add_d.name + '</span></p></div></li>'
        if (i < window.Data.add.length / 2) {
            add_list.eq(0).append(h);
        } else {
            add_list.eq(1).append(h);
        }
    }
});