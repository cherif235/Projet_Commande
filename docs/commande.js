
console.log(JSON.stringify(tarifs));

let panier = {
  total: 12.5,
  articles: [
    {
      article: 'Oranges',
      quantité: 3,
      prixUnitaire: 1.5,
      prix: 4.5
    }, {
      article: 'Fraises',
      quantité: 1,
      prixUnitaire: 8,
      prix: 8
    },
    {
      article: 'Poires',
      quantité: 2,
      prixUnitaire: 3,
      prix: 6
    },
  ]
};

window.addEventListener("load", function() {

   fabriqueInterfaceGraphique(articles, tarifs);
   CreerCategories(articles);
   CreerOrigines(articles);
   CheckCategorie(articles);
   CheckOri(articles,tarifs);
   AjouterPanier(articles, tarifs);
   EnleverPanierEvenement(articles);
   //FiltreCat(articles);
  //Filtre_Ori();
});

 function fabriqueInterfaceGraphique(articles, tarifs)
{
  for (var parcoursArticle = 0; parcoursArticle <articles.length; parcoursArticle++)
  {

       //Chemin images
        let dirImages = "./images/";
        var Article = document.getElementsByClassName('article')[0];

        //Creation du clone Article
        var CloneArticle = Article.cloneNode(true);

        // prends la classe article
        let ElemArticle = document.getElementsByClassName('article')[parcoursArticle];

        // Modifier les photos
        let Photo = articles[parcoursArticle].photos[0];
        let TestImgStyle = ElemArticle.getElementsByClassName('img')[0].style;
        TestImgStyle.backgroundImage = "url('" + dirImages + Photo.url + "')";
        TestImgStyle.backgroundPositionX = -Photo.x + "px";
        TestImgStyle.backgroundPositionY = -Photo.y + "px";
        TestImgStyle.width = Photo.w + "px";
        TestImgStyle.height = Photo.h + "px";


        // Recupere le nom de l'article
        let NomArticle=articles[parcoursArticle].nom;

        // Modifie le nom de l'article
        let NomArticleAffiche=ElemArticle.getElementsByClassName('nom')[0];
        console.log(NomArticleAffiche);
        NomArticleAffiche.innerHTML= NomArticle;



        for (let k=0; k<tarifs.length; k++)
        {
            if (tarifs[k].ref==articles[parcoursArticle].ref)
            {
                CloneArticle.children[1].children[1].children[0].innerHTML=tarifs[k].origine;
                CloneArticle.children[1].children[2].children[0].innerHTML=tarifs[k].prix;
                CloneArticle.children[1].children[2].children[1].innerHTML=tarifs[k].unité;
                CloneArticle.children[1].children[3].children[2].innerHTML=tarifs[k].unité;
            }

        }
        // dupliquer l'article
        document.getElementsByClassName('articles')[0].appendChild(CloneArticle);
        }
        // Enlever le premier Article apres clonage
        Article.remove();

}

/*<------------------------------------------------------------------------------------------------------------->
/*<------------------------------------------------------------------------------------------------------------->

/***********************************/
/* Cette fonction crée dynamiquement la selection de la catégorie      */

function CreerCategories(articles)
{
  //Creation tableau categories
  let TabCat = [];

  //Remplissage du tableau par les catégories de articles.js
  for (let i = 0; i < articles.length; i++)
  {
    TabCat[i] = articles[i].catégorie;
  }

  TabCat.sort();

  //Garde un seul element paris plusieurs categories du meme type
  for (let i = 0; i < TabCat.length; i++)
  {
    while(TabCat[i] === TabCat[i+1])
    {
      //tant qu'il y a des occurrences reste dans la boucle
      TabCat.splice(i+1,1);
    }
  }

  //création des checkbox
  for (let i = 0; i < TabCat.length; i++)
  {
    let checkElem = document.getElementsByTagName("div")[1];
    let clone = checkElem.cloneNode(true);
    document.getElementsByClassName("categories")[0].appendChild(clone);
    clone.getElementsByTagName("input")[0].name =TabCat[i];
    clone.getElementsByTagName("input")[0].checked = false;
    clone.getElementsByTagName("label")[0].innerHTML = TabCat[i];
  }

}

/*<------------------------------------------------------------------------------------------------------------->
/*<------------------------------------------------------------------------------------------------------------->

/***********************************/
/* Cette fonction crée dynamiquement la selection de l'origine      */
/***********************************/

