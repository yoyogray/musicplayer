(function($,root){
    var ControlManager = function(length){
        this.index = 0;
        this.length = length;
    }
    ControlManager.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);            
        },
        getIndex:function(val){
            var index = this.index;
            var len = this.length;
            curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.ControlManager = ControlManager ;
    
}(window.Zpeto, window.player||(window.player={})))










