from animapy import anime
from metaphone import doublemetaphone
from bs4 import BeautifulSoup
import urllib2
import MySQLdb

class animeDB(object):
    def openConnection(self):
        self.conn = MySQLdb.connect(host='localhost', user='root', passwd='Darksier11', db='animeviewer')
        self.cur = self.conn.cursor(MySQLdb.cursors.DictCursor)
        
    def closeConnection(self):
        self.conn.close()
        
    def getEpisodeList(self, animeId):
        self.cur.execute("SELECT * FROM episodes where animeId=" + animeId)
        return self.cur.fetchall()
    
    def getAnimeList(self):
        self.cur.execute("SELECT * FROM animes")
        return self.cur.fetchall()
    
    def getAnimeMetadata(self, search):
        link = 'http://www.anime-planet.com/anime/' + search 
        request = urllib2.Request(link.encode('ascii','ignore'), headers={'User-Agent' : "Magic Browser"})
        content = urllib2.urlopen(request).read()
        soup = BeautifulSoup(content)
        items = soup.find('section', { "class" : 'entryDetailsBar' })
        title = soup.find("h1").contents[0].encode('ascii','ignore')
        synopse = soup.find("div", {"class": 'entrySynopsis'})
        image = synopse.find('img').get('src')
        description = synopse.find('p').contents[0].encode('ascii','ignore')
        epsCountString = items.find("div").contents[0].encode('ascii','ignore')
        epsCountString = epsCountString.strip()
        epsCountString = epsCountString.replace('TV (', '')
        epsCountString = epsCountString.replace(' eps)', '')
        if '+' in epsCountString:
            status = 'ongoing'
        else:
            status = 'ended'
        epsCountString = epsCountString.replace('+', '')
        itemCount = int(epsCountString)
        return {'title': title, 'image': image, 'description': description, 'episodeCount': itemCount, 'status': status}

    def getEpisodesMetadata(self, itemCount, offset, quant, search):
        searchQuery = search.replace("-", " ")
        meta = doublemetaphone(searchQuery)
        quantDigits = len(str(itemCount))
        replacer = meta[0][-1:]
        metaOne = meta[0].replace(replacer, "")
        metaTwo = meta[1].replace(replacer, "")
        listLinks = []
        for i in range(quant):
            target = i + offset
            if target < itemCount:
                count = target + 1
                if count < 10:
                    count = '0' * (quantDigits - 1) + str(count)
                elif count < 100:
                    count = '0' * (quantDigits - 2) + str(count)
                else:
                    count = str(count)
                results = anime.searchAnimesMetadata(searchQuery + ' ' + count, quant=3)
                for ep in results:
                    if ep != '':
                        returned = doublemetaphone(ep.title.replace("-", ""))
                        returnedOne = returned[0].replace(replacer, "")
                        returnedTwo = returned[1].replace(replacer, "")
                        if (returnedOne == metaOne):
                            listLinks.append({'title': ep.title, 'image': ep.image, 'link': ep.link})
                            break
        return listLinks
    
    def updateEpisodeMetadataDB(self, episodeId, episodeNumber):
        #gets animeTitle
        episodeId = int(episodeId)
        episodeNumber = int(episodeNumber)
        self.cur.execute("SELECT animes.page FROM animes, episodes where animes.animeId=episodes.animeId and episodeId=" + episodeId)
        page = self.cur.fetchone()['page']
        metadata = self.getAnimeMetadata(page)
        episode = self.getEpisodesMetadata(metadata['episodeCount'], episodeNumber, 1, page)
        self.cur.execute("UPDATE episodes SET title='" + episode[0]['title'] + "', image='" + episode[0]['image'] + "', pageLink='" + episode[0]['link'] + "' WHERE episodeId=" + episodeId)
        self.conn.commit()
        self.cur.execute("SELECT * FROM episodes where episodeId=" + episodeId)
        return self.cur.fetchone()