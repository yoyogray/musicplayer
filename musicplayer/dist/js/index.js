//gulp 的模块化开发，  运用jquery 思想
// (function(window,){
    
// }(window,function(){
//     function jquery(){
        
//     }
//     window.$ = window.jquery = jquery;
// }))



var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var dataUrl  = '/mock/data.json';
var render = root.render;
var index = 0; 
var controlManager;
var songList;   //ajax获取歌曲信息数据
var audioManager = new root.AudioManager(); 
var processor = root.processor;
var playlist = root.playList;


//绑定进度条拖动
function bindTouch(){
    var $slidepoint = $scope.find('.slide-point');
    var offset = $scope.find('.pro-wrapper').offset();   //滚条的属性
    console.log(offset);
    var left = offset.left;
    var width = offset.width;
    $slidepoint.on('touchstart',function(){
        processor.stop();
        console.log('touchstart');
        
        
        
        
    }).on('touchmove',function(e){
        // console.log(e);
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        
        if(percentage < 0){
            percentage = 0;
        }
        if(percentage > 1){
            percentage = 1;
        }
        processor.update(percentage);   //随着touchmove 进度条也随之改变
    

    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;   //拖动到的百分比
        var index = controlManager.index;
        var curData = songList[index];
        var currenttime = curData.duration * percentage;   //获取拖动到的时间
        processor.start(percentage);           //拖动到的百分比传入start函数进行重新渲染            
      
        $scope.find('.play-btn').one(function(){
            $(this).click();
        })
        audioManager.jumpToPlay(currenttime) // 跳转播放
        //只要一拖动就播放
        if(!$scope.find('.play-btn').hasClass('played')){
            $scope.find('.play-btn').click();
        }
        
      
        
        
        // if(percentage >= 1){
        // // percentage = 1;
        // // processor.stop();
        // // audioManager.status = 'pause';
        
        // // $scope.find('.play-btn').addClass('played').click();
        
        // // alert('dfadf');
        // // console.log(audioManager.audio.src);
        // // $scope.find('.play-btn').click();   // 拉动到最后面的时候，触发一下play-btn 就出于pause状态
        // // processor.start();
        // // // audioManager.play();
        
        // //拉到最后
        // // processor.stop();
        // if($scope.find('.play-btn').hasClass('played')){
        //     processor.stop();
        //     audioManager.audio.play();
        // }
        // }
        
         
        // if(percentage < 0){
        //     // console.log('fda');
        //     //时current-time变成0，然后开始重新渲染current-time
        //     percentage = 0;
        //     processor.update(percentage);
        // }
        
        // if(percentage <= 0){
        //     // console.log('fds');
            
        //     // processor.start(); //重新播放
        //     // //当前时间的重新渲染
        //     // audioManager.audio.currentTime = songList[duration];
            
        // }
        
        
        
      
        
        
    })
}


//优化render函数   自定义'play:change'事件
$scope.on('play:change',function(event,index){
    var curData = songList[index];
    render(curData);
    audioManager.setAudioSource(curData.audio);
    console.log(curData.audio);
    processor.render(curData.duration);  //实现总时间的渲染
    processor.update(0);
    if(audioManager.status == 'play'){
        audioManager.play();    //每次切换自动播放
        processor.start();      //每次在播放的时候切换，都重新调用processor.start 函数
    }
})


//上一首js
$scope.on('click','.prev-btn',function(){
  
    var index = controlManager.prev();
    // render(songList[index])
    $scope.trigger('play:change',index);
    
})
//下一首js
$scope.on('click','.next-btn',function(){
    
    var index = controlManager.next();
    // render(songList[index])  
    $scope.trigger('play:change',index); 
})    

//play-btn播放按钮js
$scope.on('click','.play-btn',function(){
    if(audioManager.status === 'play'){
        audioManager.pause()
        processor.stop();
    }else{
        audioManager.play();
        

        processor.start();
    }
    $(this).toggleClass('played');    //如果$(this)上有'played'这个属性就删掉，如果没有就加上

})

//开启play-list 播放列表
$scope.on('click','.list-btn',function(){
    // $scope.find('.list-btn').style.display = 'block';
    $scope.find('.play-list').css({display:'block'});
    
})

//关闭play-list 播放列表
$scope.on('click','.close-btn',function(){
    $scope.find('.play-list').css({display:'none'}); 
})

playlist.listPlay();







    //ajax请求的回调函数
    function successCallback(data){
        controlManager = new root.ControlManager(data.length);
        bindTouch();
        songList = data;
        $scope.trigger('play:change',0);
        playlist.render(data);
    }
    //ajax获取歌曲信息数据 
    function getData(url, callback){
        $.ajax({
            url:url,
            type:'GET',
            success:callback,
            error:function(){
                console.log('error')
            }
        })
    }
    getData(dataUrl, successCallback);
    
    
   
    
    
    
