/* 
 * 活动参加人员页面逻辑
 * @author:lly
 */
var mid = $.jStorage.get("meetid");
var meetObj = $.jStorage.get("meetObj");
var offset=0,lazyStop,lazyLoad;
meetObj&&($('#meetTitle').text(meetObj.title));

function getAttendee(){
     $.getJSON("http://www.hijufou.com/rest/open/meeting/attendees",
     {mid:mid,type:0,limit:6,offset:offset},
     function(data) {
          var meetinfo = data.result;
          var attend = meetObj.joinCount;
          $("#attend").text(attend);
          //$("#attendees").empty();
          $.each(meetinfo.list, function(i, item) {
               var userPic = "../../../../res/mobile/pic/face50.jpg";
               var atten=item.attendee;
               if (atten.thumbnail) {
                    userPic = atten.thumbnail;
               }
               var idx = item.id;
               var temp=(atten.realname?atten.realname:'匿名')+'-'+(atten.company?atten.company:'黑暗组织');
               var html = "<div class='w-lui f-cb bd03'><a href='../group/member.profile.html?uid="+ atten.id +"'><img class='fl f-sd br1' src='"+ userPic+"'/><div class='dtl'><p class='ln ln0 fs04 fc03'>"+ temp +"</p>"
               + "<p class='ln lnx fs08 fc03'>"+ getRole(item.role) +"</p><p class='ln ln1 f-bg fs08 fc04' id='sex"+idx+"'>"+getSex(atten.gender) +"<span class='fs08 fc05 tip2'>+" + item.observer+"</span></p></div></a></div>";
               $("#attendees").append(html);
               var sex = atten.gender;
               if(sex == 1){
                    $("#sex"+idx).addClass("c0");
                    $("#sex"+idx).removeClass("c1");
               }else{
                    $("#sex"+idx).addClass("c1");
                    $("#sex"+idx).removeClass("c0");
               }
          });
          if(meetinfo.list.length<6){
               lazyStop=true;
          }
          $("#loading_bottom").hide();
          lazyLoad=false;
     });     
}
getAttendee();

$.getJSON("http://www.hijufou.com/rest/open/meeting/attendees",
     {mid:mid,type:1},
     function(data) {
        var meetinfo = data.result;
          var absent = meetinfo.list.length;
          $("#absent").text(absent);
     }
  );

$(window).scroll(function () {
     if($(window).scrollTop()>=$(document).height()-$(window).height()-50){
          if((!lazyStop)&&(!lazyLoad)){
               //加载小提示显示
               lazyLoad=true;
               $("#loading_bottom").show();
               offset = offset + 6;
               getAttendee(); 
          }
     }
});

