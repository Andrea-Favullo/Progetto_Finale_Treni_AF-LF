import os

percorso = input("""Inserisci il percorso dal quale salvare le modifiche
- (scrivi \"*\" per salvare tutto)
- (scrivi \"c\" per salvare il client)
- (scrivi \"s\" per salvare il server)
- (scrivi \"q\" per annullare)\n""")

if(percorso.replace(" ", "") == ""):

    print("[!ATTENZIONE!] PERCORSO NON VALIDO (Il percorso non può essere vuoto! Assicurati che sia anche valido!) [!ATTENZIONE!]")
elif percorso.replace(" ", "") != "q":

    messaggio = input("\nInserisci messaggio commit\n(scrivi \"q\" per annullare)\n")
    if messaggio!="q":

        if percorso=="c":
            percorso = "./client/*"

        if percorso=="s":
            percorso = "./server/*"
        cmd = 'git add {} ; git commit -m \"{}\" ; git push origin master'.format(percorso, messaggio)
        os.system(cmd)
        print("[!SUCCESSO!] I DATI SONO STATI CORRETTAMENTE SALVATI SUL REPOSITORY! [!SUCCESSO!]")