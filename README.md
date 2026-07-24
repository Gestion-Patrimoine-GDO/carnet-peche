# Carnet de pêche

Application autonome (PWA) : saisie des sorties, carnet personnel, analyse des techniques.
Fonctionne hors ligne, s'installe sur l'écran d'accueil, aucune donnée ne quitte le téléphone.

## Mise en ligne (une seule fois)

1. Créer un dépôt GitHub, y déposer les 6 fichiers de ce dossier à la racine.
2. Dépôt → **Settings** → **Pages** → Source : `Deploy from a branch`, branche `main`, dossier `/ (root)`.
3. Attendre 1 à 2 minutes. L'adresse s'affiche : `https://<compte>.github.io/<depot>/`

## Installation par les utilisateurs

Envoyer l'adresse. Puis, sur le téléphone :

- **Android / Chrome** : ouvrir le lien → menu ⋮ → *Installer l'application*
- **iPhone / Safari** : ouvrir le lien → bouton Partager → *Sur l'écran d'accueil*

Une icône apparaît. L'application s'ouvre ensuite sans barre de navigateur et fonctionne sans réseau.

## Où sont les données

Dans le navigateur du téléphone (`localStorage`), en local. Conséquences :

- Rien n'est envoyé nulle part, aucun compte, aucun serveur.
- Effacer les données du navigateur ou désinstaller efface le carnet.
- Conseil : exporter le carnet de temps en temps (onglet Carnet → *Envoyer mon carnet*).

## Partage entre pêcheurs

Chacun exporte son carnet et l'envoie aux autres (WhatsApp, mail). À l'import, les sorties
déjà présentes sont ignorées : on peut réimporter le même fichier sans créer de doublon.

## Mise à jour du site

Après avoir modifié `index.html`, incrémenter `VERSION` dans `sw.js` (`v1` → `v2`),
sinon les téléphones continueront d'afficher la version en cache.

## Météo

Fournie par [Open-Meteo](https://open-meteo.com) — gratuit, sans clé, sans inscription.
Le bouton demande la position, arrondie à environ 1 km avant enregistrement.
Hors ligne, la météo est simplement absente : la saisie reste possible.
