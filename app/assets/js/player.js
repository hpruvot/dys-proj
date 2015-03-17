jQuery(function($) {
var supportsAudio = !!document.createElement('audio').canPlayType;
if(supportsAudio) {
        var index = 0,
        playing = false;
        mediaPath = 'media/',
        extension = '',
        tracks = [
            {"track":1,"name":"L'apologie","length":"00:55","file":"01"},
            {"track":2,"name":"Les Moutons","length":"00:37","file":"02"},
            {"track":3,"name":"La ville de La Rochelle","length":"01:05","file":"03"},
            {"track":4,"name":"Les Echevins de Nantes","length":"00:40","file":"04"}
        ],
        trackCount = tracks.length,
        npAction = $('#npAction'),
        npTitle = $('#npTitle'),
        audio = $('#audio1').bind('play', function() {
            playing = true;
            npAction.text('Now Playing:');
        }).bind('pause', function() {
            playing = false;
            npAction.text('Paused:');
        }).bind('ended', function() {
            npAction.text('Paused:');
            if((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                audio.play();
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }).get(0),
        btnPrev = $('#btnPrev').click(function() {
            if((index - 1) > -1) {
                index--;
                loadTrack(index);
                if(playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        btnNext = $('#btnNext').click(function() {
            if((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                if(playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        li = $('#plUL li').click(function() {
            var id = parseInt($(this).index());
            if(id !== index) {
                playTrack(id);
            }
        }),
        loadTrack = function(id) {
            $('.plSel').removeClass('plSel');
            $('#plUL li:eq(' + id + ')').addClass('plSel');
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
        },
        playTrack = function(id) {
            loadTrack(id);
            audio.play();
        };
        if(audio.canPlayType('audio/ogg')) {
            extension = '.ogg';
        }
        if(audio.canPlayType('audio/mpeg')) {
            extension = '.mp3';
        }
        loadTrack(index);
    }
});