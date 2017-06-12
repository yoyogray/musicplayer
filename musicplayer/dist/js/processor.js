
//管理进度条
(function($,root){
    var $scope = $(document.body)
    var startTime;
    var curDuration;
    var frameId;
    var lastpercentage = 0;
    //转化时间
    function formatTime(time){
        time = Math.round(time);
        var minute = Math.floor(time/60);
        var second = time - minute*60;
        if(minute < 10){
            minute = "0" + minute;
        }
        if(second < 10){
            second = "0" + second;
        }
        return minute + ':' + second;
    }
    //管理歌曲总时间
    function render(duration){
        lastpercentage = 0;
        curDuration = duration;        
        var allTime = formatTime(duration);  
        $scope.find('.all-time').text(allTime); 
        
    }
    
    //开始进度渲染
    function start(percent){                    //传进来百分比参数，  如果百分比undefined  就是继续渲染上次的位置 ，  否则就用传进来的百分比
        lastpercentage = percent == undefined ? lastpercentage : percent;     
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();       //获取开始的时间  点击play-btn时的时间   获取点击开始时的时间
        function frame(){                       //动画函数
            var curTime = new Date().getTime(); //每次刷新的时间
            var percentage = lastpercentage + (curTime - startTime) / (curDuration * 1000);    //每次刷新时的百分比
            if(percentage < 1){
                
            update(percentage);                 //每次刷新都重新渲染.current-time 
                frameId = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId);
                $scope.find('.next-btn').trigger('click');
                
            }
        }
        frame();
    }
    
    
    //停止渲染 
    function stop(){
        var curTime = new Date().getTime();  // 停止的时候记录当前的时间
        var percentage =  (curTime - startTime) / (1000 * curDuration);   //当前时间 - 开始时间 / 总时间   记录最近一次开始-暂停 之间的时长占总时长的百分比
        lastpercentage = percentage + lastpercentage;     //记录播放总时长的百分比   
        
        cancelAnimationFrame(frameId);   //停止动画
    }
    
    //渲染当前时间和进度条
    function update(percentage){
        var currentTime = percentage * curDuration;
        var time = formatTime(currentTime);
        $scope.find('.current-time').text(time);
        setProcessor(percentage);
    }
    //渲染进度条
    function setProcessor(percentage){
        var percent = (percentage - 1) * 100 + '%';   //最开始的时候进度是0，此时percent = -100%;
        $scope.find('.pro-top').css({
            'transform' : 'translateX(' + percent + ')',
        })
    }
    root.processor = {
        render:render,
        start:start,
        stop:stop,
        update:update,
      
        
    }
    
}(window.Zepto,window.player||(window.player = {})))