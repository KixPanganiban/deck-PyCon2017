import pygal
from sanic import Sanic
from sanic.response import HTTPResponse
from zerorpc import Client

def main():
    dbServer = Client()
    dbServer.connect('tcp://127.0.0.1:8000')
    app = Sanic()

    @app.route('/stats/distrib')
    async def distrib(request):
        potatoes = dbServer.get_all_potatoes()
        pie_chart = pygal.Pie()
        for potato in potatoes:
            pie_chart.add(potato['type'], int(potato['count']))

        return HTTPResponse(
            body_bytes=pie_chart.render(),
            status=200,
            headers=None,
            content_type="image/svg+xml")

    app.run(host="0.0.0.0", port=9000)

if __name__ == '__main__':
    main()