# hackernews-app
React Native app presenting Hacker News' latest stories.

## Features:
  * Viewing latest news from Hacker News, updated automatically when app is launched. Each story item holds additional info about its author, score, time of posting, amount of comments.
  * Sharing story with others via external apps e.g. Messenger. 
  * Reading comments in their original, nested structure.

## Tools used to write this app:
  * React Native
  * Expo
  * React Native Elements
  * React Native Render HTML
  * React Native Webview 
  * React Native Navigation

## Issues to resolve/Features to add:
  * Overall performance of loading and fetching tends to be quite unpredictable  
  * Currently main feed contains only first page of latest news from Hacker News. Infinite loading, using pagination from REST API, will be added in future.
  * Refreshing needs to be rethink. 
