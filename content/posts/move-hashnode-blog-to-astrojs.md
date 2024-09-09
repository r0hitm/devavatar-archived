---
title: "Devlog: Moving My Blog from Hashnode to AstroJS"
description: Devlog on my journey as I share the process of transitioning my technical blog from Hashnode to a custom Astro-built website. Learn from my experiences, including challenges faced, solutions found, and lessons learned along the way. Gain valuable insights for your own blog migration project.
pubDatetime: 2024-03-04T15:20:29.169Z
tags:
  - devlog
  - web
---

I've been maintaining a technical blog since last year, which all began with a simple experiment, thanks to the free domain offer by Name.com from GitHub in my student developer pack back in March 2023. At that time, I wasn't sure what I wanted from a blog or if I'd even enjoy it. So, to avoid the hassle of building a site from scratch, I opted for Hashnode and added my custom domain. This way, if my blog took off, I'd have all the traffic directed to my domain, and if it did not, I could let it fade away since the domain was free for only one year. (Though this didn't go as planned due to a funny-tragic incident, which I will get back to below).

Throughout 2023, I published a total of 16 blog posts, learning and improving with each one. By the second half of 2023, I was losing interest in keeping the blog because writing is hard, and blog ideas that I wanted to write about didn't come easy. Besides, I had college and self-studies to manage. But to my surprise, my blog gained traction, with readers around the globe and an impressive click-through rate from search engines, as revealed by Hashnode's analytics and Google Search Console. This success boosted my morale in my skills, and I decided to keep the blog.

By this time, I had started to develop a sense of what I wanted from my blogs, what features I valued, and figuring out the workflows that worked for me. Hashnode's social media-like features and not-so-great markdown editor pushed me to have a leaner website with no distractions, more flexibility in design, and write my blogs through Obsidian (my go-to note-taking and organization tool!).

As the expiry date for the old domain approached, I began planning my transition to a new blog website. Though this got delayed by the college exams for 1-2 months in December 2023 and January 2024. After exams, the plan was to build a new website using an SSG and pull the plug on Hashnode and change the DNS settings to have that domain point to the new website. However, and this is a big however, the exorbitant renewal costs for the old domain forced me to purchase a new one, with the lowest renewal costs possible.

I set up the redirect from the old domain root to the new domain root, but I made an embarrassing mistake of deleting my blogs from Hashnode, and I could not set up proper canonical links from old to the new website. There goes some of my SEO rankings... oops!

I tried 11ty but quickly decided not to use it because of its convoluted documentation and incomplete information. And I settled on Astro for its touted speed and high-quality documentation. After bootstrapping my site using the Astro-paper theme, investing several weeks to migrate my blogs and add all the necessary front matter to each markdown file - a tedious but necessary task, set up Obsidian as my content vault with all necessary plugins and getting some help from a friend for the logo and footer design (See [credits](/credits)). The site is finally complete.

Despite facing delays due to college exams and unexpected challenges during the setup process, I'm pleased to announce that the transition is complete and my site is live on GitHub Pages and hosted under the custom domain [devavatar.com](/). I have not set up any analytics on the site because privacy-friendly ones are not free, and I do not want ads, cookies, or tracking on my site by using something like Google Analytics. I hate ads, and I don't want my readers getting annoyed by them either.

This post serves as both a brief reflection on my journey and the inaugural blog post on the new domain. Moving forward, my goal is to maintain a consistent weekly blogging schedule, so stay tuned for the next post every Monday!

P.S. Feel free to reach out to me! I would love to hear your thoughts. See the footer for my socials and email.

![Typing Anime Gif](https://media1.tenor.com/m/Xf_PZVtHpSgAAAAC/anime-typing.gif)
