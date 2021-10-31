import threading 
import speech_recognition as sr
import json
import os
def search(s):
    s = s.replace('search','')
    s = s.replace(' ','+')
    prefix = "start chrome https://www.google.com/search?q=" + s
    os.system(prefix)
root = sr.Recognizer()
def MAIN():
    while True:
        with sr.Microphone() as SRC:
            print('LISTENING...')
            audio_data = root.listen(SRC)
            try:
                print("RECOGNIZING...")
                txt = root.recognize_google(audio_data)
                txt = txt.lower()   
                if len(txt) >= 8 and txt[:6] == 'search':
                    search(txt)
                else:
                    with open('CMDS.json','r') as f:
                        COMMANDS = json.loads(f.read());
                        for COMMAND in COMMANDS:
                            if COMMAND['voice'] in txt:
                                os.system(COMMAND['cmd']);
            except Exception as e:
                print("FAILED :(");
MAIN()
