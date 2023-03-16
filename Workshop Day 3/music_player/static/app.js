/* @odoo-module*/

const { Component,mount,xml,useState } = owl;

class MusicList extends Component {
    static template=xml`
    <div>
        <t t-esc="props.searchData"/>
    </div>
    `;
    static props = ["searchData"];
}

class Search extends Component {
    static template = xml`
    <div style="text-align:center">
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