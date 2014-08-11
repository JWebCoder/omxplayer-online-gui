

subprocess.Popen('killall omxplayer.bin',stdout=subprocess.PIPE,shell=True)
subprocess.Popen('clear',stdout=subprocess.PIPE,shell=True)
subprocess.Popen('omxplayer -o hdmi ' + file + ' <' + OMXIN_FILE ,shell=True)
omx_send('.')

def omx_send(command):
    subprocess.Popen('echo -n '+data+' >'+re.escape(OMXIN_FILE),shell=True)
    return 1
    



