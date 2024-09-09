---
title: "Tutorial: How to build And Organize Advance X (Twitter) Bot in Python"
description: "While there are many resources on how to create a twitter bot, but most of them only cover basic bot functionalities. This post will dive into how you can develop a more advanced bot with multiple endpoints and code organization complex logic."
pubDatetime: 2024-05-07T14:47:28.273Z
tags:
  - tutorial
  - python
  - programming
---

I recently developed a Twitter bot for a Netherlands-based company with blockchain integration. Working with the Twitter API has become more complicated than necessary, especially with the new V2 API and its 2-3 authentication methods. While there are many resources on creating a Twitter developer account and obtaining tokens, most tutorials only cover basic bot functionalities. This post will dive into building a more advanced bot with multiple endpoints and code organization complex logic.

## Table of Contents

## Prerequisites + Basic Setup

I assume that you have basic programming knowledge and familiarity with Python, including creating virtual environments and using pip. I will keep code simple in order to convey the approach, and expect you to extend and modify it for your bot.

After creating your Twitter app from the Twitter Developer Dashboard (use `https://127.0.0.1` as the redirect URI), obtain the `client id` and `client secret`, and place them in a `.env` file at the root of the project:

```bash
# .env
CLIENT_ID=[YOUR_CLIENT_ID]
CLIENT_SECRET=[YOUR_CLIENT_SECRET]
REDIRECT_URI=https://127.0.0.1
```

Install [Tweepy](https://www.tweepy.org/) and `dotenv`:

```bash
pip3 install tweepy dotenv
```

The bot will be authenticated via `OAuth 2.0 Authorization Code Flow with PKCE (User Context)`. Check out the official X/Twitter docs on difference between OAuth methods.

**Note**: With the free API access level, the bot can ONLY post/delete its own tweets. Upgrading to at least a basic plan ($100/month) allows fetching tweets (mentions/user tweets), along with some other things. Once again consult the official docs.

## Creating a wrapper around Tweepy

I prefer encapsulating Tweepy within a class wrapper. This approach offers several advantages:

1. The instantiated API object autonomously manages its state, ensuring token freshness without the need for manual periodic token refreshing by external entities.
2. The class facilitates the instantiation of multiple bots, each with distinct tokens, without necessitating any modifications to the underlying code.

```python
# ./api/twitter_api.py
import datetime
import time
import tweepy
import tweepy.errors

class TwitterAPI:
    def __init__(self, client_id: str, client_secret: str, redirect_uri: str) -> None:
        try:
            self.oauth2_user_handler = tweepy.OAuth2UserHandler(
                client_id=client_id,
                redirect_uri=redirect_uri,
                scope=["tweet.read", "tweet.write",
                       "users.read", "offline.access"],
                client_secret=client_secret
            )

            print(
                "Copy and paste the following URL in your browser to authenticate with Twitter API:\n")
            print(self.oauth2_user_handler.get_authorization_url())
            print()
            access_token_resp = self.oauth2_user_handler.fetch_token(
                input("Enter the URL after the redirect: ")
            )
            access_token = access_token_resp['access_token']
            refresh_token = access_token_resp['refresh_token']
            client = tweepy.Client(access_token, wait_on_rate_limit=True)

            self.access_token = access_token
            self.refresh_tokens = refresh_token
            self.client = client
            self.token_timestamp = time.time()
            self.auth_user = client.get_me(user_auth=False).data

            print(f'Logged in as {self.auth_user['username']} (id: {self.auth_user['id']})')

        except tweepy.errors.TweepyException as e:
            print("Failed to authenticate with Twitter API. Error: ", e)
            sys.exit(1)

    def __refresh_tokens(self) -> None:
        try:
            # are the tokens expired?
            # Actual expiry is 7200 secs (2h), 7000 is a safe margin
            if time.time() - self.token_timestamp < 7000:
                return

            print("Refreshing tokens...")
            new_tokens_resp = self.oauth2_user_handler.refresh_token(
                'https://api.twitter.com/2/oauth2/token', refresh_token=self.refresh_tokens)
            self.access_token = new_tokens_resp['access_token']
            self.refresh_tokens = new_tokens_resp['refresh_token']
            self.client = tweepy.Client(
                self.access_token, wait_on_rate_limit=True)
            print("Tokens refreshed successfully")

        except tweepy.errors.TweepyException as e:
            print("Error in refreshing tokens: ", e)
            sys.exit(1)

    # Now implement wrappers around any endpoints that you want to use,
    # and call the self.__refresh_tokens() in each of those method first.

    # Another important note: `user_auth=False` is important because it tells the tweepy to
    # use V2 instead of the default v1.0 user context.

    # For example, consider a simple method that fetches all the tweets that mentioned
    # the bot in the last since_sec seconds. (Not handling exceptions here to keep the code simple
    # however, you should handle exceptions in your production bot).
    def get_mentions(self, since_sec: int):
        self.__refresh_tokens()

        start_time = datetime.datetime.now(tz=datetime.timezone.utc) - datetime.timedelta(seconds=since_sec)

        resp = self.client.get_users_mentions(
            self.auth_user['id'], tweet_fields=[
                'id', 'author_id', 'created_at', 'text', 'conversation_id', 'in_reply_to_user_id'],
            max_results=100, start_time=start_time, user_auth=False)

        tweets = resp.data
        if tweets is None:
            print("No mentions in the last 60 seconds")
            return []

        return tweets

    def post_reply(self, text: str, reply_to_tweet_id: str) -> str:
        self.__refresh_tokens()
        tweet_id = self.client.create_tweet(
            text=text, in_reply_to_tweet_id=reply_to_tweet_id, user_auth=False)
        return tweet_id

    def post_tweet(self, text: str) -> str:
        # How will you implement this?
        pass

    # Similalry implement what you want to use...
    #
    # Tweepy Docs: https://docs.tweepy.org/en/stable/
    # X/Twitter API Docs: https://developer.twitter.com/en/docs/twitter-api
```

## The main bot program loop

An example demonstrating the usage of the defined class. This program fetches mentions in the last 2 minutes every 2 minutes and replies to each of them:

```python
# ./bot.py
import time
import os
from dotenv import load_dotenv
from api.twitter_api import TwitterAPI

load_dotenv()  # Load the .env file

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

api = TwitterAPI(client_id=CLIENT_ID,
                    client_secret=CLIENT_SECRET, redirect_uri=REDIRECT_URI)

def main():
    while True:
        mentions = api.get_mentions(120)
        for mention in mentions:
            api.post_reply(f'Hi, You have mentioned me ^_^', mention['id'])
            time.sleep(0.5) # Prevents rate limiting

        time.sleep(120)

if __name__ == '__main__':
    main()
```

## Conclusion

This is a simplified bot. Feel free to extend and modify it according to your requirements! If you have any questions or found a bug, feel free to contact me.

![robot dancing gif|300](https://media1.tenor.com/m/qXz3eNHXGpwAAAAC/generous-robots-space-robots.gif)
