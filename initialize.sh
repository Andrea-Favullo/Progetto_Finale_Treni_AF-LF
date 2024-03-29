cd /workspace/Progetto_Finale_Treni_AF-LF ;
    echo -e "\n-----------------------------\n\nInstallazione Angular CLI ..." ;
    npm i -g @angular/cli ;
    echo -e "\n-----------------------------\n\nInstallazione Nodemon ..." ;
    npm i -g nodemon ;
cd client/ ;
    echo -e "\n-----------------------------\n\nInstallazione CORS ..." ;
    npm i cors@latest ;
    echo -e "\n-----------------------------\n\nInstallazione Leaflet ..." ;
    npm i leaflet@1.7.1 ;
    npm i @types/leaflet ;
    echo -e "\n-----------------------------\n\nInstallazione Dipendenze ..." ;
    npm i ;
cd ../server ;
    echo -e "\n-----------------------------\n\nInstallazione JSDOM ..." ;
    npm i jsdom@16.4.0 ;
    echo -e "\n-----------------------------\n\nInstallazione CORS ..." ;
    npm i cors@latest ;
    echo -e "\n-----------------------------\n\nInstallazione Request ..." ;
    npm i request ;
    echo -e "\n-----------------------------\n\nInstallazione MongoDB ..." ;
    npm i mongodb ;
    echo -e "\n-----------------------------\n\nInstallazione Express ..." ;
    npm i express ;
    echo -e "\n-----------------------------\n\nInstallazione API TrenItalia ..." ;
    npm i api-trenitalia ;
    echo -e "\n-----------------------------\n\nInstallazione Dipendenze ..." ;
    npm i ;
echo -e "
                    &&&&&&&&&&&,                                                
      @.((#@         @@%%%%%%%&                                                 
       &(##          @@....,,%&   .%%%%%(%%%%%(%%%%%(    @#%%%%%%%%%%%%%%%%%@   
     &#%@........,(% @@.,,,,,%&  .(*....#.....#....,#    @% ...#@ ...@@ ...@@   
    &%%%(((((((((((#%@(((((###&  .(&%%%%#%%%%%#%%%%%#    @%%%%%&@%%%%@@%%%%@@   
    %%%&(((((((((((#%@((((####&   (((((((((##########    @(((((((((#########@   
    &&&&############&@(((#####&   ((((((#############    @((((((############@   
     @&&&&&&&&&&&&&@#(####(%##@&@.(((################.#% @(((###############@@%&
  (/(@%%%%%%%%%%%%@(#%%&&%%(#@#. @&&&&&&&&&&&&&&&&&&&@   @&&&&&&&&&&&&&&&&&&&*  
 @(#&@*%@&@@@%&%*@@(##%#%##(&     @##@@@#%@ @%#%@@%%&    .%#%@@%#%@ @##@@@##@   
     ,%,,## ##,,%,  @#(((#&*      &%%%.&%%% @%%##@%%#/   %#%%@&#%%@.%%%& %%%@";
echo -e "... Fine !"