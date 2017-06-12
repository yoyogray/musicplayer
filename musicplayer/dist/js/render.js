(function($,root){
    
    //渲染歌曲信息
    function renderInfo(info){
        var $scope = $(document.body);
        var html = '<h1 class="song-name">' + info.song + '</h1>' + 
                   '<h3 class="singer-name">' + info.singer + '</h3>'+ 
                   '<h3 class="album-name">' + info.album + '</3>' ;
                   
        $scope.find('.song-info').html(html); 
    }
    
    //渲染高数模糊
  function renderImage(src){
      var image = new Image();
      image.onload = function(){
          root.blurImg(image, $scope);
          $scope.find('.song-img .img-wrapper img').attr('src',src);
      }
      image.src = src;
  }
  
  
  //渲染like-btn
  
  function renderLikeBtn(isLike){
//    $scope.find('.like-btn').on('click',function(){
       
//        if($scope.find('.like-btn').hasClass('liked')){
//            $scope.find('.like-btn').removeClass('liked');
//        }else{
//            $scope.find('.like-btn').addClass('liked');
//        }
//    })
      
   if(isLike){
       $scope.find('.like-btn').addClass('liked');
       $scope.find('.like-btn').on('click',function(){
           $scope.find('.like-btn').removeClass('liked');
           isLike = false;   
           //然后将此时的isliek 值ajax传给后台
       })
   }else{
       $scope.find('.like-btn').removeClass('liked');
       $scope.find('.like-btn').on('click',function(){
           $scope.find('.like-btn').addClass('liked');
           isLike = true;
           //然后将此时的isliek 值ajax传给后台           
       })
   }
  }
  
    //渲染play-btn 
    // function renderPlayBtn(){
    //     if(audioManager.status === 'play'){
    //         $scope.find('.play-btn').on('click',function(){
    //             $scope.find('.play-btn').removeClass('played');
    //             audioManager.pause();
    //             audioManager.status = 'pause';
    //         })
    //     }else{
    //         $scope.find('.play-btn').on('click',function(){
    //             $scope.find('.play-btn').addClass('played');
    //             audioManager.play();
    //             audioManager.status = 'play';
    //         })
    //     }
    // }
    
    // function renderPlayBtn(){
    //     var played = false;
        
    //     $scope.find('.play-btn').on('click',function(){
    //         if(!played){
    //             $scope.find('.play-btn').addClass('played');
    //             played = true;
    //         }else{
    //             $scope.find('.play-btn').removeClass('played');
    //             played = false;
    //         }
    //     })
    // }
    
  root.render = function(data){
      renderInfo(data);
      renderImage(data.image);
      renderLikeBtn(data.isLike);
    //   renderPlayBtn();
  }
    
    
}(window.Zepto, window.player||(window.player = {})))












// (function($,root){
    
// }(window.Zepto, window.player||(window.player = {})))


// 为了防止污染全局变量， 于是用匿名函数立即执行的方式，创建一个
// 封闭的作用域，一旦函数立即执行，函数内部声明的变量就会被立刻清除，
// 于是起到了防止污染全局变量的效果。






