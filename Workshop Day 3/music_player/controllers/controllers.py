# -- coding: utf-8 --
from odoo import http
from odoo.http import Response
import json

class MusicPlayer(http.Controller):
    @http.route('/music', auth='public')
    def index(self,**kw):
        return http.request.render('music_player.music_template')

    @http.route('/music/search', auth='public',type="http", methods=["GET"])
    def search(self,**kw):
        song_name = kw.get('song_name')
        musics = http.request.env['music_player.music_player'].search_read([('name', 'ilike', song_name)],fields={"name","url"})
        breakpoint()
        if not musics:
              musics = "Song not Found"
        # breakpoint()
        # musics='hello'
        return Response(json.dumps({'result': musics}), content_type='application/json')

#     @http.route('/music_player/music_player/objects', auth='public')
#     def list(self, kw):
#         return http.request.render('music_player.listing', {
#             'root': '/music_player/music_player',
#             'objects': http.request.env['music_player.music_player'].search([]),
#         })

#     @http.route('/music_player/music_player/objects/<model("music_player.music_player"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('music_player.object', {
#             'object': obj
#         })