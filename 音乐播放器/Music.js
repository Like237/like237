

    var audio = document.querySelector('audio');

    var data = [
    //     {
    //     song:'答案',
    //     singer:'杨坤/郭采洁',
    //     src:'http://dl.stream.qqmusic.qq.com/C400002V8Vde2dKIEx.m4a?vkey=6FFB71B211D95EC13E620BC4FD89BF5E0732C42AE828E63F954A7BB225C4D62718C4B25DEAF3A91440AA8043B33837512D864D0C49475BCD&guid=7529507250&uin=0&fromtag=66'
    // },
        {
            song:'椿',
            singer:'沈以诚',
            src:'http://dl.stream.qqmusic.qq.com/C400004O1CIl4ZNl8h.m4a?vkey=9513A4000C0732D41F2285F4EDDDA1D7D7D2FD49CBC6FC70B7DD2F0CE83842ADACA66483EDDF083251223BF43A2634442949FDFDFA26F874&guid=7529507250&uin=0&fromtag=66'
        },{
            song:'可惜没如果',
            singer:'林俊杰',
            src:'http://dl.stream.qqmusic.qq.com/C400004295Et37taLD.m4a?vkey=01C6E966503C89BAD3B538B315C6B3568C03740263614D7552DBF02A72A25ADBC79DB8396F00BFDAF973D23DDC55A1A03E8E599B0D7A6EC5&guid=7529507250&uin=0&fromtag=66'
        },{
            song:'不说',
            singer:'李荣浩',
            src:'http://dl.stream.qqmusic.qq.com/C400002xDG4s0sPFJU.m4a?vkey=6986F08DE197C8EACF540E1E7DE0B468BB1C0CA35247ACD073E48324DFAD32C530EAC8523D12C41BE871851F72DCDCD26421B439E91586FE&guid=7529507250&uin=0&fromtag=66'
        },{
            song:'后来的我们',
            singer:'五月天',
            src:'http://dl.stream.qqmusic.qq.com/C400002yFHJ01Huuto.m4a?vkey=2DC33B5ED4F7880D3CDDBC17929E9EA1709E6034D06234485FDFB2CFDDC07018E0E6B6326BC153E923696361048068E0636F157C54B1ABA9&guid=7529507250&uin=0&fromtag=66'
        }

    ];

    var index = 0;

    function init () {
        $('.song').html(data[index].song);
        $('.singer').html(data[index].singer);
        audio.src = data[index].src;
    }
    init();
    // 播放暂停函数
    // audio.pause是一个布尔值，当音乐正在播放的时候是false
    function play(){
        if(audio.paused){
            audio.play();
            $('#suspend').css('background-position-x','-30px');
        }else{
            audio.pause();
            $('#suspend').css('background-position-x','0px');
        }
    }

    // 播放暂停
    $('#play').click(function(){
        play();
    });

    // 上一曲
    $('.bt-left').click(function(){
        index --;
        index = index < 0 ? data.length - 1 : index;
        init();
        play();
    });

    //下一曲
    $('.bt-right').click(function(){
        index ++;
        index = index > data.length - 1 ? 0 : index;
        init();
        play();
    });

    audio.addEventListener('canplay',function(){
        var totalM = parseInt(audio.duration / 60);
        var totalS = parseInt(audio.duration % 60);
        $('.middle .right').html(formateTime(totalM)+ ':'+formateTime(totalS));

        audio.addEventListener('timeupdate',function(){
            var currentM = parseInt(audio.currentTime / 60);
            var currentS = parseInt(audio.currentTime % 60);
            $('.middle .left').html(formateTime(currentM)+ ':'+formateTime(currentS));
            var position = (audio.currentTime / audio.duration) * $('.process').width();
            $('.front-pro').width(position);
            $('.circle').css('left',position);
            if(audio.ended){
                index ++;
                index = index > data.length - 1 ? 0 : index;
                init();
                play();
            }
        });

        $('.process').click(function(e){
            audio.currentTime =  (e.offsetX / $('.process').width()) * audio.duration;
        })
    });

    function formateTime(time) {
        return time < 10 ? '0'+ time :time
    }