function CreerOrigines(articles)
{
  //Tableau contient catégories
  let TabOri = [];

  //Remplissage du tableau par les catégories de articles.js
  for (let i = 0; i < tarifs.length; i++)
  {
    TabOri[i] = tarifs[i].origine;
  }

  //Tri par ordre alphabetique
  TabOri.sort();

  //Garde un seul element paris plusieurs categories du meme type
  for (let i = 0; i <TabOri.length; i++)
  {
    while(TabOri[i] === TabOri[i+1])
    {
      //tant qu'il y a des occurrences reste dans la boucle
      TabOri.splice(i+1,1);
    }
  }

  //création d'une checkbox
  for (let i = 0; i <TabOri.length; i++)
  {
    let checkElt = document.getElementsByTagName("div")[2];
    let clone = checkElt.cloneNode(true);
    document.getElementsByClassName("origines")[0].appendChild(clone);
    clone.getElementsByTagName("input")[0].name =TabOri[i];
    clone.getElementsByTagName("input")[0].checked = false;
    clone.getElementsByTagName("label")[0].innerHTML = TabOri[i];
  }

}

/*<------------------------------------------------------------------------------------------------------------->
/*<------------------------------------------------------------------------------------------------------------->

/***********************************/
/*  checkbox categorie             */
/***********************************/

function CheckCategorie(articles)
{

  //Tableau contient catégories
  let TabCategorie = [];

  //Remplissage du tableau par les catégories de articles.js
  for (let i = 0; i < articles.length; i++)
  {
    TabCategorie[i] = articles[i].catégorie;
  }

  //Tri par ordre alphabetique
  TabCategorie.sort();

  //Garde un seul element paris plusieurs categories du meme type
  for (let i = 0; i < TabCategorie.length; i++)
  {
    while(TabCategorie[i] === TabCategorie[i+1])
    {
      //tant qu'il y a des occurrences reste dans la boucle
      TabCategorie.splice(i+1,1);
    }
  }

  // variable Cpt
  var Cpt = 0;



 //**** Cas de la premiere case *** //
  var filtres_toutes=document.getElementsByName('cat_toutes')[0];
  filtres_toutes.checked=true;  //cas : si on actualise la page est que toutes est unchecked
  filtres_toutes.addEventListener('change', CheckboxTTS);
  filtres_toutes.addEventListener('change', FiltreCat);

  // CheckboxTTS
    function CheckboxTTS()
    {
        Cpt = 0;
        if (filtres_toutes.checked==true) // si toutes est checke
        {
          document.getElementsByTagName("input")[0].style.backgroundColor = "green";
            // Parcours du tableau de input pour categorie ( sauf cas _toutes i=0 )
          for (let i=1; i<=TabCategorie.length;i++)
          {
            //  Mettre tous les inputs en : false
            document.getElementsByTagName("input")[i].checked=false;
          }
        }
        else // si _toutes n'est pas checke
        {
          // Parcours du tableau de input pour categorie ( sauf cas _toutes i=0 )
          for (let i=1; i<=TabCategorie.length;i++)
          {
            // On regarde s'il y a un autre input checke
            if(document.getElementsByTagName("input")[i].checked==true)
            {
              Cpt++;
            }
          }

          if(Cpt==0) // si aucun input n'est checke on peut pas unchecke _toutes
          {
            document.getElementsByTagName("input")[0].checked=true;
          }
        }

    }

 //**** Cas des autres cases *** //

    // Recupere de l'HTML div de categories
    var variable=document.getElementsByClassName('categories')[0];
    // Recupere de variable les inputs (checkbox)
    var filtres_autres =variable.getElementsByTagName('input');
    // Recupere de filtres_autres la premiere input : initialisation
    var check=filtres_autres[0];

    // Parcours du tableau de input pour categorie ( sauf cas _toutes i=0 )
    for (let i=1; i<=TabCategorie.length;i++)
    {
      // prend l'input et regarde s'il est changé
      check=filtres_autres[i];
      // Appel CheckboxSolo
      check.addEventListener('change', CheckboxSolo);
      check.addEventListener('change', FiltreCat);

      console.log(check);
    }

 // CheckboxSolo
    function CheckboxSolo()
    {
        Cpt = 0;
        // Mettre cas_toutes à false
        document.getElementsByTagName("input")[0].checked=false;
        // Parcours du tableau de input pour categorie ( sauf cas _toutes i=0 )
        for (let i=1; i<=TabCategorie.length;i++)
        {
          // On regarde s'il y a un autre input checke
          if(document.getElementsByTagName("input")[i].checked==true)
          {
            Cpt++;
          }
        }
        if(Cpt==0)// si aucun input n'est checke je met _toutes à true
        {
          document.getElementsByTagName("input")[0].checked=true;
        }

    }


  //****  FiltreCat*** //
 function FiltreCat()
 {
   let TabCheck = [];
   let tabNom= [];
   let fParcoursTableau =0;
   var caseTabnom =0;
   let trouve = 0;
   let trouve2 = 0;
   let cpt = 0;
   //Prend les articles
   let listeArticle = document.getElementsByClassName("article");
   let listeArticletmp = document.getElementsByClassName("article");
   //Si cas_toutes checked = affiche tous les articles
    if ( document.getElementsByTagName("input")[0].checked==true ) {
      for ( var parcours = 0; parcours < articles.length; parcours++) {
          listeArticle[parcours].style.display="block";
        }
    }
    else
    {
        // Remplir un tableau avec le nom de categorie des cases checked
          for (let i=1; i<=TabCategorie.length;i++)
          {
            //initialisation deparcours tableau check
            fParcoursTableau=0;
            //***Si l'input i est checked
            if(document.getElementsByTagName("input")[i].checked==true)
            {
                //Si l'input i est checked, on met son nom (catgéorie) en miniscule dans le TabCheck
                TabCheck[fParcoursTableau]=document.getElementsByTagName("input")[i].name.toLowerCase();
                fParcoursTableau++;//Augmente la case prochaine
                //Parcours les articles dans articles.js
                for (let n = 0; n < articles.length; n++)
                {
                      cpt = 0;//initialisation compteur de TabCheck
                      trouve2 = 0;
                      //parcours le TabCheck
                      while(cpt<=TabCheck.length)
                      {
                          if (articles[n].catégorie.toLowerCase()==TabCheck[cpt])
                          {
                            trouve2=1;
                            break;
                          }
                          cpt++;
                      }
                      if (trouve2==1)
                      {
                        tabNom[caseTabnom]=articles[n].nom.toLowerCase();
                        caseTabnom++;
                      }
                  }
            }
          }
          for (let j = 0; j < articles.length; j++)
          {
                fParcoursTableau=0;
                trouve = 0;

                while(fParcoursTableau<=tabNom.length)
                {
                  if (listeArticle[j].getElementsByClassName("description")[0].getElementsByClassName("nom")[0].textContent.toLowerCase()==tabNom[fParcoursTableau] )
                  {
                    trouve =1;
                    break
                  }
                  fParcoursTableau++;
                }
                if (trouve==1){listeArticle[j].style.display="block";
              }
                else {listeArticle[j].style.display="none";
              }
          }
    }
}//fin FiltreCategorie

}//fin fonction

