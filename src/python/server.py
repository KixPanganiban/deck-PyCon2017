import zerorpc
from tinydb import TinyDB, Query


class DBServer(object):
    """A DB server that stores potatoes, their types, counts,
    and shapes.
    {
        "type": "basic",
        "count": 100,
        "shape": "round"
    }
    """

    def __init__(self):
        self.db = TinyDB('server.db')

    def get_all_potatoes(self):
        """Returns all potatoes.
        """
        return self.db.all()

    def search_potato(self, key, value):
        """Search for a potato with a key-value filter.
        """
        potato = Query()
        return self.db.search(getattr(potato, key) == value)

    def create_potato(self, potato):
        """Create a potato with the provided values.
        """
        self.db.insert(potato)

    def update_potato(self, key, value, update):
        """Update the potato with the key-value filter and update data.
        """
        potato = Query()
        return self.db.update(update, getattr(potato, key) == value)

    def delete_potato(self, key, value):
        """Delete a potato with the key-value filter.
        """
        potato = Query()
        return self.db.remove(getattr(potato, key) == value)

if __name__ == '__main__':
    db_server = zerorpc.Server(DBServer())
    db_server.bind('tcp://0.0.0.0:8000')
    db_server.run()
