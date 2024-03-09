Token Bag App for Toriko RPG game

Deployed at: [token-app-rpg.vercel.app](https://token-app-rpg.vercel.app/)

## How it works

- You start with a bag of 15 good tokens and 1 bad token.
- The user can draw up to 3 tokens per turn. Every draw uses the same pool (15 good tokens + bad tokens).
- If the user draws a good token, a bad token will automatically be inserted.
- The bag can have up to 6 bad tokens.
- The user has the ability to remove bad tokens as the game requires, or to add them.
- If the user draws a bad token, the bag will be reset to its original state.
- The first time the user draws a good token, or a series of good tokens in a single turn, it'll be promped to pick the Wheel of Fortune card.

## Features
- Save to local storage
- Automated session retrieval on load
- Reset of UI and delete data from local storage
