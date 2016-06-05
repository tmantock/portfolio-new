var arrowClick;
var site_array = ["http://dev.tevinmantock.com/decider","http://dev.tevinmantock.com/memory_match","http://dev.tevinmantock.com/moments","http://dev.tevinmantock.com/calculator","http://dev.tevinmantock.com/SGT"];
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function pageScroll (project,time) {
    var projectPosition = project.position().top;
    $('.projectContainer').animate({top:(projectPosition) * -1 + 'px'},time,function () {
        $('.projectTitle').show();
        arrowClick = true;
    });
}

function listUp (element) {
    $('.projectTitle').hide(300);
    var position = $(element).attr('data-position');
    if (position == '1') {
        var sub_project = $('#project5');
        pageScroll(sub_project,2500);
        $('.upArrow').attr('data-position',5);
        $('.downArrow').attr('data-position',6);
        return;
    }
    if (arrowClick === true) {

        arrowClick = false;

        var upCount = parseInt(position);
        upCount--;
        var project = $('#project'+upCount);
        pageScroll(project,1000);
        var downCount = upCount + 1;
        $(element).attr('data-position', upCount);
        $('.downArrow').attr('data-position', downCount);
    }

}

function listDown (element) {
    $('.projectTitle').hide(300);
    var position = $(element).attr('data-position');
    $('.upArrow').css('color','white');
    if(position == '6') {
        var sub_project = $('#project1');
        pageScroll(sub_project,2500);
        $('.upArrow').attr('data-position',1);
        $('.downArrow').attr('data-position',2);
        return;
    }
    if (arrowClick === true) {

        arrowClick = false;

        var downCount = parseInt(position);
        var project = $('#project'+downCount);
        pageScroll(project,1000);
        downCount++;
        var upCount = downCount - 1;
        $(element).attr('data-position',downCount);
        $('.upArrow').attr('data-position',upCount);
    }
}

function randomPosition(id){

    var h = $(id).height() + 500;
    var w = $(id).width();

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];
}

function starScroll (id) {

    if(!isMobile()) {
        var starSmall;
        var starBig;

        for (i = 0; i < 25; i++) {
            var newPosition = randomPosition(id);
            starBig = $('<div>').addClass('big_star').css({top: newPosition[0], left: newPosition[1]});
            $(id).append(starBig);
            for (x = 0; x < 10; x++) {
                var newPosition = randomPosition(id);
                starSmall = $('<div>').addClass('small_star').css({top: newPosition[0], left: newPosition[1]});
                $(id).append(starSmall);
            }
        }
    }
}

function fontCheck () {
    if(isMobile()) {
        $('.sgt').html('SGT');
    }
}

$(function($){
    var windowWidth = $(window).width();
    var windowHeigth = $(window).height();

    $(window).resize(function() {
        if(windowWidth != $(window).width()){
            location.reload();
            return;
        }
        if(windowHeigth != $(window).height()){
            location.reload();
            return;
        }
    });
});

$(document).ready(function (){
    $('.projectImageContainer').on('click', function () {
        var info = $(this).attr('data-information');
        var arrayPosition = $(this).attr('data-frame');
        var id = '#' + info;
        var iframe = $('<iframe>');
        $(id).css({height: '100%', width: '100%'});
        $('.listBox , .make_web, .projectTitle').css('display','none');
        var infoPosition =  $(id).position().top;
        $('.projectContainer').animate({top:(infoPosition) * -1 +'px'},700, function () {
            $('.projectInformationContainer').css('display','block');
            $(id + ' .projectInformationContainer .projectImage').append(iframe.attr('src',site_array[arrayPosition]));
        });
        setTimeout(function () {
            starScroll(id);
        },710);
    });

    $('.closer').on('click', function () {
        var info = $(this).attr('data-project');
        var id = '#' + info;
        var iframe = $(id + ' iframe');
        var projectPosition = $(id).position().top;
        $('.projectInformationContainer').css('display','none');
        $('.small_star , .big_star, iframe').remove();
        $('.projectContainer').animate({top:(projectPosition) * -1 + 'px'},800, function () {
            $('.listBox , .top_make_web, .projectTitle').css('display','block');
            $('.projectInformation').css({height:'0', width: '100%'});
        });
    });

    $('.upArrow').on('click',function (){
        listUp(this);
    });

    $('.downArrow').on('click',function(){
        listDown(this);
    });

    // $(".nav li:first-child").addClass("active");
    //
    // $(".nav a").on("click", function(){
    //   $(".nav").find(".active").removeClass("active");
    //   $(this).parent().addClass("active");
    // });

    isMobile();

    fontCheck();

    arrowClick = true;
});
