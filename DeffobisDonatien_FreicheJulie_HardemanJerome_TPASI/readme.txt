Deffobis Donatien
Freiche Julie
Hardeman Jérôme

Parties traitées:
- JEE
	. Création d'un web service pour la demande d'authentification
	. Création d'un EJB permetteant d'envoyer cette demande sur un bus de communication
	. Création d’un EJB Message driven permettant de recevoir les demandes d’authentification
	. Création d’un EJB permettant de renvoyer un réponse sur un 2ème bus de communication 
	. Création d’un EJB entité permettant de récupérer les informations de la base de données 

- Node
	- Création des services /loadPres et /savePres
	- Création d'une classe ContentModel pour géré les slides et leur contenu
	- Création des services GET /contents, POST /contents, GET /contents/:id
	- Mise en place de la gestion des sockets et des différents évènements (connection, data_comm, slidEvent, currentSlidEvent) avec les fichiers index.html dans /public/watch et /public/admin
	- Mise en place de la communication des identifiants de login entre le webservice (JEE) et le client (React)


- React
	. Mise en place des composants principaux MainPanel, BrowseContentPanel, BrowsePresentationPanel
	. Création de la présentation, des slids et de la slidlist 
	. Création du store, des actions et des reducers (partiellement OK)
	. Création d'une page de login pour s'authentifier

	
Parties non traitées:
- Node
	- Authentification avec Token pour sécuriser l'accès à la page diapo (il y a juste une simple redirection, pas du tout sécurisé ... )

- React
	. Création d'un service de communication
	. Création d'une section d'ajout de contenu et drag and drop
	. Création des commandes de navigation et du watcher


Lien vers le repertoire git: https://github.com/juliefreiche/Projet_ASI2/
Lien vers la vidéo youtube : https://youtu.be/MhU4j25_Wr4