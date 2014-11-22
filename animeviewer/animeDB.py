class animeDB(object):
    def openConnection(self):
        self.conn = MySQLdb.connect(host='localhost', user='root', passwd='Darksier11', db='animeviewer')
        self.cur = self.conn.cursor(MySQLdb.cursors.DictCursor)


    def closeConnection(self):
        self.conn.close()

    def getEpisodeList(self, animeId):
        self.cur.execute("SELECT * FROM episodes where animeId=" + animeId)
        self.cur.fetchall()
        return self.cur.fetchall()
    
    def getAnimeList(self):
        self.cur.execute("SELECT * FROM animes)
        self.cur.fetchall()
        return self.cur.fetchall()