# Morpion ❌⭕️

## ⭕️ Contexte
Ce projet est un projet réalisé en React avec TypeScript. Il s'agit d'un jeu de morpion où l'on peut jouer contre l'ordinateur ou contre un autre joueur en local. Il y a 2 variantes de jeu qui sont disponibles : le mode classique et le mode en 3 coups.

## 🎮 Modes de jeu
- Classique : le premier joueur qui aligne 3 symboles gagne la partie
- En 3 coups : il ne peut y avoir que 3 symboles de chaque joueur sur le plateau. Si il y a plus de 3 symboles d'un joueur, le premier placé est supprimé. Dans ce mode de jeu, il ne peut pas y avoir de partie nulle.

## ✨ Fonctionnalités attendues
- Pages
  - Page d'accueil
  - Page de jeu
  - Page de classement
- Elements
  - Barre de navigation
  - Pied de page avec les crédits
- Séléction du mode de jeu (contre l'ordinateur ou contre un autre joueur) et de la variante (classique ou en 3 coups)
- Jeu contre l'ordinateur (pseudo du joueur obligatoire)
- Jeu contre un autre joueur en local (pseudo des joueurs facultatifs)
- Page de jeu
  - Grille de jeu 3x3
  - Affichage du joueur courant et des scores des joueurs
  - Bouton pour abandonner la partie 
- Page de classement
  - Affichage des scores des joueurs (le score étant la série de victoires consécutives contre l'ordinateur)
  - En cas d'égalité sur plusieurs joueurs, leur mettre la même position dans le classement.
- Persistance
  - Conservation des scores des joueurs
  - Conservation de la partie en cours pour pouvoir la reprendre plus tard

### 🎀 Autres fonctionnalités
Ces fonctionnalités n'étaient pas demandées dans le cahier des charges mais ont été ajoutées pour améliorer l'expérience utilisateur :
- Surbrillance des cases gagnantes
- Au passage de la souris sur une case, affichage du symbole du joueur qui jouera si on clique sur cette case *(avec une opacité réduite)*
- Changement dynamique du favicon en fonction du joueur courant

## ⚡️️ Prérequis
Vous devez avoir NodeJS en version 18 ou supérieure installé sur votre machine.

## 🛠️ Technologies utilisées
- React avec TypeScript (Vite)
- React Router
- TailwindCSS
- Lucide React (pour les icônes)

## 🚀 Installation et lancement du projet

Clonez le projet sur votre machine locale :
```bash
git clone https://github.com/BenoitPrmt/tic-tac-toe-react.git
cd tic-tac-toe-react
```

Installez les dépendances avec NPM :
```bash
npm install
```

Lancez le projet :
```bash
npm run dev
```

Développé par Benoit Parmentier - contact@benoitparmentier.fr