/*<------------------------------------------------------------------------------------------------------------->
/*<------------------------------------------------------------------------------------------------------------->

/***********************************/
/*  checkbox origine             */
/***********************************/

function CheckOri(articles,tarifs)
{

  //Tableau contient origines
  let TabOri = [];

  //Remplissage du tableau par les origines de tarifs.js
  for (let i = 0; i < tarifs.length; i++)
  {
    TabOri[i] = tarifs[i].origine;
  }

  //Tri par ordre alphabetique
  TabOri.sort();

  //Garde un seul element paris plusieurs origines du meme type
  for (let i = 0; i < TabOri.length; i++)
  {
    while(TabOri[i] === TabOri[i+1])
    {
      //tant qu'il y a des occurrences reste dans la boucle
      TabOri.splice(i+1,1);
    }
  }

  // variable Cpt
  var Cpt = 0;



 //**** Cas de la premiere case *** //
  var filtres_toutes1=document.getElementsByClassName('origines')[0];
  var filtres_toutes=filtres_toutes1.getElementsByTagName('input')[0];
  filtres_toutes.checked=true;  //cas : si on actualise la page est que toutes est unchecked
  filtres_toutes.addEventListener('change', CheckboxTTS);
  filtres_toutes.addEventListener('change', FiltreOri);

  // CheckboxTTS
    function CheckboxTTS()
    {
        Cpt = 0;
        if (filtres_toutes.checked==true) // si toutes est checke
        {
            // Parcours du tableau de input pour categorie ( sauf cas _toutes i=0 )
          for (let i=1; i<=TabOri.length;i++)
          {
            //  Mettre tous les inputs en : false
            filtres_toutes1.getElementsByTagName("input")[i].checked=false;
          }
        }
        else // si _toutes n'est pas checke
        {
          // Parcours du tableau de input pour categorie ( sauf cas _toutes i=0 )
          for (let i=1; i<=TabOri.length;i++)
          {
            // On regarde s'il y a un autre input checke
            if(filtres_toutes1.getElementsByTagName("input")[i].checked==true)
            {
              Cpt++;
            }
          }

          if(Cpt==0) // si aucun input n'est checke on peut pas unchecke _toutes
          {
            filtres_toutes.checked=true;
          }
        }

    }

 //**** Cas des autres cases *** //

    // Recupere de l'HTML div de categories
    var variable=document.getElementsByClassName('origines')[0];
    // Recupere de variable les inputs (checkbox)
    var filtres_autres =variable.getElementsByTagName('input');
    // Recupere de filtres_autres la premiere input : initialisation
    var check=filtres_autres[0];

    // Parcours du tableau de input pour categorie ( sauf cas _toutes i=0 )
    for (let i=1; i<=TabOri.length;i++)
    {
      // prend l'input et regarde s'il est changé
      check=filtres_autres[i];
      // Appel CheckboxSolo
      check.addEventListener('change', CheckboxSolo);
      check.addEventListener('change', FiltreOri);

      console.log(check);
    }

 // CheckboxSolo
    function CheckboxSolo()
    {
        Cpt = 0;
        // Mettre cas_toutes à false
        variable.getElementsByTagName("input")[0].checked=false;
        // Parcours du tableau de input pour categorie ( sauf cas _toutes i=0 )
        for (let i=1; i<=TabOri.length;i++)
        {
          // On regarde s'il y a un autre input checke
          if(variable.getElementsByTagName("input")[i].checked==true)
          {
            Cpt++;
          }
        }
        if(Cpt==0)// si aucun input n'est checke je met _toutes à true
        {
          variable.getElementsByTagName("input")[0].checked=true;
        }

    }


    //****  FiltreCat*** //
   function FiltreOri()
   {
     let TabCheck = [];
     let tabNom= [];
     let fParcoursTableau =0;
     var caseTabnom =0;
     let trouve = 0;
     let trouve2 = 0;
     let cpt = 0;
     //Prend les tarifs
     let listeArticle = document.getElementsByClassName("article");
     let listeArticletmp = document.getElementsByClassName("article");
     //Si cas_toutes checked = affiche tous les tarifs
      if ( document.getElementsByTagName("input")[1].checked==true ) {
        for ( var parcours = 0; parcours < tarifs.length; parcours++) {
            listeArticle[parcours].style.display="block";
          }
      }
      else
      {
          // Remplir un tableau avec le nom de categorie des cases checked
            for (let i=1; i<=TabOri.length;i++)
            {
              //initialisation deparcours tableau check
              fParcoursTableau=0;
              //***Si l'input i est checked
              if(document.getElementsByTagName("input")[i].checked==true)
              {
                  //Si l'input i est checked, on met son nom (catgéorie) en miniscule dans le TabCheck
                  TabCheck[fParcoursTableau]=document.getElementsByTagName("input")[i].name.toLowerCase();
                  fParcoursTableau++;//Augmente la case prochaine
                  //Parcours les tarifs dans tarifs.js
                  for (let n = 0; n < tarifs.length; n++)
                  {
                        cpt = 0;//initialisation compteur de TabCheck
                        trouve2 = 0;
                        //parcours le TabCheck
                        while(cpt<=TabCheck.length)
                        {
                            if (tarifs[n].origine.toLowerCase()==TabCheck[cpt])
                            {
                              trouve2=1;
                              break;
                            }
                            cpt++;
                        }
                        if (trouve2==1)
                        {
                          let ref=tarifs[n].ref;
                          console.log(ref);
                          for(let k=0; k<articles.length; k++)
                          {
                              if (ref==articles[k].ref)
                              {
                                  tabNom[caseTabnom]=articles[k].nom.toLowerCase();
                                  caseTabnom++;
                                  console.log(tabNom);
                             }
                          }
                        }
                    }
              }
            }
            for (let j = 0; j < articles.length; j++)
            {
                  fParcoursTableau=0;
                  trouve = 0;

                  while(fParcoursTableau<=tabNom.length)
                  {
                    if (listeArticle[j].getElementsByClassName("description")[0].getElementsByClassName("nom")[0].textContent.toLowerCase()==tabNom[fParcoursTableau] )
                    {
                      trouve =1;
                      break
                    }
                    fParcoursTableau++;
                  }
                  if (trouve==1){listeArticle[j].style.display="block";
                }
                  else {listeArticle[j].style.display="none";
                }
            }
      }
  }//fin FiltreCategorie
}


