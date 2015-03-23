$(document).ready(function(){
var index = 0,
    mediaPath = 'http://localhost:3000/assets/media/',
    coverPath = 'http://localhost:3000/assets/images/Covers/',
    extension = '.mp3',
    songTitle = $('#asaTitle'),
    songArtist = $('#asaArtist'),
    songAuthor = $('#asaAuthor span'),
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
player.buttonShuffle = document.getElementById("audio-shuffle");
player.pB = $('.audio-progress');

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

player.loadTrack = function(id, newData) {
    var tracksTotal = 0;
    if(newData) {
        console.log(newData);
        id = 0;
        var source = newData[id].file;
        player.audio.setAttribute("src",""+mediaPath + source + extension+"");
        // Track infos
        songTitle.text(newData[id].name);
        songArtist.text(newData[id].artist);
        songAuthor.text(newData[id].author);
        songTotalTime.text(newData[id].length);

        if(newData[id].cover) {
            songCover.attr("src",coverPath + newData[id].cover + ".jpg");
        }else {
            songCover.attr("src",coverPath + "default.png");
        }
        
        // Play track
        $(player.audio)[0].load();
        $(player.audio)[0].play();

        tracksTotal = newData.length;

        player.button.classList.remove('play');
        player.button.classList.add('pause');

        $("#plUL").empty();

        for (var i = id+1; i < newData.length; i++) {
            if(newData[i].cover) {
                newData[i].cover = newData[i].cover + ".jpg";
            }else {
                newData[i].cover = "default.png";
            }
            $("#plUL").append("<li><div class='plItem'><div class='plCover'><img src='"+coverPath+newData[i].cover+"'></div><div class='plTitle'>"+newData[i].name+"</div><div class='plArtist'>"+newData[i].artist+"</div><div class='plAuthor'>par<span>"+newData[i].author+"</span></div></div></li>");
        }
    }
    else {
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
                songAuthor.text(data[id].author);
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
    }

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

player.shuffle = function (e){
    $.ajax({
        url : 'http://localhost:3000/assets/tracks.json',
        dataType: "json",
        success : function(data){
            var id = Math.floor(Math.random()*data.length);

            if (id >= data.length) {
                var k = id - data.length;
                while ((k--) + 1) {
                    data.push(undefined);
                }
            }
            data.splice(id, 0, data.splice(0, 1)[0]);
            player.loadTrack(id, data);
        }
    });   
}

if(player.audio){
    player.audio.load();
    player.loadTrack(0);
    player.button.addEventListener('click',player.playPause,false);
    player.buttonMute.addEventListener('click',player.muteUnmute,false);
    player.audio.addEventListener('timeupdate',player.updateProgress,false);
    player.buttonNext.addEventListener('click',player.nextTrack,false);
    player.buttonPrev.addEventListener('click',player.prevTrack,false);
    player.buttonShuffle.addEventListener('click',player.shuffle,false);
    player.pB.on('click',player.setTime);
}
 
});
