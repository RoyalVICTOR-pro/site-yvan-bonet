// Voici une méthode pour éviter de faire des try catch crade dans le code asynchrone.
// On va créér une fonction dont le role sera de retourner une fonction
// qui va exécuter le code de la fonction finale. (Oui c'est un peu le bordel.)

module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

/* 
Voici la version non contractée de cette fonction ci-dessus : 

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err));
  };
}; 

Et l'appel à cette fonction pour l'exemple du createTour : 
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

Afin de nous débarrasser de nos blocs try catch, 
nous avons simplement encapsulé notre fonction asynchrone 
dans la fonction catchAsync que nous venons de créer.

Cette fonction renverra alors une nouvelle fonction anonyme, qui est celle-ci 
(req, res, next) => {
  fn(req, res, next).catch(err => next(err));
};
Celle ci sera alors affectée à createTour par exemple.

Et donc fondamentalement, c'est cette fonction qui sera appelée dès qu'un nouveau
tour doit être créé à l'aide du gestionnaire createTour.

Et c'est pourquoi elle a exactement la même signature 
que la fonction asynchrone, avec request, response et next.

Maintenant, ce que cette fonction fera alors, c'est qu'elle appellera la
fonction que nous avons transmise initialement, donc celle-ci dans le cas de createTour

async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
}

et elle exécutera ensuite tout le code qui s'y trouve depuis celle ligne : 
fn(req, res, next)

Maintenant, puisqu'il s'agit d'une fonction asynchrone, elle renverra une promesse 
et donc, en cas d'erreur dans cette promesse ou en d'autres termes, en cas de rejet,
nous pouvons alors détecter l'erreur qui s'est produite en utilisant la méthode catch 
qui est disponible sur toutes les promesses.
.catch(err => next(err));

Et au final, c'est cette méthode catch ici qui va transmettre l'erreur à la fonction suivante qui fera ensuite
en sorte que notre erreur se retrouve dans notre middleware global de gestion des erreurs.
Et on peut écrire une version contractée comme ceci : .catch(err)

C'est donc ici, dans cette ligne de code, 
fn(req, res, next).catch(err);
que toute la magie opère, 
et c'est en fait ce qui nous permet de nous débarrasser 
du bloc catch que nous avions auparavant.

*/
