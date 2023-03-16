/** @odoo-module**/

const { Component,mount,xml,useState } = owl;

let audio = '';
class Player extends Component {
    static template = xml`
        <div id="play-song">
            <div class="card shadow-lg p-4 mb-5 mt-4">
                <h2 id="song-title" style="position:relative; top:10px; color:white">Song Title</h2>
                <button class="setButton" id="pause-button" t-on-click="pauseThisSong"><img src="/music_player/static/images/pause.png" id="img-btn"/></button>
                <button class="setButton" id="play-btn" t-on-click="playThisSong"><img src="/music_player/static/images/play-button.png" id="img-btn"/></button>
                <button class="setButton" id="stop-button" t-on-click="stopThisSong"><img src="/music_player/static/images/stop-button.png" id="img-btn"/></button>
            </div>
        </div>`;

        playThisSong(){
            if(!audio){
                return;
            }
            audio.play();
        }
        pauseThisSong(){
            if(!audio){
                return;
            }
            audio.pause();
        }
        stopThisSong(){
            if(!audio){
                return;
            }
            audio.pause();
            audio.currentTime=0;
        }

    
}

class MusicList extends Component {
    static template=xml`
    <div id="MusicList" style="float:left">
        <t t-if="props.searchData[0] and props.searchData[0] !== 'Song not found'">
        <h2>List of Songs</h2>
        <t t-foreach="props.searchData[0]" t-as="song" t-key="song.id">
            <p><t t-out="song.name"/></p>
            <button t-att-value="song.url" t-on-click="addSongToPlaylist">Add to Playlist</button>
            <button t-att-value="song.url" t-on-click="playSong">Play Song</button>
        </t>
        </t>
        <Player />
    </div>
    `;
    addSongToPlaylist () {

    }
    playSong(ev) {
        const selectedSongUrl = ev.target.getAttribute('value');
        const selectedSong = this.props.searchData[0].find(song => song.url===selectedSongUrl);
        document.getElementById("song-title").textContent = selectedSong.name;
        audio = new Audio(selectedSongUrl);
        audio.play();
    }

    static props = ["searchData"];
    static components = { Player };
}

class Search extends Component {
    static template = xml`
    <div style="text-align:center" id="search-data">
        <input type="text" id="searchSong" placeholder="Search a music"/>
        <button t-on-click="getMusic" id="SearchButton">Search</button>
        <MusicList searchData="searchData"/>
    </div>
    `;
    setup() {
        this.searchData = useState([]);
    }

    async getMusic() {
        const findSong = document.getElementById('searchSong').value;
        const response = await fetch(`/music/search?song_name=${findSong}`);
        const {result : response_data}= await response.json();
        console.log(response_data)
        this.searchData.pop();
        this.searchData.push(response_data);
    }
    static components = { MusicList };
}

class Root extends Component {
    static template = xml`
    <div>
        <Search />
    </div>
    `;
    static components = { Search };
}

window.onload = function() {
    mount(Root, document.body)
}