/*<------------------------------------------------------------------------------------------------------------->
/*<------------------------------------------------------------------------------------------------------------->

/***********************************/
/*  EnleverPanierEvenement           */
/***********************************/
function EnleverPanierEvenement(articles)
{


  var Panier=document.getElementsByClassName('panier')[1];
  var tableau =Panier.getElementsByTagName('table')[0];
  var ter =tableau.getElementsByTagName('tr')[1];
  var checkbox =ter.getElementsByTagName('td')[4];
  var button = tableau.getElementsByTagName('button')[0];
  button.addEventListener('click', EnleverArticles);




  function EnleverArticles()
  {


    var i=1;
    while(i<=articles.length && i>0)
    {
      var length = document.getElementsByTagName('table')[0].childNodes.length;
      if (length!=5) {
        break;
      }
      else{
        ter =tableau.getElementsByTagName('tr')[i];
        console.log(ter);
        checkbox =ter.getElementsByTagName('td')[4].getElementsByTagName('input')[0];
        if(ter.getElementsByTagName('td')[4].getElementsByTagName('input')[0].checked==true)
        {
          ter.remove();
        }
        else
        {
          i++;
        }
      }
    }
  }
}

//}

/*<------------------------------------------------------------------------------------------------------------->
/*<------------------------------------------------------------------------------------------------------------->

/***********************************/
/*  Ajouter Panier                 */
/***********************************/

