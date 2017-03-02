
from random import randint
from time import sleep


for a in range(0,100):

    line=''

    line+='['
    for i in range(1, 95):

        line+='{'
        line +='"CPU": "'+str(randint(0, 100))+'",'
        line +='"Memory": "'+str(randint(0, 100))+'",'
        if i < 10:
            line+='"Node": "pinode00'+str(i)+'",'
        else:
            line+='"Node": "pinode0'+str(i)+'",'
        line+='"Time": "'+str(randint(0, 24))+':'+str(randint(0, 60))+':'+str(randint(0, 60))+' 02/03/2017"'
        if(i==94):
            line+='}'
        else:
            line+='},'

    line+= ']'

    fo = open("cluster_monitor_data.json", "w")
    fo.write(line)
    fo.close()

    sleep(3)


