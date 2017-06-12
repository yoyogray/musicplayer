// (function($,root){



// }(window.Zepto,window.play||(window.player = {})))

(function($,root){
    var $playList = $('<div class="play-list">' + 
                    '<div class="head">播放列表</div>'+
                    '<ul class="play-list-wrapper"></ul>'+ 
                    '<div class="close-btn">关闭列表</div>'+
                    '</div>');
                    
    var $scope = $(document.body);
    function render(data){
        // console.log(data);
        var  len = data.length;
        var html = '';
        for(var i = 0; i < len  ; i++){
            html += '<li><h3>' + data[i].song + '<span>' + data[i].singer + '</span>' + '</h3></li>';
            console.log(html);
        }
        
        $scope.append($playList);    //将整个playList 放到$scope里
        $scope.find('.play-list-wrapper').html(html);  //将所有的歌曲加到ul里
      
        
    }
    
    //点击列表播放   显示播放列表
    function listPlay(){
        $scope.find('.play-list-wrapper').onclick = function(){
            alert('点击播放');
        }
    }
    root.playList = {
        render : render,
        listPlay: listPlay,
    }

    
    
    
}(window.Zepto,window.player||(window.player={})))