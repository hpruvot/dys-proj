$(document).ready(function(){
var index = 0,
    playing = false;
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
            songTitle.text(data[id].name);
            songArtist.text(data[id].artist);
            songTotalTime.text(data[id].length);
            if(data[id].cover) {
                songCover.attr("src",coverPath + data[id].cover + ".jpg");
            }else {
                songCover.attr("src",coverPath + "default.png");
            }
            

            $(player.audio)[0].load();
            $(player.audio)[0].play();

            tracksTotal = data.length;

            player.button.classList.remove('play');
            player.button.classList.add('pause');
        }
    });



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

    $('.plSel').removeClass('plSel');
    $('#plUL li:eq(' + id + ')').addClass('plSel');

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

// $("#audio-next").on("click",function(){
//     console.log(tracks[].track);
// })

player.button.addEventListener('click',player.playPause,false);
player.buttonMute.addEventListener('click',player.muteUnmute,false);
player.audio.addEventListener('timeupdate',player.updateProgress,false);
player.buttonNext.addEventListener('click',player.nextTrack,false);
player.buttonPrev.addEventListener('click',player.prevTrack,false);
player.pB.on('click',player.setTime);
 

// jQuery(function($) {
// var supportsAudio = !!document.createElement('audio').canPlayType;

// if(supportsAudio) {
//         var index = 0,
//         playing = false;
//         mediaPath = 'assets/media/',
//         extension = '',
//         tracks = [
//             {"track":1,"name":"L'apologie","length":"00:55","file":"Céline Dion - I_m Alive"},
//             {"track":2,"name":"Les Moutons","length":"00:37","file":"Fever Ray _Keep The Streets Empty For Me_"},
//             {"track":3,"name":"La ville de La Rochelle","length":"01:05","file":"Sexual Healing (Remix)"},
//             {"track":4,"name":"Les Echevins de Nantes","length":"00:40","file":"04"}
//         ],
//         trackCount = tracks.length,
//         npTitle = $('#asaTitle'),
//         audio = $('#audio_player').bind('play', function() {
//             playing = true;
//         }).bind('pause', function() {
//             playing = false;
//         }).bind('ended', function() {
//             if((index + 1) < trackCount) {
//                 index++;
//                 loadTrack(index);
//                 audio.play();
//             } else {
//                 audio.pause();
//                 index = 0;
//                 loadTrack(index);
//             }
//         }).get(0),
//         btnPrev = $('.audio-prev').click(function() {
//             if((index - 1) > -1) {
//                 index--;
//                 loadTrack(index);
//                 if(playing) {
//                     audio.play();
//                 }
//             } else {
//                 audio.pause();
//                 index = 0;
//                 loadTrack(index);
//             }
//         }),
//         btnNext = $('.audio-next').click(function() {
//             if((index + 1) < trackCount) {
//                 index++;
//                 loadTrack(index);
//                 if(playing) {
//                     audio.play();
//                 }
//             } else {
//                 audio.pause();
//                 index = 0;
//                 loadTrack(index);
//             }
//         }),
//         li = $('#plUL li').click(function() {
//             var id = parseInt($(this).index());
//             if(id !== index) {
//                 playTrack(id);
//             }
//         }),
//         loadTrack = function(id) {
//             $('.plSel').removeClass('plSel');
//             $('#plUL li:eq(' + id + ')').addClass('plSel');
//             npTitle.text(tracks[id].name);
//             index = id;
//             audio.src = mediaPath + tracks[id].file + extension;
//         },
//         playTrack = function(id) {
//             loadTrack(id);
//             audio.play();
//         };
//         if(audio.canPlayType('audio/ogg')) {
//             extension = '.ogg';
//         }
//         if(audio.canPlayType('audio/mpeg')) {
//             extension = '.mp3';
//         }
//         loadTrack(index);
//     }
// });
});
