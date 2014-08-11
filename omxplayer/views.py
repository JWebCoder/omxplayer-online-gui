import subprocess
from django.shortcuts import render
from django.http import HttpResponse
from os import walk
import os.path

global omx

# Create your views here.
def index(request):
    omx = subprocess.Popen(['killall', 'omxplayer.bin'])
    return render(request, 'pages/home.html',)


def list_files(request):
    files = []
    directories = []
    path = "/Users/joaomoura/"
    prevFolder = ""
    if 'dir' in request.GET:
        path = request.GET["dir"]
    for (dirpath, dirnames, filenames) in walk(path):
        path = dirpath
        directories.extend(dirnames)
        files.extend(filenames)
        break
        
    if path != "/":
        prevFolder = os.path.abspath(os.path.join(path, os.pardir)) + "/"
    return render(request, 'pages/listFiles.html', { "files": files, "directories": directories, "dirpath" : path, "prevFolder": prevFolder})


def omx_send(data):
    subprocess.Popen('echo -n ' + data + ' >omxfifo',shell=True)
    return data


def send_text_command(command):
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
    if command in command_list:
        omx_send(command_list[name])
        return 1
    else:
        return 0


def play_file(request):
    OMXIN_FILE = "omxfifo"
    path = request.GET['file']
    subprocess.Popen('killall omxplayer.bin',stdout=subprocess.PIPE,shell=True)
    subprocess.Popen('clear',stdout=subprocess.PIPE,shell=True)
    subprocess.Popen('omxplayer -o hdmi ' + path + ' <' + OMXIN_FILE,shell=True)
    omx_send('.')
    return HttpResponse('1')


def run_cmd(request):
    if "cmd" in request.GET:
        return HttpResponse(omx_send(request.GET['cmd']))
    elif "cmdText" in request.GET:
        return HttpResponse(send_text_command(request.GET['cmdText']))
    else:
        return HttpResponse("Bad command")