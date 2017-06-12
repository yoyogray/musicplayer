
//管理进度条
(function($,root){
    var $scope = $(document.body);
    //转化时间
    function formatTime(time){
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
        var allTime = formatTime(duration);  
        $scope.find('.all-time').text(allTime); 
        
    }
    
    root.render = render;
    
}(window.Zpeto,window.player||(window.player = {})))