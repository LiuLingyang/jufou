/*
 * ------------------------------------------
 * 表情数据缓存实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _r = NEJ.R,
        _c = _('nej.c'),
        _u = _('nej.u'),
        _p = _('nej.ut'),
        _pro;
    if (!!_p._$$PortraitCache) return;
    /**
     * 表情数据缓存，缓存对象可直接用于nej.ut._$$ListModule
     * [code]
     *     // 取表情分类列表
     *     cache_inst._$getList({
     *         key:'portrait-type',
     *         offset:0,
     *         limit:1000,
     *         data:{
     *             type:'type'
     *         }
     *     });
     *     // 取某类表情列表
     *     cache_inst._$getList({
     *         key:'portrait-face-0',
     *         offset:0,
     *         limit:1000,
     *         data:{
     *             type:'face'
     *         }
     *     });
     * [/code]
     * @class   {nej.ut._$$PortraitCache} 中国行政划区数据缓存
     * @extends {nej.ut._$$AbstractListCache}
     * @param   {Object} _options 可选配置参数，已处理参数列表如下
     * 
     */
    _p._$$PortraitCache = NEJ.C();
    _pro = _p._$$PortraitCache._$extend(_p._$$AbstractListCache);
    /**
     * 载入表情列表
     * @protected
     * @method {__doLoadList}
     * @param  {Object}          请求信息
     * @config {String}   key    列表标识
     * @config {Number}   offset 偏移量
     * @config {Number}   limit  数量
     * @config {String}   data   请求相关数据
     * @config {Function} onload 列表载入回调
     * @return {Void}
     */
    _pro.__doLoadList = function(_options){
        var _type = (_options.data||_o).type||'',
            _list = _dmap[_type]||[],
            _root = _c._$get('portrait');
        if (!(_list[0]||_o).id){
            _u._$forEach(
                _list,function(_value,_index){
                    _list[_index] = {
                        text:_value,
                        id:_type+'-'+_index,
                        url:_root+_type+'/preview/'+_type+_index+'.gif'
                    };
                }
            );
        }else if(_type=='type'&&(_list[0]||_o).total==null){
            _u._$forEach(
                _list,function(_item){
                    _item.total = (_dmap[_item.id]||_r).length;
                }
            );
        }
        _options.onload({
            list:_list,
            total:_list.length
        });
    };
    // init data
    var _dmap = {
        type:[
            {id:'face',name:'泡泡',size:30},
            {id:'yayun',name:'亚运表情',size:60},
            {id:'popo',name:'大泡泡',size:30},
            {id:'west',name:'梦幻西游',size:30},
            {id:'bear',name:'蛋壳熊',size:60},
            {id:'tu',name:'兔儿控',size:60},
            {id:'r',name:'土豆仔',size:60},
            {id:'g',name:'绿头巾',size:60},
            {id:'mayang',name:'玛央猫',size:60},
            {id:'nai',name:'奶瓶仔',size:60},
            {id:'minimo',name:'帽帽鼠',size:60},
            {id:'mliho',name:'唛哩轰',size:60},
            {id:'liki',name:'liki公主',size:60},
            {id:'mx',name:'麦咪熊熊',size:60},
            {id:'xiayu',name:'小夏',size:60},
            {id:'cobo',name:'酷巴熊',size:60},
            {id:'pop',name:'泡泡兵',size:60},
            {id:'meaky',name:'怪物熊猫',size:60},
            {id:'wuzhi',name:'无知熊猫',size:60},
            {id:'peg',name:'PEG',size:60},
            {id:'frogleon',name:'绿豆蛙',size:60},
            {id:'zhuxiaoliang',name:'猪小梁',size:60},
            {id:'popomm',name:'泡泡妹',size:60}
        ],
        face:['微笑','开怀笑','哭泣','失望','困了','好好笑','啵','电到了','汗','流口水了','真困啊','我吐','眨眼','？？？','嘘','砸死你','不说','坏','色迷迷','教训','可爱','YEAH','崩溃','惊讶','鄙视','开心','仰慕你','晕','挖鼻孔','撒娇','鼓掌','害羞','老大','欠揍','吐舌笑脸','飞吻','工作忙','大哭','偷偷笑','送花给你','来，亲一个','拍桌子','拜拜','得意的笑','生气','怕怕','尴尬','难过','叹气','我是女生','玫瑰','好爱你','心碎了','亲亲','NO','YES','握个手','到点了','音乐','我是男生','带血的刀','炸弹','有了','好晚了','吸血蝙蝠','便便','干一杯','抽烟','打电话','家','车子','礼物','金钱','太阳','下雨','猪猪','小猫','小狗','骨头','喝水','汉堡','包子','西瓜','约会','CALL我'],
        yayun:['游泳','跳水','水球','花样游泳','射箭','田径','羽毛球','棒球','篮球','拳击','皮划艇静水','皮划艇激流回旋','自行车场地赛','自行车公路赛','自行车山地赛','自行车小轮车赛','马术','击剑','足球','体操','蹦床','艺术体操','手球','曲棍球','柔道','现代五项','赛艇','帆船','射击','射击飞碟','垒球','乒乓球','跆拳道','网球','软式网球','铁人三项','排球','沙滩排球','举重','摔跤','保龄球','台球','体育舞蹈','龙舟','高尔夫球','卡巴迪','空手道','轮滑','橄榄球','藤球','壁球','武术','国际象棋','围棋','中国象棋','板球','自由泳','仰泳','蛙泳','蝶泳','跳台','跳板','标枪','铅球','撑竿跳','跨栏','跳远','掷铁饼','链球','七项全能','十项全能','跳马','自由体操','单杠','双杠','高低杠','鞍马','吊环','平衡木','反对','支持','拉拉队','中国队加油'],
        popo:['饶了我','敢惹我','蜘蛛侠','微笑','抓狂','流鼻血','谁放p','开饭了','崇拜','血窟窿','不是吧','打哈欠','真衰','大家好','投降','大笑','流口水','老大','雄霸','命歹啊','亲你','痛哭','挨揍','脸肿','服了','傲慢','得意','满意','汗','可怜','怒了','傻笑','伤心','倒霉','鬼脸','羡慕','偷看','绷带','挨砖','挨铁球','好色','行星','害羞','泪流','烧香','挨扁','不敢了','哈哈','强','寒','爽啊','惊讶','yoyo','太有才','吓我','出击','耍酷','缺牙','又打我','友好','黑心','我哭','骷髅','白牙','掉眼球','戴花','我也要','美味','狂笑','眯眼','晕死','爱财','发呆','滴汗','爱你','哼哼','眼镜','怕了','大小眼','飞天侠','甲虫脸','错愕','欢迎','不懂','标枪','风帆','击剑','跨栏MM','跨栏','马术','平衡木','铅球','拳击','射击','射箭','手球','跆拳道','田径','田径MM','跳马','铁饼','棒球','撑竿跳','弹床','吊环','举重','排球','皮划艇','皮划艇','乒乓','自行车','曲棍球','沙滩排球','水上排球','体操','跳台','网球','游泳','羽毛球','加油！'],
        west:['微笑','开心','得意','晕了','怕了吧','蝙蝠','牛奶','小狗','心碎了','爱你','蛋糕','握手','时钟','咖啡','不爽','痛哭','牛头','脸红','阴险吧','再见','帅哥','亲一个','电话','献花','不是吧','吐舌头','yes','no','爽啊','小猪','灯泡','可乐','骂人','礼物','晚安','讨厌','乌云','yeah','你好','扇风','眯眼','飞吻','唱歌','臭美','庆祝','惊叹','叫好','安慰','我行啊','崩溃','胜利了','叫好','我哭','可爱','不爽','疑问','憨笑','call我','不错哦','休息','呸','欢呼','大笑','哈哈','飞行','呕吐','挨揍','我闭嘴','困了','晦气','就医','鄙视','喜欢你','回来了','汗','加油','厉害','高兴','倒霉','我顶','流口水','速度','不理你','欢迎','恭喜','邮件','瞧我的','爱意','色迷迷','亲爱的','不稀罕','强','喝酒','完蛋','蓬头','拜拜','爽啊','献花','快来人','念经','下雨了','快记','小看你','溜走'],
        bear:['打球','我听话','吃零食','写字','跳舞','吹气','肚皮舞','无聊哦','吃饭了','吃冰棍','大笑','发火','击球','揍你','唱歌','眨眼睛','打喷嚏','纳闷','爆发吧','做鬼脸','威胁','玩彩球','星月','挨揍','哼歌','魔法棒','舞大刀','再见','扩胸'],
        tu:['正义超人陈队','大八卦','啊~~~死掉了','吃饱饱','HAPPY~~','哇 哈哈哈','好急好急','好开心','BS你','星星眼','正义超人','调皮','WS老别别','钢琴小王子','挖啊挖鼻孔','爆炸芭蕾','风尘式抽烟','华丽转圈圈','色别别归来','拉拉队长','第一手','草莓星星眼','撒娇撒娇','弱弱小鸡','心永不变','我追呀追','我跑呀跑','梨花带雨','不要离开我','含蓄滴脸红','怨念','抓狂','WS偷偷笑','欢迎欢迎','热烈欢迎','坏坏扭扭','色色扭扭','忠心扭扭','勾人的小妞','帅锅','WS眼镜男','华丽吐啊吐','指着鼻子骂','伤心滴飘走','不倒翁','喝醉鸟','不爽','121 121 121','软绵绵滴撒娇','摇啊摇','激烈滴撒娇','小白扭扭','小黑扭扭','怕不怕啊','小白跳舞','小黑跳舞','小白跳舞','小黑跳舞','HAPPY小暴牙','钢琴小公主','钢琴小王子','美少女花子','垂涎美色滴WSN~~~~','是说我吗','在做什么捏','僵尸宝宝','僵尸妈妈','僵尸爸爸','僵尸爷爷','一起跳~~','一起跳~~','天生一对','白扭扭队','黑扭扭队','僵尸家族出游鸟~~~','偶棉在浇花啊','啦啦啦~','心花怒放','大心~~','蹲地发呆','招手','喔~~~','扇扇风左','少奶奶打招呼','扇扇风右','圣诞快乐','圣诞树','洗白白',' 绿茶面膜','巧克力面膜','睡得香','臭屁轰炸','生气厨娘','快乐游泳','比基尼','恭喜发财','招财进宝','吉祥如意','对不起','不想起床','抱抱','蹬腿','兔子火锅','情人节快乐','胡思乱想','小可爱','小三八','抓抓手','生日快乐','顿脚','摇摇椅','贱贱扭扭腰','乖乖扭扭腰','蓝蓝路','奥运火炬手','鼠宝宝','牛宝宝','虎宝宝','兔宝宝','龙宝宝','蛇宝宝','马宝宝','羊宝宝','猴宝宝','鸡宝宝','狗宝宝','猪宝宝','棒棒糖','吃冰棒','划水','玩水','假假PMP','忠心PMP'],
        r:['慢慢来嘛','可恶啊','扭扭捏捏','阴险','我就说啊','弹吉他','唱歌','你给我记着','好笑','太好笑了','怎么!?','听我的','换脑壳','不会吧!','摇摆','扭动','瀑布汗','我吐','呼啦圈','怎么这样...','呜呜','真的吗!!','好心痛!','这个这个这个','Yin笑','喵呜','你就吹吧!','咳嗽','你啊你啊!','潜水','气绝','小声点!','NONONO','怎么办怎么办?','削皮','我是LOLI','鼓掌','扭头','这边不对那边不对!','喷饭!','拜拜','冲啊','亲亲','有弹性就有魅力','好冷','摇摇晃晃','捏你','失落','你就扯吧!','有惊喜!','啊呀呀呀!','翻滚中','滚圈圈','鄙视你!','打喷嚏','来呀来呀!~','头很光滑','我说没说过!','华丽摇摆!','就是这样','晕厥～','啊？？','单挑！','我刷啊刷压','我洗啊洗脸','长角...','僵尸','我变我变变','我切我切切','秀逗了？','做鬼脸','杀人狂魔','我舔～～','撞墙啦','冲啊～','打冷战','点头','滚来滚去','雀跃啊','休息了','撞头党'],
        g:['羞羞','叹气','爱哟~','锻炼','扯虾米','88','好重','欺负人','不活了','讨厌啦','好HIGH','燃了！','亲爱D','喝茶','头晕','很有才','驾~','亢奋','惊！','吓！','摸头','不要吖~','抖~','脸色铁青','红牌','NONO','抬眼镜','天使','亲亲','打拳','这样吗','叹','恶魔','超亢奋','哪里哪里','受打击','喝酒','啊哦','受刺激！','学习','怕怕','尿急','花痴','受伤','抠鼻子','超人','好爱吖','欺负人','飘~','切~','摇吖摇','钓鱼','郁闷'],
        mayang:['戳苍蝇','忽悠','偷窥','飞','鬼脸','刷牙','隐身','吃汉堡','我们是冠军','熏苍蝇','被球砸','摇头','转头斜视','吹风','尿尿','叹气','临危不乱','惊讶','打劫','鬼','汗','喷火','飘过','亲','顶','狡猾','怒','中指','睡觉','问号','大惊','生气','胜利','耶','坐禅','哭','大笑','喊号','比手势'],
        nai:['被揍','猫猫','我爱奶瓶','爱心','祈祷','再见','不耐烦','下流手势','看着奶瓶狂笑','伤心咬奶瓶','怒火','狂笑','微笑','烦恼','凌厉的眼光','拜奶瓶','懒虫喝奶','抱着奶瓶睡觉','趴在地上哭','自虐','疑问','皱眉头','路过','吐舌头','号啕大哭','大吐舌头','害羞','亲亲奶瓶','胜利手势','犯困','指挥','幽灵','生气想揍人'],
        minimo:['好喜欢','棒','你好','飘过','鼓掌','不明白','晕','新年好','汗','哭','可爱','我是女王','我吐','玩耍','加油','吃东西','恭贺新春','钱啊钱','好冷','有计谋','嘲笑','潜水太久','不会吧','不要','睡觉','扭扭捏捏','发财拉','不行','哈哈','路过','怕怕','献吻','涮牙了','好气','我错了','再见','鬼','藐视','电你','尴尬','偷看','胜利','郁闷','找打','惊'],
        mliho:['吃东西','你欺负我','嘿嘿','欢迎','亲爱的','发火','偷亲','笑死了','吐血','再见','快亲我','很好很强大','耍赖','我吐','我汗','爆发','数钱','逗你玩','恭喜','着迷','听话','喜欢','疼爱','恶整','起床啦','伤心','鬼脸','不会吧','疑惑','有美女吖','刷牙啦','超人','我来啦','看不见','发怒','别惹我','噪音攻击','报复','反攻击','坏笑','满足','害羞','欢呼','落魄','无视','探勘','求饶','吸引','虐待','很乖'],
        liki:['ok','偷笑','大笑','害羞','腼典','撒娇','崇拜','仰慕','怒骂','失望','大惊','向前进','老大','教训','哭','大哭','委屈','献花','晕','撒皮','乖','加油','寒','见鬼','刷牙','超人'],
        mx:['拍手','抚摸','汗','诡笑','眨眼','棒棒糖','豆眼','点头','摇头','蹭','来抱抱','乃人噢','开心跳','happy','看热闹','生日快乐','亲亲','氺汪汪','好冷','看','一起来','得意','扭呀扭','拨耳朵','美滋滋','可怕','亲宝贝','揉揉','工作','不高兴','啦啦','偷笑','奇怪','吃','惊','私语','抽咽','委屈','流泪','哭','强吻','偷看','抱住','献花','跳舞','hi','睡','冷哇','么么','困','亲','不要','无语','魂','再见','我说','大步走','摆手','扭动','噢噢噢'],
        xiayu:['555哭','凉快','介个','无语','哼哼~~','happy~','我来啦','耶~','我扑','委屈','love','困了','前进','思考','肚子痛','love','困了','前进','思考','肚子痛','吃饭中','睡觉觉','化妆','变脸','什么','打针','忙','可怜的哭','坏笑','不耐烦','喝果汁','疯','怒视','很强大','傻呆呆','好主意','no','甩葱','脸红'],
        cobo:['不活啦','瞌睡','嘻！嘻！','斗虫虫','NO!NO!','Hi!','琢磨！琢磨！','撞墙','嘘！','嘻！嘻！','潜水中','偷笑','亲亲','再变','笑崩溃','我变','嘿哈','敬礼','推','好HAPPY哦','变','嘿嘿','来呀','陶醉','逗你','扭扭','翻过','得意','我飘','旋转快乐','左右扭','新年快乐','滚来滚去','放炮啦','恭喜发财','耶～','加油～','感冒了','别理我','吐舌头','我跳','看我的','北京欢迎你','看箭','中国加油','我顶','我跳','揍你','力气太大了吗','我劈','啷哩个啷','鲤鱼跳','熊式游法','我顶','汗。。。','我画圈圈','顶！！','同志们好～','被雷到','脑残','我戳我戳','已阅','得意','耶！','啊～～','臭屁','这里这里...','不会吧...','哦？','哼！','我来啦～','听音乐','看招！','哦','得得意意','啊 切','看招！','草裙舞','啦啦啦','啦啦啦','泪眼花花','看招！','啊～哈！','我！老大！','熊家拳！','嘘！小声点!','旋转快乐！','晕','琢磨','撞墙','找抽','豆豆','嘿哈','黄飞熊','降龙十八掌','觉觉','啊～切～～','美女','88','笑死我了','让我们集结吧！','装可爱','我来啦～','88','泪啊～','no no'],
        pop:['吃饭','晕','抓狂','喷血','哭','抽你','吐了','扫射','潜水','BIBI','KAO','抽烟','捏你','抱抱','汗','爽啊','我甩','舔你','哟西','去你的','我吐','回来','看你狂不','感动','喷水','你好棒','你……我倒','早','洗澡澡',' “鹿”过','开枪','蝙蝠侠','我“滚”呀“滚”','找我啥事','恰我一拳','抠鼻鼻','好困那','哼','拜托拉','好寒那','爆头','发飚啦','大笑',' 痴笑','大寒'],
        meaky:['抽烟','鄙视','媒婆','大笑','困了','浪舞','凄凉','大哭','倒了','很馋','嘁~','膜拜','怒奔','自残'],
        wuzhi:['火炬接力','石化','元气满点','俯卧撑','发呆','恐怖','蓝蓝路','不好意思','生日快乐','懒','无所谓','生病','星星眼','谢谢','偷窥','kiss','打飞','皮又痒了','鄙视你','砍死你','眼泪汪汪','挖鼻子','大笑','暴走','sm','orz','晕','色眯眯','咬住','不良','华丽登场','捏脸','吃面包','摇头晃脑','瞌睡','挠挠','怒','思考'],
        peg:['困啦','嘿嘿...','喵～','气死我了','我爱漂漂','刷牙','真好吃','好呀','伤心','搅啊搅拌','我晕','寒～','吃瓜瓜','我爱大包','吸面功'],
        frogleon:['开心','伤心','惊恐','怒','疑惑','可爱','白眼','伤心','委屈','喜悦','痛苦','狂喜','庆祝','惊讶','贼笑','雀跃','咬牙切齿','不爽','胆小怕事','被扁','冷汗','可怜','吃惊','抓狂','无奈','惊喜','害怕','忐忑','发疯','感动'],
        zhuxiaoliang:['我飞～','跑路喽','快跑','跳舞','扮花花','扮苍蝇','中箭','哭给你看','电死你','出发','吃饭啦','好吃','飘过','泡咖啡','泡茶'],
        popomm:['同意','怕怕','女侠','高兴','做面膜','杂耍','病了','困了','咳咳','生气','不要啊 ','撅嘴','嗯嗯','请安','为什么','怒','爱心','可爱']
    };
};
NEJ.define('{lib}util/data/portrait/portrait.js',
          ['{patch}config.js'
          ,'{lib}util/cache/cache.list.base.js'],f);