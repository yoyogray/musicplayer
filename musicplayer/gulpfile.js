var gulp = require('gulp');  //引入gulp
var connect = require('gulp-connect');   //引入gulp 服务器插件

var less = require('gulp-less');


//转化html文件  将src上的文件转到dist文件里 
gulp.task('html',function(){    //自定义了个task事件  名为‘html’;
    gulp.src('./src/index.html')  //找到index.html文件
        .pipe(connect.reload())   //每次在执行  html事件时，都刷新一次服务器文件
        .pipe(gulp.dest('./dist'))  //node里的pipe方法
})

//转换css文件并预编译
gulp.task('css',function(){
    gulp.src('./src/css/*.less')  //css下的所有less文件
        .pipe(less())
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/css'))
})

//转换js文件
gulp.task('js',function(){
    gulp.src('./src/js/*.js')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/js'))
})



//监听html文件   相当于不用每次都gulp 以下    类似于webpack -w
gulp.task('watch',function(){
    gulp.watch('./src/index.html',['html'])  //在watch  index.html文件方法前先执行'html'事件
    gulp.watch('./src/css/*.less',['css'])
    gulp.watch('./src/js/*.js',['js'])    
})

//开服务器
gulp.task('server',function(){
    connect.server({
        port:8090,     // 是指端口号
        livereload:true  // 这只自动刷新  
    });
})
gulp.task('default',['html','css','js','watch','server'])  ;   //执行一个默认事件  *之前* 执行 名为'html' 的事件


//gulp.task('事件名'，[执行前要执行的事件名的数组]，function（）{回掉函数})；
















