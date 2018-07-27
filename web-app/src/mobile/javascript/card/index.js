/// <reference path="../scripts/jquery-1.8.2.min.js" />
/// <reference path="../scripts/zepto.js" />
/// <reference path="../scripts/jquery.mousewheel.js" />
/// <reference path="../scripts/zepto.touch.js" />
/// <reference path="../scripts/zepto.touch.js" />

$(document).ready(function () {
    $('#but').on('click', function () {
        $('.add').addClass('add-activing');
    });
    $('#but2').on('click', function () {
        $('.add').addClass('add-activing-back');
    });

    

    var container = $('#container');
    var client_index = 0;//当前块次序
    var max_index = 2;//最大块次序
    var sliding = 0;//是否正在滑动中
    var client_box = null;


    function whichTransitionEvent() {
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'animation': 'animationend',
            'OAnimation': 'oAnimationEnd',
            'MozAnimation': 'animationend',
            'WebkitAnimation': 'webkitAnimationEnd',
            'MsAnimation': 'msAnimationEnd'
        }

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }
    var transitionEvent = whichTransitionEvent();
    transitionEvent && document.getElementById('qr-code').addEventListener(transitionEvent, function () {
        var that = $(this);
       
        if (that.data('active')) {
            $(this).addClass('qr-code-active');
            $('#sponsor').hide();
        } else {
            $(this).removeClass('qr-code-active');
        }
       
    });
    var getBox = function (index) {
        return $('.slide-box[data-index=' + index + ']');
    }
    var up_funs = [
        function () { },
        function (b) {
            var guest = $('.guest');
            if (b) {
                guest.addClass('guest-activing-back');
            } else {
                guest.addClass('guest-activing').addClass('guest-active')
            }
        },
        function (b) {
            var add = $('.add');
            if (b) {
                add.addClass('add-activing-back');
            } else {
                add.addClass('add-activing');
            }
        },
        function (b) {
			if(!b){
				var li = $('.place li');
				li.addClass('active');
			}
            
        },
        function () { }
    ];
    var down_funs = [
      function () { },
      function (b) {
          var guest = $('.guest');
          if (b) {
              guest.addClass('guest-activing-back');
          } else {
              guest.addClass('guest-activing').addClass('guest-active');
          }
      },
      function (b) {
          var add = $('.add');
          if (b) {
              add.addClass('add-activing-back');
          } else {
              add.addClass('add-activing');
          }
      },
      function () {
          var li = $('.place li');
      },
      function () { }
    ];
    var guest = $('.guest').add('.add').add('.place li');
    for (var i = 0; transitionEvent && i < guest.length; i++) {
        guest[i].addEventListener(transitionEvent, function () {
            var that = $(this);
            if (that.hasClass('add-activing-back') || that.hasClass('guest-activing-back')) {
                that.addClass('guest-active');
            } else if (that.hasClass('add-activing') || that.hasClass('guest-activing')) {
                that.removeClass('guest-active');
            }
            $(this).removeClass('guest-activing').removeClass('add-activing').removeClass('add-activing-back').removeClass('guest-activing-back').removeClass('active');
        });
    }
    var add_click = function () {
        var float = $('#float2');
        var add = $(this).data('add');
        var h = $(this).data('ps');
        $('#addName').text(add);
        $('#vedioContent').children().remove();
        $('#vedioContent').append(h);

        float.css('display', 'block');
        $('.float-mask').css({ 'display': 'block' });
    };
    var guest_click = function () {
        var float = $('#float');

        var video = $(this).data('video');

        $('#video').remove();
        var videof =video===''?'<img id="video" src="'+$(this).data('img')+'"/>':'<iframe id="video" src="' + video + '" frameborder=0 allowfullscreen></iframe>';
        float.prepend(videof);
        $('#videoContent').children().remove();
        var h = '<h4>' + $(this).data('name') + '</h4>' + $(this).data('ps');
        $('#videoContent').append(h);

        float.css('display', 'block');
        $('.float-mask').css({ 'display': 'block' });
    };
    if (isEventSupported('touchstart')) {
        Zepto('.add').tap(add_click);
        Zepto('.guest').tap(guest_click);
        Zepto('.cancel').tap(function () {
            $('#video').remove();
            $(this).parent().css({ 'display': 'none' });
            $('.float-mask').css({ 'display': 'none' });
        });
        Zepto('#enroll').tap(function () {
            $('#float3').css({ 'display': 'block' });
            $('.float-mask').css({ 'display': 'block' });
            $('#float3').css('height', '90%');
            $('#divInput').show();
        });
    } else {
        $('.add').click(add_click);
        $('.guest').click(guest_click);
        $('.cancel').click(function () {
            $('#video').remove();
            $(this).parent().css({ 'display': 'none' });
            $('.float-mask').css({ 'display': 'none' });
        });

        $('#enroll').on('click', function () {
            $('#float3').css({ 'display': 'block' });
            $('.float-mask').css({ 'display': 'block' });
            $('#float3').css('height', '90%');
            $('#divInput').show();
        });

    }
    //$('.add').
    //transitionEvent && clientBox[0].addEventListener(transitionEvent, function () {
    //    var that = $(this);
    //    //that.css({ 'display': 'none' }).removeClass('box-up');
    //    that.addClass('box-out').removeClass('box-up');

    //    // client_box.css('display', 'block');
    //    sliding = 0;
    //});

    var boxs = $('.slide-box');
    for (var i = 0; transitionEvent && i < boxs.length; i++) {

        boxs[i].addEventListener(transitionEvent, function () {
            var that = $(this);
            if (that.hasClass('box-down')) {
                that.removeClass('box-down');
                //setTimeout(function () {
                //    //client_box.addClass('box-out');
                //}, 100);
               
            } else if (that.hasClass('box-up')) {
                that.addClass('box-out').removeClass('box-up');
            }

            //that.css({ 'display': 'block' }).removeClass('box-down');

            //client_box.css({ 'display': 'none' });
            //client_box.addClass('box-out');
            setTimeout(function () {
                sliding = 0;
            }, 500);

        });
    }
    var swipe_up = function (event) {
        if (sliding) {
            return;
        }


        var qr_code = $('#qr-code');
        if (event.target.id === 'qr-code' || $(event.target).parents('#qr-code')[0]) {
            !qr_code.data('active') && qr_code.addClass('qr-code-activing').removeClass('qr-code-activing-back').data('active', 1);
        }
        else if (event.target.id === 'float3' || $(event.target).parents('#float3')[0]) {

        }
        //else if ($(event.target).hasClass('ul-list') || $(event.target).parents('.ul-list')[0]) {
           
        //    return;
        //}
        else {
            if (client_index === max_index) {
                return;
            }
            sliding = 1;


            up_funs[client_index + 1]();
            up_funs[client_index](1);
            var clientBox = getBox(client_index);
            var nextBox = getBox(client_index + 1);
            //clientBox.css('z-index', 101);
            //nextBox.css({ 'z-index': 99, 'display': 'block' });
            //nextBox.css({ 'display': 'block' });

            //client_box = nextBox;
            nextBox.removeClass('box-out');

            clientBox.addClass('box-up');
            client_index++;
        }
    };
 
    var swipe_down = function (event) {
        if (sliding) {
            return;
        }
        
        var qr_code = $('#qr-code');
        if (event.target.id === 'qr-code' || $(event.target).parents('#qr-code')[0]) {
            qr_code.data('active') && qr_code.addClass('qr-code-activing-back').removeClass('qr-code-activing').data('active', 0);
            $('#sponsor').show();
        } else if (event.target.id === 'float3' || $(event.target).parents('#float3')[0]) {

        }
        //else if ($(event.target).parents('.ul-list')[0]) {
        //    return;
        //}
        else {
            if (client_index === 0) {
                return;
            }
            sliding = 1;
            down_funs[client_index - 1]();
            down_funs[client_index](1);
            var clientBox = getBox(client_index);
            var preBox = getBox(client_index - 1);
            //clientBox.css('z-index', 99);
            //preBox.css({ 'z-index': 101,'display': 'block' });
            // preBox.css({'display': 'block' });

            client_box = clientBox;

            preBox.removeClass('box-out');

            preBox.addClass('box-down');
            // preBox.css('display', 'block');
            client_index--;
        }
    };
   // if (!$('#float3').css({ 'display': 'block' }) || !$('#float2').css({ 'display': 'block' }) || !$('#float1').css({ 'display': 'block' })){
        Zepto('#qr-code').on('tap', function (e) {
            swipe_up(e);
        });
        $(document).mousewheel(function (event, delta) {
        
            container.data('_index', client_index);
            if (delta > 0) {
                swipe_up(event);
            } else {
                swipe_down(event);
            }
        });
    //}
    ///去除浏览器默认行为
        document.addEventListener('touchmove', function (e) {
            if (e.target.id === 'float3' || $(e.target).parents('#float3')[0]) {
                return;
            }
            e.preventDefault()
        }, false);
    //var start_pos = { x: 0, y: 0 };
    //var uls = document.getElementsByClassName('ul-list');
    //for (var i = 0; i < uls.length; i++) {
    //    var cul = uls[i];
    //    //var lis = cul.querySelectorAll('li');
    //    cul.addEventListener('touchstart', function (e) {
    //        var eve = e.targetTouches[0];
    //        e.preventDefault();
    //        start_pos.y = eve.pageY;
    //    }, false);
    //    cul.addEventListener('touchmove', function (e) {
    //        var eve = e.targetTouches[0];
    //        e.preventDefault();
    //        var ext = eve.pageY - start_pos.y;
    //        //alert(ext)
    //        if (Math.abs(ext) > 5) {
    //            var cto = parseInt($(this).css('top'));
    //            //alert($(this).css('top'))
    //            this.style.top = (ext + cto) + 'px';
    //            start_pos.y = eve.pageY;
    //        }
    //        e.stopPropagation();
    //    }, false);
    //}
    //document.getElementById('').style.to
    Zepto(document).swipeUp(function (e) {
        //$('#text').text(start_pos.y);
        e.preventDefault();
        swipe_up(e);
    });
    Zepto(document).swipeDown(function (e) {
        e.preventDefault();
        swipe_down(e);
    });

    function isEventSupported(eventName, element) {
        var TAGNAMES = {
            'select': 'input', 'change': 'input',
            'submit': 'form', 'reset': 'form',
            'error': 'img', 'load': 'img', 'abort': 'img'
        };
        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;
        var isSupported = (eventName in element);
        if (!isSupported) {
            if (!element.setAttribute) {
                element = document.createElement('div');
            };
            if (element.setAttribute && element.removeAttribute) {
                element.setAttribute(eventName, '');
                isSupported = typeof element[eventName] == 'function';

                if (typeof element[eventName] != 'undefined') {
                    element[eventName] = void 0;
                };
                element.removeAttribute(eventName);
            };
        };
        element = null;
        return isSupported;
    };
});