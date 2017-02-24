# deck-PyCon2017
My presentation slides and source code for PyCon 2017.

The [slides](presentation.key) for this deck is an Apple Keynote file.

## Running the Potatolist Stack

1. Bob's DB Wrapper

    Make sure you have the awesome [Pipenv](https://github.com/kennethreitz/pipenv) installed!

    ```bash
    $ cd src/python
    $ pipenv install        # pipenv sets up a virtualenv and installs dependencies
    $ pipenv shell          # launch a shell session inside the virtualenv
    $ python server.py      # run the zerorpc server
    ```

1. Carding's ExpressJS Web Server

    ```bash
    $ brew install zeromq   # for mac only. zeromq C headers are required for zerorpc
    $ cd src/javascript
    $ npm install           # install dependencies
    $ node index.js         # run the expressjs server
    ```

1. Dodong's Pie Chart "Analytics"

    ```bash
    $ cd src/python3
    $ pipenv install
    $ pipenv shell          # same procedure as above, but this time runs a sanic server
    $ python analytics.py   # and a zerorpc client
    ```

## License

MIT License. See [LICENSE](LICENSE).

## Additional Reading

- [Jerome Petazzoni's original PyCon USA 2012 notes](http://pycon-2012-notes.readthedocs.io/en/latest/dotcloud_zerorpc.html)
- [ZeroRPC Debut Video](http://pyvideo.org/video/639/build-reliable-traceable-distributed-systems-wi)
