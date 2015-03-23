$(document).ready(function(){
var index = 0,
    mediaPath = 'http://localhost:3000/assets/media/',
    coverPath = 'http://localhost:3000/assets/images/Covers/',
    extension = '.mp3',
    songTitle = $('#asaTitle'),
    songArtist = $('#asaArtist'),
    songTotalTime = $('#atTotal'),
    songCurrentTime = $('#atCurrent'),
    songCover = $('#acCover'),
    progressBar = $('.audio-play-bar'),
    buffer = $('.audio-seek-bar');

var player = {};

player.audio = document.getElementById("audio_player");
player.sourceOGG = $("#oggSource");
player.sourceMP3 = $("#mp3Source");
player.button = document.getElementById("audio-playpause");
player.buttonMute = document.getElementById("audio-muteunmute");
player.buttonPrev = document.getElementById("audio-prev");
player.buttonNext = document.getElementById("audio-next");
player.pB = $('.audio-progress');

player.audio.load();

player.playPause = function(e){
    player.button.classList.remove('play');
    if(player.audio.paused){
        player.audio.play();
        player.button.classList.add('pause');
    }
    else{
        player.audio.pause();
        player.button.classList.remove('pause');
    }
}

function formatTime(s, m) {
    s = Math.floor( s );    
    m = Math.floor( s / 60 );
    m = m >= 10 ? m : '0' + m;    
    s = Math.floor( s % 60 );
    s = s >= 10 ? s : '0' + s;    
    return m + ':' + s;
}


player.updateProgress = function () {
    var media=$(this)[0];
    var progressW=media.currentTime*100/media.duration;
    $(progressBar).width(progressW+'%');

    var bufferW=media.buffered.end(0)*100/media.duration;
    $(buffer).width(bufferW+'%');

    songCurrentTime.text(formatTime(media.currentTime));
}

player.setTime = function (e) {
    e.stopPropagation();
    var media = player.audio;
    media.currentTime=e.offsetX*media.duration/$(this).width();
}

player.loadTrack = function(id) {
    var tracksTotal = 0;
    $.ajax({
        url : 'http://localhost:3000/assets/tracks.json',
        dataType: "json",
        beforeSend : function(){
            $(player.audio)[0].pause();
        },
        success : function(data){

            var source = data[id].file;
            player.audio.setAttribute("src",""+mediaPath + source + extension+"");
            // Track infos
            songTitle.text(data[id].name);
            songArtist.text(data[id].artist);
            songTotalTime.text(data[id].length);

            if(data[id].cover) {
                songCover.attr("src",coverPath + data[id].cover + ".jpg");
            }else {
                songCover.attr("src",coverPath + "default.png");
            }
            
            // Play track
            $(player.audio)[0].load();
            $(player.audio)[0].play();

            tracksTotal = data.length;

            player.button.classList.remove('play');
            player.button.classList.add('pause');

            $("#plUL").empty();

            for (var i = id+1; i < data.length; i++) {
                if(data[i].cover) {
                    data[i].cover = data[i].cover + ".jpg";
                }else {
                    data[i].cover = "default.png";
                }
                $("#plUL").append("<li><div class='plItem'><div class='plCover'><img src='"+coverPath+data[i].cover+"'></div><div class='plTitle'>"+data[i].name+"</div><div class='plArtist'>"+data[i].artist+"</div><div class='plAuthor'>par<span>"+data[i].author+"</span></div></div></li>");
            }
        }
    });

    player.audio.onended = function(){
        player.loadTrack(id+1);
    }

    // Prev track
    player.prevTrack = function() {
        if((id - 1) > -1) {
            id--;
            player.loadTrack(id);
            if(player.audio.paused) {
                player.audio.play();
            }
        } else {
            player.audio.pause();
            id = 0;
            player.loadTrack(id);
        }
        console.log(id);
    };

    //Next track
    player.nextTrack = function() {
        if((id + 1) < tracksTotal) {
            id++;
            player.loadTrack(id);
            if(player.audio.paused) {
                player.audio.play();
            }
        } else {
            player.audio.pause();
            id = 0;
            player.loadTrack(id);
        }
    }

}


player.muteUnmute = function() {
    player.buttonMute.classList.remove('unmute');
    if(player.audio.muted == false){
        player.audio.muted = true;
        $('.audio-mute-unmute').addClass('mute');
    }
    else{
        player.audio.muted = false;
        $('.audio-mute-unmute').removeClass('mute');
    }
}

player.loadTrack(0);


player.button.addEventListener('click',player.playPause,false);
player.buttonMute.addEventListener('click',player.muteUnmute,false);
player.audio.addEventListener('timeupdate',player.updateProgress,false);
player.buttonNext.addEventListener('click',player.nextTrack,false);
player.buttonPrev.addEventListener('click',player.prevTrack,false);
player.pB.on('click',player.setTime);
 
});
