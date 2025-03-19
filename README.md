# Gamebook Web

## Overview
Gamebook Web is a text-based gamebook with interactive puzzles and branching narratives. It has mobile responsive design, but is optimized for desktop.  

## UI
- Narrate: Not into reading? Press the "Narrate" button at the top of the screen to activate TTS (text-to-speech)
- Restart: Click to bring you back to the beginning and reset your game state. On desktop, it's the "Restart" in the bottom menu. On mobile, it's the refresh icon on the top left of the screen
- Hints: Open the hints drawer in the bottom menu to see page-specific hints or information. Avoid clicking this to challenge yourself!
- Notes: Open the notes drawer in the bottom menu to see any information you've collected that you might need for later. These notes autofill and indicate words you may need to type or speak,
- Audio: On desktop, click the "Audio" drawer in the bottom menu to control the music volume with a slider or turn it on and off with the speaker icon. On mobile, turn the music on and off with the speaker icon at the top of the screen. Note that there are no controls for narrate/sound effect volume at this time - please use your system or device settings
- Choices: Choices are indicated by [square brackets]. Click on a choice to be taken to the corresponding story page. Note that some choices only become available after you complete a puzzle on the page.
- Scrolling: If there is more text below the viewport, it will be indicated by "More below" in the bottom centre of the screen. Use your mouse's scroll wheel (or swipe on mobile) to scroll down to see more text or options.

## Assets
- See full attributions for music and icons here: [Client Repo](https://github.com/lmolsen/lisa-olsen-capstone/tree/develop/capstone-client)
- Writing, sound effects, and other images were created by me

## Features
- Custom sound effects and writing
- Branching narrative based on player choices
- Story pages are from a template page with information dynamically filled in from a JSON file based on the URL endpoints
- Page-specific hints and auto-filled notes on completion of certain puzzles
- Puzzles and interactive elements using React's Motion library
- Session storage to persist your game state until restart or tab close
- TTS narration using Web Speech API
- Speech recognition using Web Speech API
- Dynamic value text input fields
- Bad word filter for text submission and speech recognition using bad-words library
- Music and symbols change based on page location
- Music volume and pause/play controls
- Server-side Wall of Fame where players who get a successful ending can post their name and an ending-associated accomplishment is applied for them
