/* Code Javascripit permettant de créer une partie de chasse au trésor à Ghost Town 
(réalisé avec l'aide de Nathan VARIN et Sébastien MEUNIER) */
 
// Mise en place des variables globales du programme
let TableauJeu 
let clesCarte="Clés" 
let nbMax=9
let clesX 
let clesY 
let tentatives 

//Création du tableau (en mémoire)
function tableau(x, y) {
	let table = new Array(x)
	for (let i = 0; i < table.length; i++) {
		table[i] = new Array(y)
	}
	return table 
}

//Fonction d'initialisation de la chasse au trésor
function init() {
	//Réinitialisation de la partie 
	document.getElementById("boutonInit").innerHTML = "" 
	document.getElementById("carte").innerHTML = "" 
	document.getElementById("tentatives").innerHTML = "0"  
	document.getElementById("commentaires").innerHTML = ""
	tentatives = 0 

	//Création du tableau dans une variable globale
	TableauJeu=tableau(10, 10) 

	//Emplacement des clés aléatoire à chaque partie
	clesX = Math.floor(Math.random() * nbMax + 1) 
	clesY = Math.floor(Math.random() * nbMax + 1) 

	//Ajout des clés dans le tableau 
	TableauJeu[clesX][clesY]=clesCarte 


	//Affichage du tableau sur la page HTML (i=numéro de ligne / h=numéro de colonne) => départ à 0
	//Création de la ligne
	let ligneTab = "" 
	for (let i = 0 ; i <= 9 ; i++)
	{
		ligneTab+="<tr>"
		for (let h = 0 ; h <= 9 ; h++)
		{
			//création des colonnes
			ligneTab += '<td class="caseCarte" onclick="choix(this.id)" id=' + i + "-" + h + '></td>' 
		}
		ligneTab += "</tr>" 
		
	}
	//Insertion des lignes au tableau
	document.getElementById("carte").innerHTML += ligneTab

}

// Récupération de l'ID de la case cliquée et traitement du résultat
function choix(idCase) {
    tabCoordonnees = idCase.split("-")
    let idX = tabCoordonnees[0] 
    let idY = tabCoordonnees[1] 

	let caseClic = document.getElementById(idX + "-" + idY)

	if (TableauJeu[idX][idY] == "Clés")
	{
		tentatives += 1
		caseClic.classList.add("tresor")
		//Accès à la grille cliquable bloqué pour l'utilisateur
		//Récupération des ID dans un tableau
		let tabTd = document.getElementsByClassName("caseCarte")
		//Suppression de l'attribut "cliquable" de chaque case du tableau
		for (var i = 0 ; i < tabTd.length ; i++)
		{
			tabTd[i].removeAttribute("onclick") 
		}	

		document.getElementById("commentaires").innerHTML = commentaires(tentatives)

		//Création d'une fonction qui affichera un commentaire du sheriff en fonction de vos exploits
		function commentaires(tentatives) {

			let information = "Vous avez trouvé les clés en " + tentatives + " essais."
			
			if (tentatives <= 1) {
				information = information + " Il est fort... très très fort même..."
			}

			else if (tentatives < 7) {
				information = information + " Vous êtes plutôt doué dans ce domaine, vous devriez y faire carrière ha ha ha..."
			}

			else if (tentatives <= 15 ) {
				information = information + " C'est la chance du débutant, on se calme."
			}
			else if (tentatives <= 25) {
				information = information + " Vous êtes dans la moyenne (plutôt basse)"
			}
			else if (tentatives <= 35) {
				information = information + " Laissez tomber, je m'en occuperai la prochaine fois... "
			}
			else {
				information = information + " Dégagez d'ici !! "
			}

			return information
			
		}

		//Affichage du bouton "Recommencer"
		document.getElementById("boutonInit").innerHTML += '<button onclick="init()">Recommencer</button>' 
	}
	else{
		if(idY == clesY) {
			tentatives += 1
			//si la case cliquée est dans la bonne colonne 
			caseClic.classList.add("bonneColonne")	
		}
		else if (idX == clesX){ 
			tentatives += 1
			//si la case cliquée est dans la bonne ligne
			caseClic.classList.add("bonneLigne")	 
		}
		else {
			caseClic.classList.add("mauvaiseCase")
			tentatives += 1
		}
		caseClic.onclick = ""
		
	}
	//Réinitialisation du compteur de tentatives 
	document.getElementById("tentatives").innerHTML = tentatives 


}