function AjouterPanier(articles, tarifs)
{

  //Article
  let f=0;
  var article=document.getElementsByClassName('article')[0].getElementsByClassName('description')[0];
  var boutton =article.getElementsByTagName('button')[0];
  for (let i = 0; i < articles.length; i++)
  {

    article=document.getElementsByClassName('article')[i].getElementsByClassName('description')[0];
    boutton =article.getElementsByTagName('button')[0];
    boutton.addEventListener("click", function(e){

      var cible =e.target.parentNode;
      var trouve =0;
      var k =0;


      //Panier
      var Panier=document.getElementsByClassName('panier')[1];
      var tableau =Panier.getElementsByTagName('table')[0];
      var thead =tableau.getElementsByTagName('thead')[0];

        var row = document.createElement('tr'); // creer ligne
        var col = document.createElement('td'); // creer colonne
        var col2 = document.createElement('td'); // creer colonne
        var col3 = document.createElement('td'); // creer colonne
        var col4 = document.createElement('td'); // creer colonne
        var col5 = document.createElement('td'); // creer colonne
        var input1 = document.createElement("input");
        input1.type = "checkbox";
        var input2 = document.createElement("input");
        input2.type = "text";
        col5.appendChild(input1);
        col2.appendChild(input2); // mettre input dans la derniere colonne
        row.appendChild(col); // mettre colonne 1 dans la ligne
        row.appendChild(col2); // mettre colonne 2 dans la ligne
        row.appendChild(col3); // mettre colonne 3 dans la ligne
        row.appendChild(col4); // mettre colonne  dans la ligne
        row.appendChild(col5); // mettre colonne 1 dans la ligne
        col.innerHTML = cible.getElementsByTagName('label')[0].textContent; // put data in first column
        col2.getElementsByTagName("input")[0].value = cible.getElementsByClassName('quantite')[0].getElementsByTagName('input')[0].value; // put data in second column
        col3.innerHTML = cible.getElementsByClassName('prix')[0].getElementsByTagName('span')[0].textContent; // put data in second column
        var prix = parseFloat(col3.textContent);
        var qt = parseFloat(col2.getElementsByTagName("input")[0].value);
        col4.innerHTML =parseFloat(prix*qt); // put data in second column
        thead.appendChild(row); // append row to table


});


  }
}




function envoyerCommande() {
  let email = "destinataire@mail.com";
  email=prompt("Entrez votre adresse mail");
  let sujet = "commande de fruits et légumes";
  let corps = "\nCommande\n\nVoici un récapitulatif des articles commandés\npour un montant de 12.50 € :\n...\n..."
  email = encodeURIComponent(email);
  sujet = encodeURIComponent(sujet);
  corps = encodeURIComponent(corps);
  let uri = "mailto:" + email + "?subject=" + sujet + "&body=" + corps;
  window.location.href = uri;
}
