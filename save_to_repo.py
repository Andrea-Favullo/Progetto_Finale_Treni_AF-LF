import os

percorso = input("Inserisci percorso dal quale salvare le modifiche\n(scrivi \"*\" per salvare tutto)\n(scrivi \"q\" per annullare)\n")

if(percorso.replace(" ", "") == ""):

    print("[!ATTENZIONE!] PERCORSO NON VALIDO (Il percorso non può essere vuoto! Assicurati che sia anche valido!) [!ATTENZIONE!]")
elif percorso.replace(" ", "") != "q":

    messaggio = input("\nInserisci messaggio commit\n(scrivi \"q\" per annullare)\n")
    if messaggio!="q":

        cmd = 'git add {} ; git commit -m \"{}\" ; git push origin master'.format(percorso, messaggio)
        os.system(cmd)
        print("[!ATTENZIONE!] I DATI SONO STATI CORRETTAMENTE SALVATI SUL REPOSITORY! [!ATTENZIONE!]")