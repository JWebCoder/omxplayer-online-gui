command_list={
'speedup':'1',
'speeddown':'2',
'nextaudio':'k',
'prevaudio':'j',
'nextchapter':'o',
'prevchapter':'i',
'nextsubs':'m',
'prevsubs':'n',
'togglesubs':'s',
'stop':'q',
'pause':'p',
'volumedown':'-',
'volumeup':'+',
'languagedown':'j',
'languageup':'k',
'seek-30':'\x1b\x5b\x44',
'seek+30':'\x1b\x5b\x43',
'seek-600':'\x1b\x5b\x42',
'seek+600':'\x1b\x5b\x41'}

subprocess.Popen('killall omxplayer.bin',stdout=subprocess.PIPE,shell=True)
subprocess.Popen('clear',stdout=subprocess.PIPE,shell=True)
subprocess.Popen('omxplayer -o hdmi ' + file + ' <' + OMXIN_FILE ,shell=True)
omx_send('.')

def omx_send(command):
    subprocess.Popen('echo -n '+data+' >'+re.escape(OMXIN_FILE),shell=True)
    return 1
    
def send_text_command(command):
    if command in command_list:
        omx_send(command_list[name])
        return 1
    else:
        return 0


def run_cmd(request):
    if "cmd" in request.GET:
        return HttpResponse(omx_send(request.GET['cmd']))
    elif "cmdText" in request.GET:
        return HttpResponse(send_text_command(request.GET['cmdText']))
    else:
        return HttpResponse("Bad command")