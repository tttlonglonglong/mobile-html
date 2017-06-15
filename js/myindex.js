//->动态计算REM的换算比例
~function (desW) {
    var winW = document.documentElement.clientWidth;
    var ratio = winW / desW;
    oMain = document.querySelector(".main");
    console.log(winW);
    if(winW > desW){
        oMain.style.margin = "0 auto";
        oMain.style.width = desW + "px";
        return;
    }
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(640);

//->给滑屏区域进行初始化设置
var swp = new Swiper(".swiper-container", {
    loop: true,
    direction: 'vertical',
/*当切换结束后, 给当前展示区域添加对应的id,有此实现对应的动画效果*/
    onSlideChangeEnd: function (Swiper) { // 必须传入Swiper参数

        var slideAry = Swiper.slides; // 一共多少个活动模块(图片数+2), 包含loop模式下多加的
        var curIn = Swiper.activeIndex; // 当前展示的模块的索引
        var total = slideAry.length; //总索引
        // 计算ID是page?第几页
        console.log(curIn );
        var targetId = "page";
        switch (curIn) {
            case 0:
                targetId += total - 2;
                break;
            case total-1:
                targetId += 1;
                break;
            default:
                targetId += curIn;
        }
        // -->给当前的活动动画设置IDJ即可; 还要把其余的移除
        [].forEach.call(slideAry, function (item, index) {
            if(curIn === index) {
                slideAry[curIn].id = targetId;
                return
            }
            item.id = null;
        });

        //console.log(slideAry,curIn);
    }
});

//MUSIC
~function () {
    var musicMenu = document.getElementById("musicMenu");
    var musicAudio = document.getElementById("musicAudio");
    musicMenu.addEventListener("touchend", function () {
        if (musicAudio.paused) {
            musicAudio.play(); // 加载音频文件
            musicMenu.className = "music move" ;
            return;
        }
        musicAudio.pause();
        musicMenu.className = "music";

    }, false);
    function controlMusic() {
        musicAudio.volume = 0.3;
        musicAudio.play(); // 加载音频文件
        musicAudio.addEventListener("canplay", function () {
            musicMenu.style.display ="block";
            musicMenu.className ="music move";
        }, false)
    }
    window.setTimeout(controlMusic, 1000)
}()